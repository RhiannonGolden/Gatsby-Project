class Jump {
  constructor(user){
    this.user = user;

    this.jumping = false;
    this.upDistance = 0;

    this.downDistance = 0.01;

    this.originalY = user.object3D.position.y+1.7;
  }


  start(){
    if(this.jumping == false){
      this.jumping = true;
      this.upDistance = 0.25;
    }
  }

  update(){
    if(this.jumping == false) return;

    let pos = this.user.object3D.position;

    pos.y += this.upDistance;

    this.upDistance -= this.downDistance;

    if(pos.y <= this.originalY){
      pos.y = this.originalY;
      this.jumping = false;
      this.upDistance = 0;
    }

    this.user.object3D.position.y = pos.y;
  }
}