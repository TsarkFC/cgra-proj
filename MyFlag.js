/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
		
        this.flag = new MyPlane(this.scene, 20);
        this.cube = new MyUnitCube(this.scene);
    }
    
	display(){
        this.scene.setActiveShader(this.scene.flagShader);
        this.scene.flagTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -4);
        this.scene.scale(1, 1, 2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);

        this.flag.display();
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.pushMatrix();
        this.scene.rotate(0.14, 1, 0, 0);
        this.scene.translate(0, 0, -2.5);
        this.scene.scale(0.1, 0.1, 1.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-0.14, 1, 0, 0);
        this.scene.translate(0, 0, -2.5);
        this.scene.scale(0.1, 0.1, 1.5);
        this.cube.display();
        this.scene.popMatrix();
    }
}
