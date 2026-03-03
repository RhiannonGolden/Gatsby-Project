class Lamp{
  constructor(x,y,z,lampColor){
    this.strength = 4;
    this.dl = 4;
    this.lampColor = lampColor;


    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#lamp");
    this.obj.setAttribute("scale", "0.015 0.015 0.015");

    
    this.bulb = document.createElement("a-cone");
    this.bulb.setAttribute("position","0 1 4");
    this.bulb.setAttribute("radius-bottom",10.5);
    this.bulb.classList.add("clickable");
    //this.bulb.setAttribute("color", "black");

    this.bulb.setAttribute("material", {color: "#111", emissive: this.lampColor, emissiveIntensity:0});
    this.bulb.setAttribute("light", "type: point; color: this.lampColor, intensity: 0; distance: 15, decay: 2, castShadow: true");
    
    this.obj.append(this.bulb);

    

    this.bulb.onclick = ()=>{
      this.strength += this.dl;
      this.dl = -this.dl;

      this.bulb.setAttribute("light",{intensity:this.strength});
      //this.bulb.setAttribute("opacity", 0.75);
      this.bulb.setAttribute("material", {color: "#111", emissive: this.lampColor, emissiveIntensity:2});
    }

    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);

  }
}





/*
class Lamp{


    // ===== POINT LIGHT INSIDE LAMP =====
    this.bulb = document.createElement("a-entity");



    // ===== EMISSIVE SPHERE FOR BULB GLOW =====
    this.glow = document.createElement("a-sphere");
    this.glow.setAttribute("radius", 0.08);
    this.glow.setAttribute("position", "0 1.8 0"); // same as light
    this.glow.setAttribute("material", {
      color: "#111",           // off color
      emissive: this.lampColor,
      emissiveIntensity: 0
    });

    // append glow sphere to lamp
    this.obj.append(this.glow);


    // ===== CLICK TO TOGGLE LIGHT & GLOW =====
    this.bulb.onclick = () => {
      this.strength += this.dl;
      this.dl = -this.dl;

      this.bulb.setAttribute("light", "intensity", this.strength);
      this.glow.setAttribute("material", "emissiveIntensity", this.strength / 2); // smaller than light
    };

  }
}
*/