/**
 * MyRudder
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRudder extends CGFobject {
	constructor(scene) {
        super(scene);
        //this.initMaterials(scene);
		
        this.triangle = new MyTriangleBig(scene);
        this.quad = new MyQuad(scene);

        //this.initBuffers();
    }

    initMaterials(scene) {
        
    }
    
	display(){
        this.scene.pushMatrix();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.scene.translate(0, -0.5, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

    // updateBuffers(){
    //     this.triangle.updateBuffers();
    //     this.quad.updateBuffers();
    // }
}
