import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const generateMockData = async (req, res) => {
    console.log('Generating additional mock users...');
    try {
        const roles = await prisma.role.findMany();
        if (!roles || roles.length === 0) {
            return res.status(400).json({ error: 'No roles found in DB' });
        }

        const departments = await prisma.department.findMany();
        if (!departments || departments.length === 0) {
            return res.status(400).json({ error: 'No departments found in DB' });
        }

        const firstNames = ['Lucas', 'Emma', 'Hugo', 'Chloé', 'Léo', 'Manon', 'Louis', 'Jade', 'Gabriel', 'Louise', 'Arthur', 'Alice', 'Jules', 'Lina', 'Maël', 'Léa', 'Adam', 'Mila', 'Paul', 'Ambre'];
        const lastNames = ['Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David', 'Bertrand', 'Morel', 'Fournier', 'Girard'];
        const passwordHash = '$2b$10$EpIs@lT...'; // Using a hardcoded placeholder hash since it's mock data
        let createdCount = 0;

        for (let i = 0; i < 20; i++) {
            const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
            const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
            const randomRole = roles[Math.floor(Math.random() * roles.length)];
            const randomDept = departments[Math.floor(Math.random() * departments.length)];

            await prisma.user.create({
                data: {
                    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@genericlab.com`,
                    username: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}`,
                    firstName: fn,
                    lastName: ln,
                    passwordHash: passwordHash,
                    isActive: Math.random() > 0.2, // 80% active
                    roleId: randomRole.id,
                    departmentId: randomDept.id
                }
            });
            createdCount++;
        }

        res.json({ success: true, message: 'Mock users generated successfully', count: createdCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
