"use strict";

/** @type {(selector: string) => HTMLInputElement} */
const $ = (selector) => document.querySelector(selector);

const str = (s) => String(s);
const prt = (p) => console.log(p);

prt("test")

const exceptions = [
    "",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion"
];
const prefixes = [
    "",
    "un",
    "duo",
    "tre",
    "quattuor",
    "quin",
    "sex",
    "septen",
    "octo",
    "novem"
];
const suffixes = [
    "decillion",
    "vigintillion",
    "trigintillion",
    "quadragintillion",
    "quinquagintillion",
    "sexagintillion",
    "septuagintillion",
    "octogintillion",
    "nonagintillion"
];

function getNumberName(n) {
    let exp = Number(n.toExponential().split("e")[1]);

    if (exp < 6){
        return str(Number(n.toFixed(3)))
    };

    let num = Number(n.toExponential().split("e")[0]);
    let numFixed = Number((num * 10 ** (exp % 3)).toFixed(3));
    if (numFixed == 1000){
        numFixed = 1;
        exp += 3;
    };
    let quotient = Math.floor(exp/3)-1;

    if ((exp < 33) && (exp > 5)) {
        return str(numFixed + " " +exceptions[quotient])
    }else if (exp < 303){
        const Indexes = Math.floor((exp - 3) / 3).toString();
        let prefix;
        let suffix;
        let finalNumber;
        switch (exp){
            case 243:
            case 244:
            case 245: {
                return numFixed + " octagintillion";
            } 
        
            default: {
                prefix = prefixes[Number(Indexes[1])];
                suffix = suffixes[Number(Indexes[0])-1];
                finalNumber = str(numFixed) + " " + prefix + suffix;
                finalNumber = finalNumber.replace("oo", "ao");
                return finalNumber
            }
        }
        
    }else{
        return str(Infinity)
    };

};


document.getElementById('form1').addEventListener("submit",(e) => {
    e.preventDefault();
    let HTMLvalue = $('#number-form').value;
    $('#result-number').innerText = getNumberName(Number(HTMLvalue));
});