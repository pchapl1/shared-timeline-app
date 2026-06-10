import pytest

from django.contrib.auth.models import User

from notifications.models import Notification
from notifications.services import create_notification
from circles.models import Circle, CircleMember
from notifications.services import create_circle_notification

@pytest.mark.django_db
def test_create_notification_creates_record():
    recipient = User.objects.create_user(
        username='recipient',
        password='password123'
    )

    actor = User.objects.create_user(
        username='actor',
        password='password123'
    )

    notification = create_notification(
        recipient=recipient,
        actor=actor,
        notification_type=Notification.MEMORY_COMMENT,
    )

    assert notification is not None
    assert Notification.objects.count() == 1

    saved_notification = Notification.objects.first()

    assert saved_notification.recipient == recipient
    assert saved_notification.actor == actor
    assert (
        saved_notification.notification_type
        == Notification.MEMORY_COMMENT
    )


@pytest.mark.django_db
def test_create_notification_skips_self_notification():
    user = User.objects.create_user(
        username='user',
        password='password123'
    )

    notification = create_notification(
        recipient=user,
        actor=user,
        notification_type=Notification.MEMORY_COMMENT,
    )

    assert notification is None
    assert Notification.objects.count() == 0

@pytest.mark.django_db
def test_create_circle_notification_notifies_all_other_members():
    actor = User.objects.create_user(
        username='actor',
        password='password123'
    )

    member_one = User.objects.create_user(
        username='member1',
        password='password123'
    )

    member_two = User.objects.create_user(
        username='member2',
        password='password123'
    )

    circle = Circle.objects.create(
        name='Test Circle',
        circle_type='friends',
        start_date='2026-01-01',
        created_by=actor,
    )

    CircleMember.objects.create(
        circle=circle,
        user=actor,
        role='owner',
    )

    CircleMember.objects.create(
        circle=circle,
        user=member_one,
    )

    CircleMember.objects.create(
        circle=circle,
        user=member_two,
    )

    create_circle_notification(
        circle=circle,
        actor=actor,
        notification_type=Notification.MEMORY_COMMENT,
    )

    assert Notification.objects.count() == 2


@pytest.mark.django_db
def test_create_circle_notification_excludes_actor():
    actor = User.objects.create_user(
        username='actor',
        password='password123'
    )

    member = User.objects.create_user(
        username='member',
        password='password123'
    )

    circle = Circle.objects.create(
        name='Test Circle',
        circle_type='friends',
        start_date='2026-01-01',
        created_by=actor,
    )

    CircleMember.objects.create(
        circle=circle,
        user=actor,
        role='owner',
    )

    CircleMember.objects.create(
        circle=circle,
        user=member,
    )

    create_circle_notification(
        circle=circle,
        actor=actor,
        notification_type=Notification.MEMORY_COMMENT,
    )

    assert not Notification.objects.filter(
        recipient=actor
    ).exists()


@pytest.mark.django_db
def test_create_circle_notification_notifies_correct_users():
    actor = User.objects.create_user(
        username='actor',
        password='password123'
    )

    member = User.objects.create_user(
        username='member',
        password='password123'
    )

    outsider = User.objects.create_user(
        username='outsider',
        password='password123'
    )

    circle = Circle.objects.create(
        name='Test Circle',
        circle_type='friends',
        start_date='2026-01-01',
        created_by=actor,
    )

    CircleMember.objects.create(
        circle=circle,
        user=actor,
        role='owner',
    )

    CircleMember.objects.create(
        circle=circle,
        user=member,
    )

    create_circle_notification(
        circle=circle,
        actor=actor,
        notification_type=Notification.MEMORY_COMMENT,
    )

    assert Notification.objects.filter(
        recipient=member
    ).exists()

    assert not Notification.objects.filter(
        recipient=outsider
    ).exists()


@pytest.mark.django_db
def test_create_circle_notification_returns_created_notifications():
    actor = User.objects.create_user(
        username='actor',
        password='password123'
    )

    member = User.objects.create_user(
        username='member',
        password='password123'
    )

    circle = Circle.objects.create(
        name='Test Circle',
        circle_type='friends',
        start_date='2026-01-01',
        created_by=actor,
    )

    CircleMember.objects.create(
        circle=circle,
        user=actor,
        role='owner',
    )

    CircleMember.objects.create(
        circle=circle,
        user=member,
    )

    notifications = create_circle_notification(
        circle=circle,
        actor=actor,
        notification_type=Notification.MEMORY_COMMENT,
    )

    assert len(notifications) == 1