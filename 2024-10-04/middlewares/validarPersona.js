// middleware para verificar datos de persona
const validarPersona = (req, res, next) =>{
    // Validar nombre
    const nombre = req.body.nombre; 
    // Validar que nombre este presente
    if(nombre == undefined){
        return res.status(400).json({mensaje: "El nombre es requerido"});
    }

    // Validar que nombre sea un string
    if(typeof nombre !== "string"){
        return res.status(400).json({mensaje: "El nombre no es un texto"});
    }

    // Validar que nombre tenga entre 1 y 50 caracteres.
    if(nombre.length < 1 || nombre.length > 50){
        return res.status(400).json({mensaje: "El nombre tiene que tener entre 1 y 50 caracteres"});
    }

    // Validar apellido
    // Validar edad
    const edad = req.body.edad;
    // Validar que edad este presente
    if(edad == undefined){
        return res.status(400).json({mensaje: "La edad es requerido"});
    }

    // Validar que nombre sea un string
    if(typeof edad !== "number"){
        return res.status(400).json({mensaje: "La edad no es un numero"});
    }

    // Verificar que la edad sea un numero entero
    if(!Number.isInteger(edad)){
        return res.status(400).json({mensaje: "La edad no es un numero entero"});
    }

    // Validar que nombre tenga entre 1 y 50 caracteres.
    if(edad <= 0){
        return res.status(400).json({mensaje: "La edad no es positiva"});
    }
    // Validar peso
    // Validar altura
    // Validar fecha_nac
    const fechaNacimiento = new Date(req.body.fechaNacimiento);
    if(isNaN(fechaNacimiento.getDate())){
        return res.status(400).json({mensaje: "La fecha de nacimiento no es valida"});
    }
    if(fechaNacimiento > new Date()){
        return res.status(400).json({mensaje: "La fecha de nacimiento no puede ser posterior a hoy"});
    }

    next();
}

export default validarPersona;