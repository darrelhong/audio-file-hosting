/*
  Warnings:

  - Added the required column `url` to the `AudioFile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AudioFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "AudioFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AudioFile" ("category", "description", "id", "userId") SELECT "category", "description", "id", "userId" FROM "AudioFile";
DROP TABLE "AudioFile";
ALTER TABLE "new_AudioFile" RENAME TO "AudioFile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
