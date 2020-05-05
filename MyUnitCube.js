/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			//Top
			-0.5, -0.5, 0.5,	//0 Bottom left (z>0)
			0.5, -0.5, 0.5,		//1 Bottom right (z>0)
			0.5, 0.5, 0.5,		//2 Top right (z>0)
			-0.5, 0.5, 0.5,  	//3 Top left (z>0)
			
			//Bottom
            -0.5, -0.5, -0.5,	//4 Bottom left (z<0)
			0.5, -0.5, -0.5,	//5 Bottom right (z<0)
			0.5, 0.5, -0.5,		//6 Top right (z<0)
			-0.5, 0.5, -0.5,  	//7 Top left (z<0)
			
			//Left
			0.5, 0.5, 0.5,		//8 Top right (z>0)
			-0.5, 0.5, 0.5,  	//9 Top left (z>0)
			0.5, 0.5, -0.5,		//10 Top right (z<0)
			-0.5, 0.5, -0.5,  	//11 Top left (z<0)

			//Right
			-0.5, -0.5, 0.5,	//12 Bottom left (z>0)
			0.5, -0.5, 0.5,		//13 Bottom right (z>0)
            -0.5, -0.5, -0.5,	//14 Bottom left (z<0)
			0.5, -0.5, -0.5,	//15 Bottom right (z<0)

			//Front
			0.5, -0.5, 0.5,		//16 Bottom right (z>0)
			0.5, 0.5, 0.5,		//17 Top right (z>0)
			0.5, -0.5, -0.5,	//18 Bottom right (z<0)
			0.5, 0.5, -0.5,		//19 Top right (z<0)

			//Back
			-0.5, -0.5, 0.5,	//20 Bottom left (z>0)
			-0.5, 0.5, 0.5,  	//21 Top left (z>0)
            -0.5, -0.5, -0.5,	//22 Bottom left (z<0)
			-0.5, 0.5, -0.5,  	//23 Top left (z<0)

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0, //Plano xy positivo (ccw)
            0, 3, 2,
            
            4, 5, 6, //Plano xy negativo (cw)
			6, 7, 4,
			
			11, 10, 8, //Plano zx positivo (cw)
			8, 9, 11,

			12, 13, 15, //Plano zx negativo (ccw)
			15, 14, 12,
            
            16, 17, 19, //Plano zy positivo (cw)
            19, 18, 16,

            23, 21, 20, //Plano zy negativo (ccw)
            20, 22, 23,
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
			//Top
			2/4, 2/3,
			2/4, 1.0,
			1/4, 1.0,
			1/4, 2/3,

			//Bottom
			2/4, 1/3,
			2/4, 0.0,
			1/4, 0.0, 
			1/4, 1/3,

			//Left
			0.0, 2/3,
			1/4, 2/3,
			0.0, 1/3,
			1/4, 1/3,

			//Right
			2/4, 2/3, 
			3/4, 2/3,
			2/4, 1/3,
			3/4, 1/3,

			//Front
			3/4, 2/3,
			1.0, 2/3,
			3/4, 1/3,
			1.0, 1/3,

			//Back
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
        this.initBuffers(50, 50, 50);
        this.initNormalVizBuffers();
	}
}
