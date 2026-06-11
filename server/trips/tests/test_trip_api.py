import pytest

from django.contrib.auth.models import User
from rest_framework.test import APIClient

from circles.models import Circle, CircleMember
from trips.models import Trip


@pytest.fixture
def user():
    return User.objects.create_user(
        username='user',
        password='password123'
    )


@pytest.fixture
def other_user():
    return User.objects.create_user(
        username='otheruser',
        password='password123'
    )


@pytest.fixture
def api_client(user):
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.fixture
def circle(user):
    circle = Circle.objects.create(
        name='Test Circle',
        circle_type='friends',
        start_date='2026-01-01',
        created_by=user,
    )

    CircleMember.objects.create(
        circle=circle,
        user=user,
        role='owner',
    )

    return circle


@pytest.mark.django_db
def test_user_can_create_trip_for_own_circle(api_client, user, circle):
    response = api_client.post(
        '/api/trips/',
        {
            'circle': circle.id,
            'title': 'Seattle Trip',
            'description': 'Weekend trip',
            'start_date': '2026-06-15',
            'end_date': '2026-06-18',
            'destination_name': 'Seattle',
        },
        format='json',
    )

    assert response.status_code == 201
    assert Trip.objects.count() == 1

    trip = Trip.objects.first()

    assert trip.title == 'Seattle Trip'
    assert trip.created_by == user
    assert trip.circle == circle


@pytest.mark.django_db
def test_user_can_list_only_trips_for_their_circles(
    api_client,
    user,
    other_user,
    circle,
):
    visible_trip = Trip.objects.create(
        circle=circle,
        title='Visible Trip',
        start_date='2026-06-15',
        created_by=user,
    )

    other_circle = Circle.objects.create(
        name='Other Circle',
        circle_type='friends',
        start_date='2026-01-01',
        created_by=other_user,
    )

    CircleMember.objects.create(
        circle=other_circle,
        user=other_user,
        role='owner',
    )

    Trip.objects.create(
        circle=other_circle,
        title='Hidden Trip',
        start_date='2026-07-01',
        created_by=other_user,
    )

    response = api_client.get('/api/trips/')

    assert response.status_code == 200

    trip_ids = [trip['id'] for trip in response.data['results']]

    assert visible_trip.id in trip_ids
    assert len(trip_ids) == 1


@pytest.mark.django_db
def test_user_cannot_view_trip_outside_their_circle(
    api_client,
    other_user,
):
    other_circle = Circle.objects.create(
        name='Other Circle',
        circle_type='friends',
        start_date='2026-01-01',
        created_by=other_user,
    )

    CircleMember.objects.create(
        circle=other_circle,
        user=other_user,
        role='owner',
    )

    trip = Trip.objects.create(
        circle=other_circle,
        title='Private Trip',
        start_date='2026-07-01',
        created_by=other_user,
    )

    response = api_client.get(f'/api/trips/{trip.id}/')

    assert response.status_code == 404


@pytest.mark.django_db
def test_user_cannot_create_trip_for_other_circle(
    api_client,
    user,
    other_user,
):
    other_circle = Circle.objects.create(
        name='Other Circle',
        circle_type='friends',
        start_date='2026-01-01',
        created_by=other_user,
    )

    CircleMember.objects.create(
        circle=other_circle,
        user=other_user,
        role='owner',
    )

    response = api_client.post(
        '/api/trips/',
        {
            'circle': other_circle.id,
            'title': 'Unauthorized Trip',
            'start_date': '2026-06-15',
        },
        format='json',
    )

    assert response.status_code == 400

    assert Trip.objects.count() == 0