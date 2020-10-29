const bd = require("./../utils/bd");

const authenticate = (correo, password) =>
    bd("usuarios")
        .where({ correo, password })
        .select("id", "correo", "habilitado", "uidCorreo");


module.exports = { authenticate };