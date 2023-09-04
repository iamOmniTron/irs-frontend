import { TIME } from "./defaults";

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

export const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});