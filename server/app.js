const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// create
app.post('/insert', (request, response) => {
    console.log(request.body)
    const { firstname, lastname, salary, isceo, ismanager, managerid } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(firstname, lastname, salary, isceo, ismanager, managerid);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// read CEOs
app.get('/getAllCeo', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllCeo();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id, firstname, isceo, ismanager} = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, firstname, isceo, ismanager);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});


app.listen(process.env.PORT, () => console.log('app is running'));