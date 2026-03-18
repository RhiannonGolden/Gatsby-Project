let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, cursor, zombies = [ ], bullets = [ ], bullets_count = 10, Phealth_count, Phealth_text, Zhealth_count, ammos = [ ], hearts = [ ], followDistance1, followDistance2, followDistance;
let crates = [ ], jump, lamps = [], lampCompletedTime = 0, lampsOn = false;
let level3Key, level3Completed = false, level3KeySpawn = false, level3Teleport = false, level3Teleported = false, level3KeySoundPlayed = false;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  Phealth_text = document.getElementById("Phealth");
  ammo_count = document.getElementById("ammo_count");
  cursor = document.getElementById("cursorID");
  user = document.getElementById("user");



  for(let i = 0; i < 10; i++){
    let x = rnd(-40,40);
    let z = rnd(-30,30);
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

    let zombie = new Zombie(x,0,z,Zhealth_count,speed, idleRotate, idleSpeed, walkTime, stoptime, followDistance);

    zombies.push(zombie);
  }

   for(let i = 0; i < 7; i++){
    let x = rnd(-30, 30);
    let z = rnd(-30, 30);
    let a = rnd(0,360);
    ammos.push(new Ammo(x,z,a));
  }

  for(let i = 0; i < 7; i++){
    let x = rnd(-30, 30);
    let z = rnd(-30, 30);
    let a = rnd(0,360);
    hearts.push(new Hearts(x,z,a));
  }



lamps.push(new Lamp(rnd(-20,20), 3, rnd(-20,20), "#27df27"));

let totalLamps = 5;
for(let i = 1; i < totalLamps; i++){
  let x, z;
  let safe = false;


  for(let a = 0; a < 20; a++){
    x = rnd(-20,20);
    z = rnd(-20,20);
    safe = true;

    for(let lamp of lamps){
      let lampX = lamp.obj.object3D.position.x;
      let lampZ = lamp.obj.object3D.position.z;
      let d = Math.sqrt((x - lampX)**2 + (z - lampZ)**2);
      if(d < 5){
        safe = false;
        break;
      }
    }

    if(safe) break;
  }


  let lampColorRnd = rnd(1,10);
  let lampColor;
  if(lampColorRnd > 5){
    lampColor = "#27df27";
  } else {
    lampColor = "#b3ca4d";
  }


  lamps.push(new Lamp(x, 3, z, lampColor));
}



  Phealth_count = 75;

  throwSound = document.getElementById("throwSound");
  throwSound.loop = false;
  throwSound.volume = 1;
  window.addEventListener("keydown",function(e){
    if(e.key == "r" && bullets_count > 0){
      let bullet = new Bullet();
      bullets.push(bullet);
      bullets_count--;
      throwSound.play();
    }
  });


  walkSound = document.getElementById("walkSound");
  walkSound.loop = true;
  walkSound.volume = 0.4;
  let wDown = false, aDown = false, sDown = false, dDown = false;

  window.addEventListener("keydown",function(e){
    if(e.key == "w"){
      wDown = true;
      walkSound.play();
    } else if(e.key == "a"){
      aDown = true;
      walkSound.play();
    }
    else if(e.key == "s"){
      sDown = true;
      walkSound.play();
    }
    else if(e.key == "d"){
      dDown = true;
      walkSound.play();
    }
  });


    window.addEventListener("keyup",function(e){
    if(e.key == "w"){
      wDown = false;
      walkSound.pause();
      walkSound.currentTime = 0;
    } else if(e.key == "a"){
      aDown = false;
      walkSound.pause(); 
      walkSound.currentTime = 0;
    }
    else if(e.key == "s"){
      sDown = false;
      walkSound.pause(); 
      walkSound.currentTime = 0;
    }
    else if(e.key == "d"){
      dDown = false;
      walkSound.pause(); 
      walkSound.currentTime = 0;
    }
  });




cratePlace = document.getElementById("cratePlace");
cratePlace.loop = false;
cratePlace.volume = 0.5;
window.addEventListener("keydown",function(e){
  if(e.key == "q"){

    let raycaster = cursor.components.raycaster;
    let rayHit = raycaster.intersections;

    if (rayHit.length > 0) {
      let rayPoint = rayHit[0].point;

      let zRotate = (camera.object3D.rotation.y)*(180/Math.PI);
      
      let crate = new Crate(rayPoint.x,rayPoint.y+1,rayPoint.z,0,0,zRotate);
      crates.push(crate);  
      
      cratePlace.currentTime = 0;
      cratePlace.play();  
       
    }
  }
});


jumpSound = document.getElementById("jumpSound");
jumpSound.loop = false;
jumpSound.volume = 0.5;

jump = new Jump(user);
window.addEventListener("keydown",function(e){
  if(e.key == " "){
    jump.start();   
    setTimeout(() => {jumpSound.play();}, 200);
    
  }
});



  level3Key = new Key(15,0,0);



  zombieAttackSound = document.getElementById("zombieAttackSound");
  zombieAttackSound.loop = true;
  zombieAttackSound.volume = 0.20;

  itemCollect = document.getElementById("itemCollect");
  itemCollect.loop = false;
  itemCollect.volume = 0.25;

  tableUp = document.getElementById("tableUp");
  tableUp.loop = false;
  tableUp.volume = 1;

  music = document.getElementById("music");
  music.loop = true;
  music.volume = 1;
  
  loop();
})


function loop(){
  if(music.paused){
    music.play();
  }

  jump.update();


  Phealth_text.setAttribute("value",`Health: ${Math.round(Phealth_count)}`);
  ammo_count.setAttribute("value", `Ammo: ${(bullets_count)}`);



  for(let zombie of zombies){
    zombie.follow(camera);    

    for(let bullet of bullets){

      let d2 = distance(zombie.obj, bullet.obj);
      if(d2 < 1.85 && bullet.shot == false){
        zombie.Zhealth_count -= 20;
        bullet.shot = true;
        zombie.down = true;
        bullet.obj.remove();
        zombie.healthDown();

      }
    }

    let d1 = distance(zombie.obj, camera);

    if(zombie.Zhealth_count > 0){
      if( (d1 < zombie.followDistance) && (d1 > 1.5) && zombie.speed == 0.01){
        zombie.obj.setAttribute("animation-mixer", {clip: "Walk_InPlace", loop:"repeat"});
        zombie.chase = true;
        zombie.obj.components.sound.playSound();
        zombieAttackSound.currentTime = 0;
        zombieAttackSound.pause();
      } 
      else if( (d1 < zombie.followDistance) && (d1 > 1.5) && zombie.speed == 0.03){
        zombie.obj.setAttribute("animation-mixer", {clip: "Run_InPlace", loop:"repeat"});
        zombie.chase = true;
        zombie.obj.components.sound.playSound();
        zombieAttackSound.currentTime = 0; 
        zombieAttackSound.pause();
      }
      else if(d1 <= 1.5 && zombie.speed == 0.01 && zombie.PhealthDown == true){
        zombie.obj.setAttribute("animation-mixer", {clip: "Attack", loop:"repeat"});
        zombie.chase = false;
        Phealth_count -= 0.025;  
        zombieAttackSound.play();  
        zombie.obj.components.sound.stopSound();   
      }
      else if(d1 < 2 && zombie.speed == 0.03 && zombie.PhealthDown == true){
        zombie.obj.setAttribute("animation-mixer", {clip: "Attack", loop:"repeat"});
        zombie.chase = false;
        Phealth_count -= 0.05;
        zombieAttackSound.play();   
        zombie.obj.components.sound.stopSound();     
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
      window.location="lose.html";
    }
      
  }

  for(let bullet of bullets){
    if(bullet){
      bullet.fire();
      bullet.spin();
    }
  }



  for(let ammo of ammos){
    if( (distance(ammo.obj,camera) < 1) && ammo.pickUp==true){
      itemCollect.currentTime = 0;
      itemCollect.play();
      bullets_count+=5;
      ammo.pickUp = false;
      ammo.obj.remove();
    }
    ammo.spin();
  }



  for(let heart of hearts){
    if( (distance(heart.obj,camera) < 0.75) && heart.pickUp==true && Phealth_count < 100){
      itemCollect.currentTime = 0;
      itemCollect.play();
      Phealth_count += 5;
      heart.pickUp = false;
      heart.obj.remove();
    }
    heart.spin();
  }

  

for(let lamp of lamps){
  if(lamp.lampColor == "#27df27"){
     if(lamp.strength == 4){
          lampsOn = false;
        }
        else if(lamp.strength == 8){
          lampsOn = true;
        }
  }
  else if(lamp.lampColor == "#b3ca4d"){
     if(lamp.strength == 4){
          lampsOn = true;
        }
        else if(lamp.strength == 8){
          lampsOn = false;
        }
  }

  if(lampsOn){
    lampCompletedTime++;
  }
  else if(lampsOn == false){
    lampCompletedTime = 0;
  }

  if(lampCompletedTime > 200){
    lamp.completed1 = true;
  }


  if(lamp.completed1 && level3KeySpawn == false){
    level3Key.unlock();
    level3Key.completed1 = true;
    level3KeySpawn = true;
  }


  if(level3KeySpawn){
    level3Key.up();

    if(level3KeySoundPlayed == false){
      tableUp.currentTime = 0;
      tableUp.play();
      level3KeySoundPlayed = true;
    }


    if(level3Key.keyCollected){
      Door2 = this.document.getElementById("level3D");
          Door2.addEventListener("click",function(){
            window.location="Level3.html";
          })
    }
    
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