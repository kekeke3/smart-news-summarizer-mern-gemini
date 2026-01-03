import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoute from "./routes/ai";
import newsRoute from "./routes/news";
import savedArticlesRouter from './routes/savedArticles';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoute);
app.use("/api/news", newsRoute);
app.use('/api/saved', savedArticlesRouter); // Add this line

export default app;
