let userName = "";
let title = document.querySelector("header .title")
let id =null;
let duration = 500;
let cardsContainer = document.querySelector(".cards-container");
let cards = Array.from(cardsContainer.children);
let orderedArray = [...Array(cards.length).keys()];
let tries = document.querySelector("header .information .tries");
let timer = document.querySelector(".information .timer .time");
let button = document.querySelector(".launch-screen .user-data input[type=\"button\"]");


let  input = document.getElementById("username");
input.addEventListener("keydown", (e)=> {
  if (e.keyCode === 13) {
    button.click();
  }
})

button.onclick = function(){
    userName = document.getElementById("username").value.trim().replace(/\s/g, '-');
    let warning = document.querySelector(".launch-screen .user-data .warning-message");
    if(userName ==="" || userName.length<5 || userName.length>25){
        warning.style.display="block"
    }
    else{
        warning.remove();
        document.querySelector(".launch-screen").remove();
        title.textContent = "Welcome " + userName + " to The  Memory Game";
        id = setInterval(()=>{
            timer.textContent = parseInt(timer.textContent) + 1;
            if(timer.textContent == "9999"){
                clearInterval(id);
            }
        },1000);
        
    }
}


shuffle(orderedArray);
cards.forEach((element,index)=>{
    element.style.order = orderedArray[index];
    element.onclick = function(){
        flipCard(element);
    }
});

function shuffle(array){
    let size = array.length;
    for(let i=0;i<size;i++){
        let j = Math.floor(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(card){
    card.classList.add("flipped");
    let flippedCards = cards.filter(card=>card.classList.contains("flipped"));

    if(flippedCards.length === 2){
        // Prevent the clicking
        let cardsContainer = document.querySelector(".cards-container");
        cardsContainer.style.pointerEvents="none";

        setTimeout(()=>{
            cardsContainer.style.pointerEvents="all";
        },duration)

        // Compare the cards
        let firstCard = flippedCards[0];
        let secondCard = flippedCards[1];
        if(firstCard.children[1].children[0].getAttribute("data-tv-show") === secondCard.children[1].children[0].getAttribute("data-tv-show")){
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.classList.add("revealed");
            secondCard.classList.add("revealed");

            document.getElementById("success").play();
        }
        else{
            tries.textContent = parseInt(tries.textContent) + 1;
            document.getElementById("fail").play();

            setTimeout(()=>{
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
            },duration);
        }

        // Check if user wins or not
        let revealedCards = cards.filter(card=>card.classList.contains("revealed"));
        if(revealedCards.length == cards.length){
            document.getElementById("finished").play();
            title.textContent = "Congrats "+userName+"!";
            clearInterval(id);
        }
    }
}
