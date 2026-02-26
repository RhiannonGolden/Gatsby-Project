class Ammo{
  constructor(x,z,a){
    this.x = x;
    this.z = z;
    this.a = a;
    this.da = 2.5;
    this.flag = false;
    this.pickUp = false;
    
    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#ammo");
    this.obj.setAttribute("scale", "7 7 7");
    this.obj.setAttribute("position",{x:this.x,y:0,z:this.z});    

    scene.append(this.obj);


    setTimeout(() => {
      this.pickUp = true;
    }, 1000);

  }



  spin(){
    this.a += this.da;
    this.obj.setAttribute("rotation",{x:0, y:this.a, z:0});
  }


}