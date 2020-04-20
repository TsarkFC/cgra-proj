/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        //this.appearance = null;
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

        //------ Texture stuff
        this.texture1 = new CGFtexture(this, 'images/Water_cubemap.png');
        this.texture2 = new CGFtexture(this, 'images/Forest_cubemap.png');
        this.texture3 = new CGFtexture(this, 'images/Sea_cubemap.png');
        this.texture4 = new CGFtexture(this, 'images/Grass_cubemap.png');
        //this.terrainTex = new CGFtexture(this, 'images/terrain.jpg');
        this.heightTex = new CGFtexture(this, 'images/heightmap.jpg');

        this.cubemapTex = 0;
        this.textures = [this.texture1, this.texture2, this.texture3, this.texture4];
        this.textureIds = { 'Water': 0, 'Forest': 1, 'Sea': 2, 'Grass': 3};
        //------
        
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
        this.cubemap.setAmbient(1, 1, 1, 1);
        this.cubemap.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubemap.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubemap.setShininess(100.0);
        this.cubemap.setTexture(this.texture1);
        this.cubemap.setTextureWrap('REPEAT', 'REPEAT');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.Sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 16, 8);
        this.scenario = new MyUnitCube(this);
        this.vehicle = new MyVehicle(this, 16, 8);

        this.terrain = new MyTerrain(this, 20);

        // Materials and textures initialization

		this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);

		
		this.appearance.loadTexture('images/terrain.jpg');
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');


        //Shader stuff
		this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({uSampler2: 1});

        
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayVehicle = true;
        this.showcylinderonly = false;
        this.showsphereonly = false;


        //Vehicle stuff
        this.vehicleSpeed = 1.0;
        this.vehicleScale = 1.0;
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
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update(this.vehicleSpeed, this.vehicleScale);
    }

    updateAppliedTexture() {
        this.cubemap.setTexture(this.textures[this.cubemapTex]);
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
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.scenario.display();
    
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        if (this.displayVehicle){
            this.pushMatrix();
            this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
            this.scale(this.vehicle.scale, this.vehicle.scale, this.vehicle.scale);
            this.translate(-this.vehicle.x, -this.vehicle.y, -this.vehicle.z);
            this.pushMatrix();
            this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
            this.rotate(this.vehicle.angle, 0, 1, 0);
            //this.translate(0, 10, 0);
            this.vehicle.display();
            this.popMatrix();
            this.popMatrix();
        }

        if(this.showcylinderonly){
            this.testMaterial.apply();
            this.cylinder.display();
        }

        if (this.showsphereonly){
            this.earth.apply();
            this.Sphere.display();
        }
        // aplly main appearance (including texture in default texture unit 0)
        this.appearance.apply();

        // bind additional texture to texture unit 1
        this.heightTex.bind(1);
        this.setActiveShader(this.terrainShader);
        this.pushMatrix();
        this.scale(25, 25, 25);
        this.rotate(-Math.PI / 2, 1, 0, 0);
        this.terrain.display();
        this.popMatrix();
        // restore default shader (will be needed for drawing the axis in next frame)
		this.setActiveShader(this.defaultShader);

        this.setDefaultAppearance();

        // ---- END Primitive drawing section
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.vehicle.accerlerate(0.1);
            text+=" W ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.vehicle.accerlerate(-0.1);
            text+=" S ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(0.2);
            text+=" A ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(-0.2);
            text+=" D ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
            text+=" R ";
            keysPressed=true;
        }
        if (keysPressed)
            console.log(text);
    }
}