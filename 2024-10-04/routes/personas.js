import express from "express";
const router = express.Router();
import {db} from "../db.js";
import validarId from "../middlewares/validarId.js";
import validarPersona from "../middlewares/validarPersona.js";

// CONSULTAR POR TODAS LAS PERSONAS
router.get("/", async (req, res)=>{
    const filtros = [];
    const parametros = []

    // edad_gt: edades mayores a 
    const edad_gt = req.query.edad_gt;
    if(edad_gt != undefined){
        filtros.push("edad > ?")
        parametros.push(edad_gt);
    }
        
    // edad_gt: edades menores a 
    const edad_lt = req.query.edad_lt;
    if(edad_lt != undefined){
        filtros.push("edad < ?")
        parametros.push(edad_lt);
    }

    // edad_gt: edades mayores a 
    const altura_gt = req.query.altura_gt;
    if(altura_gt != undefined){
        filtros.push("altura > ?")
        parametros.push(altura_gt);
    }
        
    // edad_gt: edades menores a 
    const altura_lt = req.query.altura_lt;
    if(altura_lt != undefined){
        filtros.push("altura < ?")
        parametros.push(altura_lt);
    }

    let sql = "SELECT * FROM personas";
    if(filtros.length > 0){
        sql += ` WHERE ${filtros.join(" and ")}`
    }

    console.log(sql);
    const [personas] = await db.execute(sql, parametros);
    res.json({personas});
});


// CONSULTA POR UNA PERSONA
router.get("/:id", validarId, async (req, res)=>{
    const id = Number(req.params.id);

    // Verificar que id sea un numero positivo
    const sql = "SELECT * FROM personas WHERE id = ?";
    const [personas] = await db.execute(sql, [id]);
    if(personas.length === 0){
        return res.status(204).json();
    }else{
        return res.json({persona: personas[0]});
    }
})

router.post("/", validarPersona, async(req, res)=>{
    // const {descripcion, completada} = req.body;

    // const [result] = await db.execute("INSERT INTO personas (descripcion, completada) VALUES(?, ?)", [descripcion, completada]);

    // return res.status(201).json({persona:{id: result.insertId, descripcion, completada}});
    res.json("Persona creada");
})

// MODIFICAR PERSONA
router.put("/:id", validarId, async(req, res)=>{
    const {id} = req.params;
    const {descripcion, completada} = req.body;

    await db.execute("UPDATE personas SET descripcion=?, completada=? WHERE id=?", [descripcion, completada, id]);
    res.json({persona: {id: parseInt(id), descripcion, completada}});
})

// ELIIMNAR PERSONA
router.delete("/:id", validarId, async(req, res)=>{
    const {id} = req.params;
    await db.execute("DELETE FROM personas WHERE id=?", [id]);
    res.json({id: parseInt(id)});
})

router.delete("")
export default router;