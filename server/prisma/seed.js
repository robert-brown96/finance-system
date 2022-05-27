const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {
    try {
        const usDollar = await prisma.currency.upsert({
            where: { code: "USD" },
            update: {},
            create: {
                code: "USD"
            }
        });
        console.log("Created a currency", usDollar);
        const primaryBook = await prisma.book.upsert({
            where: { name: "Primary Book" },
            update: {},
            create: {
                name: "Primary Book",
                primaryCurrencyId: usDollar.id
            }
        });
        console.log("Create Primary Book", primaryBook);
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect;
    }
})();
