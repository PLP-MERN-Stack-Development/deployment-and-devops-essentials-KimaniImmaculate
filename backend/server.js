// server.js
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});


dotenv.config()

console.log('MONGO_URI:', process.env.MONGO_URI)  // for debugging


const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan('combined')) // logs requests

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Performance Monitoring Middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    // Log slow requests (over 500ms)
    if (duration > 500) {
      console.warn(
        `Slow request: ${req.method} ${req.originalUrl} - ${duration}ms`
      );
    }
  });

  next();
});

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

app.use(Sentry.Handlers.errorHandler());

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

