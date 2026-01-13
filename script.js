let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, zombies = [], bullets = [], ammo_count = 5, Phealth_count, Phealth_text, Zhealth_count;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  Phealth_text = document.getElementById("Phealth");

  for(let i = 0; i < 2; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    Zhealth_count = rnd(1, 10);
    if(Zhealth_count < 7){
      Zhealth_count = 50;
      speed = 0.01;
    } else{
      Zhealth_count = 100;
      speed = 0.03
    }
    let zombie = new Zombie(x,0.5,z,Zhealth_count,speed);
    zombies.push(zombie);
  }
  Phealth_count = 105;


  window.addEventListener("keydown",function(e){
    if(e.key == " " && ammo_count > 0){
      let bullet = new Bullet();
      bullets.push(bullet);
      ammo_count--;
    }
  })
  
  loop();
})

function loop(){

  Phealth_text.setAttribute("value",`Health: ${Math.round(Phealth_count)}`);
  for(let zombie of zombies){
    zombie.follow(camera);  

    for(let bullet of bullets){

      let d2 = distance(zombie.obj, bullet.obj);
      if(d2 < 3 && bullet.shot == false){
        zombie.Zhealth_count -= 20;
        bullet.shot = true;
        zombie.down = true;
        bullet.obj.remove();
        zombie.healthDown();
      }
    }



    let d1 = distance(zombie.obj, camera);

    if(zombie.Zhealth_count > 0){
      if( (d1 < 7) && (d1 > 2) && zombie.speed == 0.01){
        zombie.obj.setAttribute("animation-mixer", {clip: "Walk_InPlace", loop:"repeat"});
        zombie.chase = true;
      } 
      else if( (d1 < 7) && (d1 > 2) && zombie.speed == 0.03){
        zombie.obj.setAttribute("animation-mixer", {clip: "Run_InPlace", loop:"repeat"});
        zombie.chase = true;
      }
      else if(d1 < 2){
        zombie.obj.setAttribute("animation-mixer", {clip: "Attack", loop:"repeat"});
        zombie.chase = false;
        Phealth_count -= 0.05;        
      }

      else{
        zombie.obj.setAttribute("animation-mixer", {clip: "Idle", loop:"repeat"});
        zombie.chase = false;
      }
    }

    if(zombie.Zhealth_count <= 0){
      zombie.obj.setAttribute("animation-mixer", {clip:"FallingBack", loop:"once"});
      zombie.chase = false;
      setTimeout(() => {zombie.obj.remove();}, 1300);
      
    }

    if(Phealth_count > 100){
      Phealth_count = 100;
      console.log(Phealth_count);
      //fix load at less than 100 health
    }
    else if(Phealth_count <= 0){
      Phealth_count = 0;
      //end game
    }
   

      
  }

  for(let bullet of bullets){
    if(bullet){
      bullet.fire();
      bullet.spin();
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