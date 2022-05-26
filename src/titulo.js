function getDate(code) {
    const refDate = new Date('1997-10-07');
    const days = code.substr(-14,4);
    const finalDate = new Date(refDate.getTime() + (days * 86400000))
    return [
        ('0'+finalDate.getFullYear()).substr(-4,4),
        ('0'+(finalDate.getMonth()+1)).substr(-2,2),
        ('0'+(finalDate.getDate()+1)).substr(-2,2),
    ].join('-');
}

function getValue(code) {
    const value = parseInt(code.substr(-10,8)) + '.' + code.substr(-2,2);
    return value;
}

function getBarCode(code) {
    return (
        code.substr(0, 4) +
        code.substr(32, 1) +
        code.substr(33, 14) +
        code.substr(4, 5) +
        code.substr(10, 10) +
        code.substr(21, 10)
    );
}


module.exports = {
    getDate,
    getValue,
    getBarCode
}
