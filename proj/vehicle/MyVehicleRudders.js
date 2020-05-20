/**
 * MyVehicleRudders.js
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicleRudders extends CGFobject {
	constructor(scene) {
        super(scene);
        this.ang = 0;
        this.rudder = new MyRudder(this.scene);
        this.initMaterials();
    }

    initMaterials() {
        //------ Vehicle texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(1, 1, 1, 1);
        this.texture.setDiffuse(0.8, 0.8, 0.8, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/green.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
    }

    update(val){
        this.ang = val>0 ? Math.PI/12 : -Math.PI/12;
    }

    resetturn(){
        this.ang = 0;
    }
    
	display(){
        this.texture.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0, -1.3);
        this.scene.scale(0.35, 1, 0.4);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.rudder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(0.7, 0, -1.3);
        this.scene.scale(0.35, 1, 0.4);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.rudder.display();
        this.scene.popMatrix();

        //Vertical
        this.scene.pushMatrix();
        this.scene.rotate(this.ang, 0, 1, 0);
        this.scene.rotate(Math.PI*0.5, 0, 0, 1);
        this.scene.translate(0.7, 0, -1.3);
        this.scene.scale(0.35, 1, 0.4);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.rudder.display();
        this.scene.popMatrix();

        //Vertical
        this.scene.pushMatrix();
        this.scene.rotate(this.ang, 0, 1, 0);
        this.scene.rotate(Math.PI*1.5, 0, 0, 1);
        this.scene.translate(0.7, 0, -1.3);
        this.scene.scale(0.35, 1, 0.4);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.rudder.display();
        this.scene.popMatrix();
    }
}
