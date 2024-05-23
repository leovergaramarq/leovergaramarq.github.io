import express from "express";
import path from "path";

const app = express();
app.set("port", process.env.PORT || 3000);

const __dirname = process.cwd();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "src")));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'src', 'html'));
// });

export default app;
