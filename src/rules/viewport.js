/*global CSSLint*/

/*
 * Rule: Only allow the descriptors that are permitted inside @viewport
 */
CSSLint.addRule({

    //rule information
    id: "viewport",
    name: "Only allow specific descriptors in viewport",
    desc: "Only allow the descriptors that are known to be permitted inside @viewport",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
        validProperties = {
            'width' : 1,
            'min-width' : 1,
            'max-width' : 1,
            'height' : 1,
            'min-height' : 1,
            'max-height' : 1,
            'zoom' : 1,
            'min-zoom' : 1,
            'max-zoom' : 1,
            'user-zoom' : 1,
            'orientation' : 1
        },
        viewport;

        function startRule(){
            viewport = true;
        }

        function endRule(){
            viewport = false;
        }

        parser.addListener("startviewport", startRule);

        parser.addListener("property", function(event){
            var prop = event.property,
                name = prop.text.toLowerCase();

            if (viewport && !validProperties[name]) {
                reporter.report("Viewport does not know about " + name  + ". Only (min-|max-)width, (min-|max-)height, (min-|max-|user-)zoom and orientation are recognized.", prop.line, prop.col, rule);
            }
        });

        parser.addListener("endviewport", endRule);
    }

});
