/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene, size) {
		super(scene);
		this.size = size;
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			//Top
			-this.size/2, -this.size/2, this.size/2,	//0 Bottom left (z>0)
			this.size/2, -this.size/2, this.size/2,		//1 Bottom right (z>0)
			this.size/2, this.size/2, this.size/2,		//2 Top right (z>0)
			-this.size/2, this.size/2, this.size/2,  	//3 Top left (z>0)
			
			//Bottom
            -this.size/2, -this.size/2, -this.size/2,	//4 Bottom left (z<0)
			this.size/2, -this.size/2, -this.size/2,	//5 Bottom right (z<0)
			this.size/2, this.size/2, -this.size/2,		//6 Top right (z<0)
			-this.size/2, this.size/2, -this.size/2,  	//7 Top left (z<0)
			
			//Left
			this.size/2, this.size/2, this.size/2,		//8 Top right (z>0)
			-this.size/2, this.size/2, this.size/2,  	//9 Top left (z>0)
			this.size/2, this.size/2, -this.size/2,		//10 Top right (z<0)
			-this.size/2, this.size/2, -this.size/2,  	//11 Top left (z<0)

			//Right
			-this.size/2, -this.size/2, this.size/2,	//12 Bottom left (z>0)
			this.size/2, -this.size/2, this.size/2,		//13 Bottom right (z>0)
            -this.size/2, -this.size/2, -this.size/2,	//14 Bottom left (z<0)
			this.size/2, -this.size/2, -this.size/2,	//15 Bottom right (z<0)

			//Front
			this.size/2, -this.size/2, this.size/2,		//16 Bottom right (z>0)
			this.size/2, this.size/2, this.size/2,		//17 Top right (z>0)
			this.size/2, -this.size/2, -this.size/2,	//18 Bottom right (z<0)
			this.size/2, this.size/2, -this.size/2,		//19 Top right (z<0)

			//Back
			-this.size/2, -this.size/2, this.size/2,	//20 Bottom left (z>0)
			-this.size/2, this.size/2, this.size/2,  	//21 Top left (z>0)
            -this.size/2, -this.size/2, -this.size/2,	//22 Bottom left (z<0)
			-this.size/2, this.size/2, -this.size/2,  	//23 Top left (z<0)

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0, //Plano xy positivo (ccw)
            0, 3, 2,
            
            4, 5, 6, //Plano xy negativo (cw)
            6, 7, 4,
            
            16, 17, 19, //Plano zy positivo (cw)
            16, 19, 18,

            23, 21, 20, //Plano zy negativo (ccw)
            22, 23, 20,

			12, 13, 15, //Plano zx negativo (ccw)
			15, 14, 12,
			
			11, 10, 8, //Plano zx positivo (cw)
			8, 9, 11
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1, 
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1, 
			0, 0, -1,
			
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,

			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
		];

		this.texCoords = [
			2/4, 2/3,
			2/4, 1,
			1/4, 1,
			1/4, 2/3,

			2/4, 1/3,
			2/4, 0,
			1/4, 0, 
			1/4, 1/3,

			0, 2/3,
			1/4, 2/3,
			0, 1/3,
			1/4, 1/3,

			2/4, 2/3, 
			3/4, 2/3,
			2/4, 1/3,
			3/4, 1/3,

			3/4, 2/3,
			1, 2/3,
			3/4, 1/3,
			1, 1/3,

			2/4, 2/3,
			1/4, 2/3,
			2/4, 1/3,
			1/4, 1/3
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
