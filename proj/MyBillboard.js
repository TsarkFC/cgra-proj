/**
* MyBillboard
* @constructor
*/
class MyBillboard extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        
        this.percentageDelivered = 0;

        this.scale = 1.0;

        this.autopilot = false;
        this.time = 0;

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.intiObjects();
        this.initMaterials();
        this.initBuffers();
    }

    intiObjects(){
        this.support = new MyPlane(this.scene, this.slices);
        this.loadBar = new MyPlane(this.scene, this.slices);
        this.panel = new MyPlane(this.scene, this.slices);

    }

    initMaterials(){
        //------ Vehicle texture
        this.billboardTexGray = new CGFappearance(this.scene);
        this.billboardTexGray.setAmbient(0.1, 0.1, 0.1, 1);
        this.billboardTexGray.setDiffuse(0.9, 0.9, 0.9, 1);
        this.billboardTexGray.setSpecular(0.1, 0.1, 0.1, 1);
        this.billboardTexGray.setShininess(10.0);
        this.billboardTexGray.loadTexture('images/gray.png');
        this.billboardTexGray.setTextureWrap('REPEAT', 'REPEAT');


        this.textTex = new CGFappearance(this.scene);
        this.textTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.textTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.textTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.textTex.setShininess(10.0);
        this.textTex.loadTexture('images/SUPPLIES_DELIVERED.png');
        this.textTex.setTextureWrap('REPEAT', 'REPEAT');

    }


    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.scale, this.scale, this.scale);

        this.billboardTexGray.apply();
        //Left support beam
        this.scene.pushMatrix();
        this.scene.translate(-0.95, 1, 0);
        this.scene.scale(0.1, 2, 1);
        this.support.display();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.support.display();
        this.scene.popMatrix();

        //Right support beam
        this.scene.pushMatrix();
        this.scene.translate(0.95, 1, 0);
        this.scene.scale(0.1, 2, 1);
        this.support.display();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.support.display();
        this.scene.popMatrix();


        
        this.scene.setActiveShader(this.scene.billboardShader);
        //Percentage Bar
        this.scene.pushMatrix();
        this.scene.translate(0, 2.35, 0.005);
        this.scene.scale(1.5, 0.2, 1);
        this.loadBar.display();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, 0, 0.01);
        this.loadBar.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);


        
        //Panel with text
        this.textTex.apply();
        this.scene.translate(0, 2.5, 0);
        this.scene.scale(2, 1, 1);
        this.panel.display();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.panel.display();
        this.popMatrix;



        this.scene.popMatrix();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(){
        /*this.percentageDelivered = 0;
        var a = 0;
        for(var i = 0; i < this.scene.max_num_supplies; i++){
            if(this.scene.supplies[i].state ==  SupplyStates.LANDED){
                //this.percentageDelivered += 1.0 / this.scene.max_num_supplies;
                a+= 1.0;
                console.log("a");
            }
        }
        this.percentageDelivered = a / this.scene.max_num_supplies;*/
    }

    reset(){
        this.percentageDelivered = 0;
    }

}

