(function(){

    /*global YUITest, CSSLint*/
    var Assert = YUITest.Assert;

    /**
     * Spec: http://dev.w3.org/csswg/css-device-adapt/
     */

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Viewport rules",

        "Using empty viewport rule": function() {
            var result = CSSLint.verify("@viewport {}", {"viewport": 1});
            Assert.areEqual(0, result.messages.length);
        },

        // This should work, but needs fix in parser-lib
        // "Using empty viewport rule inside a media query": function() {
        //     var result = CSSLint.verify("@media screen { @viewport {} }", {"viewport": 1});
        //     Assert.areEqual(0, result.messages.length);
        // },

        "Using viewport rule with width declaration": function() {
            var result = CSSLint.verify("@viewport { width: auto; }", {"viewport": 1});
            Assert.areEqual(0, result.messages.length);
        },

        "Using viewport rule with width declaration set to device-width": function() {
            var result = CSSLint.verify("@viewport { width: device-width; }", {"viewport": 1});
            Assert.areEqual(0, result.messages.length);
        },

        "Using viewport rule with invalid font-size declaration": function() {
            var result = CSSLint.verify("@viewport { font-size: 18px; }", {"viewport": 1});
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("error", result.messages[0].type);
        },

    }));

})();
