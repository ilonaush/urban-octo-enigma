const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const server = express();

server.use(bodyParser.json());

const crossOrigin = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
    res.header('Allow', 'PUT, POST, GET, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.status(200).send('OK')
    } else {
        next()
    }
};

server.use(crossOrigin);

server.get('/', async function (req, res) {
    let workers;
    try {
        workers = await readWorkersFromJson();
    } catch(e) {
        res.status(500).send({status: false});
    }
    res.send({workers: workers});
});

server.post('/add-worker', async function (req, res) {
    let worker = req.body;
    let workers;
    try {
        workers = await readWorkersFromJson();
    } catch(e) {
        res.status(500).send({status: false});
    }
    workers.push(worker);

    try {
        let response = await saveWorkerToJson(workers);
        if (response) {
            res.send({status: true});

        }

    } catch (e) {
        res.status(500).send({status: false});
    }
});

server.patch('/fire-worker', async function (req, res) {
    const {ID} = req.body;
    let workers;
    try {
        workers  = await readWorkersFromJson();
    } catch(e) {
        res.status(500).send({status: false});
    }

    workers = workers.filter((worker) => {
        return worker.id !== parseInt(ID);
    });


    try {
        await saveWorkerToJson(workers);
        res.send({status: true});

    } catch (e) {
        console.log(e);
        res.status(500).send({status: false});
    }
});

server.patch('/edit-time', async function (req, res) {
    const worker = req.body;
    let workers;
    try {
        workers = await readWorkersFromJson();
    }
    catch (e) {
        res.status(500).send({status: false});
    }

    workers = workers.map((item) => {
        if (item.id === worker.id) {
            return {
                ...worker
            }
        }
        else {
            return item;
        }
    });


    try {
        await saveWorkerToJson(workers);
        res.send({status: true});

    } catch (e) {
        res.status(500).send({status: false});
    }
});

server.listen(5000, function () {
    console.log('listening on port 5000!');
});

function saveWorkerToJson(workers) {
    return new Promise ((resolve) => setTimeout(() => {
        fs.writeFile(path.resolve(__dirname, 'data/workers.json'), JSON.stringify(workers, null, 4), (err) => {
            if (err) throw err;
            console.log('saved');
            resolve(true);
        })
    }, 1000));
}

function readWorkersFromJson() {
    return new Promise((resolve) => {
        setTimeout(() => {
            fs.open(path.resolve(__dirname, 'data/workers.json'), 'r' ,function(err, fd){
                if (err) {
                    fs.writeFile(path.resolve(__dirname, 'data/workers.json'), '[]', function(err) {
                        if(err) {
                            console.log(err);
                        }
                    });
                }
                fs.readFile(path.resolve(__dirname, 'data/workers.json'), {encoding: 'utf8', flag: 'a+'}, (err, data) => {
                    if (err) throw err;
                    resolve(JSON.parse(data));
                })
            });
        }, 1000)
    })
}


