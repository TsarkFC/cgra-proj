/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.angle = 0;
        this.v = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.scale = 1.0;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.cylinder = new MyCylinder(this.scene, this.slices, this.stacks);
        this.rudder = new MyRudder(this.scene);

        this.initBuffers();
    }

    display(){
        //---Big elipsoide
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 2);
        this.sphere.display();
        this.scene.popMatrix();
        //---

        //---Gôndola
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
        //---

        //---Engines
        //1
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
        this.scene.translate(0.2, -1.1, -0.68);
        this.scene.scale(0.04, 0.09, 0.01);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -1.19, -0.68);
        this.scene.scale(0.04, 0.09, 0.01);
        this.sphere.display();
        this.scene.popMatrix();

        //2
        this.scene.pushMatrix();
        this.scene.translate(-0.2, -1.15, -0.5);
        this.scene.scale(0.1, 0.1, 0.2);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -1.15, -0.7);
        this.scene.scale(0.04, 0.04, 0.04);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -1.1, -0.68);
        this.scene.scale(0.04, 0.09, 0.01);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -1.19, -0.68);
        this.scene.scale(0.04, 0.09, 0.01);
        this.sphere.display();
        this.scene.popMatrix();
        
        //---

        //---Rudders
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
        this.scene.rotate(Math.PI*0.5, 0, 0, 1);
        this.scene.translate(0.7, 0, -1.3);
        this.scene.scale(0.35, 1, 0.4);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.rudder.display();
        this.scene.popMatrix();

        //Vertical
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI*1.5, 0, 0, 1);
        this.scene.translate(0.7, 0, -1.3);
        this.scene.scale(0.35, 1, 0.4);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.rudder.display();
        this.scene.popMatrix();
        //---
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(speed, scale){
        this.x += this.v * Math.sin(this.angle) * speed;
        this.z += this.v * Math.cos(this.angle) * speed;
        this.scale = scale;
    }
    turn(val){
        this.angle += val;
    }
    accerlerate(val){
        this.v += val;
    }
    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angle = 0;
        this.v = 0;
    }
}

