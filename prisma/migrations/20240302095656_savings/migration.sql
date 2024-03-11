-- CreateTable
CREATE TABLE `savings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goalAmount` DOUBLE NOT NULL,
    `currentlySaved` DOUBLE NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
