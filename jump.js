class Jump {
  constructor(player){
    this.player = player;

    this.jumping = false;
    this.velocity = 0;

    this.jumpForce = 0.18;
    this.gravity = 0.01;

    this.groundY = player.object3D.position.y;
  }

  start(){
    if(!this.jumping){
      this.jumping = true;
      this.velocity = this.jumpForce;
    }
  }

  update(){
    if(!this.jumping) return;

    let pos = this.player.object3D.position;

    // apply movement
    pos.y += this.velocity;

    // gravity
    this.velocity -= this.gravity;

    // landed
    if(pos.y <= this.groundY){
      pos.y = this.groundY;
      this.jumping = false;
      this.velocity = 0;
    }

    this.player.object3D.position.y = pos.y;
  }
}