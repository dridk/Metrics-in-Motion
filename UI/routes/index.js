/*
 * GET home page.
 */

exports.index = function (req, res) {
    var user = {
        firstName: 'Eugene',
        lastName: 'Trounev'
    };
    res.render('pages/main', {
        user: user
    });
};
exports.userViews = function (req, res) {
    //    var arr = {
    //        total: 2,
    //        success: true,
    //        result: [
    //        {
    //            id:3,
    //            user_id:32,
    //            title:"my dashboard 1",
    //            description:"This my medical dashboard",
    //            style:"default",
    //            widgets:[1,2]
    //
    //        },{
    //            id:4,
    //            user_id:32,
    //            title:"my dashboard 2",
    //            description:"This my developpers dashboard",
    //            style:"default",
    //            widgets:[3,4]
    //
    //        }]
    //    };
    var spec = {
                "scales": [
                    {
                        "name": "x",
                        "type": "time",
                        "range": "width",
                        "nice": "week",
                        "domain": {
                            "data": "table1",
                            "field": "data.Date"
                        }
                    },
                    {
                        "name": "y",
                        "type": "linear",
                        "range": "height",
                        "nice": true,
                        "domain": {
                            "data": "table1",
                            "field": ["data.US", "data.Canada"]
                        }
                    }
                ],
                "axes": [
                    {
                        "type": "x",
                        "scale": "x",
                        "grid": true,
                        "title": "Dates",
                        "titleOffset": 40,
                        "layer": "back",
                        "properties": {
                            "title": {
                                "font": {
                                    "value": "Segoe UI"
                                },
                                "fontSize": {
                                    "value": 12
                                },
                                "fontWeight": {
                                    "value": "bold"
                                }
                            },
                            "labels": {
                                "font": {
                                    "value": "Segoe UI"
                                },
                                "fontSize": {
                                    "value": 10
                                },
                                "dx": {
                                    "value": 10
                                },
                                "angle": {
                                    "value": 25
                                }
                            }
                        }
                    },
                    {
                        "type": "y",
                        "scale": "y",
                        "grid": true,
                        "title": "%",
                        "layer": "back",
                        "properties": {
                            "title": {
                                "font": {
                                    "value": "Segoe UI"
                                },
                                "fontSize": {
                                    "value": 12
                                },
                                "fontWeight": {
                                    "value": "bold"
                                }
                            },
                            "labels": {
                                "font": {
                                    "value": "Segoe UI"
                                },
                                "fontSize": {
                                    "value": 10
                                },
                                "dx": {
                                    "value": 10
                                },
                                "angle": {
                                    "value": 25
                                }
                            }
                        }
                    }
                ],
                "marks": [
                    {
                        "type": "line",
                        "from": {
                            "data": "table1"
                        },
                        "properties": {
                            "enter": {
                                "interpolate": {
                                    "value": "linear"
                                },
                                "x": {
                                    "scale": "x",
                                    "field": "data.Date"
                                },
                                "y": {
                                    "scale": "y",
                                    "field": "data.US"
                                },
                                "stroke": {
                                    "value": "#0000cc"
                                },
                                "strokeWidth": {
                                    "value": 2
                                }
                            }
                        }
                    },
                    {
                        "type": "line",
                        "from": {
                            "data": "table1"
                        },
                        "properties": {
                            "enter": {
                                "interpolate": {
                                    "value": "linear"
                                },
                                "x": {
                                    "scale": "x",
                                    "field": "data.Date"
                                },
                                "y": {
                                    "scale": "y",
                                    "field": "data.Canada"
                                },
                                "stroke": {
                                    "value": "#cc0000"
                                },
                                "strokeWidth": {
                                    "value": 2
                                }
                            }
                        }
                    }
                ],
                "data": [
                    {
                        "name": "table1",
                        "format": {
                            "type": "json",
                            "url": "http://localhost:3000/users/32/sources/1/data",
                            "parse": {
                                "Date": "date",
                                "US": "number",
                                "Canada": "number"
                            }
                        }
                    }
                ]
            };
    var arr = {
        total: 2,
        success: true,
        result: [
                {
                    id: 1,
                    user_id: 32,
                    title: "my dashboard 1",
                    description: "This my medical dashboard",
                    style: "default",
                    widgets: [
                        {
                        id: 1,
                        sourceID: 1,
                        title: "Widget 1 title",
                        description: "Widget 1 Description",
                        position: {
                            row: 1,
                            col: 1
                        },
                        size: {
                            width: 1,
                            height: 1
                        },
                        spec: spec
                        },
                        {
                        id: 2,
                        sourceID: 1,
                        title: "Widget 2 title",
                        description: "Widget 2 Description",
                        position: {
                            row: 1,
                            col: 2
                        },
                        size: {
                            width: 1,
                            height: 1
                        },
                        spec: spec
                        }
                    ]
            }, {
                    id: 4,
                    user_id: 32,
                    title: "my dashboard 2",
                    description: "This my developpers dashboard",
                    style: "default",
                    widgets: [
                        {
                        id: 3,
                        sourceID: 1,
                        title: "Widget 3 title",
                        description: "Widget 3 Description",
                        position: {
                            row: 1,
                            col: 1
                        },
                        size: {
                            width: 1,
                            height: 1
                        },
                        spec: spec
                        },
                        {
                        id: 4,
                        sourceID: 1,
                        title: "Widget 4 title",
                        description: "Widget 4 Description",
                        position: {
                            row: 1,
                            col: 2
                        },
                        size: {
                            width: 1,
                            height: 1
                        },
                        spec: spec
                        }
                    ]
            }
        ]
    };
    res.send(arr);
};
exports.userWidgets = function (req, res) {
    var arr = {
        total: 4,
        success: true,
        result: [
            {
                id: 1,
                user_id: 32,
                title: "my widget 1",
                description: "This my medical widget",
                driver: "barchart",
                style: "default",
                position: {
                    row: 1,
                    col: 1
                },
                size: {
                    width: 1,
                    height: 1
                },
                spec: {}

        }, {
                id: 2,
                user_id: 32,
                source_id: 1,
                title: "my Widget 2",
                description: "This my medical widget",
                driver: "linechart",
                style: "default",
                position: {
                    row: 1,
                    col: 2
                },
                size: {
                    width: 1,
                    height: 2
                },
                spec: {}

        },
            {
                id: 3,
                user_id: 32,
                source_id: 1,
                title: "my Widget3",
                description: "This my developpers widget",
                driver: "piechart",
                style: "default",
                position: {
                    row: 1,
                    col: 1
                },
                size: {
                    width: 2,
                    height: 2
                },
                spec: {}

        }, {
                id: 4,
                user_id: 32,
                source_id: 1,
                title: "my Widget 4",
                description: "This my developpers widget",
                driver: "dognutchart",
                style: "default",
                position: {
                    row: 2,
                    col: 1
                },
                size: {
                    width: 1,
                    height: 1
                },
                spec: {}

        }]
    };
    res.send(arr);
};

exports.userData = function (req, res) {
    var data = [
        {
            "Date": "01/01/2006",
            "Canada": "6.60",
            "US": "4.70"
      },
        {
            "Date": "02/01/2006",
            "Canada": "6.40",
            "US": "4.80"
      },
        {
            "Date": "03/01/2006",
            "Canada": "6.30",
            "US": "4.70"
      },
        {
            "Date": "04/01/2006",
            "Canada": "6.30",
            "US": "4.70"
      },
        {
            "Date": "05/01/2006",
            "Canada": "6.00",
            "US": "4.60"
      },
        {
            "Date": "06/01/2006",
            "Canada": "6.10",
            "US": "4.60"
      },
        {
            "Date": "07/01/2006",
            "Canada": "6.30",
            "US": "4.70"
      },
        {
            "Date": "08/01/2006",
            "Canada": "6.40",
            "US": "4.70"
      },
        {
            "Date": "09/01/2006",
            "Canada": "6.40",
            "US": "4.50"
      },
        {
            "Date": "10/01/2006",
            "Canada": "6.20",
            "US": "4.40"
      },
        {
            "Date": "11/01/2006",
            "Canada": "6.30",
            "US": "4.50"
      },
        {
            "Date": "12/01/2006",
            "Canada": "6.10",
            "US": "4.40"
      },
        {
            "Date": "01/01/2007",
            "Canada": "6.20",
            "US": "4.60"
      },
        {
            "Date": "02/01/2007",
            "Canada": "6.20",
            "US": "4.50"
      },
        {
            "Date": "03/01/2007",
            "Canada": "6.10",
            "US": "4.40"
      },
        {
            "Date": "04/01/2007",
            "Canada": "6.10",
            "US": "4.50"
      },
        {
            "Date": "05/01/2007",
            "Canada": "6.00",
            "US": "4.40"
      },
        {
            "Date": "06/01/2007",
            "Canada": "6.00",
            "US": "4.60"
      },
        {
            "Date": "07/01/2007",
            "Canada": "6.10",
            "US": "4.70"
      },
        {
            "Date": "08/01/2007",
            "Canada": "6.00",
            "US": "4.60"
      },
        {
            "Date": "09/01/2007",
            "Canada": "5.90",
            "US": "4.70"
      },
        {
            "Date": "10/01/2007",
            "Canada": "5.90",
            "US": "4.70"
      },
        {
            "Date": "11/01/2007",
            "Canada": "6.00",
            "US": "4.70"
      },
        {
            "Date": "12/01/2007",
            "Canada": "6.00",
            "US": "5.00"
      },
        {
            "Date": "01/01/2008",
            "Canada": "5.90",
            "US": "5.00"
      },
        {
            "Date": "02/01/2008",
            "Canada": "5.90",
            "US": "4.80"
      },
        {
            "Date": "03/01/2008",
            "Canada": "6.00",
            "US": "5.10"
      },
        {
            "Date": "04/01/2008",
            "Canada": "6.10",
            "US": "4.90"
      },
        {
            "Date": "05/01/2008",
            "Canada": "6.10",
            "US": "5.40"
      },
        {
            "Date": "06/01/2008",
            "Canada": "6.00",
            "US": "5.60"
      },
        {
            "Date": "07/01/2008",
            "Canada": "6.10",
            "US": "5.80"
      },
        {
            "Date": "08/01/2008",
            "Canada": "6.10",
            "US": "6.10"
      },
        {
            "Date": "09/01/2008",
            "Canada": "6.20",
            "US": "6.20"
      },
        {
            "Date": "10/01/2008",
            "Canada": "6.20",
            "US": "6.60"
      },
        {
            "Date": "11/01/2008",
            "Canada": "6.50",
            "US": "6.80"
      },
        {
            "Date": "12/01/2008",
            "Canada": "6.80",
            "US": "7.30"
      },
        {
            "Date": "01/01/2009",
            "Canada": "7.30",
            "US": "7.80"
      },
        {
            "Date": "02/01/2009",
            "Canada": "8.00",
            "US": "8.20"
      },
        {
            "Date": "03/01/2009",
            "Canada": "8.10",
            "US": "8.60"
      },
        {
            "Date": "04/01/2009",
            "Canada": "8.10",
            "US": "8.90"
      },
        {
            "Date": "05/01/2009",
            "Canada": "8.50",
            "US": "9.40"
      },
        {
            "Date": "06/01/2009",
            "Canada": "8.60",
            "US": "9.50"
      },
        {
            "Date": "07/01/2009",
            "Canada": "8.60",
            "US": "9.50"
      },
        {
            "Date": "08/01/2009",
            "Canada": "8.70",
            "US": "9.70"
      },
        {
            "Date": "09/01/2009",
            "Canada": "8.30",
            "US": "9.80"
      },
        {
            "Date": "10/01/2009",
            "Canada": "8.40",
            "US": "10.10"
      },
        {
            "Date": "11/01/2009",
            "Canada": "8.40",
            "US": "9.90"
      },
        {
            "Date": "12/01/2009",
            "Canada": "8.40",
            "US": "9.90"
      },
        {
            "Date": "01/01/2010",
            "Canada": "8.30",
            "US": "9.70"
      },
        {
            "Date": "02/01/2010",
            "Canada": "8.20",
            "US": "9.70"
      },
        {
            "Date": "03/01/2010",
            "Canada": "8.20",
            "US": "9.70"
      },
        {
            "Date": "04/01/2010",
            "Canada": "8.10",
            "US": "9.80"
      },
        {
            "Date": "05/01/2010",
            "Canada": "8.10",
            "US": "9.60"
      },
        {
            "Date": "06/01/2010",
            "Canada": "7.90",
            "US": "9.50"
      },
        {
            "Date": "07/01/2010",
            "Canada": "8.00",
            "US": "9.50"
      },
        {
            "Date": "08/01/2010",
            "Canada": "8.10",
            "US": "9.60"
      },
        {
            "Date": "09/01/2010",
            "Canada": "8.00",
            "US": "9.60"
      },
        {
            "Date": "10/01/2010",
            "Canada": "7.90",
            "US": "9.70"
      },
        {
            "Date": "11/01/2010",
            "Canada": "7.60",
            "US": "9.80"
      },
        {
            "Date": "12/01/2010",
            "Canada": "7.60",
            "US": "9.40"
      },
        {
            "Date": "01/01/2011",
            "Canada": "7.80",
            "US": "9.00"
      },
        {
            "Date": "02/01/2011",
            "Canada": "7.80",
            "US": "8.90"
      },
        {
            "Date": "03/01/2011",
            "Canada": "7.70",
            "US": "8.80"
      },
        {
            "Date": "04/01/2011",
            "Canada": "7.60",
            "US": "9.00"
      },
        {
            "Date": "05/01/2011",
            "Canada": "7.40",
            "US": "9.10"
      },
        {
            "Date": "06/01/2011",
            "Canada": "7.40",
            "US": "9.20"
      },
        {
            "Date": "07/01/2011",
            "Canada": "7.20",
            "US": "9.10"
      },
        {
            "Date": "08/01/2011",
            "Canada": "7.30",
            "US": "9.10"
      },
        {
            "Date": "09/01/2011",
            "Canada": "7.10",
            "US": "9.10"
      },
        {
            "Date": "10/01/2011",
            "Canada": "7.30",
            "US": "9.00"
      },
        {
            "Date": "11/01/2011",
            "Canada": "7.40",
            "US": "8.60"
      },
        {
            "Date": "12/01/2011",
            "Canada": "7.50",
            "US": "8.50"
      },
        {
            "Date": "01/01/2012",
            "Canada": "7.60",
            "US": "8.30"
      },
        {
            "Date": "02/01/2012",
            "Canada": "7.40",
            "US": "8.30"
      },
        {
            "Date": "03/01/2012",
            "Canada": "7.20",
            "US": "8.20"
      },
        {
            "Date": "04/01/2012",
            "Canada": "7.30",
            "US": "8.10"
      },
        {
            "Date": "05/01/2012",
            "Canada": "7.30",
            "US": "8.20"
      },
        {
            "Date": "06/01/2012",
            "Canada": "7.20",
            "US": "8.20"
      },
        {
            "Date": "07/01/2012",
            "Canada": "7.30",
            "US": "8.30"
      },
        {
            "Date": "08/01/2012",
            "Canada": "7.30",
            "US": "8.10"
      },
        {
            "Date": "09/01/2012",
            "Canada": "7.40",
            "US": "7.80"
      },
        {
            "Date": "10/01/2012",
            "Canada": "7.40",
            "US": "7.90"
      },
        {
            "Date": "11/01/2012",
            "Canada": "7.20",
            "US": "7.80"
      },
        {
            "Date": "12/01/2012",
            "Canada": "7.10",
            "US": "7.80"
      },
        {
            "Date": "01/01/2013",
            "Canada": "7.00",
            "US": "7.90"
      },
        {
            "Date": "02/01/2013",
            "Canada": "7.00",
            "US": "7.70"
      },
        {
            "Date": "03/01/2013",
            "Canada": "7.20",
            "US": "7.60"
      },
        {
            "Date": "04/01/2013",
            "Canada": "7.20",
            "US": "7.50"
      },
        {
            "Date": "05/01/2013",
            "Canada": "7.10",
            "US": "7.60"
      },
        {
            "Date": "06/01/2013",
            "Canada": "7.10",
            "US": "7.60"
      },
        {
            "Date": "07/01/2013",
            "Canada": "7.20",
            "US": "7.40"
      },
        {
            "Date": "08/01/2013",
            "Canada": "7.10",
            "US": "7.30"
      },
        {
            "Date": "09/01/2013",
            "Canada": "6.90",
            "US": "7.20"
      }
    ];
    res.send(data);
};

exports.sampler = function (req, res) {
    res.render('pages/sampler', {});
};