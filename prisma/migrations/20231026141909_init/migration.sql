-- CreateTable
CREATE TABLE "TodoList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "listId" TEXT NOT NULL,
    CONSTRAINT "Todo_listId_fkey" FOREIGN KEY ("listId") REFERENCES "TodoList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TodoList_slug_key" ON "TodoList"("slug");
