const express = require("express");
const router = express.Router();
const fs = require("fs"); //file system
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const privateKey = fs.readFileSync("./keys/private.pem");
const service = require("./../models/auth");
// npmjs.com
const signOptions = { algorithm: "RS256", expiresIn: "1h" };

const createToken = (payload) => jwt.sign(payload, privateKey, signOptions);

const auth = async (req, res) => {
    try {
        const { correo, password } = req.body;
        // pastelito1
        const [user] = await service.authenticate(correo, sha1(password));
        console.log(user);
        if (!user) res.sendStatus(401);
        if (!user.habilitado)
            res.status(401).json({ message: "Confirmá tu cuenta par seguir :O 🎤" });
        if (user.habilitado) {
            const token = createToken({ id: user.id });
            console.log(token);
            res.json({ JWT: token, info: { correo, nickname: "Pedro" } });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

router.post("/", auth);

module.exports = router;
