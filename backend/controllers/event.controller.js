import prisma from '../config/prisma.js';

export const eventController = {
    // GET all events
    getAll: async (req, res) => {
        try {
            const events = await prisma.qualityEvent.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    reporter: { select: { firstName: true, lastName: true } },
                    initialEvaluation: true
                }
            });
            res.json({ success: true, data: events, count: events.length });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // GET event by ID or Number
    getById: async (req, res) => {
        try {
            const param = req.params.id;
            const query = isNaN(param) ? { eventNumber: param } : { id: parseInt(param) };

            const event = await prisma.qualityEvent.findUnique({
                where: query,
                include: {
                    reporter: { select: { firstName: true, lastName: true } },
                    immediateActions: {
                        include: { responsibleUser: { select: { firstName: true, lastName: true } } }
                    },
                    initialEvaluation: {
                        include: { evaluator: { select: { firstName: true, lastName: true } } }
                    },
                    preliminaryInvestigation: {
                        include: {
                            ishikawaAnalysis: true,
                            identifiedCauses: true,
                            problemSolutions: {
                                include: { responsible: { select: { firstName: true, lastName: true } } }
                            }
                        }
                    },
                    riskAnalysis: true,
                    capa: {
                        include: {
                            initiator: { select: { firstName: true, lastName: true } },
                            actions: {
                                include: { responsibleUser: { select: { firstName: true, lastName: true } } }
                            },
                            effectiveness: true
                        }
                    }
                }
            });

            if (!event) {
                return res.status(404).json({ success: false, error: 'Event not found' });
            }
            res.json({ success: true, data: event });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST create event
    create: async (req, res) => {
        try {
            // Auto-generate Event Number: XXX/MM/YYYY
            // We will look for last event of this month
            const now = new Date();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const year = now.getFullYear();

            const count = await prisma.qualityEvent.count({
                where: {
                    createdAt: {
                        gte: new Date(year, now.getMonth(), 1),
                        lt: new Date(year, now.getMonth() + 1, 1)
                    }
                }
            });

            const sequence = (count + 1).toString().padStart(3, '0');
            const eventNumber = `${sequence}/${month}/${year}`;

            const newEvent = await prisma.qualityEvent.create({
                data: {
                    ...req.body,
                    eventNumber,
                    status: 'CREE',
                    eventDate: req.body.eventDate ? new Date(req.body.eventDate) : new Date()
                }
            });

            res.status(201).json({ success: true, data: newEvent });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // PUT update event
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const updated = await prisma.qualityEvent.update({
                where: { id },
                data: req.body
            });
            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST add immediate action
    addImmediateAction: async (req, res) => {
        try {
            const eventId = parseInt(req.params.id);
            const action = await prisma.immediateAction.create({
                data: {
                    ...req.body,
                    eventId,
                    status: 'EN_ATTENTE'
                }
            });
            res.status(201).json({ success: true, data: action });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST create initial evaluation
    evaluate: async (req, res) => {
        try {
            const eventId = parseInt(req.params.id);
            // Check if exists
            const evaluation = await prisma.initialEvaluation.upsert({
                where: { eventId },
                update: req.body,
                create: {
                    ...req.body,
                    eventId,
                    status: 'EVALUE',
                    evaluationDate: new Date()
                }
            });

            // Update event status
            let eventStatus = 'EN_EVALUATION';
            if (req.body.isAnomaly) eventStatus = 'CLASSE_ANOMALIE';
            if (req.body.isDeviation) eventStatus = 'CLASSE_DEVIATION';

            await prisma.qualityEvent.update({
                where: { id: eventId },
                data: { status: eventStatus }
            });

            res.json({ success: true, data: evaluation });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST create/start investigation
    createInvestigation: async (req, res) => {
        try {
            const eventId = parseInt(req.params.id);
            const investigation = await prisma.preliminaryInvestigation.create({
                data: {
                    ...req.body,
                    eventId,
                    status: 'EN_COURS',
                    createdAt: new Date()
                }
            });

            res.status(201).json({ success: true, data: investigation });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST add Ishikawa cause
    addIshikawaCause: async (req, res) => {
        try {
            const investigationId = parseInt(req.params.invId);
            const cause = await prisma.ishikawaAnalysis.create({
                data: {
                    ...req.body,
                    investigationId
                }
            });
            res.status(201).json({ success: true, data: cause });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // DELETE delete Ishikawa cause
    deleteIshikawaCause: async (req, res) => {
        try {
            const causeId = parseInt(req.params.causeId);
            await prisma.ishikawaAnalysis.delete({
                where: { id: causeId }
            });
            res.json({ success: true, message: 'Cause deleted' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST identify root cause
    identifyRootCause: async (req, res) => {
        try {
            const investigationId = parseInt(req.params.invId);
            const cause = await prisma.identifiedCause.create({
                data: {
                    ...req.body,
                    investigationId
                }
            });
            res.status(201).json({ success: true, data: cause });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // DELETE remove identified root cause
    removeIdentifiedCause: async (req, res) => {
        try {
            const causeId = parseInt(req.params.causeId);
            await prisma.identifiedCause.delete({
                where: { id: causeId }
            });
            res.json({ success: true, message: 'Root cause removed' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // SOLUTIONS
    addSolution: async (req, res) => {
        try {
            const investigationId = parseInt(req.params.invId);
            const solution = await prisma.problemSolution.create({
                data: {
                    ...req.body,
                    investigationId,
                    status: 'PLANIFIEE',
                    createdAt: new Date()
                }
            });
            res.status(201).json({ success: true, data: solution });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    updateSolution: async (req, res) => {
        try {
            const solutionId = parseInt(req.params.solId);
            const solution = await prisma.problemSolution.update({
                where: { id: solutionId },
                data: req.body
            });
            res.json({ success: true, data: solution });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteSolution: async (req, res) => {
        try {
            const solutionId = parseInt(req.params.solId);
            await prisma.problemSolution.delete({
                where: { id: solutionId }
            });
            res.json({ success: true, message: 'Solution deleted' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // CLOSE INVESTIGATION
    closeInvestigation: async (req, res) => {
        try {
            const investigationId = parseInt(req.params.invId);

            // Validate that we have at least one root cause and one solution? 
            // Optional business logic, but good for validation workflow.
            const investigation = await prisma.preliminaryInvestigation.findUnique({
                where: { id: investigationId },
                include: { identifiedCauses: true, problemSolutions: true }
            });

            if (!investigation) return res.status(404).json({ success: false, error: 'Investigation not found' });

            if (investigation.identifiedCauses.length === 0) {
                return res.status(400).json({ success: false, error: 'Cannot close: No root causes identified.' });
            }

            // Update status
            const updated = await prisma.preliminaryInvestigation.update({
                where: { id: investigationId },
                data: {
                    status: 'TERMINEE',
                    completionDate: new Date(),
                    isTerminated: true
                }
            });

            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // -------------------------------------------------------------------------
    // CAPA METHODS
    // -------------------------------------------------------------------------

    initCapa: async (req, res) => {
        try {
            const eventId = parseInt(req.params.id);
            const { initiatorUserId } = req.body;

            // Check if exists
            const existing = await prisma.capa.findUnique({ where: { eventId } });
            if (existing) return res.status(400).json({ success: false, error: 'CAPA already exists' });

            // Generate Number (Simple logic)
            const count = await prisma.capa.count();
            const year = new Date().getFullYear();
            const capaNumber = `CAPA-${year}-${String(count + 1).padStart(3, '0')}`;

            const capa = await prisma.capa.create({
                data: {
                    eventId,
                    capaNumber,
                    initiationDate: new Date(),
                    initiatorUserId: initiatorUserId || 1, // Default to admin if missing
                    status: 'CREE'
                }
            });

            res.status(201).json({ success: true, data: capa });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    addCapaAction: async (req, res) => {
        try {
            const capaId = parseInt(req.params.capaId);
            const action = await prisma.capaAction.create({
                data: {
                    ...req.body,
                    capaId,
                    status: 'PLANIFIEE'
                }
            });
            // Update total actions count
            await prisma.capa.update({
                where: { id: capaId },
                data: { totalActions: { increment: 1 } }
            });

            res.status(201).json({ success: true, data: action });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    updateCapaAction: async (req, res) => {
        try {
            const actionId = parseInt(req.params.actionId);
            const action = await prisma.capaAction.update({
                where: { id: actionId },
                data: req.body
            });
            res.json({ success: true, data: action });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteCapaAction: async (req, res) => {
        try {
            const actionId = parseInt(req.params.actionId);
            const action = await prisma.capaAction.findUnique({ where: { id: actionId } });

            await prisma.capaAction.delete({ where: { id: actionId } });

            if (action) {
                await prisma.capa.update({
                    where: { id: action.capaId },
                    data: { totalActions: { decrement: 1 } }
                });
            }

            res.json({ success: true, message: 'Action deleted' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    saveCapaEffectiveness: async (req, res) => {
        try {
            const capaId = parseInt(req.params.capaId);

            // Upsert effectiveness record
            const effectiveness = await prisma.capaEffectiveness.upsert({
                where: { capaId },
                update: req.body,
                create: {
                    ...req.body,
                    capaId,
                    status: 'EN_ATTENTE'
                }
            });

            // Update CAPA status if needed (e.g. to EN_ATTENTE_EFFICACITE)
            await prisma.capa.update({
                where: { id: capaId },
                data: { status: 'EN_ATTENTE_EFFICACITE' }
            });

            res.json({ success: true, data: effectiveness });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    closeCapa: async (req, res) => {
        try {
            const capaId = parseInt(req.params.capaId);
            const { closureNotes, closedByUserId } = req.body;

            // Check if effectiveness is effective
            const effectiveness = await prisma.capaEffectiveness.findUnique({ where: { capaId } });
            if (!effectiveness || !effectiveness.isEffective) {
                // Warning but allow closure? Or block?
                // For now, let's just proceed but maybe we should ensure it's effective.
            }

            const capa = await prisma.capa.update({
                where: { id: capaId },
                data: {
                    status: 'CLOTURE',
                    closureDate: new Date(),
                    closureNotes,
                    closedByUserId
                }
            });

            res.json({ success: true, data: capa });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
