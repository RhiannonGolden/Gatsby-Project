class Crate{
  constructor(x,y,z,placed,xRotate,yRotate,zRotate){
    this.placed = placed;
    this.x = x;
    this.y = y;
    this.z = z;
    this.xRotate = xRotate;
    this.yRotate = yRotate;
    this.zRotate = zRotate;


    this.box = document.createElement("a-box");
    this.box.setAttribute("height", "0.7");
    this.box.setAttribute("width", "1.4");
    this.box.setAttribute("depth", "0.8");
    this.box.setAttribute("color", "blue");
    this.box.setAttribute("opacity", "0.5");

    this.box.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.box.setAttribute("rotation",{x:this.xRotate,y:this.yRotate,z:this.zRotate});

    this.box.setAttribute("static-body","");
    this.box.classList.add("clickable");

    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#crate");
    this.obj.setAttribute("scale", "1.45 1.45 1.45");
    this.obj.object3D.position.y = this.box.object3D.position.y - 0.325;

    this.box.append(this.obj);    
    scene.append(this.box);


    this.box.addEventListener("click",()=>{
      this.box.remove();
    })


  }
}





/*
class Crate {
  constructor(x, y, z, placed, xRotate, yRotate, zRotate) {

    this.placed = placed;
    this.x = x;
    this.y = y;
    this.z = z;

    this.xRotate = xRotate;
    this.yRotate = yRotate;
    this.zRotate = zRotate;

    // --- CREATE BOX (collision body) ---
    this.box = document.createElement("a-box");

    this.box.setAttribute("height", "0.8");
    this.box.setAttribute("width", "1.5");
    this.box.setAttribute("depth", "0.9");
    this.box.setAttribute("scale", "2 2 2");
    this.box.setAttribute("color", "blue");
    this.box.setAttribute("opacity", "1");

    this.box.setAttribute(
      "position",
      `${this.x} ${this.y} ${this.z}`
    );

    this.box.setAttribute(
      "rotation",
      `${this.xRotate} ${this.yRotate} ${this.zRotate}`
    );

    this.box.setAttribute("static-body", "");
    this.box.classList.add("clickable");


    // --- CREATE MODEL (visual crate) ---
    this.model = document.createElement("a-gltf-model");

    this.model.setAttribute("src", "#crate");
    this.model.setAttribute("position", "0 -0.325 0");
    this.model.setAttribute("scale", "1.5 1.5 1.5");



    this.box.appendChild(this.model);


    scene.append(this.box);


    this.box.addEventListener("click", () => {
      this.box.remove();
    });
  }
}

*/





/*
class Crate {
  constructor(x, y, z, placed, xRotate, yRotate, zRotate) {

    this.placed = placed;
    this.x = x;
    this.y = y;
    this.z = z;

    this.xRotate = xRotate;
    this.yRotate = yRotate;
    this.zRotate = zRotate;


    this.box = document.createElement("a-box");

    this.box.setAttribute("height", "0.8");
    this.box.setAttribute("width", "1.5");
    this.box.setAttribute("depth", "0.9");
    this.box.setAttribute("scale", "2 2 2");

    this.box.setAttribute(
      "position",
      `${this.x} ${this.y} ${this.z}`
    );

    this.box.setAttribute(
      "rotation",
      `${this.xRotate} ${this.yRotate} ${this.zRotate}`
    );

    this.box.setAttribute("static-body", "");
    this.box.classList.add("clickable");

   
    this.box.setAttribute("visible", "false");


    this.model = document.createElement("a-gltf-model");

    this.model.setAttribute("src", "#crate");
    this.model.setAttribute("position", "0 -0.325 0");
    this.model.setAttribute("scale", "1.5 1.5 1.5");


   
    this.box.appendChild(this.model);



    scene.append(this.box);


  
    this.box.addEventListener("click", () => {
      this.box.remove();
    });
  }
}
*/