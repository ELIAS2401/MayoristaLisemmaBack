import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // 🔥 BORRAR PRODUCTOS ANTERIORES
  await prisma.producto.deleteMany();

  // 🥤 INSERTAR PRODUCTOS (TODOS BEBIDAS -> categoriaId = 1)
  await prisma.producto.createMany({
    data: [
      { nombre: "Cerveza 361", stock: 13, costoUnitario: new Prisma.Decimal(7200), precioUnitario: new Prisma.Decimal(8300), categoriaId: 1 },

      { nombre: "7Up Free 1.5L", stock: 0, costoUnitario: new Prisma.Decimal(8300), precioUnitario: new Prisma.Decimal(10000), categoriaId: 1 },
      { nombre: "7Up 1.5L", stock: 0, costoUnitario: new Prisma.Decimal(8300), precioUnitario: new Prisma.Decimal(10000), categoriaId: 1 },
      { nombre: "7Up 2L", stock: 0, costoUnitario: new Prisma.Decimal(11500), precioUnitario: new Prisma.Decimal(13000), categoriaId: 1 },

      { nombre: "Agua Cimes 2L", stock: 0, costoUnitario: new Prisma.Decimal(2300), precioUnitario: new Prisma.Decimal(2900), categoriaId: 1 },
      { nombre: "Agua Manaos 2L", stock: 0, costoUnitario: new Prisma.Decimal(2500), precioUnitario: new Prisma.Decimal(3300), categoriaId: 1 },

      { nombre: "Aquarius Manzana 225ml", stock: 0, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(11300), categoriaId: 1 },
      { nombre: "Aquarius Pera 225ml", stock: 0, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(11300), categoriaId: 1 },
      { nombre: "Aquarius Pomelo 225ml", stock: 0, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(11300), categoriaId: 1 },

      { nombre: "Baggio Multifruta 1L", stock: 0, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(9800), categoriaId: 1 },
      { nombre: "Baggio Naranja 1L", stock: 4, costoUnitario: new Prisma.Decimal(8800), precioUnitario: new Prisma.Decimal(9800), categoriaId: 1 },
      { nombre: "Baggio Multifruta 1.5L", stock: 0, costoUnitario: new Prisma.Decimal(11264.4), precioUnitario: new Prisma.Decimal(13200), categoriaId: 1 },
      { nombre: "Baggio Naranja 1.5L", stock: 0, costoUnitario: new Prisma.Decimal(11264.4), precioUnitario: new Prisma.Decimal(13200), categoriaId: 1 },
      { nombre: "Baggio 200ml", stock: 116, costoUnitario: new Prisma.Decimal(5900), precioUnitario: new Prisma.Decimal(6500), categoriaId: 1 },

      { nombre: "Benedictino", stock: 88, costoUnitario: new Prisma.Decimal(1000), precioUnitario: new Prisma.Decimal(1950), categoriaId: 1 },

      { nombre: "Brio Naranja 1.5L", stock: 111, costoUnitario: new Prisma.Decimal(3100), precioUnitario: new Prisma.Decimal(3900), categoriaId: 1 },
      { nombre: "Brio Pomelo 1.5L", stock: 193, costoUnitario: new Prisma.Decimal(3100), precioUnitario: new Prisma.Decimal(3900), categoriaId: 1 },

      { nombre: "Cimes Cola 225ml", stock: 79, costoUnitario: new Prisma.Decimal(3450), precioUnitario: new Prisma.Decimal(4500), categoriaId: 1 },
      { nombre: "Cimes Lima 225ml", stock: 79, costoUnitario: new Prisma.Decimal(3500), precioUnitario: new Prisma.Decimal(4500), categoriaId: 1 },
      { nombre: "Cimes Tónica 225ml", stock: 80, costoUnitario: new Prisma.Decimal(3450), precioUnitario: new Prisma.Decimal(4500), categoriaId: 1 },

      { nombre: "Coca Cola 225ml x8", stock: 1, costoUnitario: new Prisma.Decimal(23800), precioUnitario: new Prisma.Decimal(25500), categoriaId: 1 },
      { nombre: "Coca Cola 2L", stock: 193, costoUnitario: new Prisma.Decimal(18100), precioUnitario: new Prisma.Decimal(22000), categoriaId: 1 },
      { nombre: "Coca Zero 2.5L", stock: 5, costoUnitario: new Prisma.Decimal(16700), precioUnitario: new Prisma.Decimal(18500), categoriaId: 1 },

      { nombre: "Cunnington Lima", stock: 61, costoUnitario: new Prisma.Decimal(6200), precioUnitario: new Prisma.Decimal(7100), categoriaId: 1 },
      { nombre: "Cunnington Lima Light", stock: 82, costoUnitario: new Prisma.Decimal(5900), precioUnitario: new Prisma.Decimal(7100), categoriaId: 1 },
      { nombre: "Cunnington Naranja 225ml", stock: 84, costoUnitario: new Prisma.Decimal(6200), precioUnitario: new Prisma.Decimal(7100), categoriaId: 1 },
      { nombre: "Cunnington Naranja Light", stock: 64, costoUnitario: new Prisma.Decimal(6200), precioUnitario: new Prisma.Decimal(7100), categoriaId: 1 },
      { nombre: "Cunnington Tónica 225ml", stock: 243, costoUnitario: new Prisma.Decimal(6200), precioUnitario: new Prisma.Decimal(7100), categoriaId: 1 },
      { nombre: "Cunnington Tónica Light", stock: 18, costoUnitario: new Prisma.Decimal(5900), precioUnitario: new Prisma.Decimal(7100), categoriaId: 1 },

      { nombre: "Fanta 2L", stock: 13, costoUnitario: new Prisma.Decimal(18100), precioUnitario: new Prisma.Decimal(22000), categoriaId: 1 },

      { nombre: "Gatorade Rojo 1.25L", stock: 71, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(11000), categoriaId: 1 },
      { nombre: "Gatorade Azul 1.25L", stock: 170, costoUnitario: new Prisma.Decimal(9000), precioUnitario: new Prisma.Decimal(11000), categoriaId: 1 },

      { nombre: "Heineken 1L", stock: 16, costoUnitario: new Prisma.Decimal(42000), precioUnitario: new Prisma.Decimal(48000), categoriaId: 1 },

      { nombre: "Huerta Puré de Tomate", stock: 322, costoUnitario: new Prisma.Decimal(7437.7), precioUnitario: new Prisma.Decimal(8160), categoriaId: 1 },

      { nombre: "Imperial Golden 1L Cajón", stock: 47, costoUnitario: new Prisma.Decimal(31000), precioUnitario: new Prisma.Decimal(36000), categoriaId: 1 },

      { nombre: "Leche Baggio 1L", stock: 115, costoUnitario: new Prisma.Decimal(10074.8), precioUnitario: new Prisma.Decimal(11000), categoriaId: 1 },
      { nombre: "Leche Choco Baggio 1L", stock: 65, costoUnitario: new Prisma.Decimal(11656.3), precioUnitario: new Prisma.Decimal(12800), categoriaId: 1 },

      { nombre: "Monster Mango Loco", stock: 389, costoUnitario: new Prisma.Decimal(10800), precioUnitario: new Prisma.Decimal(12000), categoriaId: 1 },

      { nombre: "Pepsi 1.5L", stock: 291, costoUnitario: new Prisma.Decimal(8500), precioUnitario: new Prisma.Decimal(10000), categoriaId: 1 },
      { nombre: "Pepsi Black 1.5L", stock: 208, costoUnitario: new Prisma.Decimal(9050), precioUnitario: new Prisma.Decimal(10000), categoriaId: 1 },

      { nombre: "Placer Ananá 1.5L", stock: 217, costoUnitario: new Prisma.Decimal(4050), precioUnitario: new Prisma.Decimal(4750), categoriaId: 1 },
      { nombre: "Placer Manzana 1.5L", stock: 344, costoUnitario: new Prisma.Decimal(4100), precioUnitario: new Prisma.Decimal(4750), categoriaId: 1 },

      { nombre: "Sprite 1.75L x8", stock: 130, costoUnitario: new Prisma.Decimal(17500), precioUnitario: new Prisma.Decimal(21000), categoriaId: 1 },

      { nombre: "Uvita Tinto Común", stock: 81, costoUnitario: new Prisma.Decimal(14500), precioUnitario: new Prisma.Decimal(16500), categoriaId: 1 },

      { nombre: "Viña Alvear", stock: 74, costoUnitario: new Prisma.Decimal(10850), precioUnitario: new Prisma.Decimal(12000), categoriaId: 1 },
    ]
  });

  console.log("✅ Productos seed cargados correctamente");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
