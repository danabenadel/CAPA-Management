import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const generateMockData = async (req, res) => {
    console.log('Redistributing CAPAs among all users...');
    try {
        const users = await prisma.user.findMany();
        if (!users || users.length === 0) {
            return res.status(400).json({ error: 'No users found in DB' });
        }

        const capas = await prisma.capa.findMany();

        let updatedCount = 0;
        for (const capa of capas) {
            // Pick a random user
            const randomUser = users[Math.floor(Math.random() * users.length)];

            await prisma.capa.update({
                where: { id: capa.id },
                data: { initiatorUserId: randomUser.id }
            });
            updatedCount++;
        }

        res.json({ success: true, message: 'CAPAs redistributed successfully', count: updatedCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
