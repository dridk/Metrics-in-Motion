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
exports.users = function (req, res) {
    var data = {
        success:true,
        result: {
            id:32,
            username:"dridk",
            email:"istdasklar@gmail.com"
        }
    };
    res.send(data);
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
    var spec1 = {padding:{top:20,left:50,bottom:50,right:20},scales:[{name:"x",type:"time",range:"width",nice:"week",domain:{data:"table1",field:"data.Date"}},{name:"y",type:"linear",range:"height",nice:!0,zero:!1,domain:{data:"table1",field:["data.US","data.Canada"]}}],axes:[{type:"x",scale:"x",grid:!0,title:"Dates",layer:"back",properties:{title:{font:{value:"Segoe UI"},fontSize:{value:12},fontWeight:{value:"bold"}},labels:{font:{value:"Segoe UI"},fontSize:{value:10},dx:{value:10},angle:{value:25}}}},{type:"y",scale:"y",grid:!1,title:"%",layer:"back",properties:{title:{font:{value:"Segoe UI"},fontSize:{value:12},fontWeight:{value:"bold"}},labels:{font:{value:"Segoe UI"},fontSize:{value:10}}}}],marks:[{type:"line",from:{data:"table1"},properties:{enter:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.US"},stroke:{value:"#0000cc"},strokeWidth:{value:2}},update:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.US"},stroke:{value:"#0000cc"},strokeWidth:{value:2}}}},{type:"line",from:{data:"table1"},properties:{enter:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.Canada"},stroke:{value:"#cc0000"},strokeWidth:{value:2}},update:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.Canada"},stroke:{value:"#cc0000"},strokeWidth:{value:2}}}}],data:[{name:"table1",format:{type:"json",parse:{Date:"date",US:"number",Canada:"number"}}}]},
        spec2 = {padding:{top:20,left:40,bottom:50,right:20},scales:[{name:"x",type:"time",range:"width",nice:"week",domain:{data:"table2",field:"data.Date"}},{name:"y",type:"linear",range:"height",nice:!0,zero:!1,domain:{data:"table2",field:["data.US","data.Canada"]}}],axes:[{type:"x",scale:"x",grid:!0,title:"Dates",layer:"back",properties:{title:{font:{value:"Segoe UI"},fontSize:{value:12},fontWeight:{value:"bold"}},labels:{font:{value:"Segoe UI"},fontSize:{value:10},dx:{value:10},angle:{value:25}}}},{type:"y",scale:"y",grid:!0,title:"%",layer:"back",properties:{title:{font:{value:"Segoe UI"},fontSize:{value:12},fontWeight:{value:"bold"}},labels:{font:{value:"Segoe UI"},fontSize:{value:10}}}}],marks:[{type:"line",from:{data:"table2"},properties:{enter:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.US"},stroke:{value:"#00cccc"},strokeWidth:{value:2}},update:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.US"},stroke:{value:"#00cccc"},strokeWidth:{value:2}}}},{type:"line",from:{data:"table2"},properties:{enter:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.Canada"},stroke:{value:"#ccee00"},strokeWidth:{value:2}},update:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.Canada"},stroke:{value:"#ccee00"},strokeWidth:{value:2}}}}],data:[{name:"table2",format:{type:"json",parse:{Date:"date",US:"number",Canada:"number"}}}]},
        spec3 = {padding:{top:20,left:50,bottom:50,right:20},scales:[{name:"x",type:"time",range:"width",nice:"week",domain:{data:"table3",field:"data.Date"}},{name:"y",type:"linear",range:"height",nice:!0,zero:!1,domain:{data:"table3",field:["data.US","data.Canada"]}}],axes:[{type:"x",scale:"x",grid:!1,title:"Dates",layer:"back",properties:{title:{font:{value:"Segoe UI"},fontSize:{value:12},fontWeight:{value:"bold"}},labels:{font:{value:"Segoe UI"},fontSize:{value:10},dx:{value:10},angle:{value:25}}}},{type:"y",scale:"y",grid:!0,title:"%",layer:"back",properties:{title:{font:{value:"Segoe UI"},fontSize:{value:12},fontWeight:{value:"bold"}},labels:{font:{value:"Segoe UI"},fontSize:{value:10}}}}],marks:[{type:"line",from:{data:"table3"},properties:{enter:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.US"},stroke:{value:"#cc00cc"},strokeWidth:{value:2}},update:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.US"},stroke:{value:"#cc00cc"},strokeWidth:{value:2}}}},{type:"line",from:{data:"table3"},properties:{enter:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.Canada"},stroke:{value:"#cc6600"},strokeWidth:{value:2}},update:{interpolate:{value:"linear"},x:{scale:"x",field:"data.Date"},y:{scale:"y",field:"data.Canada"},stroke:{value:"#cc6600"},strokeWidth:{value:2}}}}],data:[{name:"table3",format:{type:"json",parse:{Date:"date",US:"number",Canada:"number"}}}]};
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
                        sourceID: 3,
                        title: "Unemployment",
                        description: "Unemployment in US VS Canada",
                        position: {
                            row: 1,
                            col: 1
                        },
                        size: {
                            width: 2,
                            height: 1
                        },
                        spec: spec3
                        },
                        {
                        id: 2,
                        sourceID: 1,
                        title: "Widget 2 title",
                        description: "Widget 2 Description",
                        position: {
                            row: 2,
                            col: 1
                        },
                        size: {
                            width: 1,
                            height: 1
                        },
                        spec: spec1
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
                        sourceID: 2,
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
                        spec: spec2
                        },
                        {
                        id: 4,
                        sourceID: 3,
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
                        spec: spec3
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
    var dates = ["01/01/2006","02/01/2006","03/01/2006","04/01/2006","05/01/2006","06/01/2006","07/01/2006","08/01/2006","09/01/2006","10/01/2006","11/01/2006","12/01/2006","01/01/2007","02/01/2007","03/01/2007","04/01/2007","05/01/2007","06/01/2007","07/01/2007","08/01/2007","09/01/2007","10/01/2007","11/01/2007","12/01/2007","01/01/2008","02/01/2008","03/01/2008","04/01/2008","05/01/2008","06/01/2008","07/01/2008","08/01/2008","09/01/2008","10/01/2008","11/01/2008","12/01/2008","01/01/2009","02/01/2009","03/01/2009","04/01/2009","05/01/2009","06/01/2009","07/01/2009","08/01/2009","09/01/2009","10/01/2009","11/01/2009","12/01/2009","01/01/2010","02/01/2010","03/01/2010","04/01/2010","05/01/2010","06/01/2010","07/01/2010","08/01/2010","09/01/2010","10/01/2010","11/01/2010","12/01/2010","01/01/2011","02/01/2011","03/01/2011","04/01/2011","05/01/2011","06/01/2011","07/01/2011","08/01/2011","09/01/2011","10/01/2011","11/01/2011","12/01/2011","01/01/2012","02/01/2012","03/01/2012","04/01/2012","05/01/2012","06/01/2012","07/01/2012","08/01/2012","09/01/2012","10/01/2012","11/01/2012","12/01/2012","01/01/2013","02/01/2013","03/01/2013","04/01/2013","05/01/2013","06/01/2013","07/01/2013","08/01/2013","09/01/2013"];
    var data = [];
    var pad = Math.random()*5;
    var start = Math.floor(Math.random()*dates.length/2);
    var dataUS = pad+Math.random()*3,
        dataCD = pad+Math.random()*3;
    for(var i = start; i<dates.length;i++){
        dataUS+=1-Math.random()*2;
        dataCD+=1-Math.random()*2;
       data.push({
           "Date":dates[i],
           "US":dataUS,
           "Canada":dataCD
       }); 
    }
    res.send(data);
};

exports.sampler = function (req, res) {
    res.render('pages/sampler', {});
};