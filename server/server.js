const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const server = express();

server.use(bodyParser.json());

/**
 * handler for cross origin requesting
 * @param req request
 * @param res response
 * @param next next request
 */
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

const port = 5000;

server.use(crossOrigin);


/**
 * handler for get request; gives all workers
 */
server.get('/', async function (req, res) {
    try {
        const cats = await readWorkersFromJson();
        res.send(cats);
    } catch(e) {
        res.status(500).send({status: false});
    }
});

/**
 * handler for post request for adding new worker
 */
server.post('/add-cat', async function (req, res) {
    const cat = req.body;
    console.log(cat);
    try {
        const cats = await readWorkersFromJson();
        cats.push(cat);
        const response = await saveWorkerToJson(cats);
        if (response) {
            res.send({status: true, cats: cats});
        }
    } catch(e) {
        res.status(500).send({status: false});
    }
});

/**
 * handler for patch request for firing a worker
 */
server.patch('/issue-cat', async function (req, res) {
    const {ID} = req.body;
    try {
        let cats  = await readWorkersFromJson();
        cats = cats.filter((cats) => {
            return cats.id !== parseInt(ID);
        });

        await saveWorkerToJson(cats);
        res.send({status: true, cats});

    } catch(e) {
        res.status(500).send({status: false});
    }
});


/**
 * handler for patch request for changing time of either arriving or leaving of a worker
 */
server.patch('/feed-cat', async function (req, res) {
    const cat = req.body;
    try {
        let cats = await readWorkersFromJson();
        cats = cats.map((item) => {
            if (item.id === cat.id) {
                return {
                    ...cat
                }
            }
            else {
                return item;
            }
        });
        await saveWorkerToJson(cats);
        res.send({status: true, cats});
    }
    catch (e) {
        res.status(500).send({status: false});
    }
});

/**
 * handler for patch request for changing time of either arriving or leaving of a worker
 */
server.patch('/hug-cat', async function (req, res) {
    const cat = req.body;
    try {
        let cats = await readWorkersFromJson();
        cats = cats.map((item) => {
            if (item.id === cat.id) {
                return {
                    ...cat
                }
            }
            else {
                return item;
            }
        });
        await saveWorkerToJson(cats);
        res.send({status: true, cats});
    }
    catch (e) {
        res.status(500).send({status: false});
    }
});

/**
 * handler for patch request for changing time of either arriving or leaving of a worker
 */
server.patch('/wash-cat', async function (req, res) {
    const cat = req.body;
    try {
        let cats = await readWorkersFromJson();
        cats = cats.map((item) => {
            if (item.id === cat.id) {
                return {
                    ...cat
                }
            }
            else {
                return item;
            }
        });
        await saveWorkerToJson(cats);
        res.send({status: true, cats});
    }
    catch (e) {
        res.status(500).send({status: false});
    }
});

server.listen(port, function () {
    console.log(`listening on port ${port}!`);
});

/**
 * saves modified json file with workers
 * @param workers
 * @returns {Promise<any>}
 */
function saveWorkerToJson(workers) {
    return new Promise ((resolve) => setTimeout(() => {
        fs.writeFile(path.resolve(__dirname, 'data/cats.json'), JSON.stringify(workers, null, 4), (err) => {
            if (err) throw err;
            resolve(true);
        })
    }, 1000));
}

/**
 * gets workers data from json
 * @returns {Promise<any>}
 */
function readWorkersFromJson() {
    return new Promise((resolve) => {
        setTimeout(() => {
            fs.open(path.resolve(__dirname, 'data/cats.json'), 'r' ,function(err, fd){
                if (err) {
                    fs.writeFile(path.resolve(__dirname, 'data/cats.json'), '[]', function(err) {
                        if(err) {
                            console.log(err);
                        }
                    });
                }
                fs.readFile(path.resolve(__dirname, 'data/cats.json'), {encoding: 'utf8', flag: 'a+'}, (err, data) => {
                    if (err) throw err;
                    resolve(JSON.parse(data));
                })
            });
        }, 1000)
    })
}


