const bd = require("./bd");

const create = (tableName, obj) => db(tableName).insert(obj);

const modify = (tableName, obj, conditions) =>
    db(tableName).where(conditions).insert(obj);

module.exports = { create, modify }; 