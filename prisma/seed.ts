import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  // -----------------------
  // 1. ROLES
  // -----------------------
  const adminRole = await prisma.tipo_Usuario.create({
    data: { descripcion: "Admin" }
  });

  const vendedorRole = await prisma.tipo_Usuario.create({
    data: { descripcion: "Vendedor" }
  });

  // -----------------------
  // 2. USUARIO ADMIN
  // -----------------------
  await prisma.usuario.create({
    data: {
      dni: "00000000",
      nombre: "Admin",
      apellido: "Sistema",
      email: "admin@lissema.com",
      password: "admin123",    // cambiá esto luego
      tipoUsuarioId: adminRole.id
    }
  });

  // -----------------------
  // 3. CATEGORÍAS
  // -----------------------
  const categoriasMap = new Map<string, number>();

  const categorias = [
    "Bebidas",
    "Verduleria",
    "Varios",
  ];

  for (const nombre of categorias) {
    const cat = await prisma.categoria.create({
      data: { nombre }
    });
    categoriasMap.set(nombre, cat.id);
  }

  // -----------------------
  // 4. PRODUCTOS
  // -----------------------
  const productos = [
    // -------------------------------------------
    // LISTA COMPLETA DE PRODUCTOS (del PDF)
    // -------------------------------------------
    {
      nombre: "cerveza 361",
      categoria: "Bebidas",
      stock: 13,
      costo: 7200,
      precio: 8300
    },
    { nombre: "7up free x 1.5", categoria: "Bebidas", stock: 0, costo: 8300, precio: 10000 },
    { nombre: "7up x 1.5", categoria: "Bebidas", stock: 0, costo: 8300, precio: 10000 },
    { nombre: "7up x 2lt", categoria: "Bebidas", stock: 0, costo: 11500, precio: 13000 },
    { nombre: "Agua cimes x 2lt", categoria: "Bebidas", stock: 0, costo: 2300, precio: 2900 },
    { nombre: "Agua manaos x 2lt", categoria: "Verduleria", stock: 0, costo: 2500, precio: 3300 },

    { nombre: "Amtel lata x 710", categoria: "Bebidas", stock: 0, costo: 49000, precio: 55000 },

    { nombre: "Aquarius manzana 225", categoria: "Bebidas", stock: 0, costo: 9000, precio: 11300 },
    { nombre: "Aquarius pera 225", categoria: "Bebidas", stock: 0, costo: 9000, precio: 11300 },
    { nombre: "Aquarius pomelo 225", categoria: "Bebidas", stock: 0, costo: 9000, precio: 11300 },

    { nombre: "Baggio multifruta x1lt", categoria: "Bebidas", stock: 0, costo: 9000, precio: 9800 },
    { nombre: "Baggio naranja x1lt", categoria: "Bebidas", stock: 4, costo: 8800, precio: 9800 },
    { nombre: "Baggio multifruta x1.5", categoria: "Bebidas", stock: 0, costo: 11264.4, precio: 13200 },
    { nombre: "Baggio naranja x1.5", categoria: "Bebidas", stock: 0, costo: 11264.4, precio: 13200 },
    { nombre: "Baggio x200", categoria: "Bebidas", stock: 116, costo: 5900, precio: 6500 },

    { nombre: "Benedictino", categoria: "Bebidas", stock: 88, costo: 1000, precio: 1950 },

    { nombre: "Brahma 710 lata", categoria: "Bebidas", stock: 0, costo: 29500, precio: 31500 },

    { nombre: "Brio manzana 1.5", categoria: "Bebidas", stock: 0, costo: 3100, precio: 3900 },
    { nombre: "Brio naranja 1.5", categoria: "Bebidas", stock: 111, costo: 3100, precio: 3900 },
    { nombre: "Brio pomelo 1.5", categoria: "Bebidas", stock: 193, costo: 3100, precio: 3900 },

    { nombre: "Cellier agua x2lt", categoria: "Bebidas", stock: 0, costo: 2800, precio: 3400 },

    { nombre: "Cimes bido x6.5", categoria: "Bebidas", stock: 0, costo: 1062.82, precio: 1500 },

    { nombre: "Cimes cola 225", categoria: "Bebidas", stock: 79, costo: 3450, precio: 4500 },
    { nombre: "Cimes lima 225", categoria: "Bebidas", stock: 79, costo: 3500, precio: 4500 },
    { nombre: "Cimes tónica 225", categoria: "Bebidas", stock: 80, costo: 3450, precio: 4500 },

    { nombre: "Coca cola vidrio", categoria: "Verduleria", stock: 0, costo: 20000, precio: 23000 },
    { nombre: "Coca cola 175 x8", categoria: "Bebidas", stock: 0, costo: 17500, precio: 21000 },
    { nombre: "Coca cola 225 x8", categoria: "Verduleria", stock: 1, costo: 23800, precio: 25500 },
    { nombre: "Coca cola x2lt", categoria: "Bebidas", stock: 193, costo: 18100, precio: 22000 },

    { nombre: "Coca zero 1.75", categoria: "Bebidas", stock: 0, costo: 17500, precio: 21000 },
    { nombre: "Coca zero 2.5", categoria: "Bebidas", stock: 5, costo: 16700, precio: 18500 },
    { nombre: "Coca zero 2lt", categoria: "Bebidas", stock: 0, costo: 18100, precio: 22000 },

    { nombre: "Cunnington cola", categoria: "Verduleria", stock: 0, costo: 6100, precio: 7100 },
    { nombre: "Cunnington cola light", categoria: "Bebidas", stock: 0, costo: 5900, precio: 7100 },
    { nombre: "Cunnington lima", categoria: "Bebidas", stock: 61, costo: 6200, precio: 7100 },
    { nombre: "Cunnington lima light", categoria: "Bebidas", stock: 82, costo: 5900, precio: 7100 },
    { nombre: "Cunnington naranja 225", categoria: "Bebidas", stock: 84, costo: 6200, precio: 7100 },
    { nombre: "Cunnington naranja light", categoria: "Bebidas", stock: 64, costo: 6200, precio: 7100 },
    { nombre: "Cunnington pomelo 225", categoria: "Bebidas", stock: 0, costo: 6200, precio: 7100 },
    { nombre: "Cunnington pomelo light", categoria: "Verduleria", stock: 0, costo: 5900, precio: 7100 },
    { nombre: "Cunnington tónica 225", categoria: "Bebidas", stock: 243, costo: 6200, precio: 7100 },
    { nombre: "Cunnington tónica light", categoria: "Bebidas", stock: 18, costo: 5900, precio: 7100 },

    { nombre: "Fanta 225 x8", categoria: "Bebidas", stock: 0, costo: 23800, precio: 25500 },
    { nombre: "Fanta x2lt", categoria: "Bebidas", stock: 13, costo: 18100, precio: 22000 },

    { nombre: "Federico extra dulce", categoria: "Verduleria", stock: 0, costo: 18500, precio: 20000 },

    { nombre: "Gatorade manzana 1.25", categoria: "Bebidas", stock: 0, costo: 9000, precio: 11000 },
    { nombre: "Gatorade rojo 1.25", categoria: "Bebidas", stock: 71, costo: 9000, precio: 11000 },
    { nombre: "Gatorade azul 1.25", categoria: "Bebidas", stock: 170, costo: 9000, precio: 11000 },

    { nombre: "Heineken 1lt", categoria: "Bebidas", stock: 16, costo: 42000, precio: 48000 },
    { nombre: "Heineken 710", categoria: "Bebidas", stock: 0, costo: 75000, precio: 80000 },

    { nombre: "Hic naranja 225", categoria: "Bebidas", stock: 0, costo: 6000, precio: 7500 },

    { nombre: "Huerta puré tomate", categoria: "Bebidas", stock: 322, costo: 7437.7, precio: 8160 },

    { nombre: "Iguana 1lt", categoria: "Bebidas", stock: 4, costo: 22500, precio: 24500 },

    { nombre: "Imperial Golden 1lt cajon", categoria: "Verduleria", stock: 47, costo: 31000, precio: 36000 },

    { nombre: "Inca jardinera", categoria: "Verduleria", stock: 0, costo: 12000, precio: 13920 },

    { nombre: "Leche Baggio 1lt", categoria: "Bebidas", stock: 115, costo: 10074.8, precio: 11000 },
    { nombre: "Leche choco Baggio 1lt", categoria: "Bebidas", stock: 65, costo: 11656.3, precio: 12800 },

    { nombre: "Levite manzana 1.5", categoria: "Bebidas", stock: 54, costo: 6000, precio: 7200 },

    { nombre: "Levite x225 manzana", categoria: "Bebidas", stock: 0, costo: 7800, precio: 9200 },
    { nombre: "Levite x225 naranja", categoria: "Bebidas", stock: 0, costo: 7500, precio: 9200 },
    { nombre: "Levite x225 pomelo", categoria: "Bebidas", stock: 0, costo: 7800, precio: 9200 },
    { nombre: "Levite x225 pera", categoria: "Bebidas", stock: 0, costo: 7500, precio: 9200 },

    { nombre: "Manaos cola light 225", categoria: "Bebidas", stock: 23, costo: 6120, precio: 6800 },
    { nombre: "Manaos cola 225 x6", categoria: "Bebidas", stock: 0, costo: 6120, precio: 6800 },
    { nombre: "Manaos granadina 225", categoria: "Bebidas", stock: 98, costo: 6120, precio: 6800 },
    { nombre: "Manaos guaraná 225", categoria: "Bebidas", stock: 46, costo: 6120, precio: 6800 },
    { nombre: "Manaos lima 225", categoria: "Bebidas", stock: 0, costo: 6120, precio: 6800 },
    { nombre: "Manaos manzana 225", categoria: "Bebidas", stock: 86, costo: 6120, precio: 6800 },
    { nombre: "Manaos naranja", categoria: "Bebidas", stock: 132, costo: 6120, precio: 6800 },
    { nombre: "Manaos pomelo", categoria: "Bebidas", stock: 0, costo: 6120, precio: 6800 },

    { nombre: "Monster mango loco", categoria: "Bebidas", stock: 389, costo: 10800, precio: 12000 },

    { nombre: "Palermo", categoria: "Verduleria", stock: 44, costo: 22500, precio: 24500 },

    { nombre: "Paso de los Toros pomelo 1.5", categoria: "Bebidas", stock: 109, costo: 9050, precio: 10000 },
    { nombre: "Paso de los Toros tónica", categoria: "Bebidas", stock: 173, costo: 9050, precio: 10000 },

    { nombre: "Pepsi 1.5", categoria: "Bebidas", stock: 291, costo: 8500, precio: 10000 },
    { nombre: "Pepsi black 1.5", categoria: "Bebidas", stock: 208, costo: 9050, precio: 10000 },
    { nombre: "Pepsi x2lt recor", categoria: "Bebidas", stock: 97, costo: 11500, precio: 13000 },

    { nombre: "Placer ananá 1.5", categoria: "Verduleria", stock: 217, costo: 4050, precio: 4750 },
    { nombre: "Placer manzana 1.5", categoria: "Verduleria", stock: 344, costo: 4100, precio: 4750 },
    { nombre: "Placer multifruta 1.5", categoria: "Verduleria", stock: 0, costo: 4050, precio: 4750 },
    { nombre: "Placer pera 1.5", categoria: "Verduleria", stock: 0, costo: 4050, precio: 4750 },
    { nombre: "Placer pomelo 1.5", categoria: "Verduleria", stock: 0, costo: 4050, precio: 4750 },

    { nombre: "Salonera patero", categoria: "Bebidas", stock: 0, costo: 9800, precio: 10500 },
    { nombre: "Salonera tinto 1.25", categoria: "Verduleria", stock: 0, costo: 9000, precio: 9500 },

    { nombre: "Schneider 710", categoria: "Bebidas", stock: 0, costo: 45000, precio: 54000 },

    { nombre: "Soda cimes 2lt", categoria: "Bebidas", stock: 0, costo: 4700, precio: 5500 },
    { nombre: "Soda manaos 2lt", categoria: "Bebidas", stock: 0, costo: 5500, precio: 6200 },

    { nombre: "Sprite 1.75 x8", categoria: "Bebidas", stock: 130, costo: 17500, precio: 21000 },
    { nombre: "Sprite 225 x8", categoria: "Bebidas", stock: 4, costo: 23500, precio: 25000 },
    { nombre: "Sprite 2lt cajon", categoria: "Bebidas", stock: 0, costo: 18100, precio: 22000 },

    { nombre: "Stella 1lt cajon", categoria: "Verduleria", stock: 0, costo: 34500, precio: 39000 },

    { nombre: "Uvita blanco seco", categoria: "Bebidas", stock: 0, costo: 14300, precio: 16500 },
    { nombre: "Uvita tinto común", categoria: "Bebidas", stock: 81, costo: 14500, precio: 16500 },
    { nombre: "Uvita tinto dulce", categoria: "Verduleria", stock: 0, costo: 14300, precio: 16500 },

    { nombre: "Villa del Sur agua 225", categoria: "Bebidas", stock: 0, costo: 5400, precio: 6400 },
    { nombre: "Villavicencio agua 1.5", categoria: "Bebidas", stock: 0, costo: 5200, precio: 6200 },
    { nombre: "Villavicencio agua 2lt", categoria: "Bebidas", stock: 0, costo: 6200, precio: 7200 },

    { nombre: "Viña Alvear", categoria: "Bebidas", stock: 74, costo: 10850, precio: 12000 },
  ];

  for (const p of productos) {
  await prisma.producto.create({
    data: {
      nombre: p.nombre,
      stock: p.stock,
      costoUnitario: p.costo.toString(),
      precioUnitario: p.precio.toString(),
      categoriaId: categoriasMap.get(p.categoria) ?? null
    }
  });
}


  console.log("Seed completado con éxito.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
