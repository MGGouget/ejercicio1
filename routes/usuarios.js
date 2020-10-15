const express = require("express");
const { response } = require("../app");
const router = express.Router();
const service = require("./../models/usuarios");


/*const { } = require("./");
const { } = require("./");
*/
const all = (req, res) =>
    service
        .getAll()
        .then((response) => res.json(response))
        .catch((e) => res.status(500).json(e))

const single = (req, res) =>
    service
        .getSingle(req.params.id)
        .then((response) => res.json(response))
        .catch((e) => res.status(500).json(e));

const create = (req, res) =>
    service
        .create(req.body)
        .then((response) => res.json(response))
        .catch((e) => res.status(500).json(e));

const modify = (req, res) => {
    service
        .modify(req.params.id, req.body)
        .then((response) => res.json(response))
        .catch((e) => res.json(e));
};

router.get("/all", all);
router.get("/single/:id", single);
router.post("/create", create);
router.put("/modify/:id", modify);
module.exports = router;
