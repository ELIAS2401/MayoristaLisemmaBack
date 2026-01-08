import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // 🔥 BORRAR PRODUCTOS ANTERIORES
  await prisma.producto.deleteMany();

  // 🥤 INSERTAR PRODUCTOS (TODOS BEBIDAS -> categoriaId = 1)
  await prisma.producto.createMany({
    data: [
      { nombre: "Cerveza 361", stock: 13, costoUnitario: new Prisma.Decimal(7200), precioUnitario: new Prisma.Decimal(8300), categoriaId: 1 },
      { nombre: "7up Free x 1.5", stock: 0, costoUnitario: new Prisma.Decimal(8300), precioUnitario: new Prisma.Decimal(10000), categoriaId: 1 },
      { nombre: "7up x 1.5", stock: 0, costoUnitario: new Prisma.Decimal(8300), precioUnitario: new Prisma.Decimal(10000), categoriaId: 1 },
      { nombre: "7up x 2lt", stock: 0, costoUnitario: new Prisma.Decimal(11500), precioUnitario: new Prisma.Decimal(13000), categoriaId: 1 },
      { nombre: "Agua Cimes x 2lt", stock: 0, costoUnitario: new Prisma.Decimal(2300), precioUnitario: new Prisma.Decimal(2900), categoriaId: 1 },
      { nombre: "Agua Manaos x 2lt", stock: 0, costoUnitario: new Prisma.Decimal(2500), precioUnitario: new Prisma.Decimal(3300), categoriaId: 1 },
      { nombre: "Amtel lata 710", stock: 0, costoUnitario: new Prisma.Decimal(49000), precioUnitario: new Prisma.Decimal(55000), categoriaId: 1 },
      { nombre: "Aquarius Manzana 225", stock: 0, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(11300), categoriaId: 1 },
      { nombre: "Aquarius Pera 225", stock: 0, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(11300), categoriaId: 1 },
      { nombre: "Aquarius Pomelo 225", stock: 0, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(11300), categoriaId: 1 },
      { nombre: "Baggio Multifruta x1lt", stock: 0, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(9800), categoriaId: 1 },
      { nombre: "Baggio Naranja x1lt", stock: 4, costoUnitario: new Prisma.Decimal(8800), precioUnitario: new Prisma.Decimal(9800), categoriaId: 1 },
      { nombre: "Baggio x200", stock: 116, costoUnitario: new Prisma.Decimal(5900), precioUnitario: new Prisma.Decimal(6500), categoriaId: 1 },
      { nombre: "Benedictino", stock: 88, costoUnitario: new Prisma.Decimal(1000), precioUnitario: new Prisma.Decimal(1950), categoriaId: 1 },
      { nombre: "Coca Cola x2lt", stock: 193, costoUnitario: new Prisma.Decimal(18100), precioUnitario: new Prisma.Decimal(22000), categoriaId: 1 },
      { nombre: "Coca Zero 2.5", stock: 5, costoUnitario: new Prisma.Decimal(16700), precioUnitario: new Prisma.Decimal(18500), categoriaId: 1 },
      { nombre: "Monster Mango Loco", stock: 389, costoUnitario: new Prisma.Decimal(10800), precioUnitario: new Prisma.Decimal(12000), categoriaId: 1 },
      { nombre: "Pepsi 1.5", stock: 291, costoUnitario: new Prisma.Decimal(8500), precioUnitario: new Prisma.Decimal(10000), categoriaId: 1 },
      { nombre: "Sprite 1.75 x8", stock: 130, costoUnitario: new Prisma.Decimal(17500), precioUnitario: new Prisma.Decimal(21000), categoriaId: 1 },
      { nombre: "Uvita Tinto Común", stock: 81, costoUnitario: new Prisma.Decimal(14500), precioUnitario: new Prisma.Decimal(16500), categoriaId: 1 },
      { nombre: "Viña Alvear", stock: 74, costoUnitario: new Prisma.Decimal(10850), precioUnitario: new Prisma.Decimal(12000), categoriaId: 1 }
    ]
  });

  console.log("✅ Productos seed cargados correctamente");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
