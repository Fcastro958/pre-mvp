const express = require('express');
const app = express();
const port = 3000;
const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'pre_mvp',
    password: 'docker',
    port: 5432,
});
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});
//get all passengers 
app.get('/passengers', (req, res)=>{
    async function getPassengers(){
        try{
            const result = await pool.query('SELECT * FROM passengers');
            console.log(result);
            res.send(result.rows);
        } catch(e) {
            console.error(e.stack);
        }
    }
    getPassengers();
});
// get all cruises
app.get('/cruises', (req, res)=>{
    async function getCruises(){
        try{
            const result = await pool.query('SELECT * FROM cruise');
            console.log(result);
            res.send(result.rows);
        } catch(e) {
            console.error(e.stack);
        }
    }
    getCruises();
});
//get passengers by id
app.get('/passengers/:id', (req, res)=>{
    async function getPassengers(){
        try{
            const result = await pool.query(`SELECT * FROM passengers WHERE passenger_id = ${req.params.id}`);
            res.send(result.rows);
        } catch(e) {
            console.error(e.stack);
        }
    }
    getPassengers();
});
// get cruise by id 
app.get('/cruises/:id', (req, res)=>{
    async function getPassengers(){
        try{
            const result = await pool.query(`SELECT * FROM cruise WHERE id = ${req.params.id}`);
            res.send(result.rows);
        } catch(e) {
            console.error(e.stack);
        }
    }
    getPassengers();
});

app.delete('/passenger/:id',(req, res)=>{
    async function deletePassenger(){
        try{
            const result = await pool.query(`DELETE FROM passengers WHERE passenger_id = ${req.params.id}`);
            res.status(200).send('passenger selected has been deleted');
        } catch (e) {
            console.error(e.stack);
        }
    }
    deletePassenger();
});
//need work
app.delete('/cruise/:id',(req, res)=>{
    async function deleteCruise(){
        try{
            const result = await pool.query(`DELETE FROM cruise WHERE id = ${req.params.id}`);
            res.status(200).send('cruise selected has been deleted');
        } catch (e) {
            console.error(e.stack);
        }
    }
    deleteCruise();
});


app.post('/passenger', (req, res)=>{
    async function createPassenger() {
        try{
            let passengers = req.body;
            let name = passengers.name;
            let age = passengers.age;
            let cruise_id = passengers.cruise_id;
            const result = await pool.query(`INSERT INTO passengers (name, age, cruise_id) VALUES ('${name}', ${age}, ${cruise_id})`);
            res.status(201).send('Your passenger was created');
        } catch (e) {
            console.error(e.stack);
        }
    }
    createPassenger();
});

app.post('/cruise', (req, res)=>{
    async function createCruise() {
        try{
            let cruise = req.body;
            let name = cruise.name;
            const result = await pool.query(`INSERT INTO cruise (name) VALUES ('${name}')`);
            res.status(201).send('Your cruise was created');
        } catch (e) {
            console.error(e.stack);
        }
    }
    createCruise();
});

app.patch('/passenger/:id', (req, res)=>{
    async function updatePassenger() {
        try{
            let passenger =req.body;
            let name = passenger.name;
            let age = passenger.age;
            let cruise_id = passenger.cruise_id;
            const result = await pool.query(`UPDATE passengers SET name='${name}', age=${age}, cruise_id=${cruise_id}  WHERE passenger_id =${req.params.id}`);
            res.status(202).send('Your passenger was updated');
        } catch (e) {
            console.error(e.stack);
        }
    }
    updatePassenger();
});

app.patch('/cruise/:id', (req, res)=>{
    async function updateCruise() {
        try{
            let cruise =req.body;
            let name = cruise.name;
            const result = await pool.query(`UPDATE cruise SET name='${name}' WHERE cruise_id =${req.params.id}`);
            res.status(202).send('Your cruise was updated');
        } catch (e) {
            console.error(e.stack);
        }
    }
    updateCruise();
});


app.listen(port, () => {
    console.log(` listening on port ${port}`);
});