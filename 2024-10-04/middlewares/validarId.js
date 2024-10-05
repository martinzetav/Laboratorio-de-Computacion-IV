// middleware para verificar id
const validarId = (req, res, next) =>{
    const id = Number(req.params.id);
    // Verificar que id este presente (no es necesario porque ya lo hace express)
    // Verificar que id sea un numero
    if(isNaN(id)){
        return res.status(400).json({mensaje: "id no es un numero"});
    }
    // Verificar que id sea un numero entero
    if(!Number.isInteger(id)){
        return res.status(400).json({mensaje: "id no es un numero entero"});
    }
    // Verificar que id sea un numero positivo
    if(id <= 0){
        return res.status(400).json({mensaje: "id no es un numero positivo"});
    }

    next();
}

export default validarId;