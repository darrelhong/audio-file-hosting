# Quick Start

Ensure minimum versions of Node and Yarn installed

```
yarn install

# key for session cookies
yarn rw generate secret

# Add filestack API key to .env

yarn rw dev
```

Default user setup is  [scripts/seed.ts](scripts/seed.ts)

Email: test@example.com
Password: test

## Docker

```
docker build -t audio-file-hosting .

docker run --env-file .env --env-file .env.defaults -p 8910:8910 audio-file-hosting
```

# Stack

Decided to go with an opiniated fullstack framework so as to not reimplement boilerplate.

- RedwoodJS
  - SQLite
  - GraphQL
  - React

# Docs

As much as possible, we'll rely on auto-generated documentation by GraphQL.

Run dev server to view available APIs at http://localhost:8911/graphql

View schema at [api/db/schema.prisma](api/db/schema.prisma)

In short, 1 User -> Many AudioFile

## Authentication

Email and password authentication with RedwoodJS dbAuth

## Authorisation

Users can only retrieve own audio files as user ID is accessed from session cookie

## File upload

Uploaded files are stored with FileStack, and respective URLs are stored in own database



# Further TODOs

- email verification
- file upload through GraphQL
- handle audio file formats
- clean up APIs
- pagination
- update/delete audio files
- row level security

