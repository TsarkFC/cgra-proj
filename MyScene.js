/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
        this.max_num_supplies = 5;
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

        //------ Texture stuff
        this.texture1 = new CGFtexture(this, 'images/Water_cubemap.png');
        this.texture2 = new CGFtexture(this, 'images/Forest_cubemap.png');
        this.texture3 = new CGFtexture(this, 'images/Sea_cubemap.png');
        this.texture4 = new CGFtexture(this, 'images/Grass_cubemap.png');
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

        //------ Vehicle texture
        this.vehicleTex = new CGFappearance(this);
        this.vehicleTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.vehicleTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.vehicleTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.vehicleTex.setShininess(10.0);
        this.vehicleTex.loadTexture('images/vehicle.jpg');
        this.vehicleTex.setTextureWrap('REPEAT', 'REPEAT');

        //------ Cubemap Texture Material
        this.cubemap = new CGFappearance(this);
        this.cubemap.setAmbient(1, 1, 1, 1);
        this.cubemap.setDiffuse(0.1, 0.1, 0.1, 1);
        this.cubemap.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubemap.setShininess(100.0);
        this.cubemap.setTexture(this.texture1);
        this.cubemap.setTextureWrap('REPEAT', 'REPEAT');

        //------ Flag Texture Material
        this.flagTex = new CGFappearance(this);
        this.flagTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.flagTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.flagTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.flagTex.setShininess(10.0);
        this.flagTex.loadTexture('images/temp.png');
        this.flagTex.setTextureWrap('REPEAT', 'REPEAT');


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.Sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 16, 8);
        this.scenario = new MyUnitCube(this);
        this.vehicle = new MyVehicle(this, 16, 8);
        this.terrain = new MyPlane(this, 20);

        this.flag = new MyPlane(this, 20);


        this.supplies = [];
        for(var i = 0; i < this.max_num_supplies; i++){
            this.supplies.push(new MySupply(this, 1.0));
        }

        // Materials and textures initialization
		this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.2, 0.4, 0.8, 1);
		this.appearance.setDiffuse(0.2, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);

		
		this.appearance.loadTexture('images/terrain.jpg');
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        
        this.flagAppearance = new CGFappearance(this);
		this.flagAppearance.setAmbient(0.2, 0.4, 0.8, 1);
		this.flagAppearance.setDiffuse(0.2, 0.7, 0.7, 1);
		this.flagAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.flagAppearance.setShininess(120);

		
		this.flagAppearance.loadTexture('images/temp.png');
		this.flagAppearance.setTextureWrap('REPEAT', 'REPEAT');

        //Shader stuff
		this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({uSampler2: 1});

        this.flagShader = new CGFshader(this.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.flagShader.setUniformsValues({ timeFactor: 0 });
        
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
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 25, 30), vec3.fromValues(0, 5, 0));
    }
    setDefaultAppearance() {
        this.setGlobalAmbientLight(0.6, 0.6, 0.6, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        var delta_tim;
        if(this.time == 0){
            delta_tim = 0;
            this.time = t;
        }
        else{
            delta_tim = t - this.time;
            this.time = t;
        }

        this.checkKeys();
        this.vehicle.update(this.vehicleSpeed, this.vehicleScale, t);

        for(var i = 0; i < this.max_num_supplies; i++){
            this.supplies[i].update(delta_tim);
        }

        this.flagShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
        //console.log(t / 100 % 1000);
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
    
        //-------- Draw axis
        if (this.displayAxis)
            this.axis.display();

        //-------- Display vehicle
        if (this.displayVehicle){
            
            this.vehicleTex.apply();
            this.vehicle.display();

            this.setActiveShader(this.flagShader);
            this.flagTex.apply();
            this.flag.display();
            this.setActiveShader(this.defaultShader);
        }

        //------- Display cylinder
        if(this.showcylinderonly){
            this.testMaterial.apply();
            this.cylinder.display();
        }

        //------- Display sphere
        if (this.showsphereonly){
            this.earth.apply();
            this.Sphere.display();
        }
        // aplly main appearance (including texture in default texture unit 0)
        this.appearance.apply();

        //------- Display terrain
        // bind additional texture to texture unit 1
        this.heightTex.bind(1);
        this.setActiveShader(this.terrainShader);
        this.pushMatrix();
        this.translate(0, -2.15, 0);
        this.scale(50, 8, 50);
        this.rotate(-Math.PI / 2, 1, 0, 0);
        this.terrain.display();
        this.popMatrix();
        // restore default shader (will be needed for drawing the axis in next frame)
		this.setActiveShader(this.defaultShader);

        this.setDefaultAppearance();

        for(var i = 0; i < this.max_num_supplies; i++){
            this.pushMatrix();
            this.supplies[i].display();
            this.popMatrix();
        }
        // ---- END Primitive drawing section
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW") && !this.vehicle.autopilot) {
            this.vehicle.accerlerate(0.1);
            text+=" W ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyS") && !this.vehicle.autopilot) {
            this.vehicle.accerlerate(-0.1);
            text+=" S ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA") && !this.vehicle.autopilot) {
            this.vehicle.turn(0.2);
            text+=" A ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyD") && !this.vehicle.autopilot) {
            this.vehicle.turn(-0.2);
            text+=" D ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
            text+=" R ";
            keysPressed=true;
        }
        if(this.gui.isKeyPressed("KeyL")){
            for(var i = 0; i < this.max_num_supplies; i++){
                if(this.supplies[i].state == SupplyStates.INACTIVE){
                    this.supplies[i].drop(this.vehicle.x, this.vehicle.y + 10, this.vehicle.z);
                    break;
                }
            }
            text+=" L ";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP")){
            this.vehicle.startAutoPilot();

            text+=" P ";
            keysPressed = true;
        }

        if (keysPressed)
            console.log(text);
        else 
            this.vehicle.resetturn();
    }
}