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
    }
    
    update(v, speed){
        this.ang += v * Math.PI/2 * speed;
    }

	display(angle){
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

        this.scene.pushMatrix();
        this.scene.translate(0.2, -1.145, -0.68);
        this.scene.rotate(this.ang, Math.sin(angle), 0, Math.cos(angle));
        this.scene.translate(0, 0.045, 0);
        this.scene.scale(0.04, 0.09, 0.01);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -1.145, -0.68);
        this.scene.rotate(this.ang, Math.sin(angle), 0, Math.cos(angle));
        this.scene.translate(0, -0.045, 0);
        this.scene.scale(0.04, 0.09, 0.01);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
