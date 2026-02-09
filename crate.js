class Crate{
  constructor(x,y,z,placed,xRotate,yRotate,zRotate){
    //this.obj.setAttribute("static-body","");
    this.placed = placed;
    this.x = x;
    this.y = y;
    this.z = z;
    this.xRotate = xRotate;
    this.yRotate = yRotate;
    this.zRotate = zRotate;


    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#crate");
    this.obj.setAttribute("scale", "2 2 2");

    this.obj.classList.add("clickable");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.obj.setAttribute("rotation",{x:this.xRotate,y:this.yRotate,z:this.zRotate});

    this.obj.setAttribute("dynamic-body","");
    
    scene.append(this.obj);




    this.obj.addEventListener("click",()=>{
      this.obj.remove();
    })


  }
}