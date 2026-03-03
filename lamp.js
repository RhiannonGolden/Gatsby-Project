class Lamp{
  constructor(x,y,z,lampColor){
    this.strength = 2.5;
    this.dl = 2.5;
    this.lampColor = lampColor;

    this.obj = document.createElement("a-entity");

    let pole = document.createElement("a-cylinder");
    pole.setAttribute("radius",0.1);
    pole.setAttribute("height",3);  
    pole.setAttribute("shadow",{receive:true});
    pole.setAttribute("position","0 1.5 0");
    this.obj.append(pole)
    
    this.bulb = document.createElement("a-cone");
    this.bulb.setAttribute("position","0 3 0");
    this.bulb.setAttribute("radius-bottom",0.5);
    this.bulb.classList.add("clickable");
    this.bulb.setAttribute("color", "black");

    this.bulb.setAttribute("light", "type: point; intensity: 0; castShadow: true");
    
    this.bulb.onclick = ()=>{
      this.strength += this.dl;
      this.dl = -this.dl;

      this.bulb.setAttribute("light",{intensity:this.strength});
      this.bulb.setAttribute("opacity", 0.75);
      this.bulb.setAttribute("material", {color: "black", emissive: this.lampColor, emissiveIntensity:1});
    }

    this.obj.append(this.bulb);
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);

  }
}