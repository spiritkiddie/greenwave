const express = require('express');
const router = express.Router();

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
})

module.exports = router;