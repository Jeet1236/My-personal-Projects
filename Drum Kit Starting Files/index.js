function generateSound(wordPressed,soundSource){

    document.querySelector(`.${wordPressed}`).style.color = "yellow";
    let audio = new Audio(`sounds/${soundSource}`);

    setTimeout(function(){
        document.querySelector(`.${wordPressed}`).style.color = "#DA0463";},100);

    audio.play();
}

document.body.addEventListener("keydown",function(event){
    
    if(event.key == "w"){
        generateSound(event.key,"crash.mp3");
       }

    else if(event.key == "a"){
        generateSound(event.key,"kick-bass.mp3");
    }

    else if(event.key == "s"){
        generateSound(event.key,"snare.mp3");
    }

    else if(event.key == "d"){
        generateSound(event.key,"tom-1.mp3"); 
    }

    else if(event.key == "j"){
        generateSound(event.key,"tom-2.mp3");
    } 

    else if(event.key == "k"){
        
        generateSound(event.key,"tom-3.mp3");
    } 

    else if(event.key == "l"){
        generateSound(event.key,"tom-4.mp3");
    
    } 
       
})
