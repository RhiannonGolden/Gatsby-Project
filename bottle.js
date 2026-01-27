class Bottle{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = 0;
    this.da = 5;
    this.flag = false;
    this.pickUp = false;
    this.clicked = false;
    
    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#bottle");
    this.obj.setAttribute("scale", "1.5 1.5 1.5");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.obj.setAttribute("rotation",{x:90, y:9, z:0});

    scene.append(this.obj);


    setTimeout(() => {
      this.pickUp = true;
    }, 1000);



  }
  

  spin(){
        this.a += this.da;
        this.obj.setAttribute("rotation",{x:90, y:0, z:this.a});
    }


}