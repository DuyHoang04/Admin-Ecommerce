-- CreateTable
CREATE TABLE "BillBoard" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BillBoard_storeId_idx" ON "BillBoard"("storeId");
