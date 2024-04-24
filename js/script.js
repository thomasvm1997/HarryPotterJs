"use strict";

window.addEventListener("load", initialise);

let ancestry, buttonOnline, clickCountOnline;
const ancesteryArrayOffline = ["All", "half-blood","muggleborn", "pure-blood"];
const ancesteryArrayOnline = ["All", "half-blood","muggleborn", "pure-blood", "squib", "muggle", "half-veela", "quarter-veela"];
const houseArray = ["All", "Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

function initialise() {
    //Variables initializers
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
