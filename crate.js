class Crate{
  constructor(x,y,z,placed,xRotate,yRotate,zRotate){
    this.placed = placed;
    this.x = x;
    this.y = y;
    this.z = z;
    this.xRotate = xRotate;
    this.yRotate = yRotate;
    this.zRotate = zRotate;


    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#crate");
    this.obj.setAttribute("scale", "1.55 1.30 1.55");

    this.obj.setAttribute("sound",{src: "#woodBreak", loop:false});
    
    this.obj.setAttribute("position",{x:this.x,y:this.y-0.55,z:this.z});
    this.obj.setAttribute("rotation",{x:this.xRotate,y:this.yRotate,z:this.zRotate});

    this.obj.setAttribute("static-body","");
    this.obj.classList.add("clickable");
  
    scene.append(this.obj);


    this.obj.addEventListener("click",()=>{
      this.obj.remove();
      this.obj.components.sound.currentTime = 0;
      this.obj.components.sound.playSound();
    })


  }
}