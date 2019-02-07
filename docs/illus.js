//==============================================================================
// This CephaloPOV program generates the POV-Ray scripts for producing the
// illustrations for the documentation.
//==============================================================================


function main(cpov) {
    cpov.snapshotMode = true;
    cpov.imageOptions.height = 320;
    cpov.imageOptions.width  = 320;
    cpov.imageOptions.outputFileType = "N";
    cpov.imageOptions.createIni = true;
    cpov.imageOptions.outputAlpha = true;
    cpov.imageOptions.antialias = true;
    cpov.imageOptions.antialiasDepth = 9;
    cpov.imageOptions.includeHeader = "functions.inc";
	cpov.globalSettings.ambientLight = [0.25, 0.25, 0.25];
    cpov.globalSettings.assumedGamma = 1.0;

    var yellow = "texture { pigment { color <1, 1, 0> }}";
	var red = "texture { pigment { color <1, 0, 0> }}";
    var stage = cpov.testStage("corner", 6);

    // BicubicPatch //----------------------------------------------------------

    cpov.outputBase = "./docs/src/bicubicpatch_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new BicubicPatch({
		type: 0,
		flatness: 0.01,
		uSteps: 4,
		vSteps: 4,
		points: [
			[-2,  2, -2], [-2, -1, -1], [-2,  0, 0], [-2,  1, 1],
			[-1,  1, -2], [-1,  2, -1], [-1, -1, 0], [-1,  0, 1],
			[ 0,  0, -2], [ 0,  1, -1], [ 0,  2, 0], [ 0, -1, 1],
			[ 2, -1, -2], [ 2,  0, -1], [ 2,  1, 0], [ 2,  2, 1],
		],
		texture: yellow
	});
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Blob //------------------------------------------------------------------

    cpov.outputBase = "./docs/src/blob_basic";
    stage[0].snapshot(); stage[1].snapshot();



    var obj = new Blob({
		components: [
			new Sphere({ center: [-1.5, -1.5, -1.5], radius: 2, strength: 4 }),
			new Sphere({ center: [   0,    0,    0], radius: 2, strength: 4 }),
			new Sphere({ center: [ 1.5,  1.5,  1.5], radius: 2, strength: 4 }),
		],
		texture: yellow
	});
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // Box //-------------------------------------------------------------------

    cpov.outputBase = "./docs/src/box_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Box({
		corner1: [2,2,2],
		corner2: [-2, -2, -2],
		texture: yellow
	});
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // Cone //------------------------------------------------------------------

    cpov.outputBase = "./docs/src/cone_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Cone({
        basePoint: [0, -2, 0],
        baseRadius: 2,
        capPoint: [0, 2, 0],
        capRadius: 0,
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // Cylinder //--------------------------------------------------------------

    cpov.outputBase = "./docs/src/cylinder_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Cylinder({
        basePoint: [0, -2, 0],
        capPoint: [0, 2, 0],
        radius: 2,
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Disc //------------------------------------------------------------------

	cpov.outputBase = "./docs/src/disc_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Disc({
        center: [0, 0, 0],
		radius: 2,
		holeRadius: 1,
		normal: [0, 1, 0],
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// HeightField //-----------------------------------------------------------

	cpov.outputBase = "./docs/src/heightfield_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new HeightField({
        source: "hf_demo.png",
        waterLevel: 0.4,
        smooth: true,
        texture: yellow
    });
    var xform = new Matrix("translate", -0.5, -0.5, -0.5);
    obj.transform = xform.xMatrix(new Matrix("scale", 6, 3, 6));
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// IsoSurface //------------------------------------------------------------

	cpov.outputBase = "./docs/src/isosurface_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new IsoSurface({
        source: "&function { f_noise3d(x,y,z)-0.5 }",
        texture: yellow
    });
    var xform = new Matrix("translate", 0.5, 0.5, -0.5);
    obj.transform = xform.xMatrix(new Matrix("scale", 2, 2, 2));
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// JuliaFractal //----------------------------------------------------------

	cpov.outputBase = "./docs/src/julia_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new JuliaFractal({
		juliaParam: [-0.083, 0.0, -0.83, -0.025],
		type: "quaternion:sqr",
		maxIter: 8,
		precision: 15,
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // Lathe //-----------------------------------------------------------------

	cpov.outputBase = "./docs/src/lathe_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Lathe({
        points: [
            [0, -1.2],
            [1, -1.2],
            [1, -0.8],
            [0.8, -0.6],
            [0.8, -0.4],
            [1, -0.4],
            [1, -0.2],
            [0.8, -0.2],
            [0.8, 0],
            [1, 0],
            [1, 0.2],
            [0.8, 0.2],
            [0.6, 0.8],
            [0.6, 1.2],
            [0.8, 1.2],
            [0.8, 1.4],
            [0, 1.4]
        ],
        type: "linearSpline",
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Ovus //------------------------------------------------------------------

	cpov.outputBase = "./docs/src/ovus_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Ovus({
		bottomRadius: 2,
	    topRadius: 1,
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Parametric //-----------------------------------------------------------

	cpov.outputBase = "./docs/src/parametric_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var p2 = 2 * Math.PI;

	var obj = new Parametric({
        funcX: "&function { 1.0 * (1 - 0.5 * v / pi) * sin(5 * v + 0.5 *pi) * (1 - cos(u)) + 0.2 * sin(5 * v + 0.5 * pi) }",
        funcY: "&function { 8 * 0.5 * v / pi + 1.0 * (1 - 0.5 * v / pi) * sin(u) }",
        funcZ: "&function { 1.0 * (1 - 0.5 * v / pi ) * cos(5 * v + 0.5 * pi) * (1 - cos(u)) + 0.2 * cos(5 * v + 0.5 * pi) }",
        uv1: [0, 0],
        uv2: [p2, p2],
        accuracy: 0.0035,
        precomputeDepth: 18,
        precomputeX: true,
        precomputeY: true,
        precomputeZ: true,
        maxGradient: 10,
        containedBy: new Box({
            corner1: [-p2, -p2, -p2],
            corner2: [p2, 8/3 *p2, p2],
        }),
        texture: yellow
    });
    obj.transform = new Matrix("scale", 0.4, 0.4, 0.4);
    obj.transform = new Matrix("rotate", 0, 90, 0);
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Plane //----------------------------------------------------------------

	cpov.outputBase = "./docs/src/plane_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Plane({
		distance: 0,
		normal: [0, 1, 0],
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Polygon //--------------------------------------------------------------

	cpov.outputBase = "./docs/src/polygon_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Polygon({
		points: [[-2, 2], [2, 2], [2, -2], [-2, -2], [-2, 2], [-1, 1], [1, 1], [1, -1], [-1, -1], [-1, 1]],
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Prism //-----------------------------------------------------------------

	cpov.outputBase = "./docs/src/prism_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Prism({
		height1: -2,
		height2: 2,
		type: "linearSpline",
		points: [[-2, 2], [2, 2], [2, -2], [-2, -2], [-2, 2], [-1, 1], [1, 1], [1, -1], [-1, -1], [-1, 1]],
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Sor //-------------------------------------------------------------------

	cpov.outputBase = "./docs/src/sor_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Sor({
        points: [
            [0,   -1.4],
            [0,   -1.3],
            [1,   -1.2],
            [1,   -0.8],
            [0.8, -0.6],
            [0.8, -0.5],
            [1,   -0.4],
            [1,   -0.3],
            [0.8, -0.2],
            [0.8,  0.1],
            [1,    0.2],
            [1,    0.3],
            [0.8,  0.4],
            [0.6,  0.8],
            [0.6,  1.2],
            [0.8,  1.3],
            [0.8,  1.4],
            [0,    1.5],
            [0,    1.6]
        ],
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // Sphere //----------------------------------------------------------------

    cpov.outputBase = "./docs/src/sphere_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Sphere({ center: [0,0,0], radius: 2, texture: yellow});
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // SphereSweep //-----------------------------------------------------------

    cpov.outputBase = "./docs/src/spheresweep_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new SphereSweep({
        spheres: [
            new Sphere({ center: [-1, 1, -1], radius: 0.25 }),
            new Sphere({ center: [-1, 1, 1],  radius: 0.5  }),
            new Sphere({ center: [1, -1, 1],  radius: 0.25 }),
            new Sphere({ center: [1, -1, -1], radius: 0.5  }),
            new Sphere({ center: [-1, 1, -1], radius: 0.25 }),
        ],
        type: "linearSpline",
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Superellipsoid //--------------------------------------------------------

	cpov.outputBase = "./docs/src/superellipsoid_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Superellipsoid({
		e: 0.25,
		n: 0.25,
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Text //------------------------------------------------------------------

	cpov.outputBase = "./docs/src/text_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Text({
        displayText: "CPOV",
        font: "BebasNeueBold.ttf",
        fontType: "ttf",
        thickness: 0.25,
        offset: 0,
        texture: yellow
    });
    obj.transform = new Matrix("scale", 2, 2, 2);
    obj.transform = new Matrix("translate", 0, 0, -1);
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Torus //-----------------------------------------------------------------

	cpov.outputBase = "./docs/src/torus_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Torus({
		minorRadius: 0.5,
		majorRadius: 2,
        texture: yellow
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Transforms: Rotate //----------------------------------------------------

	cpov.outputBase = "./docs/src/xtestx";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Box({
		corner1: [1, 1, 1],
		corner2: [-1, -1, -1],
		texture: yellow
	});
	obj.transform = new Matrix("rotate", -25, 0, 0);
	obj.transform = new Matrix("rotate", 25, 0, 0);

	obj.snapshot();

    cpov.outputFrame();
    obj.destroy();
}


module.exports = main;
