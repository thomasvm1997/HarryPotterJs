"use strict";

window.addEventListener("load", initialise);

let ancestry, buttonOnline, clickCountOnline, houseSelectBox, cardContainer, radioButtons, filteredCharacters,
houseValue, ancestryId;

const ancesteryArrayOffline = ["All", "half-blood","muggleborn", "pure-blood"];
const ancesteryArrayOnline = ["All", "half-blood","muggleborn", "pure-blood", "squib", "muggle", "half-veela", "quarter-veela"];
const houseArray = ["All", "Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

function initialise() {
    //Variables initializers
    ancestry = document.getElementById("ancestry");
    buttonOnline = document.getElementById("get-data-online");
    houseSelectBox = document.getElementById("houses")
    cardContainer = document.querySelector(".cardContainer")
    houseValue = "All";
    ancestryId = "All";
    clickCountOnline = 0;
    
    //event and functions
    fillAncestry();
    fillHouses();
    filterCharacters();
    buttonOnline.addEventListener("click", isOnline);
    
    
}

function fillAncestry(){
    ancestry.replaceChildren();// lijst leegmaken
    const container = document.createElement("div");
    container.className = "RadioButtonContainer";
    let value = 0;
    if(clickCountOnline % 2 == 0 ){ //offline
        
        ancesteryArrayOffline.forEach(c => {
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.id = c; //hier gaan we de radiobutton aanmaken: rechtsreeks werken met `<input type="radio" checked /><label>${c}</label>` lukte niet.
            radioButton.name = "buttonAncestry"; //Zorgt ervoor dat de andere auto deselect wordt
            radioButton.value = value++;
            radioButton.addEventListener("click",function(){ancestryId = this.getAttribute("id");filterCharacters();});
            if(c == "All"){ 
                radioButton.checked = true;
            }                                        
            
            

            const label = document.createElement("label");
            label.textContent = c; //naam van de het element uit de lijst: we loopen door de lijst.

            
            container.appendChild(radioButton);
            container.appendChild(label);
            
        });
    }
    else{//online
        
    }
    ancestry.appendChild(container);//We steken alles in de container en daarna container in ancestry
    radioButtons = document.querySelector('input[type="radio"]');
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
        option.id = c;
        option.textContent = c;
        option.value = c
        //option.addEventListener("input", filterCharacters)
        houseSelectBox.appendChild(option);
    });
    houseSelectBox.addEventListener("input", function(){houseValue = this.value; filterCharacters()});
}

function filterCharacters(){
    
    
    console.log(`Id:${ancestryId}`);
    console.log(`HouseValue:${houseValue}`);
    
/*     if(this.getAttribute("type") == "radio"){
    
        filteredCharacters = potterCharacters.filter(c => c.ancestry == id);
    
    }
    else{
        filteredCharacters = potterCharacters.filter(c => c.house == houseValue);
    } */
    if(houseValue == "All" || ancestryId == "All"){
        if(houseValue == "All" && ancestryId != "All"){
            filteredCharacters = potterCharacters.filter(c => c.ancestry == ancestryId)
        }
        else if(ancestryId == "All" && houseValue != "All"){
            filteredCharacters = potterCharacters.filter(c => c.house == houseValue)
        }
        else{
            filteredCharacters = potterCharacters;
        }
        
    }
    else{
        filteredCharacters = potterCharacters.filter(c => c.ancestry == ancestryId && c.house == houseValue);
        
    }
    
    makeCharacterCards();
    
}

function makeCharacterCards(){
    const cardContainer = document.querySelector("main");
    cardContainer.replaceChildren();
    filteredCharacters.forEach(c => {
        const card = document.createElement("article");
        card.className = c.house.toLowerCase();

        const cardImage = document.createElement("img");
        cardImage.src = c.image;
        cardImage.title = `Wizard: ${c.wizard == true ? "Yes": "No"}\nStatus: ${c.hogwartsStudent == true ? "Student": "Staff"}`;

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


