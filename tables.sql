CREATE TABLE users(
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
)

CREATE TABLE sessions(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "users"("id"),
    "token" TEXT NOT NULL UNIQUE,
    "expiration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
)

CREATE TABLE posts(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "users"("id"),
    "link" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW()
)

CREATE TABLE likes(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "users"("id"),
    "postId" INTEGER REFERENCES "posts"("id"),
    "createdAt" TIMESTAMP DEFAULT NOW()
)

CREATE TABLE hashtags (
    "id" SERIAL PRIMARY KEY,
    "postId" INTEGER NOT NULL REFERENCES posts("id"),
    "name" TEXT NOT NULL,
    UNIQUE ("name", "postId")
)

CREATE TABLE comments (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users("id"),
    "postId" INTEGER NOT NULL REFERENCES posts("id"),
    "content" TEXT NOT NULL
)
