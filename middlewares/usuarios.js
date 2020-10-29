const { schemas } = require("./schemas/usuarios");
const { v4: uuid } = require('uuid')
const sha1 = require("sha1");

const validateCreate = (req, res, next) => {
    try {
        const uuidValor = uuid();
        const {nombre, apellido, correo, password} = req.body;
        req.body = { nombre, apellido, correo, password: sha1(password), uidCorreo: uuidValor };
        next();
    } catch (e) {
      res.status(422).json({ error: error.details[0].message });
    }
  };
  
module.exports = { validateCreate };
