class Bullet{
  constructor(){
   this.a = 0;
   this.shot = false;

    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#bullet");

    this.obj.setAttribute("scale","0.5 0.5 0.5");
    let pos = camera.object3D.position;
    this.obj.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z});
    this.obj.setAttribute("rotation", {x:0, y:5, z:0});
    
    console.log(this.obj.object3D.rotation.y);
    //fix rotation
    //add target challenge
    //think of next challenge

    scene.append(this.obj);
    
    let theta = camera.object3D.rotation.y + Math.PI;
    let phi = camera.object3D.rotation.x;
    let v = 0.1
    let v_xz = v * Math.cos(phi);
    this.dz = v_xz * Math.cos(theta);
    this.dx = v_xz * Math.sin(theta);
    this.dy = v * Math.sin(phi);
  }

  fire(){
    this.obj.object3D.position.x += this.dx;
    this.obj.object3D.position.y += this.dy;
    this.obj.object3D.position.z += this.dz; 

    this.obj.object3D.rotation.y = this.theta - Math.PI/2;
  }


  spin(){
    this.a += 15;
    this.obj.setAttribute("rotation",{x:90, y:0, z:0});
    }


}