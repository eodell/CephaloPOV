var cpov    = require("./cpov.js").cpov;
var File    = require("./file.js").File;


//==============================================================================
// The ClassBuilder object generates code for a JavaScript class from a set of
// parameters.
//
//      name ......... class name
//      immutable .... object defining immutable attributes
//      mutable ...... object defining mutable attributes
//      superclass ... name of superclass or false if none
//      desc ......... text to put in header comment or false for none
//      conArgs ...... constructor argument list or false for default (...args)
//      conBlock ..... code block to put inside constructor or false for default
//
//==============================================================================

function ClassBuilder(name, immutable, mutable, superclass, desc = false, conArgs = false, conBlock = false) {
    this.name       = name;
    this.superclass = superclass;
    this.immutable  = immutable;
    this.mutable    = mutable;
    this.desc       = desc;
    this.conArgs    = conArgs;
    this.conBlock   = conBlock;
}


//------------------------------------------------------------------------------
// Produces comment divider lines up to 132 characters long.
//------------------------------------------------------------------------------

ClassBuilder.prototype.divider = function(stops, type, maxLength = 80) {
    var line = {
        "-": "//----------------------------------------------------------------------------------------------------------------------------------",
        "=": "//=================================================================================================================================="
    }

    var tabs = cpov.tab(stops);

    return tabs + line[type].substr(0, maxLength - tabs.length);
}


//------------------------------------------------------------------------------
// Pads a string with the specified character on the right or left.
//------------------------------------------------------------------------------

ClassBuilder.prototype.pad = function(str, num, padchar, side) {

	var padding = [ ];

	for(var i = 0; i < num; i++)
		padding.push(padchar);

	padding = padding.join("");

	return (side == "left" ? padding : "") + str + (side == "right" ? padding : "");
}

//------------------------------------------------------------------------------
// Given an array of arrays of strings, right-pads each column to make them all
// the same width. Assumes each row has the same number of elements. Returns a
// single string.
//------------------------------------------------------------------------------

ClassBuilder.prototype.align = function(rows) {

	var width = [ ];

	for(var i = 0; i < rows[0].length; i++)
		width[i] = 0;

	for(var r = 0; r < rows.length; r++) {
		for(var c = 0; c < rows[r].length; c++) {
			width[c] = Math.max(width[c], rows[r][c].length);
		}
	}

	for(var r = 0; r < rows.length; r++) {
		for(var c = 0; c < rows[r].length; c++) {
			if(rows[r][c].length < width[c])
				rows[r][c] = this.pad(rows[r][c], width[c] - rows[r][c].length, " ", "right");
		}
		rows[r] = rows[r].join("");
	}

	return rows.join("\n");
}


//------------------------------------------------------------------------------
// Generates source code for class.
//------------------------------------------------------------------------------

ClassBuilder.prototype.toString = function() {
    var src = [];
    var tab1 = cpov.tab(1);
    var tab2 = cpov.tab(2);
    var tab3 = cpov.tab(3);
    var tab4 = cpov.tab(4);

    // Class opening -----------------------------------------------------------

    src.push(this.divider(0, "="));
    if(this.desc)
        src.push(cpov.wrap(this.desc, { indent: "// ", width: 77 }));
    src.push(this.divider(0, "=") + "\n");
    src.push("class " + this.name + (this.superclass ? (" extends " + this.superclass) : '') + " {\n");

    // Constructor -------------------------------------------------------------

    if(this.conArgs) {
        src.push(tab1 + "constructor(" + this.conArgs + ") {\n");
    } else {
        src.push(tab1 + "constructor(options) {\n")
    }

    // Immutable properties --------------------------------------------------------

    if(this.immutable) {

		var rows = [ ];

		src.push(tab2 + "// Immutable properties //\n");

        for(var i in this.immutable) {
			rows.push([tab2 + "this._" + i, " = ", this.immutable[i] + ";"]);
        }

		src.push(this.align(rows) + "\n");
    }

    // Mutable properties ------------------------------------------------------

    if(this.mutable) {

		var rows = [ ];

		src.push(tab2 + "// Mutable properties //\n");

        for(var i = 0; i < this.mutable.length; i++) {
            if(this.mutable[i].default) {
                var init = this.mutable[i].default;
            } else {
                var init = "null";
            }
			rows.push([tab2 + "this._" + this.mutable[i].name, " = ", init + ";"]);
        }

		src.push(this.align(rows) + "\n");
    }

    // Initialization ----------------------------------------------------------

	src.push(tab2 + "// Initialization //\n");

    if(this.conBlock) {
        var lines = this.conBlock.split(/\n/);
        while(lines.length)
            src.push(tab2 + lines.shift())
        src.push("\n");
    } else {
        if(this.superclass) {
            src.push(tab2 + "super(options);");
        }
        src.push(tab2 + "cpov.initObject(this, options);\n");
    }


    src.push(tab1 + "}\n");

    // Accessors and Mutators --------------------------------------------------

    if(this.immutable) {
        for(var i in this.immutable) {
            src.push(
                this.divider(1, "-") + "\n\n"
                + tab1 + "get " + i + "() {\n"
                + tab2 + "return this._" + i + ";\n"
                + tab1 + "}\n\n"
                + tab1 + "set " + i + "(val) {\n"
                + tab2 + "throw new TypeError(\"[" + this.name + "]: " + i + " is a read-only property.\");\n"
                + tab1 + "}\n"
            );
        }
    }

    if(this.mutable) {
        for(var i = 0; i < this.mutable.length; i++) {
            var item = this.mutable[i];
            src.push(
                this.divider(1, "-") + "\n\n"
                + tab1 + "get " + item.name + "() {\n"
                + tab2 + "if(typeof this._" + item.name + " == \"function\")\n"
                + tab3 + "return this._" + item.name + "();\n"
                + tab2 + "else if(typeof this._" + item.name + " == \"string\" && this._" + item.name + ".substr(0, 1) == \"&\")\n"
                + tab3 + "return this._" + item.name + ".substr(1);\n"
                + tab2 + "else\n"
                + tab3 + "return this._" + item.name + ";\n"
                + tab1 + "}\n\n"
                + tab1 + "set " + item.name + "(val) {"
            );
            if(item.valid)
                src.push(tab2 + "if(cpov.isNullOrFunction(val) || (" + item.valid + ")) {");
            else
                src.push(tab2 + "if(true) { // FIXME");
            src.push(
                tab3 + "this._" + item.name + " = val;\n"
                + tab2 + "} else {\n"
                + tab3 + "cpov.error(\"fatal\", \"" + item.err + "\", \"" + this.name + "\");\n"
                + tab2 + "}\n"
                + tab1 + "}\n"
            );
        }
    }

    // Class closing -----------------------------------------------------------

    src.push("\n}");

    return src.join("\n");
}


//==============================================================================
// We don't currently use ClassBuilder anywhere else -- a lot of it is very
// CephaloPOV-specific, so when executed, this file just outputs the various
// class modules used by CephaloPOV.
//==============================================================================

var fp = new File("./classes.js", "w");
fp.write("var cpov = require(\"./cpov.js\").cpov;\n\n");
fp.write(new ClassBuilder("GlobalSettings", false, cpov.gsDef.mutable, false, cpov.gsDef.desc) + "\n\n");
fp.write("exports.GlobalSettings = GlobalSettings;\n\n\n");

fp.write(new ClassBuilder("ImageOptions", false, cpov.ioDef.mutable, false, cpov.ioDef.desc) + "\n\n");
fp.write("exports.ImageOptions = ImageOptions;\n\n\n");

fp.write(new ClassBuilder("Primitive", false, cpov.objCommon.mutable, false, cpov.objCommon.desc) + "\n\n");
fp.write("exports.Primitive = Primitive;\n\n\n");

for(var pname in cpov.objDef) {
    var cname = pname.substr(0, 1).toLocaleUpperCase() + pname.substr(1);
    var desc = cpov.objDef[pname].desc ? cpov.objDef[pname].desc : (cname + " class");
    fp.write(new ClassBuilder(cname, cpov.objDef[pname].immutable, cpov.objDef[pname].mutable, "Primitive", desc) + "\n\n");
    fp.write("exports." + cname + " = " + cname + ";\n\n\n");
}

for(var pname in cpov.vectorDef) {
    var cname = pname.substr(0, 1).toLocaleUpperCase() + pname.substr(1);
    var desc = cpov.vectorDef[pname].desc ? cpov.vectorDef[pname].desc :  (cname + " class");
    fp.write(new ClassBuilder(cname, cpov.vectorDef[pname].immutable, cpov.vectorDef[pname].mutable, false, desc) + "\n\n");
    fp.write("exports." + cname + " = " + cname + ";\n\n\n");
}


fp.close();

/*

TODO:

	* Temporarily implement Textures that are just SDL strings pulled from a cpov.tempTexture list.

    * immutable attribute to distinguish pseudo-primitives like the Camera type?

    * Add serial and other bookkeeping to constructor (base class)
    * Vector and Matrix -- generated?
    * Other major types
    * Report output in HTML.
    * Constructor arguments.



*/

