//Initial References
const letterContainer = document.getElementById("letter-container");
// comment change start
// const optionsContainer = document.getElementById("options-container");
//comment change end
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const stats = document.getElementById("stats");
const guessRemaining = document.getElementById("guess-remaining");
// const canvas = document.querySelector('canvas2');

const jsConfetti = new JSConfetti();

const winAudio = new Audio('./resource/win.mp3'); 
const loseAudio = new Audio('./resource/lose.mp3');
const correctAudio = new Audio('./resource/correct.mp3'); 
const wrongAudio = new Audio('./resource/wrong.mp3');
const clickAudio = new Audio('./resource/click.mp3'); 


function playClickSound() {
  clickAudio.play();
}

function playWinSound() {
  winAudio.play();
}


function playLoseSound() {
  loseAudio.play();
}

function playCorrectGuessSound() {
  correctAudio.play();
}

function playWrongGuessSound() {
  wrongAudio.play();
}

const categoryMenu = document.querySelector(".category-menu"),
  category_btn = document.querySelector(".category-btn"),
  c_Options = document.querySelectorAll(".c-option"),
  category_menu_text = document.querySelector(".category-menu-text");

  let loginStatus= localStorage.getItem("loginStatus");
  let username="Guest";
  if(loginStatus==="1")
  {
   username=localStorage.getItem("username-logged");
  let pfp=localStorage.getItem("username-pfp");
  console.log(pfp);
  if (pfp == null){
    pfp="./resource/profile1.jpg";
  }

  document.querySelector('.profile-pic').src=pfp; 
  document.getElementById("username-profile").textContent=username;

  }

category_btn.addEventListener("click", ()=> { 
  playClickSound();
  categoryMenu.classList.toggle("active")
});

c_Options.forEach(option =>{

  option.addEventListener("click", ()=>{
    playClickSound()
    let selectedOption = option.querySelector(".c-option-text").innerText;
    category_menu_text.innerText= selectedOption;
    categoryMenu.classList.remove("active");
    
  })
});



const difficultyMenu = document.querySelector(".difficulty-menu"),
  difficulty_btn = document.querySelector(".difficulty-btn"),
  d_Options = document.querySelectorAll(".d-option"),
  difficulty_menu_text = document.querySelector(".difficulty-menu-text");

difficulty_btn.addEventListener("click", ()=> { 
  playClickSound();
  difficultyMenu.classList.toggle("active")
});

d_Options.forEach(option =>{

  option.addEventListener("click", ()=>{
    playClickSound()
    let selectedOption = option.querySelector(".d-option-text").innerText;
    difficulty_menu_text.innerText= selectedOption;
    difficultyMenu.classList.remove("active");
    
  })
});




//Options values for buttons
let options = {
  fruits: ["Mango","Banana", "Guava", "Papaya", "Apple","Orange",  "Pomegranate",  "Watermelon",  "Melon",  "Jackfruit",  "Grapes","Kiwi",
          "Lichi",  "Custard Apple","Pineapple",  "Coconut",  "Strawberry",  "Fig",  "Amla",  "Chickoo",  "Peach",  "Dates",  "Pears", 
          "Lemon",  "Cherry",  "Sugarcane",  "Dragon Fruit","Tamarind",  "Kokum",  "Custard Apple",  "Avocado"
          ],
  animals: ["Lion",  "Tiger" , "Elephant", "Giraffe",  "Zebra",  "Hippo",  "Rhino",  "Gorilla","Panda", "Kangaroo",  "Koala",  "Penguin",  "Polar Bear",
            "Grizzly Bear",  "Wolf",  "Cheetah",  "Leopard",  "Jaguar","Crocodile",  "Alligator",  "Puma",  "Panther",  "Bison",  "Buffalo",  "Deer",  "Fox",
            "Horse", "Donkey", "Camel",  "Llama"
            ],
  countries: [  "India",  "United States",  "China",  "Indonesia","Pakistan",  "Brazil",  "Nigeria",  "Bangladesh","Russia",  "Mexico",  "Japan",
              "Ethiopia",  "Philippines",  "Egypt","Vietnam",  "DR Congo",  "Turkey",  "Iran",  "Germany",  "Thailand",  "United Kingdom",  "France",  "Italy",
              "Tanzania",  "South Africa","Myanmar",  "Kenya",  "South Korea",  "Colombia",  "Spain",  "Uganda",  "Argentina",  "Algeria",  "Sudan",  "Ukraine",
              "Iraq",  "Afghanistan",  "Poland",  "Canada",  "Morocco",  "Saudi Arabia",  "Uzbekistan",  "Peru",  "Angola",  "Malaysia",  "Mozambique",
                "Ghana", "Yemen", "Nepal",  "Venezuela",  "Madagascar",  "Cameroon",  "North Korea",  "Australia",  "Taiwan",  "Niger",  "Sri Lanka",
                "Burkina Faso", "Mali",  "Romania",  "Malawi",  "Chile",  "Kazakhstan","Zambia",  "Guatemala",  "Ecuador",  "Netherlands",  "Syria",  "Cambodia",
               "Senegal",  "Chad",  "Somalia",  "Zimbabwe",  "Guinea",  "Rwanda",  "Benin",  "Tunisia",  "Burundi",  "Bolivia","Belgium",  "Haiti",  "Cuba",
              "South Sudan",  "Dominican Republic",  "Czech Republic",  "Greece",  "Jordan",  "Portugal",  "Azerbaijan",  "Sweden",  "Honduras", 
              "United Arab Emirates", "Hungary",  "Belarus",  "Tajikistan"
              ],
};

// start
let wordLists = {
  easy: { 
    fruits: ["Apple","Banana","Orange",], 
    animals: ["Cat","Dog","Rabbit",], 
    countries: ["India","China","Brazil",], 
    colors: ["red","green","blue",], 
    currencies: ["dollar","euro","yen",], 
    sports: ["football","cricket","hockey","golf",], 
    birds: ["crow","sparrow","pegion",], 
    insects: ["Ant","Bee","Fly",], 
    vegetables: ["carrot","tamato","potato"],
    planets: ["earth,mars,saturn"],
    metals:["Iron","Copper","tin"],
    elements:["Hydrogen ","oxygen","nitrogen"],
    subjects:["math","science","english"],
    rivers:["ganga","indus","nile"],
    socials:["whatsapp","instagram","youtube"],
  },
  medium: { 
    fruits: ["Pineapple","Grapes","Mango",], 
    animals: ["Elephant","Lion","Tiger",], 
    countries: ["Australia","Canada","France",], 
    colors: ["purple","gray","brown",], 
    currencies: ["dinar","pound","rupee",], 
    sports: ["tennis","volleyball","baseball",], 
    birds: ["Seagull","Parrot","Owl",], 
    insects: ["Moths","Beetles","Crickets",], 
    vegetables: ["onion","broccoli","radish"],
    planets: ["jupiter","Mercury","venus"],
    metals: ["Aluminum","Zinc","Lead"],
    elements: ["sulphur","Bromine","chlorine","iodine"],
    subjects:["civics","computer","geography"],
    rivers:["amazon","Yamuna","Krishna","Narmada","Niger"],
    socials:["TikTok","Reddit","telegram","discord"],   
  },
  hard: { 
    fruits: ["Pomegranate","Durian","Dragonfruit",], 
    animals: ["Rhinoceros","Hippopotamus","Komodo Dragon",], 
    countries: ["Kyrgyzstan","Switzerland","Zimbabwe",], 
    colors: ["silver","peach","magenta",], 
    currencies: ["rial","sterling","franc",], 
    sports: ["table-tennis","badminton","basketball",], 
    birds: ["Woodpecker","Hummingbird","Pelican",], 
    insects: ["Mosquitoe","Butterflie","Grasshopper",], 
    vegetables: ["cauliflower","Bell pepper","Cucumber"],
    planets: ["uranus","neptune"],
    metals:["Cobalt","Magnesium","Tungsten"],
    elements:["Potassium","Phosphorus","Xenon"],
    subjects:["social-studies","geometry","algebra"],
    rivers:["Brahmaputra","Mahanadi","godavari","Mississippi","Missouri "],
    socials:["twitch","Clubhouse","LINE","Medium "],


  },
};

// end


//count
let winCount = 0;
let count = 0;

let chosenWord = "";



//comment change start

//Display option buttons
// const displayOptions = () => {
  
//   optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
//   let buttonCon = document.createElement("div");
//   for (let value in options) {
//     buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
//   }
//   optionsContainer.appendChild(buttonCon);
// };
//comment change end

//stats counter
let winsCount = 0;
let lossesCount = 0;

function incrementWins() {
  winsCount++;
  document.getElementById('wins').innerText = winsCount;
}

function incrementLosses() {
  lossesCount++;
  document.getElementById('losses').innerText = lossesCount;
}

//Guess-counter
function updateGuessesRemaining() {
  const remainingGuesses = 6 - count;
  guessRemaining.innerText = `${remainingGuesses}/6`;

  // Check if remaining guesses are between 4 and 6
  if (remainingGuesses >= 5 && remainingGuesses <= 6) {
    guessRemaining.style.color = "green"; // Change text color to green
  } 
  else if( remainingGuesses >= 3 && remainingGuesses <= 4) {
    guessRemaining.style.color = "orange"; 
  }
  else if ( remainingGuesses >=0 && remainingGuesses <= 2) {
    guessRemaining.style.color = "red";
  }
  else{
    guessRemaining.style.color="";
  }
}


//Block all the Buttons
const blocker = () => {

  //change start
  let c_Options = document.querySelectorAll(".c-option");
  //change end
  
  

  //comment change start
  // let optionsButtons = document.querySelectorAll(".options");
  //comment change end

  let letterButtons = document.querySelectorAll(".letters");
  //disable all options

  //coment change start

  // optionsButtons.forEach((button) => {
  //   button.disabled = true;
  // });
  //comment change start

  // change start 
    category_btn.disabled = true ;
  //change end

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

// start 

// const setCategory = (catgeory) =>{
  
// }

// const setDifficulty = (difficulty) => {
    
// }

let selectedCategory = ""; 
let selectedDifficulty = "";

const join = (value, type) => {
  
  if (type === 'category') {
    selectedCategory = value; 
    console.log("category:",selectedCategory);// Update selected category
  } else if (type === 'difficulty') {
    selectedDifficulty = value;
    console.log("difficluty:",selectedDifficulty); // Update selected difficulty
  }

  if(selectedCategory.length>0 && selectedDifficulty.length>0)
  {
    // Concatenate category and difficulty strings
  const concatenatedString = selectedCategory + '_' + selectedDifficulty;
  console.log("concatenated:",concatenatedString);

  // Call the generateWord function with the concatenated string as argument
  generateWord(concatenatedString);
  }
  
};


// end 



//Word Generator
const generateWord = (optionValue) => {

  //start
  const [category, difficulty] = optionValue.split('_');
  console.log("category in generate:",category);
  console.log("difficulty in generate:",difficulty);
  //end

  //comment change start
  // let optionsButtons = document.querySelectorAll(".options");
  //comment change end


  //comment change start

  //If optionValur matches the button innerText then highlight the button
  // optionsButtons.forEach((button) => {
  //   if (button.innerText.toLowerCase() === optionValue) {
  //     button.classList.add("active");
  //   }
  //   button.disabled = true;
  // });
  //comment change end


  //change start
  category_btn.disabled = true;
  difficulty_btn.disabled = true;
  //change end



  //initially hide letters, clear previous word
  
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  guessRemaining.innerText = "6/6";
  guessRemaining.style.color="green";




  //comment start
  // let optionArray = options[optionValue];
  //comment end

  //start
  // let easyFruits = wordLists.easy.fruits;
  // console.log(easyFruits);
  let optionArray = wordLists[difficulty][category];
  console.log("array selected",optionArray);
  //end


  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  console.log("choosen word:",chosenWord);
  chosenWord = chosenWord.toUpperCase();
  console.log("choosen word to upper:",chosenWord);

  //replace every letter with span containing dash
  // let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  let displayItem= chosenWord.replace(/\s/g,'-').replace(/[a-zA-Z]/g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;


  //Display canvas
  canvas.classList.remove("hide");
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //change start
  category_btn.disabled = false;
  difficulty_btn.disabled = false;
  category_menu_text.innerText= "Select a Category";
  difficulty_menu_text.innerText= "Select a Difficulty";
  selectedCategory = ""; 
  selectedDifficulty = "";


  canvas.classList.add("hide");
  

  //change end

  //Initially erase all content and hide letteres and new game button
  guessRemaining.innerText = "";
  userInputSection.innerHTML = "";
  // optionsContainer.innerHTML = "";
  //change start
  c_Options.innerHTML="";
  //change end
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  console.log("creating buttons");

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.replace(/[^a-zA-Z0-9]/g, '').split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            playCorrectGuessSound();
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              playWinSound();
              incrementWins();
              updatestat(1);
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              document.querySelector(".result_loss").classList.add("hide");
              document.querySelector(".result_win").classList.remove("hide");
              jsConfetti.addConfetti()
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        playWrongGuessSound();
        count += 1;
        //for drawing man
        drawMan(count);
        updateGuessesRemaining();

        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          playLoseSound();
          updatestat(0);
          incrementLosses();
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          document.querySelector(".result_win").classList.add("hide");
          document.querySelector(".result_loss").classLi
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  
  

  //comment change start

  // displayOptions();
  //comment change end

  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    // context.strokeStyle = color;
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(163, 56, 14, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    // drawLine(150, 60, 150, 100);
    drawLine(154,66,154,95, "black");
  };

  const leftArm = () => {
    drawLine(155, 68, 142, 85, "black");
  };

  const rightArm = () => {
    // drawLine(150, 70, 170, 90);
    drawLine(168, 85, 155, 68, "black");
  };

  const leftLeg = () => {
    // drawLine(150, 100, 130, 120);
    drawLine(154,95,144,115, "black");
  };

  const rightLeg = () => {
    // drawLine(150, 100, 170, 120);
    drawLine(154,95,164,115, "black");
  };
  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    // drawLine(50, 130, 250, 130);
    drawLine(0,130,75,130, "brown");
    drawLine(125,130,550,130, "brown");
    drawLine(75, 120 ,125 ,120, "brown");
    drawLine(75,130,75,120, "brown");
    drawLine(125,130,125,120, "brown");

    //left line
    drawLine(100, 8, 100, 120, "black");
    drawLine(90, 8, 90, 120, "black");
    drawLine(90,8,100,8, "black")
    
    //top line
    drawLine(100, 20, 150, 20, "black");
    drawLine(100, 13, 158, 13, "black");
    drawLine(80,20,90,20, "black");
    drawLine(80,13,90,13, "black");
    drawLine(80,20,80,13, "black");
    //small top line
    drawLine(150, 20, 150, 30, "gray");
    drawLine(158, 13, 158, 30, "gray");
    drawLine(150,30,158,30, "gray");

    //cross
    drawLine(100,30,115,20, "red");
    drawLine(100,40,130,20, "red");

    //rope
    drawLine(154,30,154,45, "brown");
    
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};


//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};


//New Game


newGameButton.addEventListener("click", () => {
  playClickSound(); 
  initializer(); 
});

document.getElementById('home-redirect').addEventListener("click", () => {
  playClickSound();

});


window.onload = initializer;

async function updatestat (outcome){


  fetch('/updatestat',{

    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
        username:username,
        outcome:outcome
    })
})
}

