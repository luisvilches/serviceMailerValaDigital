const express = require('express');
const bodyParser = require('body-parser')
const NodeMailer = require('nodemailer');
const fs = require('fs')

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/send', (req,res) => {

    let remitente = req.body.mail
    let telefono = req.body.telefono
    let nombre = req.body.name
    let asunto = req.body.asunto
    let mensaje = req.body.mensaje

    let template = '<section>'+'<br><h3>Mensaje desde el formulario de contacto!!</h3><br>'+
                    '<h4><b>Remitente: </b>'+nombre+' < '+remitente+ '> </h4><br>'+
                    '<h4><b>Telefono: </b>'+telefono+'</h4><br>'+
                    '<h4><b>Asunto: </b>'+asunto+'</h4><br>'+
                    '<h4><b>Mensaje:</b></h4>'+
                    '<hr>'+
                    '<h4>'+mensaje+'</h4>'+
                    '</section>';


    let mailOptions = {
        from: remitente,
        to: 'luis@dowhile.cl, laura@dowhile.cl',
        subject: 'Formulario de contacto web',
        html: template
    };

    let smtpConfig = {
        host: 'mail.dowhile.cl',
        port: 587,
        tls: {
            rejectUnauthorized:false
        },
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: 'info@dowhile.cl',
            pass: 'd0wh1l3' 
        }
    };

    let transporter = NodeMailer.createTransport(smtpConfig);

    transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, error.message);
    } else {
        console.log("Email sent");
        res.status(200).send(info);
    }
});
})

app.get('/test', (req,res) => {
    fs.appendFileSync('message.js', `Router.post('/app', controller.dowhile.dowhile); \n`);
})

app.listen(3000);