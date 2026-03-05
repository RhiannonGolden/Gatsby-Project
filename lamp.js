class Lamp{
  constructor(x,y,z,lampColor){
    this.strength = 4;
    this.dl = 4;
    this.lampColor = lampColor;

    this.greenOn = false;
    this.yellowOn = false;
    this.completed1 = false;
    this.completed2 = false;


    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#lamp");
    this.obj.setAttribute("scale", "0.015 0.015 0.015");
    this.obj.classList.add("clickable");
    
    this.glowLight = document.createElement("a-entity");
    this.glowLight.setAttribute("position","0 -1.5 0");
    this.glowLight.setAttribute("radius-bottom", 12.5);
    this.glowLight.setAttribute("light", `type: point; color: ${this.lampColor}; intensity: 0; distance: 15; decay: 2; castShadow: true`);
    //this.glowLight.setAttribute("light", "type: point; color: this.lampColor, intensity: 0; distance: 15, decay: 2, castShadow: true");
    this.obj.append(this.glowLight);


    this.cone = document.createElement("a-cone");
    this.cone.setAttribute("position","0 -100 0");
    this.cone.setAttribute("radius-top", 12.5);
    this.cone.setAttribute("radius-bottom",50);
    this.cone.setAttribute("height", 190);
    this.cone.setAttribute("opacity", 0);
    this.cone.setAttribute("material", {emissive: this.lampColor});
    this.obj.append(this.cone);


    this.obj.onclick = ()=>{
      this.strength += this.dl;
      this.dl = -this.dl;

      this.glowLight.setAttribute("light",{intensity:this.strength});
      
      if(this.strength == 4){
        this.cone.setAttribute("opacity", 0);
        this.cone.setAttribute("material", {emissiveIntensity:0});
      }

      else if(this.strength == 8){
        this.cone.setAttribute("opacity", 0.075);
        this.cone.setAttribute("material", {emissiveIntensity:2});  
      }

    }

    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);
  }

  checkOn(){
    if(this.lampColor == "#27df27" && this.strength == 4){
      this.greenOn = false;
    }
    else if(this.lampColor == "#27df27" && this.strength == 8){
      this.greenOn = true;
    }
    else if(this.lampColor == "#b3ca4d" && this.strength == 4){
      this.yellowOn = false;
    }
    else if(this.lampColor == "#b3ca4d" && this.strength == 8){
      this.yellowOn = true;
    }


    if(this.greenOn && this.yellowOn == false){
      this.completed1 = true;
    }
    else{
      this.completed1 = false;
    }

    
  }


}

//since each lamp in script is checking itself, change to green on or yellow off for each lamp -> completed is true when green on or yellow off