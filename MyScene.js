/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //------ Cylinder material
        this.testMaterial = new CGFappearance(this); 
        this.testMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setShininess(10.0);
        this.testMaterial.loadTexture('images/temp.png');
        this.testMaterial.setTextureWrap('REPEAT', 'REPEAT');


        //------ Earth Texture Material
        this.earth = new CGFappearance(this);
        this.earth.setAmbient(0.1, 0.1, 0.1, 1);
        this.earth.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earth.setSpecular(0.1, 0.1, 0.1, 1);
        this.earth.setShininess(10.0);
        this.earth.loadTexture('images/earth.jpg');
        this.earth.setTextureWrap('REPEAT', 'REPEAT');

        //------ Cubemap Texture Material
        this.cubemap = new CGFappearance(this);
        this.cubemap.setAmbient(0.8, 0.8, 0.8, 1);
        this.cubemap.setDiffuse(0.0, 0.0, 0.0, 1);
        this.cubemap.setSpecular(0.0, 0.0, 0.0, 1);
        this.cubemap.setShininess(10.0);
        this.cubemap.loadTexture('images/cubemap.png');
        this.cubemap.setTextureWrap('REPEAT', 'REPEAT');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.Sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 16, 8);
        this.scenario = new MyUnitCube(this, 5);
        this.vehicle = new MyVehicle(this, 4, 1);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayVehicle = false;
        this.showcylinderonly = true;
        this.showsphereonly = false;

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
/*
    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        this.testMaterial.setTexture(this.texture1);
    }*/


    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        this.cylinder.enableNormalViz();

        this.cubemap.apply();
        this.scenario.display();
        
        //this.testMaterial.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();
        if (this.displayVehicle)
            this.vehicle.display();

        if(this.showcylinderonly){
            this.testMaterial.apply();
            this.cylinder.display();
        }
        if (this.showsphereonly){
            this.earth.apply();
            this.Sphere.display();
        }

        this.setDefaultAppearance();

        // ---- END Primitive drawing section
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            keysPressed=true;
        }
        if (keysPressed)
            console.log(text);
    }
}