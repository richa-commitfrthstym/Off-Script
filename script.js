const chits = [
{
text: "Draw something without lifting your pen.",
category: "creative"
},
{
text: "Make a tiny mood board.",
category: "creative"
},
{
text: "Write a six-word story.",
category: "creative"
},
{
text: "Create a ridiculous invention on paper.",
category: "creative"
},
{
text: "Make a tiny comic with three panels.",
category: "creative"
},

{  
    text: "Learn one completely random fact.",  
    category: "learn"  
},  
{  
    text: "Learn how to say hello in 5 different languages.",  
    category: "learn"  
},  
{  
    text: "Learn something interesting about space.",  
    category: "learn"  
},  
{  
    text: "Learn a new word and use it in a sentence.",  
    category: "learn"  
},  

{  
    text: "Go outside and take a picture of something interesting.",  
    category: "do"  
},  
{  
    text: "Rearrange one small area of your room.",  
    category: "do"  
},  
{  
    text: "Clean one tiny corner of your room.",  
    category: "do"  
},  
{  
    text: "Make a paper airplane and see how far it flies.",  
    category: "do"  
},  

{  
    text: "Give someone a genuine compliment.",  
    category: "social"  
},  
{  
    text: "Ask a friend a completely random question.",  
    category: "social"  
},  
{  
    text: "Tell someone a funny story.",  
    category: "social"  
},  

{  
    text: "Make up a name for the nearest object.",  
    category: "chaos"  
},  
{  
    text: "Take 10 funny photos of random objects.",  
    category: "chaos"  
},  
{  
    text: "Create the most useless invention you can think of.",  
    category: "chaos"  
},  
{  
    text: "Write a dramatic backstory for an everyday object.",  
    category: "chaos"  
}

];

/* =========================
LOAD SAVED DATA
========================= */

const savedChits = localStorage.getItem("boardChits");
const savedCompleted = localStorage.getItem("completedCount");

if (savedChits) {
const storedChits = JSON.parse(savedChits);

chits.length = 0;  

storedChits.forEach(function(chit) {  
    chits.push(chit);  
});

}

/* =========================
ELEMENTS
========================= */

const button = document.querySelector("#pickButton");
const chit = document.querySelector("#chit");
const chitText = document.querySelector("#chitText");
const doneButton = document.querySelector("#doneButton");
const completedCount = document.querySelector("#completedCount");

const categoryButtons =
document.querySelectorAll(".categoryButton");

const addButton = document.querySelector("#addButton");
const addBox = document.querySelector("#addBox");
const newChit = document.querySelector("#newChit");
const saveChit = document.querySelector("#saveChit");

/* =========================
VARIABLES
========================= */

let completed = savedCompleted
? Number(savedCompleted)
: 0;

let selectedCategory = "all";

let currentChit = null;

completedCount.textContent = completed;

/* =========================
SAVE BOARD
========================= */

function saveBoard() {

localStorage.setItem(  
    "boardChits",  
    JSON.stringify(chits)  
);  

localStorage.setItem(  
    "completedCount",  
    completed  
);

}

/* =========================
CATEGORY SELECTION
========================= */

categoryButtons.forEach(function(categoryButton) {

categoryButton.addEventListener("click", function() {  

    selectedCategory =  
        categoryButton.dataset.category;  

    categoryButtons.forEach(function(button) {  

        button.classList.remove("selected");  

    });  

    categoryButton.classList.add("selected");  

});

});

/* =========================
PICK A CHIT
========================= */

button.addEventListener("click", function() {

let availableChits;  

if (selectedCategory === "all") {  

    availableChits = chits;  

} else {  

    availableChits = chits.filter(function(chit) {  

        return chit.category === selectedCategory;  

    });  

}  


if (availableChits.length === 0) {  

    chitText.textContent =  
        "🎉 No more chits in this category!";  

    currentChit = null;  

    return;  

}  


const randomNumber =  
    Math.floor(  
        Math.random() * availableChits.length  
    );  


currentChit =  
    availableChits[randomNumber];  


chitText.textContent =  
    currentChit.text;  


chit.classList.remove("show");  


setTimeout(function() {  

    chit.classList.add("show");  

}, 50);

});

/* =========================
DONE BUTTON
========================= */

doneButton.addEventListener("click", function() {

if (currentChit === null) {  

    chitText.textContent =  
        "Pick a chit first! 🎟️";  

    return;  

}  


completed++;  

completedCount.textContent =  
    completed;  


const originalIndex =  
    chits.indexOf(currentChit);  


if (originalIndex !== -1) {  

    chits.splice(originalIndex, 1);  

}  


currentChit = null;  


chitText.textContent =  
    "✓ Completed. Pick another chit.";  


saveBoard();

});

/* =========================
ADD YOUR OWN CHIT
========================= */

addButton.addEventListener("click", function() {

addBox.style.display = "block";  

newChit.focus();

});

saveChit.addEventListener("click", function() {

const text =  
    newChit.value.trim();  


if (text === "") {  

    return;  

}  


chits.push({  

    text: text,  

    category:  
        selectedCategory === "all"  
            ? "chaos"  
            : selectedCategory  

});  


newChit.value = "";  

addBox.style.display = "none";  


chitText.textContent =  
    "🎟️ Your chit has been added!";  


saveBoard();

});