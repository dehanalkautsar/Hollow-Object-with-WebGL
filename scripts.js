// NIM  : 13519200
// Nama : Muhammad Dehan Al Kautsar
// Tugas Ca-Gaib 2021

/////////////////////////////////////////////////////////
//////////////////  SCRIPT FOR CANVAS   /////////////////
/////////////////////////////////////////////////////////

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

var eye = [6,0,0];
var center = [0,0,0];
var up = [0,1,0];
var scaleRad = 25;
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

	//box9
	//top
	-0.5,0.5,-0.5,      0,0.5,1,
	-0.5,0.5,0.5,       0,0.5,1,
	-0.3,0.5,0.5,        0,0.5,1,
	-0.3,0.5,-0.5,       0,0.5,1,

	//left
	-0.5, 0.5, 0.5,     0.1, 0.6, 0.9,
	-0.5, 0.3, 0.5,    0.1, 0.6, 0.9,
	-0.5, 0.3, -0.5,   0.1, 0.6, 0.9,
	-0.5, 0.5, -0.5,    0.1, 0.6, 0.9,

	//right
	-0.3, 0.5, 0.5,      0.2, 0.7, 0.8,
	-0.3, 0.3, 0.5,     0.2, 0.7, 0.8,
	-0.3, 0.3, -0.5,    0.2, 0.7, 0.8,
	-0.3, 0.5, -0.5,     0.2, 0.7, 0.8,

	//front
	-0.3, 0.5, 0.5,      0.3,0.8,0.7,
	-0.3, 0.3, 0.5,     0.3,0.8,0.7,
	-0.5, 0.3, 0.5,    0.3,0.8,0.7,
	-0.5, 0.5, 0.5,     0.3,0.8,0.7,

	//back
	-0.3, 0.5, -0.5,     0.4, 0.9, 0.6,
	-0.3, 0.3, -0.5,    0.4, 0.9, 0.6,
	-0.5, 0.3, -0.5,   0.4, 0.9, 0.6,
	-0.5, 0.5, -0.5,    0.4, 0.9, 0.6,

	//bottom
	-0.5, 0.3, -0.5,   0.5, 1, 0.5,
	-0.5, 0.3, 0.5,    0.5, 1, 0.5,
	-0.3, 0.3, 0.5,     0.5, 1, 0.5,
	-0.3, 0.3, -0.5,    0.5, 1, 0.5,

	//box10
	//top
	-0.5,-0.3,-0.5,      0,0.5,1,
	-0.5,-0.3,0.5,       0,0.5,1,
	-0.3,-0.3,0.5,        0,0.5,1,
	-0.3,-0.3,-0.5,       0,0.5,1,

	//left
	-0.5, -0.3, 0.5,     0.1, 0.6, 0.9,
	-0.5, -0.5, 0.5,    0.1, 0.6, 0.9,
	-0.5, -0.5, -0.5,   0.1, 0.6, 0.9,
	-0.5, -0.3, -0.5,    0.1, 0.6, 0.9,

	//right
	-0.3, -0.3, 0.5,      0.2, 0.7, 0.8,
	-0.3, -0.5, 0.5,     0.2, 0.7, 0.8,
	-0.3, -0.5, -0.5,    0.2, 0.7, 0.8,
	-0.3, -0.3, -0.5,     0.2, 0.7, 0.8,

	//front
	-0.3, -0.3, 0.5,      0.3,0.8,0.7,
	-0.3, -0.5, 0.5,     0.3,0.8,0.7,
	-0.5, -0.5, 0.5,    0.3,0.8,0.7,
	-0.5, -0.3, 0.5,     0.3,0.8,0.7,

	//back
	-0.3, -0.3, -0.5,     0.4, 0.9, 0.6,
	-0.3, -0.5, -0.5,    0.4, 0.9, 0.6,
	-0.5, -0.5, -0.5,   0.4, 0.9, 0.6,
	-0.5, -0.3, -0.5,    0.4, 0.9, 0.6,

	//bottom
	-0.5, -0.5, -0.5,   0.5, 1, 0.5,
	-0.5, -0.5, 0.5,    0.5, 1, 0.5,
	-0.3, -0.5, 0.5,     0.5, 1, 0.5,
	-0.3, -0.5, -0.5,    0.5, 1, 0.5,

	//box11
	//top
	0.3,-0.3,-0.5,      0,0.5,1,
	0.3,-0.3,0.5,       0,0.5,1,
	0.5,-0.3,0.5,        0,0.5,1,
	0.5,-0.3,-0.5,       0,0.5,1,

	//left
	0.3, -0.3, 0.5,     0.1, 0.6, 0.9,
	0.3, -0.5, 0.5,    0.1, 0.6, 0.9,
	0.3, -0.5, -0.5,   0.1, 0.6, 0.9,
	0.3, -0.3, -0.5,    0.1, 0.6, 0.9,

	//right
	0.5, -0.3, 0.5,      0.2, 0.7, 0.8,
	0.5, -0.5, 0.5,     0.2, 0.7, 0.8,
	0.5, -0.5, -0.5,    0.2, 0.7, 0.8,
	0.5, -0.3, -0.5,     0.2, 0.7, 0.8,

	//front
	0.5, -0.3, 0.5,      0.3,0.8,0.7,
	0.5, -0.5, 0.5,     0.3,0.8,0.7,
	0.3, -0.5, 0.5,    0.3,0.8,0.7,
	0.3, -0.3, 0.5,     0.3,0.8,0.7,

	//back
	0.5, -0.3, -0.5,     0.4, 0.9, 0.6,
	0.5, -0.5, -0.5,    0.4, 0.9, 0.6,
	0.3, -0.5, -0.5,   0.4, 0.9, 0.6,
	0.3, -0.3, -0.5,    0.4, 0.9, 0.6,

	//bottom
	0.3, -0.5, -0.5,   0.5, 1, 0.5,
	0.3, -0.5, 0.5,    0.5, 1, 0.5,
	0.5, -0.5, 0.5,     0.5, 1, 0.5,
	0.5, -0.5, -0.5,    0.5, 1, 0.5,

	//box12
	//top
	0.3,0.5,-0.5,      0,0.5,1,
	0.3,0.5,0.5,       0,0.5,1,
	0.5,0.5,0.5,        0,0.5,1,
	0.5,0.5,-0.5,       0,0.5,1,

	//left
	0.3, 0.5, 0.5,     0.1, 0.6, 0.9,
	0.3, 0.3, 0.5,    0.1, 0.6, 0.9,
	0.3, 0.3, -0.5,   0.1, 0.6, 0.9,
	0.3, 0.5, -0.5,    0.1, 0.6, 0.9,

	//right
	0.5, 0.5, 0.5,      0.2, 0.7, 0.8,
	0.5, 0.3, 0.5,     0.2, 0.7, 0.8,
	0.5, 0.3, -0.5,    0.2, 0.7, 0.8,
	0.5, 0.5, -0.5,     0.2, 0.7, 0.8,

	//front
	0.5, 0.5, 0.5,      0.3,0.8,0.7,
	0.5, 0.3, 0.5,     0.3,0.8,0.7,
	0.3, 0.3, 0.5,    0.3,0.8,0.7,
	0.3, 0.5, 0.5,     0.3,0.8,0.7,

	//back
	0.5, 0.5, -0.5,     0.4, 0.9, 0.6,
	0.5, 0.3, -0.5,    0.4, 0.9, 0.6,
	0.3, 0.3, -0.5,   0.4, 0.9, 0.6,
	0.3, 0.5, -0.5,    0.4, 0.9, 0.6,

	//bottom
	0.3, 0.3, -0.5,   0.5, 1, 0.5,
	0.3, 0.3, 0.5,    0.5, 1, 0.5,
	0.5, 0.3, 0.5,     0.5, 1, 0.5,
	0.5, 0.3, -0.5,    0.5, 1, 0.5,
];

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

          //box9
		// Top
		192, 193, 194,
		192, 194, 195,

		// Left
		197, 196, 198,
		198, 196, 199,

		// Right
		200, 201, 202,
		200, 202, 203,

		// Front
		205, 204, 206,
		207, 206, 204,

		// Back
		208, 209, 210,
		208, 210, 211,

		// Bottom
		213, 212, 214,
		214, 212, 215,

          //box10
		// Top
		216, 217, 218,
		216, 218, 219,

		// Left
		221, 220, 222,
		222, 220, 223,

		// Right
		224, 225, 226,
		224, 226, 227,

		// Front
		229, 228, 230,
		231, 230, 228,

		// Back
		232, 233, 234,
		232, 234, 235,

		// Bottom
		237, 236, 238,
		238, 236, 239,

          //box11
		// Top
		240, 241, 242,
		240, 242, 243,

		// Left
		245, 244, 246,
		246, 244, 247,

		// Right
		248, 249, 250,
		248, 250, 251,

		// Front
		253, 252, 254,
		255, 254, 252,

		// Back
		256, 257, 258,
		256, 258, 259,

		// Bottom
		261, 260, 262,
		262, 260, 263,

          //box12
		// Top
		264, 265, 266,
		264, 266, 267,

		// Left
		269, 268, 270,
		270, 268, 271,

		// Right
		272, 273, 274,
		272, 274, 275,

		// Front
		277, 276, 278,
		279, 278, 276,

		// Back
		280, 281, 282,
		280, 282, 283,

		// Bottom
		285, 284, 286,
		286, 284, 287,
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
     mat4.lookAt(viewMatrix, eye, center, up);
     mat4.perspective(projMatrix, glMatrix.toRadian(scaleRad), canvas.width / canvas.height, 0.1, 1000.0);

     gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
     gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
     gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
     
     gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
};


/////////////////////////////////////////////////////////
//////////////////  SCRIPT FOR SLIDER   /////////////////
/////////////////////////////////////////////////////////

function degrees_to_radians(degrees)
{
	var pi = Math.PI;
	return degrees * (pi/180);
}

translateMode = false;
rotateMode = true;

var slider11 = document.getElementById("x-Translate");
var output11 = document.getElementById("11");
output11.innerHTML = (slider11.value/1000).toFixed(3);
eye[2] = (6)*slider11.value/5000;
center[2] = (6)*slider11.value/5000;
slider11.oninput = function() {
	if (rotateMode) {
		slider21.value = 0;
		slider22.value = 0;
		output21.innerHTML = (slider21.value);
		output22.innerHTML = (slider22.value);
		eye = [6,0,0];
		center = [0,0,0];
		rotateMode = false;
	}
	translateMode = true;
	output11.innerHTML = (this.value/1000).toFixed(3);
	eye[2] = (6)*this.value/5000;
	center[2] = (6)*this.value/5000;

	InitDemo();
}
var slider12 = document.getElementById("y-Translate");
var output12 = document.getElementById("12");
output12.innerHTML = (slider12.value/1000).toFixed(3);
eye[1] = (-6)*slider12.value/5000;
center[1] = (-6)*slider12.value/5000;
slider12.oninput = function() {
	if (rotateMode) {
		slider21.value = 0;
		slider22.value = 0;
		output21.innerHTML = (slider21.value);
		output22.innerHTML = (slider22.value);
		eye = [6,0,0];
		center = [0,0,0];
		rotateMode = false;
	}
	translateMode = true;
	output12.innerHTML = (this.value/1000).toFixed(3);
	eye[1] = (-6)*this.value/5000;
	center[1] = (-6)*this.value/5000;

	InitDemo();
}

var slider13 = document.getElementById("scale");
var output13 = document.getElementById("13");
output13.innerHTML = (slider13.value);
scaleRad = slider13.value/20;
if (scaleRad == 0) {
	scaleRad = 0.05
}
slider13.oninput = function() {
	output13.innerHTML = (this.value);
	scaleRad = this.value/20;
	if (scaleRad == 0) {
		scaleRad = 0.05
	}
	InitDemo();
}

var slider21 = document.getElementById("x-Rotate");
var output21 = document.getElementById("21");
output21.innerHTML = (slider21.value);
eye[0] = Math.cos(degrees_to_radians(slider21.value))*(6);
eye[2] = Math.sin(degrees_to_radians(slider21.value))*(-6);
slider21.oninput = function() {
	if (translateMode) {
		slider11.value = 0;
		slider12.value = 0;
		output11.innerHTML = (slider11.value/1000).toFixed(3);
		output12.innerHTML = (slider12.value/1000).toFixed(3);
		eye = [6,0,0];
		center = [0,0,0];
		translateMode = false;
	}
	rotateMode = true;
	output21.innerHTML = (this.value);
	eye[0] = Math.cos(degrees_to_radians(this.value))*(6);
	eye[2] = Math.sin(degrees_to_radians(this.value))*(-6);
	// console.log(eye);
	InitDemo();
}
var slider22 = document.getElementById("y-Rotate");
var output22 = document.getElementById("22");
output22.innerHTML = (slider22.value);
eye[1] = Math.sin(degrees_to_radians(slider22.value))*(6);
slider22.oninput = function() {
	if (translateMode) {
		slider11.value = 0;
		slider12.value = 0;
		output11.innerHTML = (slider11.value/1000).toFixed(3);
		output12.innerHTML = (slider12.value/1000).toFixed(3);
		eye = [6,0,0];
		center = [0,0,0];
		translateMode = false;
	}
	rotateMode = true;
	output22.innerHTML = (this.value);
	// eye[0] = Math.cos(degrees_to_radians(this.value))*(6);
	eye[1] = Math.sin(degrees_to_radians(this.value))*(6);
	// console.log(eye);
	InitDemo();
}


/////////////////////////////////////////////////////////
/////////////////    SCRIPT FOR COLOR   /////////////////
/////////////////////////////////////////////////////////

 /* Toolbox code */
 function hexToRgb(hex) {
     var c;
     if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		// console.log("we reached tihis");
          c = hex.substring(1).split('');
          if (c.length == 3) {
               c = [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c = '0x' + c.join('');
          return new Color(((c >> 16) & 255) / 255.0, ((c >> 8) & 255) / 255.0, (c & 255) / 255.0)
     }
     throw new Error('Bad Hex');
}
function editColor(r,g,b,boxVertices) {
	for (let i=0; i<12; i++) {
		for (let j=0; j<6; j++) {
			for (let k=0; k<6; k++) {
				boxVertices[(i*144)+(j*24)+(k*6)+3] = r;
				boxVertices[(i*144)+(j*24)+(k*6)+4] = g;
				boxVertices[(i*144)+(j*24)+(k*6)+5] = b;
			}
		}
	}
}

var isColor = false;
var currColor = new Color(0.137,0.882,0.91);
var valueColor = document.getElementById("color");
valueColor.addEventListener("click", function(e) {
	currColor = hexToRgb(document.getElementById("color").value);
	editColor(currColor.red, currColor.green, currColor.blue, boxVertices);
	InitDemo();
});
valueColor.addEventListener("input", function(e) {
	currColor = hexToRgb(document.getElementById("color").value);
	editColor(currColor.red, currColor.green, currColor.blue, boxVertices);
	InitDemo();
});