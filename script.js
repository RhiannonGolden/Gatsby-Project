let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, zombies = [], bullets = [], bullets_count = 5, Phealth_count, Phealth_text, Zhealth_count, ammos = [ ], hearts = [ ], followDistance1, followDistance2, followDistance;
let bottles = [], bottle_count = 0, bottle_text, collected = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  Phealth_text = document.getElementById("Phealth");
  ammo_count = document.getElementById("ammo_count");

  for(let i = 0; i < 0; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    Zhealth_count = rnd(1, 10);
    let idleRotate = rnd(0, 360);
    let idleSpeed = rnd(35, 150) / 10000;
    let walkTime = rnd(1000, 10000);
    let stoptime = rnd(1000, 10000);
    followDistance1 = rnd(5, 8);
    followDistance2 = rnd(7, 12);

    if(Zhealth_count < 7){
      Zhealth_count = 50;
      speed = 0.01;
      followDistance = followDistance1;
      
    } else{
      Zhealth_count = 100;
      speed = 0.03
      followDistance = followDistance2;
    
    }
    let zombie = new Zombie(x,0.5,z,Zhealth_count,speed, idleRotate, idleSpeed, walkTime, stoptime, followDistance);

    zombies.push(zombie);
  }

   for(let i = 0; i < 0; i++){
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    ammos.push(new Ammo(x,z));
  }

  for(let i = 0; i < 0; i++){
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    hearts.push(new Hearts(x,z));
  }

  for(let i = 0; i < 10; i++){
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    bottles.push(new Bottle(x,1,z));
  }


  Phealth_count = 75;


  window.addEventListener("keydown",function(e){
    if(e.key == " " && bullets_count > 0){
      let bullet = new Bullet();
      bullets.push(bullet);
      bullets_count--;
    }
  })
  
  loop();
})

function loop(){
  Phealth_text.setAttribute("value",`Health: ${Math.round(Phealth_count)}`);
  ammo_count.setAttribute("value", `Ammo: ${(bullets_count)}`);
  //fix text from going into the floor and disappearing

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
      if( (d1 < zombie.followDistance) && (d1 > 2) && zombie.speed == 0.01){
        zombie.obj.setAttribute("animation-mixer", {clip: "Walk_InPlace", loop:"repeat"});
        zombie.chase = true;

      } 
      else if( (d1 < zombie.followDistance) && (d1 > 2) && zombie.speed == 0.03){
        zombie.obj.setAttribute("animation-mixer", {clip: "Run_InPlace", loop:"repeat"});
        zombie.chase = true;
      }
      else if(d1 < 2 && zombie.speed == 0.01 && zombie.PhealthDown == true){
        zombie.obj.setAttribute("animation-mixer", {clip: "Attack", loop:"repeat"});
        zombie.chase = false;
        Phealth_count -= 0.025;       
      }
      else if(d1 < 2 && zombie.speed == 0.03 && zombie.PhealthDown == true){
        zombie.obj.setAttribute("animation-mixer", {clip: "Attack", loop:"repeat"});
        zombie.chase = false;
        Phealth_count -= 0.05;        
      }
      else{
        zombie.chase = false;
        zombie.idle = true;

        zombie.idleMove();
        zombie.idleStop();
      }
    }

    if(zombie.Zhealth_count <= 0 && zombie.die==false){
      zombie.obj.setAttribute("animation-mixer", {clip:"FallingBack", loop:"once"});
      zombie.chase = false;
      zombie.die = true;
      setTimeout(() => {zombie.obj.remove();}, 1300);
      
    }


    if(Phealth_count <= 0){
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



  for(let ammo of ammos){
    if( (distance(ammo.obj,camera) < 3) && ammo.pickUp==true){
      bullets_count+=2;
      ammo.pickUp = false;
      ammo.obj.remove();
    }
    //ammo.spin();
  }



  for(let heart of hearts){
    if( (distance(heart.obj,camera) < 3) && heart.pickUp==true && Phealth_count < 100){
      Phealth_count += 5;
      heart.pickUp = false;
      heart.obj.remove();
    }
    heart.spin();
  }


  for(let bottle of bottles){
    //bottle.spin();
    if( (distance(bottle.obj, camera) < 5) && bottle.pickUp==true){
      bottle_count += 1;
      bottle.pickUp = false;
      console.log(bottle_count);
    }

    if(bottle_count >= 1){
      collected.push(new Bottle(0, 3, -2));
    }
  }
  

  //change to timeout(?)
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