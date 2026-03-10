class Key{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.a = 0;
    this.da = 1;
    this.flag = false;
    this.pickUp = false;
    this.collected = false;
    this.placed = false;
    this.down = false;
    this.completed1 = false;
    this.keyCollected = false;
    

    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#bottle");
    this.obj.classList.add("clickable");
    this.obj.setAttribute("scale", "2 2.25 2");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.obj.setAttribute("rotation",{x:0, y:9, z:0});
    this.obj.setAttribute("shadow",{receive:true})

    scene.append(this.obj);


    this.key = document.createElement("a-gltf-model");
    this.key.setAttribute("position", "10 1 0");
    this.key.setAttribute("src","#key");
    this.key.setAttribute("scale", "0.25 0.25 0.25");
    this.obj.setAttribute("rotation",{x:0, y:90, z:0});
    this.key.setAttribute("visible", true);
    this.key.classList.add("clickable");

    scene.append(this.key);
    


    setTimeout(() => {
      this.pickUp = true;
    }, 1000);






    this.key.addEventListener("click", ()=> {
      if(this.completed1){
        this.keyCollected = true;  
      }
    });

  }
  



  unlocked(){
      this.key.setAttribute("visible", true);
      this.a += this.da;
      this.key.setAttribute("rotation",{x:0, y:this.a, z:0});
  }


}