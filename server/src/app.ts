import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoute from "./routes/ai";
import newsRoute from "./routes/news";
import savedArticlesRouter from './routes/savedArticles';

dotenv.config();

const app = express();

// FIXED: Add your Vercel frontend URL to CORS
app.use(cors({
  origin: [
    'http://localhost:3000',  // Local development
    'https://smart-news-summarizer-mern-gemini.vercel.app',  // Your Vercel frontend
    'https://smart-news-summarizer-mern-gemini.onrender.com',  // Your Render backend (self-reference)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Id', 'X-Session-Id'],
}));

app.use(express.json());

// Add a root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Smart News Summarizer API is running",
    frontend: "https://smart-news-summarizer-mern-gemini.vercel.app",
    endpoints: {
      news: "/api/news",
      ai: "/api/ai",
      saved: "/api/saved",
      health: "/api/health"
    }
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "smart-news-summarizer-api",
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use("/api/ai", aiRoute);
app.use("/api/news", newsRoute);
app.use('/api/saved', savedArticlesRouter);

export default app;