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
    }

    initMaterials(scene) {
        
    }
    
	display(){
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
