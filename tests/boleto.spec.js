const convenio = require('../src/convenio');
const titulo = require('../src/titulo');

// convenio

test('should get convenio bar code', () => { 
    expect(convenio.getBarCode('816800000000010936599702420220707039001433708318')).toBe(
        "81680000000010936599704202207070300143370831"
    );
});

test('should get convenio ammount', () => { 
    expect(convenio.getValue('816800000000010936599702420220707039001433708318')).toBe(
        "0.10"
    );
});

test('should get convenio expiration date', () => { 
    expect(convenio.getDate('816800000000010936599702420220707039001433708318')).toBe(
        "2022-07-07"
    );
});

// titulo

test('should get titulo bar code', () => { 
    expect(titulo.getBarCode('21290001192110001210904475617405975870000002000')).toBe(
        "21299758700000020000001121100012100447561740"
    );
});

test('should get titulo ammount', () => { 
    expect(titulo.getValue('21290001192110001210904475617405975870000002000')).toBe(
        "20.00"
    );
});

test('should get titulo expiration date', () => { 
    expect(titulo.getDate('21290001192110001210904475617405975870000002000')).toBe(
        "2018-07-16"
    );
});