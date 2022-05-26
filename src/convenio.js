function getValue(code) {
    code = getBarCode(code);
    if ( ['6', '8'].includes(code[2]) ) {
        return parseInt(code.substr(4,8))+'.'+code.substr(12,2);
    }
    return null
}

function getDate(code) {
    code = getBarCode(code);
    if ( parseInt(code.substr(23,4)) >= 1997 &&
            parseInt(code.substr(27,2)) >= 1 && parseInt(code.substr(27,2)) <= 12 &&
            parseInt(code.substr(29,2)) >= 1 && parseInt(code.substr(29,2)) <= 31 ) {
        return code.substr(23,4)+'-'+code.substr(27,2)+'-'+code.substr(29,2);
    } else if ( parseInt(code.substr(19,4)) >= 1997 &&
            parseInt(code.substr(23,2)) >= 1 && parseInt(code.substr(23,2) ) <= 12 &&
            parseInt(code.substr(25,2)) >= 1 && parseInt(code.substr(25,2)) <= 31 ) {
        return code.substr(19,4)+'-'+code.substr(23,2)+'-'+code.substr(25,2);
    }
    return null;
}

function getBarCode(code) {
    return (
        code.substr(0,11)+
        code.substr(12,11)+
        code.substr(24,11)+
        code.substr(36,11)
    );
}

module.exports = {
    getDate,
    getValue,
    getBarCode
}