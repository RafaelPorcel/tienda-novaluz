-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoria" TEXT NOT NULL,
    "subcategoria" TEXT,
    "precio" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "imagen" TEXT,
    "medidasAlto" DOUBLE PRECISION,
    "medidasAncho" DOUBLE PRECISION,
    "medidasLargo" DOUBLE PRECISION,
    "embalajeAlto" DOUBLE PRECISION,
    "embalajeAncho" DOUBLE PRECISION,
    "embalajeLargo" DOUBLE PRECISION,
    "peso" DOUBLE PRECISION,
    "marca" TEXT,
    "potencia" TEXT,
    "otros" TEXT,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);
