import prisma from '../config/prisma.js';

export const riskController = {
    // GET all risk analyses
    getAll: async (req, res) => {
        try {
            const risks = await prisma.riskAnalysis.findMany({
                orderBy: { id: 'desc' },
                include: {
                    qualityEvent: { select: { eventNumber: true } }
                }
            });
            res.json({ success: true, data: risks });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // GET risk analysis by ID
    getById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const risk = await prisma.riskAnalysis.findUnique({
                where: { id },
                include: {
                    qualityEvent: true,
                    evaluationItems: true,
                    approver: { select: { firstName: true, lastName: true } }
                }
            });

            if (!risk) {
                return res.status(404).json({ success: false, error: 'Risk Analysis not found' });
            }
            res.json({ success: true, data: risk });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST create risk analysis
    create: async (req, res) => {
        try {
            const { eventId, ...data } = req.body;
            const newRisk = await prisma.riskAnalysis.create({
                data: {
                    ...data,
                    eventId,
                    status: 'EN_COURS'
                }
            });
            res.status(201).json({ success: true, data: newRisk });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // PUT update risk analysis
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const updated = await prisma.riskAnalysis.update({
                where: { id },
                data: req.body
            });
            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST add Evaluation Item (Calculates Criticality)
    addItem: async (req, res) => {
        try {
            const riskAnalysisId = parseInt(req.params.id);
            const { probabilityScore, detectabilityScore, gravityScore } = req.body;

            const criticalityScore = probabilityScore * detectabilityScore * gravityScore;

            let criticalityLevel = 'ACCEPTABLE';
            if (criticalityScore >= 16) criticalityLevel = 'INDESIRABLE';
            if (criticalityScore >= 33) criticalityLevel = 'INACCEPTABLE';

            const item = await prisma.riskEvaluationItem.create({
                data: {
                    ...req.body,
                    riskAnalysisId,
                    criticalityScore,
                    criticalityLevel
                }
            });

            res.status(201).json({ success: true, data: item });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
