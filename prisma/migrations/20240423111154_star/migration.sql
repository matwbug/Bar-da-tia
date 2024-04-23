-- CreateTable
CREATE TABLE "Produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "promocao" BOOLEAN NOT NULL,
    "promocao_preco" REAL NOT NULL,
    "atacado" BOOLEAN NOT NULL,
    "atacado_minquantidade" INTEGER NOT NULL,
    "vendas" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);
