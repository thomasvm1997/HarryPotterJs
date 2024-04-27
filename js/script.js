"use strict";

window.addEventListener("load", initialise);

let ancestry, buttonOnline, clickCountOnline, houseSelectBox, radioButtons, filteredCharacters,
    houseValue, ancestryId, arrayJson;

const ancesteryArrayOffline = ["All", "half-blood", "muggleborn", "pure-blood"];
const ancesteryArrayOnline = ["All", "half-blood", "muggleborn", "pure-blood", "squib", "muggle", "half-veela", "quarter-veela"];
const houseArray = ["All", "Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

function initialise() {
    //Variables initializers
    ancestry = document.getElementById("ancestry");
    buttonOnline = document.getElementById("get-data-online");
    houseSelectBox = document.getElementById("houses")
    
    houseValue = "All";
    ancestryId = "All";
    clickCountOnline = 0;
    
    //event and functions
    logCharacters();
    fillAncestry(ancesteryArrayOffline);
    fillHouses();
    filterCharacters(potterCharacters);
    buttonOnline.addEventListener("click", isOnline);


}

function isOnline() {
    clickCountOnline += 1;
    filteredCharacters = [];
    if (clickCountOnline % 2 == 0) {
        buttonOnline.innerText = "Offline";
        fillAncestry(ancesteryArrayOffline);
        filterCharacters(potterCharacters);
    }
    else {
        buttonOnline.innerText = "Online";
        fillAncestry(ancesteryArrayOnline);
        filterCharacters(arrayJson);
    }
    
}
function fillAncestry(param) { //KIJKEN OM DEZE TE LATEN WERKEN MET PARAMETER ARRAY!!! Probeersel
    ancestry.replaceChildren();// lijst leegmaken
    const container = document.createElement("div");
    container.className = "RadioButtonContainer";
    let value = 0;
    

        param.forEach(c => {
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.id = c; //hier gaan we de radiobutton aanmaken: rechtsreeks werken met `<input type="radio" checked /><label>${c}</label>` lukte niet.
            radioButton.name = "buttonAncestry"; //Zorgt ervoor dat de andere auto deselect wordt
            radioButton.value = value++;
            radioButton.addEventListener("click", function () {
                ancestryId = this.getAttribute("id"); 
                if (clickCountOnline % 2 == 0) {filterCharacters(potterCharacters);}
                else{filterCharacters(arrayJson);}
            });
            if (c == "All") {
                radioButton.checked = true;
            }



            const label = document.createElement("label");
            label.textContent = c; //naam van de het element uit de lijst: we loopen door de lijst.


            container.appendChild(radioButton);
            container.appendChild(label);

        

    });

    ancestry.appendChild(container);
    radioButtons = document.querySelector(`input[type="radio"]`);
}


function fillHouses() {

    houseArray.forEach(c => {
        const option = document.createElement("option");
        option.id = c;
        option.textContent = c;
        option.value = c;
        //option.addEventListener("input", filterCharacters)
        houseSelectBox.appendChild(option);
    });
    houseSelectBox.addEventListener("input", function () { 
        houseValue = this.value; 
        if (clickCountOnline % 2 == 0) {filterCharacters(potterCharacters); } else{filterCharacters(arrayJson);}
    });
}

function filterCharacters(param) {


    console.log(`Id:${ancestryId}`);
    console.log(`HouseValue:${houseValue}`);
    console.log(`param:${param}`);


    if (houseValue == "All" || ancestryId == "All") {
        if (houseValue == "All" && ancestryId != "All") {
            filteredCharacters = param.filter(c => c.ancestry == ancestryId);
        }
        else if (ancestryId == "All" && houseValue != "All") {
            filteredCharacters = param.filter(c => c.house == houseValue);
        }
        else {
            filteredCharacters = param;
        }

    }
    else {
        filteredCharacters = param.filter(c => c.ancestry == ancestryId && c.house == houseValue);

    }
    console.log(filteredCharacters);
    
    
    makeCharacterCards();
    
}

function makeCharacterCards() {
    const cardContainer = document.querySelector("main");
    cardContainer.replaceChildren();

    if(filteredCharacters.length == 0){
        const card = document.createElement("article");
        card.className = "noData";
        const p = document.createElement("p");
        p.innerText = "No data for these filters";
        card.appendChild(p);
        cardContainer.appendChild(card);
    }
    else{
    filteredCharacters.forEach(c => {
        const card = document.createElement("article");
        card.className = c.house.toLowerCase();

        const cardImage = document.createElement("img");
        if(c.image == ""){
            cardImage.src = "../img/No_Image_Available.jpg"
        }
        else{
        cardImage.src = c.image;
        }
        cardImage.title = `Wizard: ${c.wizard == true ? "Yes" : "No"}\nStatus: ${c.hogwartsStudent == true ? "Student" : "Staff"}`;

        const nameCharacter = document.createElement("p");
        nameCharacter.className = "nameCharacter";
        nameCharacter.innerText = c.name;

        const nameActor = document.createElement("p");
        nameActor.className = "actorName";
        nameActor.innerText = c.actor;

        card.appendChild(cardImage);
        card.appendChild(nameCharacter);
        card.appendChild(nameActor);

        cardContainer.appendChild(card);

    });
}
}





async function logCharacters() {
    const response = await fetch("https://thomasvm23.github.io/super-octo-guide/characters.json");
    arrayJson = await response.json();
    
    console.log(arrayJson);
}
