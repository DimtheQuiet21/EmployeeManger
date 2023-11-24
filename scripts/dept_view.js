const db = require('../server.js');
const express = require('express');
const mysql = require('mysql2');

function dept_view () {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
      });
}

module.exports = {dept_view}