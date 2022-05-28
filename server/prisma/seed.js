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
        const defaultAccountTypes = [
            { name: "Bank", isExternal: true, category: "ASSET" },
            { name: "Brokerage", isExternal: true, category: "ASSET" },
            { name: "Accounts Receivable", category: "ASSET" },
            { name: "Other Current Asset", category: "ASSET" },
            { name: "Long Term Asset", category: "ASSET" },
            {name:'Accounts Payable',category:'LIABILITY'}
        ];
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect;
    }
})();
