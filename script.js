let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, zombies = [], bullets = [], ammo_count = 5, Phealth_count = 100, Phealth_text, Zhealth_count, Zhealth_text, speed, xRotate, yRotate, zRotate;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  Zhealth_text = document.getElementById("Zhealth");
  Phealth_text = document.getElementById("Phealth");

  for(let i = 0; i < 1; i++){
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
    let zombie = new Zombie(0,0.5,-7,Zhealth_count,speed);
    zombies.push(zombie);
  }


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

   
  for(let zombie of zombies){
    zombie.follow(camera);

    xRotate = zombie.obj.object3D.position.x;
    yRotate = zombie.obj.object3D.position.y;
    zRotate = zombie.obj.object3D.position.z;

    Zhealth_text.setAttribute("value",`Health: ${zombie.Zhealth_count}`);
    Zhealth_text.setAttribute("position",{x:zombie.x-0.5,y:zombie.y+2.25,z:zombie.z});
    Zhealth_text.setAttribute("rotation",{x:xRotate,y:yRotate,z:zRotate});
    //fix zombie health text rotating with zombie

    Phealth_text.setAttribute("value",`Health: ${Phealth_count}`);
  

    for(let bullet of bullets){

      let d2 = distance(zombie.obj, bullet.obj);
      if(d2 < 3 && bullet.shot == false){
        zombie.Zhealth_count -= 20;
        bullet.shot = true;
        console.log(zombie.Zhealth_count);
        bullet.obj.remove();
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
        //round to nearest whole number for player health
        
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
      Zhealth_text.setAttribute("position",{x:0,y:-99999,z:0});
      
    }

    if(Phealth_count > 100){
      Phealth_count = 100;
      //fix load at less than 100 health
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