let rnd = (l,u) => Math.random() * (u-l) + l
let scene;
let zombies = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");



  for(let i = 0; i < 1; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    let zombie = new Zombie(x,0.5,z);
    zombies.push(zombie)
  }
  
  loop();
})

function loop(){

  for(let zombie of zombies){
    zombie.follow();
  }
  
  setTimeout(loop,1);
}