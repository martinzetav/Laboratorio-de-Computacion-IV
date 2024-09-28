import express from "express";
import cors from "cors";
import tareasRoutes from "./routes/tareas.js";
import { conectarDB } from "./db.js";

// Conectar a DB
conectarDB();
console.log("Conectado a base de datos");


const app = express();
const PORT = 3000;

// Interpretar JSON en body
app.use(express.json());
// Habilitar cors
app.use(cors());

app.use("/tareas", tareasRoutes);

app.get("/", (req, res)=>{
    res.send("Hola Mundo");
})


app.listen(PORT, (err) =>{
    console.log(
        err
        ? "Se produjo un error al levantar el servidor"
        : `Servidor levantado en http://localhost:${PORT}`
    );
})