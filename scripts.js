// NIM  : 13519200
// Nama : Muhammad Dehan Al Kautsar
// Tugas Ca-Gaib 2021
// insipiration: https://www.youtube.com/watch?v=kB0ZVUrI4Aw&ab_channel=IndigoCode

var vertexShaderText =
[
     'precision mediump float;',
     '',
     'attribute vec3 vertPosition;',
     'attribute vec3 vertColor;',
     'varying vec3 fragColor;',
     'uniform mat4 mWorld;',
     'uniform mat4 mView;',
     'uniform mat4 mProj;',
     // 'uniform float screenWidth',
     '',
     'void main()',
     '{',
     '    fragColor = vertColor;',
     '    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
     '}'
].join('\n');

var fragmentShaderText =
[
     'precision mediump float;',
     '',
     'varying vec3 fragColor;',
     'void main()',
     '{',
     '    gl_FragColor = vec4(fragColor, 1.0);',
     '}'
].join('\n');

var InitDemo = function () {
     //testing
     console.log('This is working');

     //get canvas from index.html and get WebGL context
     var canvas = document.getElementById('surfaces');
     var gl = canvas.getContext('webgl');
     
     //if webgl cant load the context
     if (!gl) {
          console.log('WebGl not supported, falling back on experimental WebGL');
          gl = canvas.getContext('experimental-webgl');
     } if (!gl) {
          alert('Your browser does not support WebGL');
     }

     gl.clearColor(0.95, 0.15, 0.2, 0.4);
     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
     //penting!!!!!! buat test depth and cull
     gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

     // create shaders
     var vertexShader = gl.createShader(gl.VERTEX_SHADER);
     var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

     gl.shaderSource(vertexShader,vertexShaderText);
     gl.shaderSource(fragmentShader,fragmentShaderText);

     gl.compileShader(vertexShader);
     if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
          console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
          return;
     }
     gl.compileShader(fragmentShader);
     if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
          console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
          return;
     }

     var program = gl.createProgram();
     gl.attachShader(program, vertexShader);
     gl.attachShader(program, fragmentShader);
     gl.linkProgram(program);
     if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error('ERROR linking program!', gl.getProgramInfoLog(program));
          return;
     }

     gl.validateProgram(program)
     if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
          console.error('ERROR validating program!', gl.getProgramInfoLog(program));
          return;
     }

     //
     // create buffer
     //
     var boxVertices =
     [ //X,Y,Z                R,G,B
          //box1
          //top
          -0.5,0.5,0.3,      0,0.5,1,
          -0.5,0.5,0.5,       0,0.5,1,
          -0.3,0.5,0.5,        0,0.5,1,
          -0.3,0.5,0.3,       0,0.5,1,

          //left
          -0.5, 0.5, 0.5,     0.1, 0.6, 0.9,
		-0.5, -0.5, 0.5,    0.1, 0.6, 0.9,
		-0.5, -0.5, 0.3,   0.1, 0.6, 0.9,
		-0.5, 0.5, 0.3,    0.1, 0.6, 0.9,

          //right
          -0.3, 0.5, 0.5,      0.2, 0.7, 0.8,
		-0.3, -0.5, 0.5,     0.2, 0.7, 0.8,
		-0.3, -0.5, 0.3,    0.2, 0.7, 0.8,
	     -0.3, 0.5, 0.3,     0.2, 0.7, 0.8,

          //front
          -0.3, 0.5, 0.5,      0.3,0.8,0.7,
		-0.3, -0.5, 0.5,     0.3,0.8,0.7,
		-0.5, -0.5, 0.5,    0.3,0.8,0.7,
		-0.5, 0.5, 0.5,     0.3,0.8,0.7,

          //back
          -0.3, 0.5, 0.3,     0.4, 0.9, 0.6,
		-0.3, -0.5, 0.3,    0.4, 0.9, 0.6,
		-0.5, -0.5, 0.3,   0.4, 0.9, 0.6,
		-0.5, 0.5, 0.3,    0.4, 0.9, 0.6,

          //bottom
          -0.5, -0.5, 0.3,   0.5, 1, 0.5,
		-0.5, -0.5, 0.5,    0.5, 1, 0.5,
		-0.3, -0.5, 0.5,     0.5, 1, 0.5,
		-0.3, -0.5, 0.3,    0.5, 1, 0.5,

          //box2
          //top
          -0.5,-0.3,0.3,      0,0.5,1,
          -0.5,-0.3,0.5,       0,0.5,1,
          0.5,-0.3,0.5,        0,0.5,1,
          0.5,-0.3,0.3,       0,0.5,1,

          //left
          -0.5, -0.3, 0.5,     0.1, 0.6, 0.9,
		-0.5, -0.5, 0.5,    0.1, 0.6, 0.9,
		-0.5, -0.5, 0.3,   0.1, 0.6, 0.9,
		-0.5, -0.3, 0.3,    0.1, 0.6, 0.9,

          //right
          0.5, -0.3, 0.5,      0.2, 0.7, 0.8,
		0.5, -0.5, 0.5,     0.2, 0.7, 0.8,
		0.5, -0.5, 0.3,    0.2, 0.7, 0.8,
	     0.5, -0.3, 0.3,     0.2, 0.7, 0.8,

          //front
          0.5, -0.3, 0.5,      0.3,0.8,0.7,
		0.5, -0.5, 0.5,     0.3,0.8,0.7,
		-0.5, -0.5, 0.5,    0.3,0.8,0.7,
		-0.5, -0.3, 0.5,     0.3,0.8,0.7,

          //back
          0.5, -0.3, 0.3,     0.4, 0.9, 0.6,
		0.5, -0.5, 0.3,    0.4, 0.9, 0.6,
		-0.5, -0.5, 0.3,   0.4, 0.9, 0.6,
		-0.5, -0.3, 0.3,    0.4, 0.9, 0.6,

          //bottom
          -0.5, -0.5, 0.3,   0.5, 1, 0.5,
		-0.5, -0.5, 0.5,    0.5, 1, 0.5,
		0.5, -0.5, 0.5,     0.5, 1, 0.5,
		0.5, -0.5, 0.3,    0.5, 1, 0.5,

          //box3
          //top
          0.3,0.5,0.3,      0,0.5,1,
          0.3,0.5,0.5,       0,0.5,1,
          0.5,0.5,0.5,        0,0.5,1,
          0.5,0.5,0.3,       0,0.5,1,

          //left
          0.3, 0.5, 0.5,     0.1, 0.6, 0.9,
		0.3, -0.5, 0.5,    0.1, 0.6, 0.9,
		0.3, -0.5, 0.3,   0.1, 0.6, 0.9,
		0.3, 0.5, 0.3,    0.1, 0.6, 0.9,

          //right
          0.5, 0.5, 0.5,      0.2, 0.7, 0.8,
		0.5, -0.5, 0.5,     0.2, 0.7, 0.8,
		0.5, -0.5, 0.3,    0.2, 0.7, 0.8,
	     0.5, 0.5, 0.3,     0.2, 0.7, 0.8,

          //front
          0.5, 0.5, 0.5,      0.3,0.8,0.7,
		0.5, -0.5, 0.5,     0.3,0.8,0.7,
		0.3, -0.5, 0.5,    0.3,0.8,0.7,
		0.3, 0.5, 0.5,     0.3,0.8,0.7,

          //back
          0.5, 0.5, 0.3,     0.4, 0.9, 0.6,
		0.5, -0.5, 0.3,    0.4, 0.9, 0.6,
		0.3, -0.5, 0.3,   0.4, 0.9, 0.6,
		0.3, 0.5, 0.3,    0.4, 0.9, 0.6,

          //bottom
          0.3, -0.5, 0.3,   0.5, 1, 0.5,
		0.3, -0.5, 0.5,    0.5, 1, 0.5,
		0.5, -0.5, 0.5,     0.5, 1, 0.5,
		0.5, -0.5, 0.3,    0.5, 1, 0.5,

          //box4
          //top
          -0.5,0.5,0.3,      0,0.5,1,
          -0.5,0.5,0.5,       0,0.5,1,
          0.5,0.5,0.5,        0,0.5,1,
          0.5,0.5,0.3,       0,0.5,1,

          //left
          -0.5, 0.5, 0.5,     0.1, 0.6, 0.9,
		-0.5, 0.3, 0.5,    0.1, 0.6, 0.9,
		-0.5, 0.3, 0.3,   0.1, 0.6, 0.9,
		-0.5, 0.5, 0.3,    0.1, 0.6, 0.9,

          //right
          0.5, 0.5, 0.5,      0.2, 0.7, 0.8,
		0.5, 0.3, 0.5,     0.2, 0.7, 0.8,
		0.5, 0.3, 0.3,    0.2, 0.7, 0.8,
	     0.5, 0.5, 0.3,     0.2, 0.7, 0.8,

          //front
          0.5, 0.5, 0.5,      0.3,0.8,0.7,
		0.5, 0.3, 0.5,     0.3,0.8,0.7,
		-0.5, 0.3, 0.5,    0.3,0.8,0.7,
		-0.5, 0.5, 0.5,     0.3,0.8,0.7,

          //back
          0.5, 0.5, 0.3,     0.4, 0.9, 0.6,
		0.5, 0.3, 0.3,    0.4, 0.9, 0.6,
		-0.5, 0.3, 0.3,   0.4, 0.9, 0.6,
		-0.5, 0.5, 0.3,    0.4, 0.9, 0.6,

          //bottom
          -0.5, 0.3, 0.3,   0.5, 1, 0.5,
		-0.5, 0.3, 0.5,    0.5, 1, 0.5,
		0.5, 0.3, 0.5,     0.5, 1, 0.5,
		0.5, 0.3, 0.3,    0.5, 1, 0.5,

          //box5
          //top
          -0.5,0.5,-0.5,      0,0.5,1,
          -0.5,0.5,-0.3,       0,0.5,1,
          -0.3,0.5,-0.3,        0,0.5,1,
          -0.3,0.5,-0.5,       0,0.5,1,

          //left
          -0.5, 0.5, -0.3,     0.1, 0.6, 0.9,
		-0.5, -0.5, -0.3,    0.1, 0.6, 0.9,
		-0.5, -0.5, -0.5,   0.1, 0.6, 0.9,
		-0.5, 0.5, -0.5,    0.1, 0.6, 0.9,

          //right
          -0.3, 0.5, -0.3,      0.2, 0.7, 0.8,
		-0.3, -0.5, -0.3,     0.2, 0.7, 0.8,
		-0.3, -0.5, -0.5,    0.2, 0.7, 0.8,
	     -0.3, 0.5, -0.5,     0.2, 0.7, 0.8,

          //front
          -0.3, 0.5, -0.3,      0.3,0.8,0.7,
		-0.3, -0.5, -0.3,     0.3,0.8,0.7,
		-0.5, -0.5, -0.3,    0.3,0.8,0.7,
		-0.5, 0.5, -0.3,     0.3,0.8,0.7,

          //back
          -0.3, 0.5, -0.5,     0.4, 0.9, 0.6,
		-0.3, -0.5, -0.5,    0.4, 0.9, 0.6,
		-0.5, -0.5, -0.5,   0.4, 0.9, 0.6,
		-0.5, 0.5, -0.5,    0.4, 0.9, 0.6,

          //bottom
          -0.5, -0.5, -0.5,   0.5, 1, 0.5,
		-0.5, -0.5, -0.3,    0.5, 1, 0.5,
		-0.3, -0.5, -0.3,     0.5, 1, 0.5,
		-0.3, -0.5, -0.5,    0.5, 1, 0.5,

          //box6
          //top
          -0.5,-0.3,-0.5,      0,0.5,1,
          -0.5,-0.3,-0.3,       0,0.5,1,
          0.5,-0.3,-0.3,        0,0.5,1,
          0.5,-0.3,-0.5,       0,0.5,1,

          //left
          -0.5, -0.3, -0.3,     0.1, 0.6, 0.9,
		-0.5, -0.5, -0.3,    0.1, 0.6, 0.9,
		-0.5, -0.5, -0.5,   0.1, 0.6, 0.9,
		-0.5, -0.3, -0.5,    0.1, 0.6, 0.9,

          //right
          0.5, -0.3, -0.3,      0.2, 0.7, 0.8,
		0.5, -0.5, -0.3,     0.2, 0.7, 0.8,
		0.5, -0.5, -0.5,    0.2, 0.7, 0.8,
	     0.5, -0.3, -0.5,     0.2, 0.7, 0.8,

          //front
          0.5, -0.3, -0.3,      0.3,0.8,0.7,
		0.5, -0.5, -0.3,     0.3,0.8,0.7,
		-0.5, -0.5, -0.3,    0.3,0.8,0.7,
		-0.5, -0.3, -0.3,     0.3,0.8,0.7,

          //back
          0.5, -0.3, -0.5,     0.4, 0.9, 0.6,
		0.5, -0.5, -0.5,    0.4, 0.9, 0.6,
		-0.5, -0.5, -0.5,   0.4, 0.9, 0.6,
		-0.5, -0.3, -0.5,    0.4, 0.9, 0.6,

          //bottom
          -0.5, -0.5, -0.5,   0.5, 1, 0.5,
		-0.5, -0.5, -0.3,    0.5, 1, 0.5,
		0.5, -0.5, -0.3,     0.5, 1, 0.5,
		0.5, -0.5, -0.5,    0.5, 1, 0.5,

          //box7
          //top
          0.3,0.5,-0.5,      0,0.5,1,
          0.3,0.5,-0.3,       0,0.5,1,
          0.5,0.5,-0.3,        0,0.5,1,
          0.5,0.5,-0.5,       0,0.5,1,

          //left
          0.3, 0.5, -0.3,     0.1, 0.6, 0.9,
		0.3, -0.5, -0.3,    0.1, 0.6, 0.9,
		0.3, -0.5, -0.5,   0.1, 0.6, 0.9,
		0.3, 0.5, -0.5,    0.1, 0.6, 0.9,

          //right
          0.5, 0.5, -0.3,      0.2, 0.7, 0.8,
		0.5, -0.5, -0.3,     0.2, 0.7, 0.8,
		0.5, -0.5, -0.5,    0.2, 0.7, 0.8,
	     0.5, 0.5, -0.5,     0.2, 0.7, 0.8,

          //front
          0.5, 0.5, -0.3,      0.3,0.8,0.7,
		0.5, -0.5, -0.3,     0.3,0.8,0.7,
		0.3, -0.5, -0.3,    0.3,0.8,0.7,
		0.3, 0.5, -0.3,     0.3,0.8,0.7,

          //back
          0.5, 0.5, -0.5,     0.4, 0.9, 0.6,
		0.5, -0.5, -0.5,    0.4, 0.9, 0.6,
		0.3, -0.5, -0.5,   0.4, 0.9, 0.6,
		0.3, 0.5, -0.5,    0.4, 0.9, 0.6,

          //bottom
          0.3, -0.5, -0.5,   0.5, 1, 0.5,
		0.3, -0.5, -0.3,    0.5, 1, 0.5,
		0.5, -0.5, -0.3,     0.5, 1, 0.5,
		0.5, -0.5, -0.5,    0.5, 1, 0.5,

          //box8
          //top
          -0.5,0.5,-0.5,      0,0.5,1,
          -0.5,0.5,-0.3,       0,0.5,1,
          0.5,0.5,-0.3,        0,0.5,1,
          0.5,0.5,-0.5,       0,0.5,1,

          //left
          -0.5, 0.5, -0.3,     0.1, 0.6, 0.9,
		-0.5, 0.3, -0.3,    0.1, 0.6, 0.9,
		-0.5, 0.3, -0.5,   0.1, 0.6, 0.9,
		-0.5, 0.5, -0.5,    0.1, 0.6, 0.9,

          //right
          0.5, 0.5, -0.3,      0.2, 0.7, 0.8,
		0.5, 0.3, -0.3,     0.2, 0.7, 0.8,
		0.5, 0.3, -0.5,    0.2, 0.7, 0.8,
	     0.5, 0.5, -0.5,     0.2, 0.7, 0.8,

          //front
          0.5, 0.5, -0.3,      0.3,0.8,0.7,
		0.5, 0.3, -0.3,     0.3,0.8,0.7,
		-0.5, 0.3, -0.3,    0.3,0.8,0.7,
		-0.5, 0.5, -0.3,     0.3,0.8,0.7,

          //back
          0.5, 0.5, -0.5,     0.4, 0.9, 0.6,
		0.5, 0.3, -0.5,    0.4, 0.9, 0.6,
		-0.5, 0.3, -0.5,   0.4, 0.9, 0.6,
		-0.5, 0.5, -0.5,    0.4, 0.9, 0.6,

          //bottom
          -0.5, 0.3, -0.5,   0.5, 1, 0.5,
		-0.5, 0.3, -0.3,    0.5, 1, 0.5,
		0.5, 0.3, -0.3,     0.5, 1, 0.5,
		0.5, 0.3, -0.5,    0.5, 1, 0.5,
     ];

     var boxIndices =
	[
          //box1
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23,

          //box2
		// Top
		24, 25, 26,
		24, 26, 27,

		// Left
		29, 28, 30,
		30, 28, 31,

		// Right
		32,33, 34,
		32, 34, 35,

		// Front
		37, 36, 38,
		39, 38, 36,

		// Back
		40, 41, 42,
		40, 42, 43,

		// Bottom
		45, 44, 46,
		46, 44, 47,

          //box3
		// Top
		48, 49, 50,
		48, 50, 51,

		// Left
		53, 52, 54,
		54, 52, 55,

		// Right
		56,57, 58,
		56, 58, 59,

		// Front
		61, 60, 62,
		63, 62, 60,

		// Back
		64, 65, 66,
		64, 66, 67,

		// Bottom
		69, 68, 70,
		70, 68, 71,

          //box4
		// Top
		72, 73, 74,
		72, 74, 75,

		// Left
		77, 76, 78,
		78, 76, 79,

		// Right
		80, 81, 82,
		80, 82, 83,

		// Front
		85, 84, 86,
		87, 86, 84,

		// Back
		88, 89, 90,
		88, 90, 91,

		// Bottom
		93, 92, 94,
		94, 92, 95,

          //box5
		// Top
		96, 97, 98,
		96, 98, 99,

		// Left
		101, 100, 102,
		102, 100, 103,

		// Right
		104, 105, 106,
		104, 106, 107,

		// Front
		109, 108, 110,
		111, 110, 108,

		// Back
		112, 113, 114,
		112, 114, 115,

		// Bottom
		117, 116, 118,
		118, 116, 119,

          //box6
		// Top
		120, 121, 122,
		120, 122, 123,

		// Left
		125, 124, 126,
		126, 124, 127,

		// Right
		128, 129, 130,
		128, 130, 131,

		// Front
		133, 132, 134,
		135, 134, 132,

		// Back
		136, 137, 138,
		136, 138, 139,

		// Bottom
		141, 140, 142,
		142, 140, 143,

          //box7
		// Top
		144, 145, 146,
		144, 146, 147,

		// Left
		149, 148, 150,
		150, 148, 151,

		// Right
		152, 153, 154,
		152, 154, 155,

		// Front
		157, 156, 158,
		159, 158, 156,

		// Back
		160, 161, 162,
		160, 162, 163,

		// Bottom
		165, 164, 166,
		166, 164, 167,

          //box8
		// Top
		168, 169, 170,
		168, 170, 171,

		// Left
		173, 172, 174,
		174, 172, 175,

		// Right
		176, 177, 178,
		176, 178, 179,

		// Front
		181, 180, 182,
		183, 182, 180,

		// Back
		184, 185, 186,
		184, 186, 187,

		// Bottom
		189, 188, 190,
		190, 188, 191,
	];

     //make box's buffer
     var boxVertexBufferObject = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

     var boxIndexBufferObject = gl.createBuffer();
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

     //get attribute location
     var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
     var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
     gl.vertexAttribPointer(
          positionAttribLocation, //Attribute location
          3, // number of elements per attribute
          gl.FLOAT, //type of elements
          gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex
          0// Offset from the beginning of a single vertex to this attribute
     );
     gl.vertexAttribPointer(
          colorAttribLocation, //Attribute location
          3, // number of elements per attribute
          gl.FLOAT, //type of elements
          gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex
          3 * Float32Array.BYTES_PER_ELEMENT// Offset from the beginning of a single vertex to this attribute
     );

     gl.enableVertexAttribArray(positionAttribLocation);
     gl.enableVertexAttribArray(colorAttribLocation);


     //
     // Main render loop
     //
     gl.useProgram(program);

     var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
     var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
     var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

     var worldMatrix = new Float32Array(16);
     var viewMatrix = new Float32Array(16);
     var projMatrix = new Float32Array(16);

     mat4.identity(worldMatrix);
     mat4.lookAt(viewMatrix, [4,1,4], [0,0,0], [0,1,0]);
     mat4.perspective(projMatrix, glMatrix.toRadian(25), canvas.width / canvas.height, 0.1, 1000.0);

     gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
     gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
     gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
     
     gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
};