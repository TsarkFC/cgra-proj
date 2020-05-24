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

        this.autopilot = false;
        this.time = 0;

        this.intiObjects();
        this.initMaterials();
        this.initBuffers();
    }

    intiObjects(){
        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.cylinder = new MyCylinder(this.scene, this.slices, this.stacks);
        this.rudders = new MyVehicleRudders(this.scene);
        this.engine = new MyEngine(this.scene, this.slices, this.stacks);
        this.gondola = new MyGondola(this.scene, this.slices, this.stacks);
        this.flag = new MyFlag(this.scene);
    }

    initMaterials(){
        //------ Vehicle texture
        this.vehicleTex = new CGFappearance(this.scene);
        this.vehicleTex.setAmbient(1, 1, 1, 1);
        this.vehicleTex.setDiffuse(0.8, 0.8, 0.8, 1);
        this.vehicleTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.vehicleTex.setShininess(10.0);
        this.vehicleTex.loadTexture('images/vehicle.jpg');
        this.vehicleTex.setTextureWrap('REPEAT', 'REPEAT');
    }

    displayObject(){
        //---Big elipsoide
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 2);
        this.sphere.display();
        this.scene.popMatrix();
        //---

        this.gondola.display();

        this.engine.display();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, 0);
        this.engine.display();
        this.scene.popMatrix();
        
        this.rudders.display();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.translate(0, 10, 0);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.flag.displayResized();
        this.vehicleTex.apply();
        this.scene.scale(0.5, 0.5, 0.5);
        this.displayObject();
        this.scene.popMatrix();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(speed, scale, t){
        if (this.autopilot)
            this.updateAutoPilot(t);
        else{   
            this.x += this.v * Math.sin(this.angle) * speed;
            this.z += this.v * Math.cos(this.angle) * speed;
            this.engine.update(this.v, speed);
        }
        this.scale = scale;
    }

    updateAutoPilot(t){
        if (this.time == 0){
            this.time = t;
        }
        else{
            this.x = this.center[0] - this.replace[0]*5;
            this.z = this.center[2] - this.replace[2]*5;
            this.angle += ((t - this.time)/1000)*2*Math.PI/5;
            this.engine.update(0.2, 1);

            this.updatePerpendiculars();
            this.time = t;
        }
        this.rudders.update(0.2);
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
        this.autopilot = false;
        this.time = 0;
    }

    startAutoPilot(){
        this.autopilot = true;
        this.updatePerpendiculars();
        this.center = [this.x + this.replace[0]*5, this.y, this.z + this.replace[2]*5];
    }

    updatePerpendiculars(){
        this.perpendicular = this.angle + Math.PI/2;
        this.replace = [Math.sin(this.perpendicular), 0, Math.cos(this.perpendicular)];
    }
}

