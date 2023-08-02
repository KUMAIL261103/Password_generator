const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copying]");
const uppercaseCheck = document.querySelector("#check1");
const lowercaseCheck = document.querySelector("#check2");
const numberCheck = document.querySelector("#check3");
const symbolCheck = document.querySelector("#check4");
const indicator = document.querySelector(".indi");
const generateBtn = document.querySelector(".Generateit");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
let password ="";
let passwordLength = 10;
 
 
let checkCount = 0;
let symbols = "!()_`@~<>/;?:#'$%^*&+=";
handleSlider();
// calculateStrength();
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    
}
function setIndicator(color){
    indicator.style.backgroundColor= color;
    indicator.style.boxShadow = `0 0 0.8vw ${color}`;
}
function getRandomInteger(min,max){
     return Math.floor(Math.random()*(max-min))+min;
}
function getRandomNumber(){
    return getRandomInteger(0,9);
}
function getRandomLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function getRandomUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function getRandomSymbol(){
    return (symbols.charAt(getRandomInteger(0,symbols.length)));
}
function calculateStrength(){
    
    let hasUpper = (uppercaseCheck.checked ? 1 : 0);
    let hasLower = (lowercaseCheck.checked ? 1 : 0);
    let hasNum = (numberCheck.checked ? 1 : 0);
    let hasSym = (symbolCheck.checked ? 1 : 0);

    if(hasUpper && hasSym && hasNum && passwordLength>=8  ){
        setIndicator("green");
        
    }else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength>=8 ){
        setIndicator("white");
    }else{
        setIndicator("red");
    }

}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText ="copied";
    }
    catch(e){
        copyMsg.innerText="failed";

    }
    copyMsg.classList.add("active");
    setTimeout(() =>{
        copyMsg.classList.remove("active");

    },2000);
    
}
inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',() =>{
    if(passwordDisplay.value){
        copyContent();
    }
})
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckbox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

generateBtn.addEventListener('click',() =>{
    
    if(checkCount<=0){
        return;
    }
    if(passwordLength <checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    password="";
    // if(uppercaseCheck.checked){
    //     password +=getRandomUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=getRandomLowerCase();
    // }if(numberCheck.checked){
    //     password+=getRandomNumber();
    // }
    // if(symbolCheck.checked){
    //     password+=getRandomSymbol();
    // }
    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(getRandomUpperCase);
    }
     if(lowercaseCheck.checked){
        funcArr.push(getRandomLowerCase);
    }
     if(numberCheck.checked){
        funcArr.push(getRandomNumber);
    }
     if(symbolCheck.checked){
        funcArr.push(getRandomSymbol);
    }
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex = getRandomInteger(0,funcArr.length);
        password += funcArr[randIndex]();

    }
    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;
    calculateStrength();

})
function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]= temp;
    }
    let str = "";
    array.forEach((el)=>(str+=el));
    return str;
}
