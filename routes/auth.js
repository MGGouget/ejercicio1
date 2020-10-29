const express = require("express");
const router = express.Router();
const fs = require("fs"); //file system
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const privateKey = fs.readFileSync("./keys/private.pem");
const service = require("./../models/auth");
const { send } = require("./../services/mail");
const signOptions = { algorithm: "RS256", expiresIn: "1h" };

const createToken = (payload) => jwt.sign(payload, privateKey, signOptions);

const auth = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const [user] = await service.authenticate(correo, sha1(password));
        
        if (!user) res.sendStatus(401);//no coincide la pass, sale 
       
        const token = createToken({ id: user.id });   //creo el token 
   
        if (!user.habilitado) { //envio en la url para habilitar la cuenta 
            const html = `<a href= ${process.env.URL_CONFIRM}?token=${token}&uid=${user.uidCorreo}> Click para confirmar tu cuenta </a>`
            const messageId = await send({
            to: user.correo,
            subject: "Gracias por registrarte",
            html: html,});
            res.status(401).json({ message: "Confirmá tu cuenta par seguir" });
          }    
        if (user.habilitado) {
            //esta habilitado muestro el mail 
            res.json({ message: `bienvenido ${user.correo}`, JWT: token, info: { correo: user.correo, id: user.id }});
         
        }
    
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

router.post("/", auth);

module.exports = router;
