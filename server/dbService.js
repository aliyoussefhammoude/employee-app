const mysql = require('mysql');
const dotenv = require('dotenv');
// const { response } = require('express');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});



class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM employe;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }



    async getAllCeo() {

        function myGeeks(str) {
            var matches = str.replace(/\D/g, "");
            return matches
        }


        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT isceo FROM employe;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results); 
                })
            });
            
            console.log(myGeeks(JSON.stringify(response)))
            return myGeeks(JSON.stringify(response));
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(firstname, lastname, salary, isceo, ismanager, managerid) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO employe (firstname, lastname, salary, isceo, ismanager, managerid) VALUES (?,?,?,?,?,?);";

                connection.query(query, [firstname, lastname, salary, isceo, ismanager, managerid] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            console.log(insertId)
            // console.log(response)
           return {
                id : insertId,
                firstname : firstname,
                lastname : lastname,
                salary : salary,
                isceo : isceo,
                ismanager : ismanager,
                managerid : managerid
           };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM employe WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, firstname, isceo, ismanager) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE employe SET firstname = ?, isceo = ?, ismanager = ? WHERE id = ?";
    
                connection.query(query, [firstname, isceo, ismanager, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

module.exports = DbService;