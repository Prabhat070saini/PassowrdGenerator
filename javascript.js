const inputslider = document.querySelector("[data-slider]");
const lengthdisplay = document.querySelector("[number-change]");
const passworddisplay = document.querySelector("[data-show]");
const copybtn = document.querySelector("[cpbtn]");
const copyMsg = document.querySelector("[data-massage]");
const uppercheck = document.querySelector("#uppercase");
const lowerchecker = document.querySelector("#lowercase");
const Numbercheckers = document.querySelector("#Numbers");
const symbolechecker = document.querySelector("#symbole");
const dataindicator = document.querySelector(".indicator");
const generateBtn = document.querySelector("[btngntare]");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#~`$%^&*()_+{}][|\/?.,<.";

let password = "";
let passwordlength = 10;
let checkcount = 0;

// setIndicator("#ccc");
// ---------------------Sufful password-------------------------function------------------------
let = suffalPasswored = (a) => {


    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    return a.join("");

}

// Function to handle slider and its number ________________________---------------------------------
let handleSlider = () => {
    inputslider.value = passwordlength;
    lengthdisplay.innerText = passwordlength;
    // for make some parrt different color and some different
    const min = inputslider.min;
    const max = inputslider.max;
    // console.log(max);
    // important
    // console.log(min);
    inputslider.style.backgroundSize = ((passwordlength - min) * 100 / (max - min)) + "% 100%"
}
handleSlider();
// ---------------------Function to Genrarte Interger nukmber between range-----------------------------
let randonInteger = (min, max) => {
    let n = Math.random();
    return min + Math.floor(n * (max - min));
}
//------------------Funtion to set indicator-----------------------------------------\
let setIndicator = (color) => {
    dataindicator.style.backgroundColor = color;
    dataindicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}
setIndicator("#ccc");
// -----------------------Function to Genrate random number-------------------------------
let genrateNumber = () => {
    return randonInteger(0, 9);
}
// ---------------------------funtion to genratea lowerchecker_______________----------------------
let genrateLowerCase = () => {
    return String.fromCharCode(randonInteger(97, 123));
}
// ---------------------------funtion to genratea upper case_______________----------------------
let genrateUpperCase = () => {
    return String.fromCharCode(randonInteger(65, 91));
}
// ---------------------------funtion to genratea symbol_______________----------------------
let genrateSymbol = () => {
    const randum = randonInteger(0, symbols.length);
    return symbols.charAt(randum);
}
// console.log(genrateSymbol());
// ----------------------Copy Function---------------------------------------------------
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passworddisplay.value);
        copyMsg.innerHTML = "copied";
    }
    catch (e) {
        copyMsg.innerHTML = "failed";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 1000);
}
// -------------------Calculate Strength function--------------------------------------------
let calcStrength = () => {
    let hasUpper = false;
    let hasLower = false;
    let hasaNum = false;
    let hasSym = false;
    if (uppercheck.checked) hasUpper = true;
    if (lowerchecker.checked) hasLower = true;
    if (Numbercheckers.checked) hasaNum = true;
    if (symbolechecker.checked) hasSym = true;
    if (hasUpper && hasLower && hasaNum && hasSym && passwordlength >= 8) {
        setIndicator("#40f55b");
    }
    else if ((hasLower || hasUpper) && (hasaNum || hasSym) && (passwordlength) >= 6) {
        setIndicator("yellow");
    } else {
        setIndicator("#f72a2a")
    }

}
inputslider.addEventListener('input', (e) => {
    passwordlength = e.target.value;
    handleSlider();
});
copybtn.addEventListener('click', () => {
    if (passworddisplay.value)
        copyContent();
});
// copybtn.addEventListener('click', copyContent());
let handleCheckBoxChagne = () => {
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) checkcount++;
    });
    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleSlider();
    }
}
allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChagne);
});
generateBtn.addEventListener('click', () => {
    password = "";
    if (checkcount <= 0) {
        passwordlength = 10;
        passworddisplay.value = "";
        handleSlider();
        return;
    }
    let funAr = [];
    if (uppercheck.checked) funAr.push(genrateUpperCase);
    if (lowerchecker.checked) funAr.push(genrateLowerCase);
    if (Numbercheckers.checked) funAr.push(genrateNumber);
    if (symbolechecker.checked) funAr.push(genrateSymbol);
    // compulsory addition 
    for (let i = 0; i < funAr.length; i++) {
        password += funAr[i]();
    }
    // remaining lengh 
    for (let i = 0; i < passwordlength - funAr.length; i++) {
        let randindex = randonInteger(0, funAr.length);
        password += funAr[randindex]();
    }
    // ?sufful password
    password = suffalPasswored(Array.from(password));



    // show ui
    passworddisplay.value = password;
    calcStrength();
});