import { NAIRA, TIME } from "./defaults";
import {ToWords} from "to-words";
import * as jose from "jose";


const NOT_SECRET="-irs-test-secret-";

export const formatCurrency = (amount) => new Intl.NumberFormat().format(amount);

export const getPercentageAmount = (amount,percentage)=>((percentage/100)*amount);

export const serializeObjectToUrlParams = (obj)=>{
    return new URLSearchParams(obj).toString();
}

export const scrollToTop = ()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}

export const extractValueFromInputRef = (ref)=> ref.current.input.value;



export const getUpperBoundAGTO = (turnover)=>{
    const gto = turnover.toLowerCase();
    if(gto.includes("below")){
        let parts = gto.split("below");
        return parts[parts.length -1].trim();
    }
    if(gto.includes("above")){
        let parts = gto.split("above");
        return parts[parts.length -1].trim();
    }
    
}

export const extractNumberFromWord = (word)=>{
    let num = [];
    for(const w of word){
        if(w === " " || isNaN(w)) continue;
        num.push(w);
    }
    return Number(num.toString().replaceAll(",",""));
}



export const getAmountToPay = (gto,percent,duration)=>{
    const yearlyAmount = getPercentageAmount(gto,percent);
    let time;
    switch (duration) {
        case "WEEKLY":
            time = TIME.WEEK;
            break;
        case "MONTHLY":
            time = TIME.MONTH;
            break;
        case "QUATERLY":
            time = TIME.QUATER;
            break;
        case "BI-ANNUALLY":
            time = TIME["BI-ANNUAL"];
            break;
        case "YEARLY":
            time = TIME.ANNUAL;
            break;
        default:
            time = TIME.ANNUAL;
            break;
    }
    const amountToPay = Math.ceil(yearlyAmount/time);
    return amountToPay;
}


export const getPercentageRatio = (amount,total)=>{
    let numerator = amount * 100;
    return Math.round(numerator/total);
}

/**
 * 
 * @param {Array} x Array of items to be sorted
 * @param {Function} f The grouping function
 * @returns Object
 */
export const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});


export const convertToWords = (number)=>{
    const num = Number(number);
    const toWords = new ToWords({
        localeCode:"en-NG",
        converterOptions:{
            currency:true,
            currencyOptions:{
                name: 'Naira',
                plural: 'Naira',
                symbol: NAIRA,
            }
        }
    })
    return toWords.convert(num,{currency:true})
}



export const encryptData = async(data)=>{
    if(typeof data !== "string"){
        data = JSON.stringify(data);
    };
    const token = await new jose.EncryptJWT({data:true}).setExpirationTime("2h").sign(NOT_SECRET);
    console.log(token)
    return token;
};



// export const decryptToken = (token)=>{
//     return verify(token,NOT_SECRET);
// }