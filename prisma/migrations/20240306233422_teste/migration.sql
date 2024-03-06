-- CreateEnum
CREATE TYPE "ProdutoStatus" AS ENUM ('ATIVO', 'DESATIVADO');

-- CreateTable
CREATE TABLE "Produtos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "slug" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "promocao" BOOLEAN NOT NULL,
    "promocao_preco" DOUBLE PRECISION NOT NULL,
    "atacado" BOOLEAN NOT NULL,
    "atacado_minquantidade" INTEGER NOT NULL,
    "vendas" INTEGER NOT NULL,
    "status" "ProdutoStatus" NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);
