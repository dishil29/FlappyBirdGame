//Move Speed
let moveSpeed = 3;

//Gravity 
let Gravity = 0.5;

//Initialsing Game Status
let GameStatus = false;

//Getting elements from DOM 
let bird = document.querySelector('.bird');
let bird_props = bird.getBoundingClientRect(); //Size & Position of Bird element 

let background = document.querySelector('.background').getBoundingClientRect(); 

let score_val = document.querySelector('.score_val');

let message = document.querySelector('.message');

document.addEventListener('keydown',(e)=>{
  if(e.key == 'Enter' && !(GameStatus)){
    document.querySelectorAll('.pipe').forEach((e) => {
      e.remove();
    });
    GameStatus = true;
    bird.style.top = '40vh';
    message.innerHTML = '';
    score_val.innerHTML = '0';
    play();
  }
});

function play(){
  function move(){
    //Checking Game Status 
    if(!GameStatus) return;

    let pipeAll = document.querySelectorAll('.pipe');
    pipeAll.forEach((e) => {
      let pipeObj_prop = e.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();

      //Removing pipes which have exited the screen 
      if(pipeObj_prop.left<0){
        e.remove();
      }
      else{
        //Collision Detection 
        if(bird_props.left<=pipeObj_prop.left+pipeObj_prop.width && bird_props.left+bird_props.width >= pipeObj_prop.left && bird_props.top <= pipeObj_prop.height + pipeObj_prop.top && bird_props.top + bird_props.height > pipeObj_prop.top){
          //Change game status because a collision is detected 
          GameStatus = false;
          message.innerHTML = "Press Enter to Restart "; 
          return;
        }
        else{
          //If collision does not occur then we will increase the score by 1
          if(pipeObj_prop.left + pipeObj_prop.width < bird_props.left && pipeObj_prop.left + pipeObj_prop.width + moveSpeed >= bird_props.left && e.increase_score == '1' ){  //MOve speed to ensure that the bird has crossed the pole completely and a counter to make sure that the same pole doesn't get counted twice 
            score_val.innerHTML += 1;
          }
          e.style.left = pipeObj_prop.left - moveSpeed + 'px';
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let birdY = 0;
  function applyGravity(){
    if(GameStatus == false){
      return;
    }
    birdY = birdY + Gravity;
    document.addEventListener('keydown',(e) => {
      if(e.key == 'ArrowUp' || e.key == ' '){
        birdY = -7.6;
      }
    });
    //Make sure that the Bird doesnot get out of the screens 
    if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
      GameStatus = false;
      message.innerHTML =  "Press Enter to Restart "; 
      return;
    }
    bird.style.top = bird_props.top + birdY + 'px';
    bird_props = bird.getBoundingClientRect();
    requestAnimationFrame(applyGravity);
  }
  requestAnimationFrame(applyGravity); 

  let pipeSep = 0;
  let pipGap = 35;

  function createPipe() {
    if(GameStatus == false) return ;

    if(pipeSep > 115){
      pipeSep = 0;

      let pipePosi = Math.floor(Math.random() * 45) +8
      let pipe_new = document.createElement('div');
      pipe_new.className = 'pole';
      pipe_new.style.top = pipePosi -70 +'vh';
      pipe_new.style.left = '100vw';

      document.querySelector('.pole-container').appendChild(pipe_new);
    }
    pipeSep++;
    requestAnimationFrame(createPipe);
  }
  requestAnimationFrame(createPipe);
}