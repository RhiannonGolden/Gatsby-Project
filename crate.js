class Crate{
  constructor(x,y,z,placed){
    //this.obj.setAttribute("static-body","");
    this.placed = placed;
    this.x = x;
    this.y = y;
    this.z = z;

    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#crate");
    this.obj.setAttribute("scale", "2 2 2");

    this.obj.classList.add("clickable");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    
    scene.append(this.obj);




    this.obj.addEventListener("click",()=>{
      this.obj.remove();
      
      
    })


  }
}