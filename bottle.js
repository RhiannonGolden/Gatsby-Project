class Bottle{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.a = 0;
    this.da = 5;
    this.a1 = 0;
    this.da2 = 1.5;

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
    this.key.setAttribute("scale", "0.15 0.15 0.15");
    this.obj.setAttribute("rotation",{x:0, y:90, z:0});
    this.key.classList.add("clickable");

    this.key_table = document.createElement("a-gltf-model");
    this.key_table.setAttribute("position", "10 0 0");
    this.key_table.setAttribute("src","#key_table");
    this.key_table.setAttribute("scale", "0.01 0.01 0.01");

    this.keySet = document.createElement("a-entity");
    this.keySet.append(this.key);
    this.keySet.append(this.key_table);

    this.keySet.setAttribute("visible", false);
    this.keySet.setAttribute("position", "5 -2 0");
    this.keySet.setAttribute("shadow",{receive:true})
    this.keySet.setAttribute("static-body","");
    scene.append(this.keySet);
    


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



    this.key.addEventListener("click", ()=> {
      if(this.completed1){
        this.keyCollected = true;  
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


  unlocked(){
    this.keySet.setAttribute("visible", true);

    this.a += this.da2;
    this.key.setAttribute("rotation",{x:0, y:this.a, z:0});
  }



  up(){
    if(this.keySet.object3D.position.y < 0){
      this.keySet.object3D.position.y += 0.05;
    } else{
      this.keySet.object3D.position.y = 0;
    }
    
  }


}