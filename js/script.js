"use strict";

window.addEventListener("load", initialise);

let ancestry, buttonOnline, clickCountOnline, houseSelectBox;
const ancesteryArrayOffline = ["All", "half-blood","muggleborn", "pure-blood"];
const ancesteryArrayOnline = ["All", "half-blood","muggleborn", "pure-blood", "squib", "muggle", "half-veela", "quarter-veela"];
const houseArray = ["All", "Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

function initialise() {
    //Variables initializers
    ancestry = document.getElementById("ancestry");
    buttonOnline = document.getElementById("get-data-online");
    houseSelectBox = document.getElementById("houses")
    clickCountOnline = 0;
    
    //event and functions
    fillHouses();
    buttonOnline.addEventListener("click", isOnline);
}

function fillAncestry(){
    
    if(clickCountOnline % 2 == 0 ){ //offline
        ancestry.replaceChildren();// lijst leegmaken

        ancesteryArrayOffline.forEach(c => {
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.className = "radioButton"; //hier gaan we de radiobutton aanmaken: rechtsreeks werken met `<input type="radio" checked /><label>${c}</label>` lukte niet.
            if(c == "All"){ 
                radioButton.checked = true;
            }                                        
                                                   
            const label = document.createElement("label");
            label.textContent = c; //naam van de het element uit de lijst: we loopen door de lijst.

            const container = document.createElement("div");
            container.className = "RadioButtonContainer";
            container.appendChild(radioButton);
            container.appendChild(label);
            ancestry.appendChild(container);//We steken alles in de container en daarna container in ancestry

        });
    }
    else{//online
        ancestry.replaceChildren();
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
    fillAncestry();
}

function fillHouses(){
    houseArray.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        houseSelectBox.appendChild(option);
    });
}
