-- =============================================
-- finance_management — Initial Schema Migration
-- Run this in Supabase: SQL Editor → New Query
-- =============================================

-- 1. Enum
CREATE TYPE "TransactionType" AS ENUM ('expense', 'income');

-- 2. User
CREATE TABLE "User" (
    "id"       SERIAL       NOT NULL,
    "email"    TEXT         NOT NULL,
    "fullName" TEXT         NOT NULL,
    "jobRole"  TEXT         NOT NULL,
    "password" TEXT         NOT NULL,
    "username" TEXT         NOT NULL,
    "income"   INTEGER      NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- 3. Transaction
CREATE TABLE "Transaction" (
    "id"          SERIAL             NOT NULL,
    "amount"      DOUBLE PRECISION   NOT NULL,
    "description" TEXT               NOT NULL,
    "category"    TEXT               NOT NULL,
    "date"        TIMESTAMP(3)       NOT NULL,
    "type"        "TransactionType"  NOT NULL,
    "userId"      INTEGER            NOT NULL,
    "recurring"   BOOLEAN            NOT NULL DEFAULT false,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

ALTER TABLE "Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- 4. Savings
CREATE TABLE "Savings" (
    "id"             SERIAL           NOT NULL,
    "goalAmount"     DOUBLE PRECISION NOT NULL,
    "currentlySaved" DOUBLE PRECISION NOT NULL,
    "name"           TEXT             NOT NULL,
    "date"           TIMESTAMP(3)     NOT NULL,
    "userId"         INTEGER          NOT NULL,

    CONSTRAINT "Savings_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Savings_userId_idx" ON "Savings"("userId");

ALTER TABLE "Savings"
    ADD CONSTRAINT "Savings_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- 5. loans (mapped from Loan model)
CREATE TABLE "loans" (
    "id"                SERIAL           NOT NULL,
    "totalAmount"       DOUBLE PRECISION NOT NULL,
    "name"              TEXT             NOT NULL,
    "startDate"         TEXT             NOT NULL,
    "endDate"           TEXT             NOT NULL,
    "totalInstalments"  INTEGER          NOT NULL,
    "currentInstalment" INTEGER          NOT NULL,
    "instalmentAmount"  DOUBLE PRECISION NOT NULL,
    "userId"            INTEGER          NOT NULL,
    "createdAt"         TIMESTAMP(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"         TIMESTAMP(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompleted"       BOOLEAN          NOT NULL DEFAULT false,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "loans_userId_idx" ON "loans"("userId");

ALTER TABLE "loans"
    ADD CONSTRAINT "loans_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- 6. Notification
CREATE TABLE "Notification" (
    "id"          SERIAL  NOT NULL,
    "title"       TEXT    NOT NULL,
    "description" TEXT    NOT NULL,
    "userId"      INTEGER NOT NULL,
    "isRead"      BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

ALTER TABLE "Notification"
    ADD CONSTRAINT "Notification_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
