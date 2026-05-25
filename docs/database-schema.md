# Database Schema Draft

## User

Stores each person using the app.

Fields:
- id
- email
- username
- first_name
- last_name
- password

## Circle

A private shared space.

Fields:
- id
- name
- circle_type
- start_date
- created_by
- created_at
- updated_at

Examples of circle_type:
- couple
- friends
- family
- travel_group

## CircleMember

Connects users to circles.

Fields:
- id
- circle
- user
- role
- joined_at

Examples of role:
- owner
- admin
- member

## Memory

A shared timeline item.

Fields:
- id
- circle
- title
- description
- memory_date
- location_name
- latitude
- longitude
- created_by
- created_at
- updated_at

## Place

A saved place visited by a circle.

Fields:
- id
- circle
- name
- address
- latitude
- longitude
- visited_date
- created_by

## Goal

A shared goal or bucket list item.

Fields:
- id
- circle
- title
- description
- status
- target_date
- completed_at
- created_by

Examples of status:
- active
- completed
- archived

## Trip

A shared trip.

Fields:
- id
- circle
- title
- destination
- start_date
- end_date
- notes
- created_by