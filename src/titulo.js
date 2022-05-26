function dvCalc(arr) {
    arr[0] = arr[0]*2;
    let value =  arr.reduce((acc, e, i)=>{
        let newValue = (parseInt(e)*((i+1)%2==1?2:1));
        newValue = newValue >= 10 ? newValue.toString().split('').reduce((acc2, e2)=> parseInt(acc2)+parseInt(e2)):newValue;
        return parseInt(acc)+parseInt(newValue);
    });
    value = (((parseInt((value)/10)+1)*10) - value%10 )%10;
    return value;
}

function verifyDV(code) {
    const dv1 = code[9];
    const dv2 = code[20];
    const dv3 = code[31];

    if (dvCalc(code.substr(0,9).split('')) != dv1) {
        throw new Error('Invalid DV1! '+dv1+dvCalc(code.substr(0,9).split('')));
    }
    if (dvCalc(('0'+code.substr(10,10)).split('')) != dv2) {
        throw new Error('Invalid DV22!');
    }
    if (dvCalc(('0'+code.substr(21,10)).split('')) != dv3) {
        throw new Error('Invalid DV3!');
    }
}

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
    getBarCode,
    verifyDV
}
