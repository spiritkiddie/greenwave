const express = require('express');
const router = express.Router();

const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');


const Model = require('../models/helpers');
const Config = require('../config/config');

let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        return callback(null, path.join(__dirname, '../fileCVs/'));
    },
    filename: function(req, file, callback) {
        let extention = file.originalname.split('.').pop();
        return callback(null, req.body.firstname + '-' + req.body.lastname + '-' + (Math.random()*500).toFixed(0) + '.' + extention.toLowerCase());
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function ( req, file, callback ) {
        Model.checkFileType(file, callback);
    }
}).single('cv');

//nodemailer
let transporter = nodemailer.createTransport({
    service: 'Godaddy',
    host: 'imap.secureserver.net',  
    //secure: true,
    port: 143,
    auth: {
        user: Config.SMTP_HOST_USERNAME,
        pass: Config.SMTP_HOST_PASSWORD
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: true
    }
});


router.get('/about', (req, res) =>{
    res.render('about');
});

router.get('/services', (req, res) =>{
    res.render('services');
});

router.get('/portfolio', (req, res) =>{
    res.render('portfolio');
});

router.get('/contact', (req, res) =>{
    res.render('contact');
});

router.post('/contact', (req, res) =>{
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let subject =  req.body.subject;
    let message  = req.body.message;

    const mailOptions = {
        from     : `GreenWave Contact Us <${(email).trim()}>`,
        to       : Config.SMTP_HOST_EMAIL2,
        subject  : `${(message).trim()}`,
        //template : 'confirm_email',
        html  : `
                <p>Sender Fullname ${(fullname).trim()} </p>
                <p>Sender Mobile ${(mobile).trim()} </p>
                <p>Subject ${(subject).trim()} </p>
                <p> Senders Message<br> ${(message).trim()}</p>
                <p>Thanks</p>
        `,
    };

    transporter.sendMail(mailOptions, (err, result) =>{
        if (err) {
            console.log(err);
            req.flash('error_msg', 'Your Email was\'nt Delivered! Please Try Again!');
            res.redirect('/route/contact');
        } else {
            req.flash('success_msg', 'Your Email is successfully Delivered!');
            res.redirect('/route/contact');
        }
    });

});

router.get('/apply', (req, res) =>{
    res.render('apply');
});

router.post('/apply', (req, res) =>{
    
    upload(req, res, (err) => {
        if (err) {

            // console.log(err)
            let fileLarge = (err.code === 'LIMIT_FILE_SIZE') ? 'Please File is Too Large, file should be 1mb or less' : err;
           
            req.flash('error_msg', fileLarge)
            res.redirect('/route/apply');
        } else {

            let cv = req.file;
            let firstname = req.body.firstname.toUpperCase();
            let lastname = req.body.lastname.toUpperCase();
            let email = req.body.email;

            const mailOptions = {
                from     : `GreenWave Send CV Portal <${email}>`,
                to       : Config.SMTP_HOST_EMAIL1,
                subject  : 'JOB CV',
                //template : 'confirm_email',
                attachments: [
                    {   // file on disk as an attachment
                        filename: `${cv.filename}`,
                        path: `${cv.path}` // stream this file
                    }
                ],
                html  : `
                        <p>Hello Please i am ${firstname} ${lastname} </p>
                        <p> Please find the attached file as my CV for review</p>
                        <p>Thanks</p>
                `,
            };

            transporter.sendMail(mailOptions, (err, result) => { 
                if (err) { 
                    console.log(err);
                    req.flash('error_msg', 'Your Email was\'nt Delivered! Please Try Again!');
                    res.redirect('/route/apply');
                }else { 
                    req.flash('success_msg', 'Your Email is successfully Delivered!');
                    res.redirect('/route/apply');
                } 
            });
            
        }
    });
});

module.exports = router;