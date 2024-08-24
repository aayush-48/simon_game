let buttonColours=["red","blue","green","yellow"];
let gamePatttern=[];
let userClickedPattern=[];
let level=0;
let start=false;

function playSound(colour){
    var audio = new Audio(`${colour}.mp3`);
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColour).removeClass("pressed");
    },50)
}

function nextsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber= Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePatttern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePatttern[currentLevel]){
        if(userClickedPattern.length===gamePatttern.length){
            setTimeout(()=>{
                nextsequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }
}

function startOver(){
    level=0;
    start=false;
    gamePatttern=[];
}

$(".btn").on("click",(event)=>{
    let userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer(userClickedPattern.length-1)
});
   
$(document).on("keypress",(event)=>{
    if(!start){
        $("#level-title").text("Level "+level);
        nextsequence();
        start=true;
    }
    
})



        
        
    
 
