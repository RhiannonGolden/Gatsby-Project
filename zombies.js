class Zombie{
  constructor(x,y,z,Zhealth_count,speed,idleRotate, idleSpeed, walkTime, stopTime){
    this.x = x;
    this.y = y;
    this.z = z;
    this.Zhealth_count = Zhealth_count;
    this.speed = speed;
    this.chase = false;
    this.down = false;
    this.die = false;
    this.PhealthDown = false;

    this.idle = true;
    this.idleWalk = true;
    this.idleRotate = idleRotate;
    this.idleSpeed = idleSpeed;
    this.walkTime = walkTime;
    this.stopTime = stopTime;

    this.chooseWalkTime = true;
    this.chooseStopTime = false;


    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#zombie");
    this.obj.setAttribute("scale", "1.25 1 1.25");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});    

    scene.append(this.obj);


    this.healthText = document.createElement("a-text");
    this.healthText.setAttribute("value",Math.round(this.Zhealth_count));
    this.healthText.setAttribute("position", "-0.2 2.25 0");
    this.healthText.setAttribute("look-at", "[camera]");
    this.healthText.setAttribute("color", "black");

    this.obj.append(this.healthText);

    setTimeout(() => {
      this.PhealthDown = true;
    }, 1000);
  }

  angleTo(that){
    let dx = that.object3D.position.x - this.obj.object3D.position.x;
    let dz = that.object3D.position.z - this.obj.object3D.position.z;

    this.angle = Math.atan(dx/dz)
    if(dz < 0){
        this.angle += Math.PI;
    }

  }

  rotateTowards(that){
    this.angleTo(that);
    this.obj.object3D.rotation.y = this.angle;
  }

  follow(camera){
    if(this.chase){
    
      this.rotateTowards(camera);

      let move = this.obj.object3D.rotation.y;

      this.x = this.obj.object3D.position.x += Math.sin(move) * this.speed;
      this.z = this.obj.object3D.position.z += Math.cos(move) * this.speed;
    }
  }


  healthDown(){
    if(this.down){
      this.Zhealth_count -= 20;
      if(this.Zhealth_count < 0){
        this.Zhealth_count = 0;
      }
      this.healthText.setAttribute("value",Math.round(this.Zhealth_count));
    }
  }


  idleMove(){

    console.log(this.walkTime);
    if(this.idle && this.chase == false && this.idleWalk){

      this.obj.object3D.rotation.y = this.idleRotate;

      this.x += Math.sin(this.idleRotate) * this.idleSpeed;
      this.z += Math.cos(this.idleRotate) * this.idleSpeed;

      this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});  
      this.obj.setAttribute("animation-mixer", {clip: "Walk_InPlace", loop:"repeat"});

      if(this.chooseWalkTime){
        this.chooseWalkTime = false;

        this.walkTime = rnd(1000, 10000);

        setTimeout(() => {
          this.idleWalk=false;
          this.chooseStopTime=true;
        }, this.walkTime);
    }
  }
}
      /*
      //this.walkTime = rnd(2000, 10000);
      if(this.chooseWalkTime){
        //this.walkTime = rnd(2000, 10000);
        setTimeout(() => {this.chooseWalkTime = false;}, 1);
      }
      */

  

  idleStop(){
    //console.log(this.stopTime);

    if(this.idle && this.chase == false && this.idleWalk == false){
      
      
      this.obj.setAttribute("animation-mixer", {clip: "Idle", loop:"repeat"});
      if(this.chooseStopTime){
        this.chooseStopTime = false;

        this.stopTime = rnd(1000, 10000);

        setTimeout(() => {
          this.idleWalk = true;
          this.chooseWalkTime = true;

          this.idleRotate = rnd(0, 360);
          this.idleSpeed = rnd(1, 25) / 1000;
        }, this.stopTime);
      }
    }
  }
      

      


/*
      setTimeout(() => {
        this.idleWalk = true; this.chooseWalkTime = true;
      }, this.stopTime);
      
    }
      */
  


  

}

/*
if(this.chooseStopTime){
        //this.stopTime = rnd(2000, 10000);
        setTimeout(() => {this.chooseStopTime = false;}, 1);
      }





      if(this.chooseStopTime){
        if(this.stopTime > 1000){
          this.stopTime -= rnd(1000,10000);
        } else if(this.stopTime < 4000){
           this.stopTime += rnd(1000,10000);
        }
       
        
        setTimeout(() => {this.chooseStopTime = false;}, 100);
      }
        */