const bd = require("./../utils/bd");

const getAll = () => bd("usuarios").select("*");

const getSingle = (id) =>
    bd("usuarios")
        .where({ id })
        .select("id", "nombre", "apellido", "correo", "habilitado");

const create = (obj) => bd("usuarios").insert(obj);

const modify = (id, obj) => bd("usuarios").where({ id }).update(obj);

const confirm = (uid, obj) => bd("usuarios").where({ uidcorreo : uid}).update(obj);

// Row data
module.exports = { getAll, getSingle , create, modify, confirm };
