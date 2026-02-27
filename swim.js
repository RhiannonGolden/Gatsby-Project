class Swim {
  constructor(user){
    this.user = user;

    this.swimming = false;
    this.upDistance = 0;

    this.downDistance = 0.05;
    this.underwater = false;

    this.originalY = user.object3D.position.y+1.7;
  }


  start(){
    if(this.swimming == false && this.underwater){
      this.swimming = true;
      this.upDistance = 0.20;
    }
  }

  update(){
    
    if(this.swimming == false) return;

    let pos = this.user.object3D.position.y;

    pos += this.upDistance;

    if(pos >= this.originalY+1){
      this.swimming = false;
      this.upDistance = 0;
    }

    this.user.object3D.position.y = pos;
  }


  sink(){
    if(this.underwater){
        let pos = this.user.object3D.position.y;
        pos -= this.downDistance;

        this.user.object3D.position.y = pos;
    }    
  }


}