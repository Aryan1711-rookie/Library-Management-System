import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
import cors from "cors";
import env from "dotenv";
import gemini from "./routes/geminiRoute.js";
import resources from "./routes/resource.route.js";
import catalog from "./routes/catalog.route.js";

env.config();

// Recreate __dirname for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const corsOptions = {
  origin: [
    "https://dhsgsu-library.onrender.com", // no trailing slash
    "http://localhost:5173",               // allow local dev
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionSuccessStatus: 200,
 
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/gemini", gemini);
app.use("/api/v1/resources", resources);
app.use("/api/v1/catalog", catalog);

app.get("/api", (req, res) => {
  res.send("API is running 🚀");
});

// Serve frontend (after build)
// app.use(express.static(path.join(__dirname, "frontend/dist")));

// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
