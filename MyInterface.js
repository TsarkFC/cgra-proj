/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayVehicle').name('Display Vehicle');
        this.gui.add(this.scene, 'showcylinderonly').name('Cylinder');
        this.gui.add(this.scene, 'showsphereonly').name('Sphere');
        //The cubemap's texture
        this.gui.add(this.scene, 'cubemapTex', this.scene.textureIds).name('Cubemap texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));
        //Vehicle stuff
        this.gui.add(this.scene, 'vehicleSpeed', 0.1, 5).name('Vehicle Speed');
        this.gui.add(this.scene, 'vehicleScale', 0.5, 3).name('Vehicle Scale');

		this.initKeys();
        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }
    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };
    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };
    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
}