-- CreateTable
CREATE TABLE "Recuring" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "userId" INTEGER NOT NULL,
    "recurring" BOOLEAN,

    CONSTRAINT "Recuring_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recuring" ADD CONSTRAINT "Recuring_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
