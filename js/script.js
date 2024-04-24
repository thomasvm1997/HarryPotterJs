"use strict";

window.addEventListener("load", initialise);

let ancestry, buttonOnline, clickCountOnline;
function initialise() {
    //Variables
    ancestry = document.getElementById("ancestery");
    buttonOnline = document.getElementById("get-data-online");
    clickCountOnline = 0;

    //event and functions
    buttonOnline.addEventListener("click", isOnline);
}

function fillAncestry(){
    
    if(clickCountOnline % 2 == 0 ){

    }
    else{

    }
}

function isOnline(){
    clickCountOnline += 1
    if(clickCountOnline % 2 == 0 ){
        buttonOnline.innerText = "Offline";
    }
    else{
        buttonOnline.innerText = "Online";
    }
}
