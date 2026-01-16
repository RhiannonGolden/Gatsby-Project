class Ammo{
  constructor(x,z){
    this.x = x;
    this.z = z;
    this.a = 0;
    this.da = 5;
    this.flag = false;
    this.pickUp = false;
    
    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#ammo1");
    this.obj.setAttribute("scale", "0.05 0.05 0.05");
    this.obj.setAttribute("position",{x:this.x,y:0,z:this.z});    

    scene.append(this.obj);


    setTimeout(() => {
      this.pickUp = true;
    }, 1000);

  }



  spin(){
        this.a += this.da;
        this.obj.setAttribute("rotation",{x:0, y:0, z:0});
        //fix spin
    }


}