const Joi = require("@hapi/joi");
const messageNombre = {
  "any.required": "El campo nombre es obligatorio",
  "string.min": "El campo debe tener al menos 2 caracteres",
  "string.max": "El campo nombre no debe superar 30 caracteres",
};
const messageApellido = {
  "any.required": "El campo nombre es obligatorio",
  "string.min": "El campo debe tener al menos 2 caracteres",
  "string.max": "El campo nombre no debe superar 30 caracteres",
};


const schemas = {
  create: Joi.object().keys({
    nombre: Joi.string().min(2).max(30).required().messages(messageNombre),
    apellido: Joi.string().min(2).max(30).required().messages(messageApellido),
    correo: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  modify: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    nombre: Joi.string().min(2).max(30).optional(),
    apellido: Joi.string().optional(),
    correo: Joi.string().email().optional(),
    password: Joi.string().optional(),
  }),
};

module.exports = { schemas };
