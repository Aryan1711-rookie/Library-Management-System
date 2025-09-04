import express from "express";
import path from "path";
import cors from "cors";
import env from 'dotenv';
import gemini from "./routes/geminiRoute.js"
import resources from "./routes/resource.route.js"
import catalog from "./routes/catalog.route.js"
env.config({});
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const corsOptions = {
    origin: ["https://dhsgsu-library.onrender.com/"],
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use('/api/v1',gemini);
app.use('/api/v1',resources);
app.use('/api/v1',catalog);
app.get("/", (req, res) => {
    res.send("API is running");
  });

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
});
const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`)
})
