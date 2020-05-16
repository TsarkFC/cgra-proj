/**
 * MyEngine
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyEngine extends CGFobject {
	constructor(scene, slices, stacks) {
        super(scene);
		this.ang = 0;
        this.sphere = new MySphere(scene, slices, stacks);
        this.initMaterials();
    }
    
    update(v, speed){
        this.ang += v * Math.PI/2 * speed;
    }

    initMaterials(){
        //------ Vehicle texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(1, 1, 1, 1);
        this.texture.setDiffuse(0.8, 0.8, 0.8, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/vehicle.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');

        //------ Vehicle texture
        this.sectexture = new CGFappearance(this.scene);
        this.sectexture.setAmbient(1, 1, 1, 1);
        this.sectexture.setDiffuse(0.8, 0.8, 0.8, 1);
        this.sectexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.sectexture.setShininess(10.0);
        this.sectexture.loadTexture('images/red.jpg');
        this.sectexture.setTextureWrap('REPEAT', 'REPEAT');
    }

	display(){
        this.texture.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.2, -1.15, -0.5);
        this.scene.scale(0.1, 0.1, 0.2);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -1.15, -0.7);
        this.scene.scale(0.04, 0.04, 0.04);
        this.sphere.display();
        this.scene.popMatrix();

        this.sectexture.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.2, -1.145, -0.68);
        this.scene.rotate(this.ang, 0, 0, 1);
        this.scene.translate(0, 0.045, 0);
        this.scene.scale(0.04, 0.09, 0.01);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -1.145, -0.68);
        this.scene.rotate(this.ang, 0, 0, 1);
        this.scene.translate(0, -0.045, 0);
        this.scene.scale(0.04, 0.09, 0.01);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
