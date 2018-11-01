//------------------------------------------------------------------------------
// Definition of globalSettings parameter validations and error messages.
//------------------------------------------------------------------------------

module.exports = {
    desc: "The GlobalSettings class manages the variables that will be output "
        + "into the SDL global_settings block.",
    conArgs: false,
    conBlock: false,
    snippets: ["GlobalSettings.toSDL"],
    mutable: [
        {
            name:  "adcBailout",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "adcBailout must be a float greater than or equal to zero.",
            desc:  "Defines the Adaptive Depth Control bailout value, which determines when to stop tracing further reflections once they cease to contribute significantly to the color of the current pixel. This defaults to 0.0039 and should not require changing. If it is set to zero, only <code>maxTraceLevel</code> will interrupt the tracing of reflections.",
            tname: "float"
        }, {
            name:  "ambientLight",
            valid: "cpov.isClass(val, 'Color')",
            err:   "ambientLight must be a Color.",
            desc:  "Specifies the color of the ambient light, i.e., the illumination that falls on every object from all directions in the absence of any explicit <code>LightSource</code>.",
            tname: "Color"
        }, {
            name:  "assumedGamma",
            valid: "cpov.isFloat(val)",
            err:   "assumedGamma must be a float.",
            desc:  "Defines the working gamma space for the render.",
            tname: "float"
        }, {
            name:  "charset",
            valid: "cpov.isInArray(val, cpov.charsets)",
            err:   "charset must be one of 'ascii', 'utf8', or 'sys'.",
            desc:  "Specifies which character set will be used in interpreting the contents of text strings. The supported values are $strlist.charsets. The default is <code>ascii</code>.",
            tname: "string"
        }, {
            name:  "iridWavelength",
            valid: "cpov.isClass(val, 'Color')",
            err:   "iridWavelength must be a Color",
            desc:  "Specifies a color to use in iridescence calculations. The default, <code>[0.70, 0.52, 0.48]</code> will rarely if ever need to be changed, but it is available for experimentation.",
            tname: "Color"
        }, {
            name:  "maxIntersections",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "maxIntersections must be an integer greater than or equal to zero.",
            desc:  "Sets the size of POV-Ray's internal \"I-Stacks\" for tracking ray/object intersections. The default value for <code>maxIntersections</code> is 64, but if a rendering produces an error message about an I-Stack overflow, you will have to increase this value until the error message disappears.",
            tname: "integer"
        }, {
            name:  "maxTraceLevel",
            valid: "cpov.isInt(val) && val >= 0 && val <= 256",
            err:   "maxTraceLevel must be an integer greater than or equal to zero.",
            desc:  "Sets an upper limit on the number of reflections that a ray can undergo before calculations are stopped and the pixel returns as black. Legal values are in the range 1-256. Increase the value only as needed to fix black spots in reflections as higher values require more memory and time to calculate.",
            tname: "integer"
        }, {
            name:  "mmPerUnit",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "mmPerUnit must be a float greater than or equal to zero.",
            desc:  "Sets the number of millimeters per unit of space in the POV-Ray coordinate system, which affects the behavior of subsurface transport. The default is 10, i.e., 1 cm per unit.",
            tname: "float"
        }, {
            name:  "noiseGenerator",
            valid: "cpov.isInt(val) && cpov.isInArray(val, [1, 2, 3])",
            err:   "noiseGenerator must be an integer and one of 1, 2, or 3.",
            desc:  "Specifies which noise generator POV-Ray will use. The default is 2. The legal values are $keylist.noiseGenerators",
            tname: "integer"
        }, {
            name:  "numberOfWaves",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "numberOfWaves must be an integer greater than or equal to zero.",
            desc:  "Specifies the number of waves used by the <code>waves</code> and <code>ripples</code> texture patterns. The default is 10.",
            tname: "integer"
        }, {
            name:  "photon",
            valid: "cpov.isBoolean(val)",
            err:   "photon must be a boolean.",
            desc:  "If <code>true</code>, photons are enabled and the <code>photon*</code> parameters are emitted in output.",
            tname: "boolean"
        }, {
            name:  "photonAdcBailout",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "photonAdcBailout must be a float greater than or equal to zero.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "photonAutostop",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "photonAutostop must be a float within the unit interval (0.0 - 1.0)",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "photonCount",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "photonCount must be an integer greater than or equal to zero",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "photonExpandThresholds",
            valid: "Array.isArray(val) && val.length == 2 && cpov.isFloat(val[0]) && cpov.isInt(val[1])",
            err:   "photonExpandThresholds must be an array consisting of a float and and integer.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "photonGather",
            valid: "cpov.isArrayOfInts(val, 2, 2) && val[0] >= 0 && val[1] >= 0 && val[0] <= val[1]",
            err:   "photonGather must be an array of two integers greater than zero in ascending order.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "photonJitter",
            valid: "cpov.isFloat(val)",
            err:   "photonJitter must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "photonLoadFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "photonLoadFile must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "photonMaxTraceLevel",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "photonMaxTraceLevel must be an integer greater than or equal to zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "photonMedia",
            valid: "cpov.isArrayOfFloats(val, 2, 2)",
            err:   "photonMedia must be an array of two floats.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "photonRadius",
            valid: "cpov.isArrayOfFloats(val, 4, 4)",
            err:   "photonRadius must be an array of four floats.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "photonSaveFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "photonSaveFile must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "photonSpacing",
            valid: "cpov.isFloat(val) && val > 0",
            err:   "photonSpacing must be a float greater than zero.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radAdcBailout",
            valid: "cpov.isFloat(val)",
            err:   "radAdcBailout must be a float.",
            desc:  "Specifies an Adaptive Depth Control for radiosity rays. The default is 0.01.",
            tname: "float"
        }, {
            name:  "radAlwaysSample",
            valid: "cpov.isBoolean(val)",
            err:   "radAlwaysSample must be a boolean.",
            desc:  "If <code>true</code>, new samples will be gathered during the final radiosity pass. This is slower and often produces lower-quality results, so the default is <code>false</code>, but there are some cases where turning it on can correct blotchy imperfections.",
            tname: "boolean"
        }, {
            name:  "radBrightness",
            valid: "cpov.isFloat(val)",
            err:   "radBrightness must be a float.",
            desc:  "Specifies the amount by which the brightness of objects should be adjusted before being returned to the rest of the system. The default value is 1.0 and should almost never be changed; individual object properties should be adjusted instead.",
            tname: "float"
        }, {
            name:  "radCount",
            valid: "cpov.isArrayOfInts(val, 1, 2) && val[0] >= 1 && (val[1] === undefined || val[1] >= 1)",
            err:   "radCount must be an array of one or two integers, both of which must be greater than or equal to one.",
            desc:  "This is an array which specifies the number of radiosity rays emitted when a new radiosity value is needed. The default is 35. The second, optional element sets the number of directions to choose rays from.",
            tname: "Array"
        }, {
            name:  "radErrorBound",
            valid: "cpov.isFloat(val)",
            err:   "radErrorBound must be a float.",
            desc:  "Specifies the tolerated error and defaults to 1.8. Lower values are more accurate but require higher <code>radCount</code> values to avoid artifacts and dramatically increase rendering times.",
            tname: "float"
        }, {
            name:  "radGrayThreshold",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radGrayThreshold must be a float in the unit interval (0.0 - 1.0).",
            desc:  "This is a float in the unit interval (0.0 - 1.0) that counteracts color bleed by desaturating reflected light. At 0.0 (the default), it has no effect, while at the other extreme, 1.0, reflected light is greyscale only.",
            tname: "float"
        }, {
            name:  "radiosity",
            valid: "cpov.isBoolean(val)",
            err:   "radiosity must be a boolean.",
            desc:  "If <code>true</code>, radiosity is enabled and the <code>rad*</code> parameters are emitted in output.",
            tname: "boolean"
        }, {
            name:  "radLowErrorFactor",
            valid: "cpov.isFloat(val)",
            err:   "radLowErrorFactor must be a float.",
            desc:  "The <code>radErrorBound</code> is multiplied by <code>radLowErrorFactor</code> during preliminary passes to reduce the blotchy artifacts that would otherwise occur. The default is 0.5.",
            tname: "float"
        }, {
            name:  "radMaximumReuse",
            valid: "cpov.isFloat(val)",
            err:   "radMaximumReuse must be a float.",
            desc:  "Sets an upper bound on the reuse of samples. See the POV-Ray documentation for <a href=\"http://povray.org/documentation/3.7.0/r3_4.html#r3_4_4_3\">more details</a>.",
            tname: "float"
        }, {
            name:  "radMaxSample",
            valid: "cpov.isFloat(val)",
            err:   "radMaxSample must be a float.",
            desc:  "Defines an upper limit on the brightness of radiosity samples, which can correct for some brightness artifacts at the expense of realism. Setting <code>radMaxSample</code> to a negative value (the default) will disable it.",
            tname: "float"
        }, {
            name:  "radMinimumReuse",
            valid: "cpov.isFloat(val)",
            err:   "radMinimumReuse must be a float.",
            desc:  "Sets a lower bound on the reuse of samples. See the POV-Ray documentation for <a href=\"http://povray.org/documentation/3.7.0/r3_4.html#r3_4_4_3\">more details</a>.",
            tname: "float"
        }, {
            name:  "radNearestCount",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
            err:   "radNearestCount must be an integer in the range 1-20.",
            desc:  "Specifies minimum number of old radiosity values blended together to create a new interpolated value. Defaults to 5 with an upper limit of 20.",
            tname: "integer"
        }, {
            name:  "radNormal",
            valid: "cpov.isBoolean(val)",
            err:   "radNormal must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "radPretraceEnd",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radPretraceEnd must be a float in the unit interval (0.0 - 1.0)",
            desc:  "Specifies the size of mosaic blocks at the end of the pretrace phase as a fraction of image size. This is float in the unit interval (0.0 - 1.0).",
            tname: "float"
        }, {
            name:  "radPretraceStart",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radPretraceStart must be a float in the unit interval (0.0 - 1.0)",
            desc:  "Specifies the size of mosaic blocks at the start of the pretrace phase as a fraction of image size. This is float in the unit interval (0.0 - 1.0).",
            tname: "float"
        }, {
            name:  "radRecursionLimit",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
            err:   "radRecursionLimit must be an integer in the range 1-20.",
            desc:  "Determines how many recursion levels are used to calculate the diffuse inter-reflection. The legal range is 1 - 20, but values above 3 are rarely useful.",
            tname: "integer"
        }, {
            name:  "radSubsurface",
            valid: "cpov.isBoolean(val)",
            err:   "radSubsurface must be a boolean.",
            desc:  "If <code>true</code>, radiosity calculations will take subsurface light transport into account. This will increase realism where translucent objects are concerned at the expense of increased rendering time.",
            tname: "boolean"
        }, {
            name:  "subRadiosity",
            valid: "cpov.isBoolean(val)",
            err:   "subRadiosity must be a boolean",
            desc:  "If <code>true</code>, subsurface effects will be applied to incoming radiosity illumination.",
            tname: "boolean"
        }, {
            name:  "subSamples",
            valid: "cpov.isArrayOfInts(val, 2, 2)",
            err:   "subSamples must be an array of two integers.",
            desc:  "This is an array of two integers which set the number of samples to use for diffuse scattering and single-scattering approximation. The default for both is 50.",
            tname: "Array"
        }, {
            name:  "subsurface",
            valid: "cpov.isBoolean(val)",
            err:   "subsurface must be a boolean.",
            desc:  "If <code>true</code>, subsurface light transport is enabled and the <code>sub*</code> parameters are emitted in output.",
            tname: "boolean"
        }
    ]
};

