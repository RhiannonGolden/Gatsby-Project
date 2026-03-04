class Lamp{
  constructor(x,y,z,lampColor){
    this.strength = 4;
    this.dl = 4;
    this.lampColor = lampColor;
    this.coneGlow = 0;
    


    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#lamp");
    this.obj.setAttribute("scale", "0.015 0.015 0.015");
    this.obj.classList.add("clickable");
    
    this.glowLight = document.createElement("a-entity");
    this.glowLight.setAttribute("position","0 -1.5 0");
    this.glowLight.setAttribute("radius-bottom", 12.5);

    this.glowLight.setAttribute("light", "type: point; color: this.lampColor, intensity: 0; distance: 15, decay: 2, castShadow: true");
    
    this.obj.append(this.glowLight);


    this.cone = document.createElement("a-cone");
    this.cone.setAttribute("position","0 -100 0");
    this.cone.setAttribute("radius-top", 12.5);
    this.cone.setAttribute("radius-bottom",50);
    this.cone.setAttribute("height", 190);
    this.cone.setAttribute("opacity", 0);
    this.obj.append(this.cone);
    
    

    this.obj.onclick = ()=>{
      this.strength += this.dl;
      this.dl = -this.dl;

      this.glowLight.setAttribute("light",{intensity:this.strength});
      this.cone.setAttribute("material", {emissive: this.lampColor, emissiveIntensity:2});
      
      if(this.strength == 4){
        this.cone.setAttribute("opacity", 0.1);
      }
      else if(this.strength == 0){
        this.cone.setAttribute("opacity", 0);
      }
    }

    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);
  }
}