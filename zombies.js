class Zombie{
  constructor(x,y,z,Zhealth_count,speed){
    this.x = x;
    this.y = y;
    this.z = z;
    this.Zhealth_count = Zhealth_count;
    this.speed = speed;
    this.chase = false;

    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#zombie");
    this.obj.setAttribute("animation-mixer", {clip: "Idle", loop:"repeat"});
    this.obj.setAttribute("scale", "1.25 1 1.25");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});

    scene.append(this.obj);
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

  

}