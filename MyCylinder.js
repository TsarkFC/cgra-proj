/**
* MyCylinder
* @constructor
* @param scene - Reference to MyScene object
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initMaterials(scene){

        //------ Side material 
        this.testMaterial = new CGFappearance(this); 
        this.testMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.testMaterial.setShininess(10.0);
        this.testMaterial.loadTexture('images/temp.png');
        this.testMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Bottom material
        this.bottomMaterial = new CGFappearance(this); 
        this.bottomMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.bottomMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.bottomMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.bottomMaterial.setShininess(10.0);
        this.bottomMaterial.loadTexture('images/temp2.png');
        this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT')
        //------

        //------ Top material
        this.topMaterial = new CGFappearance(this); 
        this.topMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.topMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.topMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture('images/temp3.png');
        this.topMaterial.setTextureWrap('REPEAT', 'REPEAT')
        //------
    }

    initBuffers() {


        //this.testMaterial.apply(); //Applying side material

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var texIncrement = 1/this.slices;

        this.vertices.push(1, -0.5, 0);
        this.vertices.push(1, 0.5, 0);
        this.texCoords.push(0, 1);
        this.texCoords.push(0, 0);
        this.normals.push(1, 0, 0);
        this.normals.push(1, 0, 0);

        ang += alphaAng;

        for(var i = 1; i < this.slices + 1; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var ca=Math.cos(ang);

            this.vertices.push(ca, -0.5, -sa);
            this.vertices.push(ca, 0.5, -sa);
            this.indices.push(2 * i - 1,2 * i - 2, 2 * i + 1);
            this.indices.push(2 * i - 2 , 2 * i, 2 * i + 1);

            //Setting text coords
            this.texCoords.push(texIncrement * (i + 1), 1);
            this.texCoords.push(texIncrement * (i + 1), 0);

            
            // 
            var normal= [
                ca,
                0,
                -sa
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);

            ang+=alphaAng;
        }

        
        //this.bottomMaterial.apply();
        ang = 0;
        for(var i = 0; i < this.slices; i++){
            
            var sa=Math.sin(ang);
            var ca=Math.cos(ang);

            this.vertices.push(ca, -0.5, -sa);
            if(i >= 2){
                this.indices.push(this.slices * 2 + 2 + i , this.slices * 2 + 1 + i , this.slices * 2 + 2);
            }
            this.texCoords.push(0.5 +ca / 2.0, 0.5 + sa / 2);
            ang += alphaAng;
        }
        this.vertices.push(1, -0.5, 0);
        this.texCoords.push(1, 0.5);

        //this.topMaterial.apply();
        ang = 0;
        for(var i = 0; i < this.slices; i++){
            
            var sa=Math.sin(ang);
            var ca=Math.cos(ang);

            this.vertices.push(ca, 0.5, -sa);
            if(i >= 2){
                this.indices.push(this.slices * 3 + 3, this.slices * 3 + 2 + i, this.slices * 3 + 3 + i);
            }
            sa = Math.sin(ang + Math.PI);
            ca = Math.cos(ang + Math.PI);
            this.texCoords.push(0.5 +ca / 2.0, 0.5 - sa / 2);
            ang += alphaAng;
        }
        ang = 0;
        this.vertices.push(1, 0.5, 0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


