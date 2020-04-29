/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.angle = 0; this.rudderAng = 0; this.engineAng = 0;
        this.v = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.scale = 1.0;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.cylinder = new MyCylinder(this.scene, this.slices, this.stacks);
        this.rudders = new MyVehicleRudders(this.scene);
        this.engine = new MyEngine(this.scene, this.slices, this.stacks);
        this.gondola = new MyGondola(this.scene, this.slices, this.stacks);

        this.initBuffers();
    }

    displayObject(){
        //---Big elipsoide
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 2);
        this.sphere.display();
        this.scene.popMatrix();
        //---

        this.gondola.display();

        this.engine.display(this.angle);

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, 0);
        this.engine.display(this.angle);

        this.scene.popMatrix();
        
        this.rudders.display();

    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.translate(0, 10, 0);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.displayObject();
        this.scene.popMatrix();
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
        this.engine.update(this.v, speed);
        this.scale = scale;
    }
    turn(val){
        this.angle += val;
        this.rudders.update(val);
    }
    resetturn(){
        this.rudders.resetturn();
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

