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
            update: { primaryCurrencyId: usDollar.id },
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
            { name: "Accounts Payable", category: "LIABILITY" },
            { name: "Other Current Liability", category: "LIABILITY" },
            { name: "Long Term Liability", category: "LIABILITY" },
            { name: "Credit Card", category: "LIABILITY", isExternal: true },
            { name: "Retained Earnings", category: "EQUITY" },
            { name: "Equity", category: "EQUITY" }
        ];
        defaultAccountTypes.forEach(
            async a =>
                await prisma.accountType.upsert({
                    where: { name: a.name },
                    update: {
                        category: a.category,
                        isExternal: a.isExternal ? a.isExternal : false
                    },
                    create: a
                })
        );
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect;
    }
})();
