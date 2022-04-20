const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/db');

// const verifyUser = require('../config/verify');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM user_login ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts',
                data: rows
            })
        }
    });
});

/**
 * STORE POST
 */
router.post('/store', [

    //validation
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('email').notEmpty(),
    body('role').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        user: req.body.username,
        pass: req.body.password,
        em: req.body.email,
        rol: req.body.role
    }

    // insert query
    connection.query('INSERT INTO user_login SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW POST
 */
router.get('/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`SELECT * FROM user_login WHERE id = ${id}`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found!',
            })
        }
        // if post found
        else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post',
                data: rows[0]
            })
        }
    })
});

/**
 * UPDATE POST
 */
router.patch('/update/:id', [

    //validation
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('email').notEmpty(),
    body('role').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id post
    let id = req.params.id;

    //data post
    let formData = {
        user: req.body.username,
        pass: req.body.password,
        em: req.body.email,
        rol: req.body.role
    }

    // update query
    connection.query(`UPDATE user_login SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })

});

module.exports = router;