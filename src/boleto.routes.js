const express = require('express');
const Routes = express.Router();

// 21290001192110001210904475617405975870000002000
// 846100000005246100291102005460339004695895061080

function getData(code, type) {
    const f = require('./'+type);
    var result = {}

    f.verifyDV(code);
    const barCode = f.getBarCode(code);
    if (barCode != null) { result.barCode = barCode }
    const ammount = f.getValue(code);
    if (ammount != null) { result.ammount = ammount }
    const expirationDate = f.getDate(code);
    if (expirationDate != null) { result.expirationDate = expirationDate }

    return result;
}

Routes.get('/boleto/:barCode', (req, res)=>{
    const code = req.params.barCode;

    // verificar se é um código válido
    if (!(code && /^[0-9]+$/.test(code) && ( code.length >= 46 && code.length <= 48) )) {
        return res.status(400).json('Invalid code');
    }

    const type = code[0] === '8' ? 'convenio' : 'titulo'; 

    return res.status(200).json(getData(code, type));

});

module.exports = Routes