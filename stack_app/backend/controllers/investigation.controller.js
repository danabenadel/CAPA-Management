import prisma from '../config/prisma.js';

export const investigationController = {
    // GET all investigations
    getAll: async (req, res) => {
        try {
            const investigations = await prisma.preliminaryInvestigation.findMany({
                orderBy: { id: 'desc' },
                include: {
                    qualityEvent: { select: { eventNumber: true } },
                    investigator: { select: { firstName: true, lastName: true } }
                }
            });
            res.json({ success: true, data: investigations });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // GET investigation by ID or Event ID (common query)
    getById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const investigation = await prisma.preliminaryInvestigation.findUnique({
                where: { id },
                include: {
                    qualityEvent: true,
                    investigator: { select: { firstName: true, lastName: true } },
                    ishikawaAnalysis: true,
                    identifiedCauses: true,
                    problemSolutions: true
                }
            });

            if (!investigation) {
                return res.status(404).json({ success: false, error: 'Investigation not found' });
            }
            res.json({ success: true, data: investigation });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST create investigation
    create: async (req, res) => {
        try {
            const { eventId, ...data } = req.body;
            const newInv = await prisma.preliminaryInvestigation.create({
                data: {
                    ...data,
                    eventId,
                    status: 'EN_COURS'
                }
            });
            res.status(201).json({ success: true, data: newInv });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // PUT update investigation (Common update)
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const updated = await prisma.preliminaryInvestigation.update({
                where: { id },
                data: req.body
            });
            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST add Ishikawa items
    addIshikawa: async (req, res) => {
        try {
            const investigationId = parseInt(req.params.id);
            const item = await prisma.ishikawaAnalysis.create({
                data: {
                    ...req.body,
                    investigationId
                }
            });
            res.status(201).json({ success: true, data: item });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST add Identified Cause
    addCause: async (req, res) => {
        try {
            const investigationId = parseInt(req.params.id);
            const item = await prisma.identifiedCause.create({
                data: {
                    ...req.body,
                    investigationId
                }
            });
            res.status(201).json({ success: true, data: item });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
