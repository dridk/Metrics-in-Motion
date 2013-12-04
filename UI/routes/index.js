
/*
 * GET home page.
 */

exports.index = function(req, res){
    var user = {
        firstName: 'Eugene',
        lastName: 'Trounev'
        };
    res.render('pages/main',{ user : user});
};
exports.userViews = function(req, res){
    var arr = {
        total: 2,
        success: true,
        result: [
        {
            id:3,
            user_id:32,
            title:"my dashboard 1",
            description:"This my medical dashboard",
            style:"default",
            widgets:[1,2]

        },{
            id:4,
            user_id:32,
            title:"my dashboard 2",
            description:"This my developpers dashboard",
            style:"default",
            widgets:[3,4]

        }]
    };
    res.send(arr);
};
exports.userWidgets = function(req, res){
    var arr = {
        total: 4,
        success: true,
        result: [
        {
            id:1,
            user_id:32,
            title:"my widget 1",
            description:"This my medical widget",
            driver:"barchart",
            style: "default",
            position:{
                row:1,
                col:1
            },
            size:{
                width:1,
                height:1
            },
            spec:{}

        },{
            id:2,
            user_id:32,
            source_id:1,
            title:"my Widget 2",
            description:"This my medical widget",
            driver:"linechart",
            style: "default",
            position:{
                row:1,
                col:2
            },
            size:{
                width:1,
                height:2 
            },
            spec: {}

        },
        {
            id:3,
            user_id:32,
            source_id:1,
            title:"my Widget3",
            description:"This my developpers widget",
            driver:"piechart",
            style: "default",
            position:{
                row:1,
                col:1
            },
            size:{
                width:2,
                height:2 
            },
            spec: {}

        },{
            id:4,
            user_id:32,
            source_id:1,
            title:"my Widget 4",
            description:"This my developpers widget",
            driver:"dognutchart",
            style: "default",
            position:{
                row:2,
                col:1
            },
            size:{
                width:1,
                height:1
            },
            spec: {}

        }]
    };
    res.send(arr);
};

exports.sampler = function(req, res){
    res.render('pages/sampler',{});
};