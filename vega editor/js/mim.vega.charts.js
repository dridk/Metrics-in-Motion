/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
mim.vega.charts = {
    _newAxe: function(type,title){
        return {
            "title": title,
            "type": type,
            "scale": type,
            "grid": true,
            "layer": "back"
        };
    },
    _newScale: function(name,type,nice){
        return {
            "name": name,
            "type": type,
            "nice": nice,
            "round": true,
            "range": name=="x"?"width":"height",
            "domain": {
                "data": "",
                "field": name=="x"?"cat":"value"
            }
        };
    },
    lineChart: {
        name: "Line chart",
        icon: "",
        getSpecSceleton: function () {
            return {
                "data": [],
                "scales": [
                    {
                        "name": "color",
                        "type": "ordinal",
                        "range": "category10"
                    }
                ],
                "axes": [],
                "legends": [
                    {
                      "fill": "color",
                      "properties": {
                          "symbols": {
                              "stroke": {"value": "transparent"},
                              "strokeWidth": {"value": 1.5}
                           }
                       }
                    }
                ],
                "marks": []
            };
        },
        getDataSpec: function () {
            return {
                "name": "",
                "format": {},
                "transform": []
            };
        },
        compileSpec: function (s) {

        }
    }
};