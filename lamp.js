class Lamp{
  constructor(x,y,z){
    this.strength = 5;
    this.dl = 5;

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

     this.bulb.setAttribute("light", {type: "point", intensity: this.strength, distance: 18, decay: 2, castShadow: true, color: "#fff4cc"});

    
    this.bulb.onclick = ()=>{
      this.strength += this.dl;
      this.dl = -this.dl;

      this.bulb.setAttribute("light",{intensity:this.strength});
    }

    this.obj.append(this.bulb);
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);

  }
}