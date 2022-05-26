function dvCalc(arr) {
    let value =  arr.reduce((acc, e, i)=>{
        let newValue = (parseInt(e)*((i+1)%2==1?2:1));
        newValue = newValue >= 10 ? newValue.toString().split('').reduce((acc2, e2)=> parseInt(acc2)+parseInt(e2)):newValue;
        return parseInt(acc)+parseInt(newValue);
    });
    return 10-value%10;
}

function dacCalc(arr) {
    let range = [2,3,4,5,6,7,8,9]
    arr = arr.reverse();
    let value =  arr.reduce((acc, e, i)=>{
        let newValue = (parseInt(e)*(range[(i)%range.length]));
        return parseInt(acc)+parseInt(newValue);
    });
    return value%11;
}

function verifyDV(code) {
    code = getBarCode(code);
    const dv = code[3];
    code = code.substr(0,3)+code.substr(4);
    if (dvCalc(('00'+code).split('')) != dv) {
        throw new Error('Invalid DV!'+dv+dvCalc(('00'+code).split('')));
    }
    // aparentemente não é necessário
    // if(dacCalc(code.split('')) != dv) {
    //     throw new Error('Invalid DAC!');
    // }
}

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
    getBarCode,
    verifyDV
}