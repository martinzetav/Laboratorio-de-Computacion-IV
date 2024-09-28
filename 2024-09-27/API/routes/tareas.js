import express from "express";
const router = express.Router();
import {db} from "../db.js";

router.get("/", async (req, res)=>{
    const [tareas] = await db.execute("SELECT * FROM tareas");
    res.json({tareas});
});

router.get("/:id", async (req, res)=>{
    const {id} = req.params;
    // forma no segura ya que se puede inyectar consultas sql y se pueden eliminar datod de la bd
    // const sql = `SELECT * FROM tareas WHERE id = ${id}`;
    // Forma correcta, con parametro ? que es de mysql
    const sql = "SELECT * FROM tareas WHERE id = ?";
    const [tareas] = await db.execute(sql, [id]);
    if(tareas.length === 0){
        return res.status(204).json();
    }else{
        return res.json({tarea: tareas[0]});
    }
})

router.post("/", async(req, res)=>{
    const {descripcion, completada} = req.body;

    const [result] = await db.execute("INSERT INTO tareas (descripcion, completada) VALUES(?, ?)", [descripcion, completada]);

    return res.status(201).json({tarea:{id: result.insertId, descripcion, completada}});
})

router.put("/:id", async(req, res)=>{
    const {id} = req.params;
    const {descripcion, completada} = req.body;

    await db.execute("UPDATE tareas SET descripcion=?, completada=? WHERE id=?", [descripcion, completada, id]);
    res.json({tarea: {id: parseInt(id), descripcion, completada}});
})

router.delete("/:id", async(req, res)=>{
    const {id} = req.params;
    await db.execute("DELETE FROM tareas WHERE id=?", [id]);
    res.json({id: parseInt(id)});
})

router.delete("")
export default router;