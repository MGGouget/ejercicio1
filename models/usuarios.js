const bd = require("./../utils/bd");

const getAll = () => bd("usuarios").select("*");

const getSingle = (id) =>
    bd("usuarios")
        .where({ id })
        .select("id", "nombre", "apellido", "correo");



const create = (obj) => bd("usuarios").insert(obj);
const modify = (id, obj) => bd("usuarios").where({ id }).update(obj);
// Row data
module.exports = { getAll, getSingle , create, modify };
