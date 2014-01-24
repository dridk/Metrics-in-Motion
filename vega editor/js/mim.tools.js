/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/

//Array Helpers
Array.prototype.each = function (f) {
    if (typeof (f) != "function") return false;
    for (var i = 0; i < this.length; i++) {
        f(this[i], i);
    }
    return this;
}

//Object helpers
Object.keys = Object.keys || (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        DontEnums = [
            'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty',
            'isPrototypeOf', 'propertyIsEnumerable', 'constructor'
        ],
        DontEnumsLength = DontEnums.length;

    return function (o) {
        if (typeof o != "object" && typeof o != "function" || o === null)
            throw new TypeError("Object.keys called on a non-object");

        var result = [];
        for (var name in o) {
            if (hasOwnProperty.call(o, name))
                result.push(name);
        }

        if (hasDontEnumBug) {
            for (var i = 0; i < DontEnumsLength; i++) {
                if (hasOwnProperty.call(o, DontEnums[i]))
                    result.push(DontEnums[i]);
            }
        }

        return result;
    };
})();

//String helpers
String.prototype.toNumber = function () {
    var n = this.replace(/[^0-9^\.]+/g, "");
    return isNaN(n) ? false : n;
}
String.prototype.toID = function () {
    return "#" + this;
}
String.prototype.toClass = function () {
    return "." + this;
}