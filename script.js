let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, zombies = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");



  for(let i = 0; i < 1; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    let health = rnd(1, 10);
    if(health < 7){
      health = 50;
      speed = 0.01;
    } else{
      health = 100;
      speed = 0.03
    }

    let zombie = new Zombie(0,0.5,-7,health,speed);
    zombies.push(zombie);
  }
  
  loop();
})

function loop(){

  for(let zombie of zombies){
    zombie.follow(camera);

    if( (distance(zombie.obj, camera) < 7 && distance(zombie.obj, camera) > 3 ) && zombie.speed == 0.01){
      zombie.obj.setAttribute("animation-mixer", {clip: "Walk_InPlace", loop:"repeat"});
    } 
    else if( (distance(zombie.obj, camera) < 7 && distance(zombie.obj, camera) > 3 ) && zombie.speed == 0.03){
      zombie.obj.setAttribute("animation-mixer", {clip: "Run_InPlace", loop:"repeat"});
    }
    else if(distance(zombie.obj, camera) < 3){
      zombie.obj.setAttribute("animation-mixer", {clip: "Attack", loop:"repeat"});
      //set chase to false
    }
    else{
      zombie.obj.setAttribute("animation-mixer", {clip: "Idle", loop:"repeat"});
      //set chase to false
    }

  
  }
  
  window.requestAnimationFrame(loop);
}


function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}