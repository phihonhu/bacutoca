var Promise = require("bluebird");
var sqlite3 = require('sqlite3').verbose();


var get = function (query, params) {
    var user = {};
    return new Promise(function (resolve, reject) {
        openDb().then(function (database) {
            database.get(query, params, function (err, user) {
                database.close();
                resolve(user);
            });
        });
    });
};

var run = function (query, params) {
    var user = {};
    return new Promise(function (resolve, reject) {
        openDb().then(function (database) {
            database.run(query, params, function () {
                database.close();
                resolve(this);
            });
        });
    });
};

function openDb() {
    console.log("connect db");
    return new Promise(function (resolve, reject) {
        var database = new sqlite3.Database('./db.sqlite');
        resolve(database);
    });
}

module.exports = {
    get: get,
    run: run
};