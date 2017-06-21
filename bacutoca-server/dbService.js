var Promise = require("bluebird");
var sqlite3 = require('sqlite3').verbose();


var get = function (query, params) {
    return new Promise(function (resolve, reject) {
        openDb().then(function (database) {
            database.get(query, params, function (err, result) {
                if (err) {
                    return reject(err);
                }
                database.close();
                resolve(result);
            });
        });
    });
};

var all = function (query, params) {
    return new Promise(function (resolve, reject) {
        openDb().then(function (database) {
            database.all(query, params, function (err, results) {
                if (err) {
                    return reject(err);
                }
                database.close();
                resolve(results);
            });
        });
    });
};

var run = function (query, params) {
    console.log("executing query: " + query);
    return new Promise(function (resolve, reject) {
        openDb().then(function (database) {
            database.run(query, params, function (err) {
                if (err) {
                    return reject(err);
                }
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
    run: run,
    all: all
};