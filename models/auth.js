const bd = require("./../utils/bd");

const authenticate = (usuario, password) =>
    bd("usuarios")
        .where({ usuario, password })
        .select("id", "correo", "habilitado");


module.exports = { authenticate };