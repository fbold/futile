/*
  Warnings:

  - You are about to drop the column `category` on the `tiles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tiles_user_id_idx";

-- AlterTable
ALTER TABLE "tiles" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "tiles_user_id_category_id_idx" ON "tiles"("user_id", "category_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tiles" ADD CONSTRAINT "tiles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tiles" ADD CONSTRAINT "tiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
