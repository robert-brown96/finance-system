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
        const primaryBook = await prisma.book.upsert({
            where: { name: "Primary Book" },
            update: {},
            create: {
                name: "Primary Book",
                primaryCurrencyId: usDollar.id
            }
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect;
    }
})();
