class Puzzle{
  constructor(x,y,src,rotate){
    this.x = x;
    this.y = y;
    this.src = src;
    this.rotate = rotate;
    this.click = false;
    
    this.obj = document.createElement("a-box");
    this.obj.setAttribute("src",`pictures/puzzle${src}.jpg`);
    this.obj.setAttribute("width", 1);
    this.obj.setAttribute("height", 1);
    this.obj.setAttribute("depth", 0.1);
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:-6.94});
    this.obj.setAttribute("rotation",{x:0, y:0, z:this.rotate});

    scene.append(this.obj);



    this.obj.addEventListener("click", ()=> {
      if(this.click == false){
        this.rotate + 90;
        this.obj.setAttribute("rotation",{x:0, y:0, z:this.rotate});
        this.click = true;
      }
    });

  }
  



}