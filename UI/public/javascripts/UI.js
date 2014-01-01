/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
//Legacy
$( document ).ready(function() {
        $('body').layout({
            defaults: {
                resizable:  false,
                closable:   false
            },
            center__childOptions: {
                defaults: {
                    resizable:  false,
                    closable:   false
                },
                center__paneSelector:	".ui-layout-inner-center",
                north__paneSelector:	".ui-layout-inner-north",
                south__paneSelector:	".ui-layout-inner-south"
            },
            west__childOptions: {
                defaults: {
                    resizable:  false,
                    closable:   false
                },
                center__paneSelector:	".ui-layout-inner-center",
                north__paneSelector:	".ui-layout-inner-north",
                south__paneSelector:	".ui-layout-inner-south"
            }
        });
        
        $( ".ui-widget-button" ).button();
        $( ".ui-widget-buttongroup" ).buttonset();
        $( ".ui-widget-checkbox" ).checkbox();
        $( ".ui-widget-spinner" ).spinner();
        $( ".ui-widget-tabbar" ).tabs();
    //    $( ".ui-widget-scrollview" ).scrollbar({orientation: 'vertical'});
    //    $( "[data-widget=dropdown]" ).menu();
    //    $( "[data-widget=slider]" ).slider();
    //    $( "[data-widget=progressbar]" ).progressbar();
        //$( ".ui-widget-dialog" ).dialog();
        
        
        $( '.ui-widget' ).tooltip({
            show: {
                effect: "fade",
                delay: 1000
            },
            position: {
                my: "center top+5",
                at: "center bottom",
                using: function( position, feedback ) {
                  $( this ).css( position );
                  $( "<div>" )
                    .addClass( "ui-tooltip-arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            }
        });
        
        mimUI.dialogs.alert = $( "#content-error-dialog").dialog({
            height: 140,
            modal: true,
            autoOpen: false,
            buttons: {
                Close: function() {
                    $( this ).dialog( "close" );
                }
            }
        });
        mimUI.dialogs.viewDialog = $( "#ui-dialog-addview" ).dialog({
            width: 600,
            height: 400,
            modal: true,
            autoOpen: false,
            buttons: {
                Cancel: function() {
                    $( this ).dialog( "close" );
                },
                Save: function(){
                    $( this ).dialog( "close" );
                }
            }
        });
        
        mimUI.plugins.gallery = $('#content-gallery').mimuiView({
            onRenderComplete: function(){
                var key = $("#content-view-widget1").data('key');
                var data = mimUI.widgets.getDataByKey(key);
                var width = data.size.width*380,
                    dataWidth = data.size.width*320;
                var height = data.size.height*300-40,
                    dataHeight = data.size.height*240-40;
                var spec = {
                  "width": dataWidth,
                  "height": dataHeight,
                  "viewport": [width,height],
                  "padding": {"top": 25, "left": 40, "bottom": 20, "right": 20},
                  "data": [
                    {
                      "name": "table",
                      "values": [
                        {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
                        {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
                        {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
                        {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
                        {"x": 9,  "y": 52}, {"x": 10, "y": 48},
                        {"x": 11, "y": 24}, {"x": 12, "y": 49},
                        {"x": 13, "y": 87}, {"x": 14, "y": 66}
                      ]
                    }
                  ],
                  "scales": [
                    {
                      "name": "x",
                      "type": "ordinal",
                      "range": "width",
                      "domain": {"data": "table", "field": "data.x"}
                    },
                    {
                      "name": "y",
                      "range": "height",
                      "nice": true,
                      "domain": {"data": "table", "field": "data.y"}
                    }
                  ], "axes": [
                    {
                      "type": "x",
                      "scale": "x",
                      "properties": {
                        "ticks": {
                          "stroke": {
                            "value": "#aaa"
                          }
                        },
                        "axis": {
                          "stroke": {
                            "value": "#aaa"
                          },
                          "strokeWidth": {
                            "value": 1
                          }
                        },
                        "labels": {
                          "fill": {
                            "value": "#666"
                          },
                          "angle": {
                            "value": 0
                          },
                          "fontSize": {
                            "value": 10
                          },
                          "align": {
                            "value": "center"
                          },
                          "baseline": {
                            "value": "middle"
                          },
                          "dx": {
                            "value": 0
                          },
                          "dy": {
                            "value": 5
                          }
                        },
                        "title": {
                          "fontSize": {
                            "value": 10
                          },
                          "fill": {
                            "value": "#666"
                          }
                        }
                      }
                    },
                    {
                      "type": "y",
                      "scale": "y",
                      "grid": true,
                      "subdivide": 1,
                      "tickSizeMinor": 2,
                      "layer": "back",
                      "values": [
                        0,
                        20,
                        40,
                        60,
                        80,
                        100
                      ],
                      "properties": {
                        "ticks": {
                          "stroke": {
                            "value": "#aaa"
                          }
                        },
                        "axis": {
                          "stroke": {
                            "value": "#aaa"
                          },
                          "strokeWidth": {
                            "value": 1
                          }
                        },
                        "labels": {
                          "fill": {
                            "value": "#666"
                          },
                          "angle": {
                            "value": 0
                          },
                          "fontSize": {
                            "value": 10
                          }
                        }
                      }
                    }
                  ],
                  "marks": [
                    {
                      "type": "rect",
                      "from": {"data": "table"},
                      "properties": {
                        "enter": {
                          "x": {"scale": "x", "field": "data.x"},
                          "width": {"scale": "x", "band": true, "offset": -2},
                          "y": {"scale": "y", "field": "data.y"},
                          "y2": {"scale": "y", "value": 0}
                        },
                        "update": {
                          "fill": {"value": "#30844e"}
                        },
                        "hover": {
                          "fill": {"value": "#266a3e"}
                        }
                      }
                    }
                  ]
                };
                vg.parse.spec(spec, function(chart) { chart({el:"#content-view-widget1 .content-view-widget-view"}).update({duration:500, ease:"fade-in"}); });
            }
        });
        mimUI.plugins.sidebar = $('#content-views-list').mimuiSidebar({
            onViewSwitch: mimUI.plugins.gallery.viewShownConnector,
            onUpdateReceived: mimUI.plugins.gallery.viewsUpdateConnector,
            onViewsRefreshed: mimUI.plugins.gallery.viewsRefreshConnector
        });
        
                
        $("#content-add-view").click(function(){
            mimUI.dialog.addView();
        })