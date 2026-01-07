class Zombie{
  constructor(x,y, z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#zombie");
    this.obj.setAttribute("animation-mixer","");
    this.obj.setAttribute("scale", "0.05 0.05 0.05");


    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});

    scene.append(this.obj);
  }

  angleTo(that){
    let dx = that.object3D.position.x - this.obj.object3D.position.x;
    let dz = that.object3D.position.z - this.obj.object3D.position.z;

    this.angle = Math.atan(dx/dz)
    if(dz < 0){
        this.angle += Math.PI
    }

    this.position = Math.atan(dx/dz)
    if(dz < 0){
        this.position += 0.001;
    }

  }


  rotateTowards(that){
    this.angleTo(that);
    this.obj.object3D.rotation.y = this.angle;
    this.obj.object3D.position.x = this.position;
  }


  follow(){
    this.rotateTowards(camera);
  }
}