class Bottle{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.a = 0;
    this.da = 5;
    this.a1 = 0;

    this.flag = false;
    this.pickUp = false;
    this.collected = false;
    this.placed = false;
    this.down = false;
    
    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#bottle");
    this.obj.classList.add("clickable");
    this.obj.setAttribute("scale", "2 2.25 2");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.obj.setAttribute("rotation",{x:0, y:9, z:0});

  

    scene.append(this.obj);


    setTimeout(() => {
      this.pickUp = true;
    }, 1000);


    this.obj.addEventListener("click", ()=> {
      if(this.pickUp && this.collected==false && this.placed==false && distance(this.obj, camera) < 3){
        this.collected = true;
        bottle_count++;
        this.obj.remove();        
      }
    });



  }
  

  spin(){
    if(this.down==false && this.placed){
      this.a += this.da;
      this.obj.setAttribute("rotation",{x:0, y:this.a, z:0});
    }
  }


  shot(){
    if(this.down && this.a1 > -90){
      this.a1 -= this.da;
      this.obj.setAttribute("rotation",{x:this.a1, y:0, z:0});


    }
  }


}