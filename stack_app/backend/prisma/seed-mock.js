import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Generating fake Quality Events and CAPAs...');

    // Get a user to act as reporter/initiator
    const user = await prisma.user.findFirst();
    if (!user) {
        console.log('No users found in database. Run `npx prisma db seed` first.');
        return;
    }

    // Generate 3 Fake Events
    const events = [];
    for (let i = 1; i <= 3; i++) {
        const event = await prisma.qualityEvent.create({
            data: {
                eventNumber: `EV-${new Date().getFullYear()}-${String(i).padStart(3, '0')}`,
                eventDate: new Date(),
                detectionTime: new Date(),
                reporterUserId: user.id,
                reporterRole: 'Opérateur',
                problemDescription: `Description du problème factice numéro ${i}. Il s'agit d'une anomalie détectée lors du processus de fabrication.`,
                problemLocation: `Ligne de production ${i}`,
                affectedProduct: `Produit Test ${String.fromCharCode(64 + i)}`,
                status: i === 1 ? 'EN_EVALUATION' : (i === 2 ? 'CLASSE_DEVIATION' : 'CREE'),
                anomalyTiming: 'JOUR'
            }
        });
        events.push(event);
        console.log(`Created Event: ${event.eventNumber}`);

        // If event is DEVITATION, let's create a CAPA for it
        if (i === 2) {
            const capa = await prisma.capa.create({
                data: {
                    capaNumber: `CAPA-${new Date().getFullYear()}-001`,
                    eventId: event.id,
                    initiationDate: new Date(),
                    initiatorUserId: user.id,
                    openingReason: 'Déviation majeure nécessitant une action corrective.',
                    status: 'EN_COURS',
                    totalActions: 2,
                    completedActions: 0
                }
            });
            console.log(`Created CAPA: ${capa.capaNumber} attached to ${event.eventNumber}`);

            // Add actions to CAPA
            await prisma.capaAction.create({
                data: {
                    capaId: capa.id,
                    actionReference: 'ACT-01',
                    actionDescription: 'Mise à jour de la procédure de contrôle.',
                    actionType: 'CORRECTIVE',
                    plannedClosureDate: new Date(new Date().setDate(new Date().getDate() + 15)),
                    responsibleUserId: user.id,
                    status: 'EN_COURS'
                }
            });

            await prisma.capaAction.create({
                data: {
                    capaId: capa.id,
                    actionReference: 'ACT-02',
                    actionDescription: 'Formation des opérateurs sur la nouvelle procédure.',
                    actionType: 'PREVENTIVE',
                    plannedClosureDate: new Date(new Date().setDate(new Date().getDate() + 30)),
                    responsibleUserId: user.id,
                    status: 'PLANIFIEE'
                }
            });
            console.log('Created 2 Actions for CAPA');
        }

        // Create an investigation for event 1
        if (i === 1) {
            await prisma.preliminaryInvestigation.create({
                data: {
                    eventId: event.id,
                    whatProblem: 'Défaut visuel sur le produit',
                    whereProblem: 'Atelier de conditionnement',
                    whenProblem: 'Pendant le changement de lot',
                    whoProblem: 'Equipe de matin',
                    factsStatement: 'Plusieurs flacons présentaient des rayures.',
                    investigatorUserId: user.id,
                    status: 'EN_COURS'
                }
            });
            console.log(`Created Investigation for ${event.eventNumber}`);
        }
    }

    console.log('Fake data generation complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
