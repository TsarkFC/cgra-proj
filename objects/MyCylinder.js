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


