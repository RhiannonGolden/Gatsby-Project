class Key{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.a = 0;
    this.da = 0.25;
    
    this.completed1 = false;
    this.keyCollected = false;
    


    this.key = document.createElement("a-gltf-model");
    this.key.setAttribute("position", "10 1 0");
    this.key.setAttribute("src","#key");
    this.key.setAttribute("scale", "0.15 0.15 0.15");
    this.key.classList.add("clickable");
    

    this.key_table = document.createElement("a-gltf-model");
    this.key_table.setAttribute("position", "10 0 0");
    this.key_table.setAttribute("src","#key_table");
    this.key_table.setAttribute("scale", "0.01 0.01 0.01");
    //this.key_table.classList.add("clickable");
    

    this.keySet = document.createElement("a-entity");
    this.keySet.append(this.key);
    this.keySet.append(this.key_table);

    this.keySet.setAttribute("visible", false);
    this.keySet.setAttribute("position",{x:this.x, y:-2, z:this.z});
    this.keySet.setAttribute("shadow",{receive:true})
    this.keySet.setAttribute("static-body","");
    //this.keySet.classList.add("clickable");
    
    scene.append(this.keySet);


    
    




    this.key.addEventListener("click", ()=> {
      if(this.completed1 && this.keyCollected == false){
        this.keyCollected = true;
        this.keySet.remove(); 
      }
    });



  }
  

  unlock(){
    this.keySet.setAttribute("visible", true);
  }



  up(){
    let pos = this.keySet.getAttribute("position");
    if(pos.y < 0){
      pos.y += 0.001;
      this.keySet.setAttribute("position", pos);
    }
    
    else if(pos.y >= 0){
      pos.y = 0;
      this.keySet.setAttribute("position", pos);

      this.a += this.da;
      this.key.setAttribute("rotation",{x:0, y:this.a, z:0});
    }
    
  }


  teleport(who, newX, newY, newZ){
    who.setAttribute("position",{x:newX, y:newY, z:newZ});
  }


}