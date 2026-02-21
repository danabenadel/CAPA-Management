import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import capaRoutes from './routes/capa.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import statsRoutes from './routes/stats.routes.js';
import eventRoutes from './routes/event.routes.js';
import investigationRoutes from './routes/investigation.routes.js';
import riskRoutes from './routes/risk.routes.js';
import commonRoutes from './routes/common.routes.js';

import session from 'express-session';
import { initKeycloak } from './config/keycloak.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup Session Store
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: process.env.SESSION_SECRET || 'some-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Initialize Keycloak
const keycloak = initKeycloak(memoryStore);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(keycloak.middleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/capa', keycloak.protect(), capaRoutes);
app.use('/api/users', keycloak.protect(), userRoutes);
app.use('/api/events', keycloak.protect(), eventRoutes);
app.use('/api/investigations', keycloak.protect(), investigationRoutes);
app.use('/api/risks', keycloak.protect(), riskRoutes);
app.use('/api/common', keycloak.protect(), commonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', keycloak.protect(), statsRoutes);

// Serve static files (uploads)
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'GenericLab CAPA API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health\n`);
});