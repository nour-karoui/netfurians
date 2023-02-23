import express, { Request, Response } from 'express';
import * as crypto from "crypto";

const cors = require('cors');
const app = express();
const port = 3030;

const numberOfNefturians = 1240;

const assignNefturian = (accountAddress: string) => {
    if (!/^[0-9a-fA-F]{40}$/.test(accountAddress)) {
        throw new Error('Invalid creature hexadecimal string');
    }
    const creatureBuffer = Buffer.from(accountAddress, 'hex');
    const hashBuffer = crypto.createHash('sha256').update(creatureBuffer).digest();
    const hashBigInt = BigInt(`0x${hashBuffer.toString('hex')}`);
    return Number(hashBigInt % BigInt(numberOfNefturians));
}

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "append,delete,entries,foreach,get,has,keys,set,values,Authorization");
    next();
});

app
    .use(express.json())
    .use(cors())
    .use(express.urlencoded())
    .post('/', (req: Request, res: Response) => {
        console.log('assigning hero');
        const nefturianResult = assignNefturian(req.body.accountAddress.slice(2));
        res.send({heroIndex: nefturianResult});
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});