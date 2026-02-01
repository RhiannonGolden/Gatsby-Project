class Puzzle{
  constructor(src, rotate){
    this.src = src;
    this.rotate = rotate;
    
    this.obj = document.createElement("a-box");
    this.obj.setAttribute("src",src);
    this.obj.classList.add("clickable");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.obj.setAttribute("rotation",{x:0, y:9, z:0});

    scene.append(this.obj);


    setTimeout(() => {
      this.pickUp = true;
    }, 1000);


    this.obj.addEventListener("click", ()=> {
      if(this.pickUp && this.collected==false && this.placed==false && distance(this.obj, camera) < 5){
        this.collected = true;
        bottle_count++;
        this.obj.remove();        
      }
    });


  }
  

  spin(){
    if(this.down==false){
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