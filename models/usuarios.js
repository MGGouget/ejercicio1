const bd = require("./../utils/bd");
const dbService = require("../utils/dbServices");

const getAll = () => bd("usuarios").select("*");

const getSingle = (id) =>
    bd("usuarios")
        .where({ id, habilitado: true })
        .select("id", "nombre", "apellido", "correo");



const create = (obj) => dbService.create("usuarios", obj);
const modify = (id, obj) => bd("usuarios").where({ id }).update(obj);
// Row data
module.exports = { getAll, getSingle , create, modify };
