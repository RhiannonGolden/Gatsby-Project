class Puzzle{
  constructor(x,y,src,rotate){
    this.x = x;
    this.y = y;
    this.src = src;
    this.rotate = rotate;
    this.click = false;
    this.correct = false;
    this.completed1 = false;
    
    this.obj = document.createElement("a-box");
    this.obj.setAttribute("src",`pictures/puzzle${src}.jpg`);
    this.obj.classList.add("clickable");
    this.obj.setAttribute("width", 1);
    this.obj.setAttribute("height", 1);
    this.obj.setAttribute("depth", 0.1);
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:-6.94});
    this.obj.setAttribute("rotation",{x:0, y:0, z:this.rotate});

    this.obj.setAttribute("sound",{src: "#puzzleMove", loop:false});

    scene.append(this.obj);



    this.obj.addEventListener("click", ()=> {
      if(this.click == false && this.correct == false){

        this.obj.components.sound.currentTime = 0;
        this.obj.components.sound.playSound();

        this.rotate += 90;
        this.obj.setAttribute("rotation",{x:0, y:0, z:this.rotate});

        
      }
    });

  }

  correctCheck(){
    if(this.correct==false){
      this.obj.setAttribute("color", "rgb(255, 128, 128)");
    }
    if(this.rotate==0 || this.rotate==360){
      this.correct = true;
      this.obj.setAttribute("color", "white");
    }


  }
  



}