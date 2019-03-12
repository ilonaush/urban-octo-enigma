const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const server = express();
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const delay = time => new Promise(res=> setTimeout(res,time));

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
        const cats = await readDataFromJson();
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
    try {
        const cats = await readDataFromJson();
        cats.push(cat);
        const response = await saveDataToJson(cats);
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
        let cats  = await readDataFromJson();
        cats = cats.filter((cats) => {
            return cats.id !== parseInt(ID);
        });

        await saveDataToJson(cats);
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
        let cats = await readDataFromJson();
        cats = cats.map((item) => {
            if (item.id === cat.id) {
                return cat;

            }
            else {
                return item;
            }
        });
        await saveDataToJson(cats);
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
        let cats = await readDataFromJson();
        cats = cats.map((item) => {
            if (item.id === cat.id) {
                return cat;
            }
            else {
                return item;
            }
        });
        await saveDataToJson(cats);
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
        let cats = await readDataFromJson();
        cats = cats.map((item) => {
            if (item.id === cat.id) {
                return cat;
            }
            else {
                return item;
            }
        });
        await saveDataToJson(cats);
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
 * @param data
 * @returns {Promise<boolean>}
 */
async function saveDataToJson(data) {
    try {
        await writeFile(path.resolve(__dirname, 'data/cats.json'), JSON.stringify(data, null, 4));
        await delay(1000);
        return true;
    }
    catch (err) {
        throw err;
    }
}

/**
 * gets data from json
 * @returns {Promise<any>}
 */
async function readDataFromJson() {
    if (!fs.existsSync(path.resolve(__dirname, 'data/cats.json'))) {
        writeFile(path.resolve(__dirname, 'data/cats.json'), '[]')
    }
    try {
        const data = await readFile(path.resolve(__dirname, 'data/cats.json'), {encoding: 'utf8', flag: 'a+'});
        await delay(1000);
        return JSON.parse(data);
    }
    catch (err) {
        throw err;
    }
}



