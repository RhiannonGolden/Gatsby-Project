class Zombie{
  constructor(x,y,z,Zhealth_count,speed){
    this.x = x;
    this.y = y;
    this.z = z;
    this.Zhealth_count = Zhealth_count;
    this.speed = speed;
    this.chase = false;
    this.down = false;
    this.die = false;

    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#zombie");
    this.obj.setAttribute("animation-mixer", {clip: "Idle", loop:"repeat"});
    this.obj.setAttribute("scale", "1.25 1 1.25");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});    

    scene.append(this.obj);


    this.healthText = document.createElement("a-text");
    this.healthText.setAttribute("value",Math.round(this.Zhealth_count));
    this.healthText.setAttribute("position", "-0.2 2.25 0");
    this.healthText.setAttribute("look-at", "[camera]");
    this.healthText.setAttribute("color", "black");

    this.obj.append(this.healthText);
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

  

}