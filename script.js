let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, cursor, zombies = [ ], bullets = [ ], bullets_count = 10, Phealth_count, Phealth_text, Zhealth_count, ammos = [ ], hearts = [ ], followDistance1, followDistance2, followDistance;
let bottles = [ ], bottle_count = 0, bottle_text, collected = [ ], collected_count = 0, puzzles = [ ], rotate, crates = [ ], jump;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  Phealth_text = document.getElementById("Phealth");
  ammo_count = document.getElementById("ammo_count");
  bottle_score = document.getElementById("bottle_score");
  cursor = document.getElementById("cursorID");
  user = document.getElementById("user");


  for(let i = 0; i < 1; i++){
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

   for(let i = 0; i < 10; i++){
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    let a = rnd(0,360);
    ammos.push(new Ammo(x,z,a));
  }

  for(let i = 0; i < 10; i++){
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    let a = rnd(0,360);
    hearts.push(new Hearts(x,z,a));
  }

  for(let i = 0; i < 4; i++){
    let x = rnd(-20, 20);
    let z = rnd(-20, 20);
    let a = rnd(0,360);
    bottles.push(new Bottle(x,0.1,z));
  }



  for(let i = 1; i < 17; i++){
    let x1 = -1.5;
    let y1 = 4.5;

    let random = Math.round( rnd(1,3) );
    if(random == 1){
      rotate = 90;
    } else if(random == 2){
      rotate = 180;
    } else if(random == 3){
      rotate = 270;
    }


    if(i < 5){
      puzzles.push(new Puzzle(x1-1+i, y1, i, rotate));
      
    } else if(i >= 5 && i < 9){
      puzzles.push(new Puzzle(x1-5+i, y1-1, i, rotate));
    } else if(i >= 9 && i < 13){
      puzzles.push(new Puzzle(x1-9+i, y1-2, i, rotate));
    } else if(i >= 13){
      puzzles.push(new Puzzle(x1-13+i, y1-3, i, rotate));
    }
      

  }



  Phealth_count = 75;

  window.addEventListener("keydown",function(e){
    if(e.key == "r" && bullets_count > 0){
      let bullet = new Bullet();
      bullets.push(bullet);
      bullets_count--;
    }
  })






//fix falling through floor physics
//add lamp 3d model
//add green/normal light for lamps
//add hall of pictures






window.addEventListener("keydown",function(e){
  if(e.key == "q"){

    let raycaster = cursor.components.raycaster;
    let rayHit = raycaster.intersections;

    if (rayHit.length > 0) {
      let rayPoint = rayHit[0].point;

      let zRotate = (camera.object3D.rotation.y)*(180/Math.PI);
      
      let crate = new Crate(rayPoint.x,rayPoint.y+1,rayPoint.z,0,0,zRotate);
      crates.push(crate);    
       
    }
  }
});


jump = new Jump(user);
window.addEventListener("keydown",function(e){
  if(e.key == " "){
    jump.start();   
  }
});


swim = new Swim(user);
window.addEventListener("keydown",function(e){
  if(e.key == "t"){
    swim.start();   
  }
});


  
  let pedestals = document.querySelectorAll(".pedestal");

  pedestals.forEach(pedestal => {
    pedestal.hasBottle = false;

    pedestal.addEventListener("click", () => {

      if(bottle_count > 0){
        if(pedestal.hasBottle == false){

          let pos = pedestal.object3D.position;

          let bottle = new Bottle(pos.x, 1.52, pos.z-10.6);
          bottle.collected = true;
          bottle.placed = true;

          bottles.push(bottle);
          bottle_count--;

          pedestal.hasBottle = true;
        }
      }

    });
  });


  
  
  loop();
})


function loop(){

  jump.update();
  swim.update();
  swim.sink();

  Phealth_text.setAttribute("value",`Health: ${Math.round(Phealth_count)}`);
  ammo_count.setAttribute("value", `Ammo: ${(bullets_count)}`);

  if(bottle_count >= 1){
    bottle_score.setAttribute("value", `${(bottle_count)}`);
  } else if(bottle_count <= 0){
    bottle_score.setAttribute("value", `0`);
  }




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

      } 
      else if( (d1 < zombie.followDistance) && (d1 > 1.5) && zombie.speed == 0.03){
        zombie.obj.setAttribute("animation-mixer", {clip: "Run_InPlace", loop:"repeat"});
        zombie.chase = true;
      }
      else if(d1 <= 1.5 && zombie.speed == 0.01 && zombie.PhealthDown == true){
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
    if( (distance(ammo.obj,camera) < 1) && ammo.pickUp==true){
      bullets_count+=5;
      ammo.pickUp = false;
      ammo.obj.remove();
    }
    ammo.spin();
  }



  for(let heart of hearts){
    if( (distance(heart.obj,camera) < 0.75) && heart.pickUp==true && Phealth_count < 100){
      Phealth_count += 5;
      heart.pickUp = false;
      heart.obj.remove();
    }
    heart.spin();
  }


  for(let bottle of bottles){
    bottle.spin();

    if(bottle.placed==false){
      bottle.obj.setAttribute("dynamic-body","");
    }

    if(bottle.placed && bottle.down==false){
      for(let bullet of bullets){
      if(bullet.shot == false && distance(bottle.obj, bullet.obj) < 0.75){
        bullet.shot = true;
        bullet.obj.remove();
        bottle.down = true;
      }
    }
  }
  bottle.shot();
}


for(let puzzle of puzzles){
  puzzle.correctCheck();
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



//game could start in city and need to find the first portel - puts more of a foucs on zombie fighting