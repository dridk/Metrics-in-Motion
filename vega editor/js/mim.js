/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if (typeof mimUI !== undefined) delete mimUI;
var mimUI = {
    parent: null,
    jq: jQuery,
    vg: vg,
    //Generic and helper functions >>
    _ElCounter: 0,
    CreateUID: function (str) {
        str = str || "mimUI-El-";
        mimUI._ElCounter++;
        return str + mimUI._ElCounter;
    }
    // <<
};