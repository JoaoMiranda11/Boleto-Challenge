const express = require('express');
const app = express();

const port = 3333;
const Routes = express.Router();

app.use(express.json());
app.use(Routes);

function codeDecrypt(code) {
    let result = { barCode : code };
    if (code[0] === '8') {
        //89610000000599800010110533320100626000015744
        let [ expirationDate, ammount ] = [
            code.slice(26,35),
            (parseInt(code.slice(5,15))*parseInt(code[2]) / 100).toFixed(2),
        ]

        expirationDate = expirationDate.slice(1,5) + '-' + expirationDate.slice(5,7) + '-' + expirationDate.slice(7,9);
        result = { ...result, expirationDate, ammount };
    } else {
        //21299758700000020010001121100012100447561740
        let [ expirationDate, ammount ] = [
            parseInt(code.slice(5,9)),
            (parseInt(code.slice(9,19)) / 100).toFixed(2),
        ]
        let expiration = ( (new Date('1997', '10', 7 + expirationDate )) );
        expirationDate = expiration.getFullYear() + "-" + ('0'+expiration.getMonth()).slice(-2) + "-" + expiration.getDate() ;
        result = { ...result, ammount, expirationDate };
    }
    return [200, result];
}

function verifyCode(code) {
    if (code && /^[0-9]+$/.test(code) && (code.length === 44)) {
        return codeDecrypt(code);
    }
    return [400, 'Invalid Input'];
}

Routes.get('/boleto/:barCode', (req, res)=>{
    const barCode = req.params.barCode;

    const [status, data] = verifyCode(barCode);

    return res.status(status).json(data);
});

app.listen(port, ()=> console.log('Server up on port '+port));