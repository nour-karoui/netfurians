import express, { Request, Response } from 'express';
import * as crypto from "crypto";

const app = express();
const port = 3000;

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
app
    .use(express.json())
    .use(express.urlencoded())
    .post('/', (req: Request, res: Response) => {

    const nefturianResult = assignNefturian(req.body.accountAddress.slice(2));
    res.send({heroIndex: nefturianResult});
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});