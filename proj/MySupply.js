/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};
class MySupply extends CGFobject {
    
	constructor(scene, fall_speed) {
    
        super(scene);   
        
        this.state = SupplyStates.INACTIVE;
        this.initMaterials(this.scene);

        this.square = new MyQuad(this.scene);
        this.maxy = 15;
        this.y = 15;
        this.x = 0;
        this.z = 0;
        this.fall_speed = fall_speed;
    }

    initMaterials(scene) {

        //------ Texture Material
        this.texture = new CGFappearance(scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/woodbox.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
    }
    
	display(){
        if(this.state == SupplyStates.INACTIVE){

        }
        else if(this.state == SupplyStates.FALLING){
            this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);

            this.texture.apply();
            if (this.scene.linearInt) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
            //else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

            this.scene.pushMatrix();
            this.scene.translate(0,0,0.5);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0,0,-0.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.5,0,0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.5,0,0);
            this.scene.rotate(3*Math.PI / 2, 0, 1, 0);
            this.square.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(0,-0.5,0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0,0.5,0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.popMatrix();
        }
        else if(this.state = SupplyStates.LANDED){
            this.texture.apply();
            if (this.scene.linearInt) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
            
            this.scene.pushMatrix();
            this.scene.translate(this.x,-0.5 + this.y,0 + this.z);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.x, -0.5 + this.y, 1 + this.z);
            this.scene.rotate(Math.PI/3, 0, 1, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-1 + this.x, -0.5 + this.y, 0 + this.z);
            this.scene.rotate(Math.PI/5, 0, 1, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.5 + this.x,-0.5 + this.y, 1 + this.z);
            this.scene.rotate(Math.PI/10, 0, 1, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.x, -0.5 + this.y, -1 + this.z);
            this.scene.rotate(Math.PI/7, 0, 1, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.square.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.5 + this.x, -0.5 + this.y, -1.5 + this.z);
            this.scene.rotate(Math.PI/5, 0, 1, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.square.display();
            this.scene.popMatrix();

        }
    }

    update(time){
        //console.log(this.maxy);
        if(this.state == SupplyStates.FALLING){
            if(this.y > 0.5){
                this.y -= (this.maxy - 0.5) * time / 3000.0;
                if(this.y < 0.5){
                    this.y = 0.5;
                    this.state = SupplyStates.LANDED;
                }
            }
            
        }

    }

    drop(x, y, z){
        this.state = SupplyStates.FALLING;
        this.x = x;
        this.maxy = y;
        this.y = y;
        this.z = z;
        this.scene.billBoard.percentageDelivered += 1.0 / this.scene.max_num_supplies;
        //Fazer set das coordenadas
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.state = SupplyStates.INACTIVE;
    }

    updateBuffers(){
        this.square.updateBuffers();
    }
	
	enableNormalViz(){
        this.square.enableNormalViz();
    }
	disableNormalViz(){
        this.square.disableNormalViz();
    }
}

