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

        this.texture1 = new CGFtexture(this, 'images/temp.png');
        //Test material
        this.testMaterial = new CGFappearance(this); 
        this.testMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setShininess(10.0);
        this.testMaterial.loadTexture(this.texture1);
        this.testMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.pyramid = new MyPyramid(this, 16, 8);

        //Objects connected to MyInterface
        this.displayAxis = true;

        this.showpyramidonly = true;

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

    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        this.testMaterial.setTexture(this.texture1);
    }


    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
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
        
        this.pyramid.enableNormalViz();


        
        this.testMaterial.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();
        if(this.showpyramidonly){
            this.pyramid.display();
        }
        else{
            //This sphere does not have defined texture coordinates
            this.incompleteSphere.display();
        }

        this.setDefaultAppearance();

        

        // ---- END Primitive drawing section
    }
}