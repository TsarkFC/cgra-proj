/**
 * MyGondola
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyGondola extends CGFobject {
	constructor(scene, slices, stacks) {
        super(scene);
        this.sphere = new MySphere(this.scene, slices, stacks);
        this.cylinder = new MyCylinder(this.scene, slices, stacks);
        this.initMaterials();
    }

    initMaterials(){
        //------ Vehicle texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(1, 1, 1, 1);
        this.texture.setDiffuse(0.8, 0.8, 0.8, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/green.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
    }
    
	display(){
        this.texture.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -1.1, 0);
        this.scene.scale(0.203, 0.203, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.1, 0.5);
        this.scene.scale(0.2, 0.2, 0.2);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.1, -0.5);
        this.scene.scale(0.2, 0.2, 0.2);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
