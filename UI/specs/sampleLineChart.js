{
  "width": 500,
  "height": 200,
  "padding": {
    "top": 10,
    "left": 50,
    "bottom": 60,
    "right": 20
  },
  "data": [
    {
      "name": "table",
      "format": {
        "type": "json",
        "parse": {
          "Date": "date",
          "S&P/TSX Composite Index Total Return": "number",
          "DEX Universe Bond Index Total Return": "number",
          "Mortgage Portfolio": "number",
          "FSMC": "number"
        }
      },
      "values": [
        {
          "Date": "2/27/2009",
          "S&P/TSX Composite Index Total Return": "-38.20",
          "DEX Universe Bond Index Total Return": "-4.07",
          "Mortgage Portfolio": "1.81",
          "FSMC": "16.64"
        },
        {
          "Date": "3/31/2009",
          "S&P/TSX Composite Index Total Return": "-32.42",
          "DEX Universe Bond Index Total Return": "4.93",
          "Mortgage Portfolio": "1.69",
          "FSMC": "37.39"
        },
        {
          "Date": "4/30/2009",
          "S&P/TSX Composite Index Total Return": "-30.70",
          "DEX Universe Bond Index Total Return": "5.50",
          "Mortgage Portfolio": "1.47",
          "FSMC": "-16.89"
        },
        {
          "Date": "5/29/2009",
          "S&P/TSX Composite Index Total Return": "-26.99",
          "DEX Universe Bond Index Total Return": "5.52",
          "Mortgage Portfolio": "1.26",
          "FSMC": "17.19"
        },
        {
          "Date": "6/30/2009",
          "S&P/TSX Composite Index Total Return": "-25.69",
          "DEX Universe Bond Index Total Return": "17.02",
          "Mortgage Portfolio": "1.08",
          "FSMC": "47.25"
        }
      ]
    },
    {
      "name": "style",
      "values":[
	{
	  "key":"S&P/TSX Composite Index Total Return",
	  "color":"#0000cc"
	},	
	{
	  "key":"DEX Universe Bond Index Total Return",
	  "color":"#cc0000"
	},	
	{
	  "key":"Mortgage Portfolio",
	  "color":"#ff9900"
	},
	{
	  "key":"FSMC",
	  "color":"#00cc00"
	}
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "time",
      "range": "width",
      "nice": "week",
      "domain": {
        "data": "table",
        "field": "data.Date"
      }
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true,
      "domain": {
        "data": "table",
        "field": [
          "data.DEX Universe Bond Index Total Return",
          "data.S&P/TSX Composite Index Total Return",
          "data.Mortgage Portfolio",
          "data.FSMC"
        ]
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
          }
        }
      }
    }
  ],
  "marks": [
    {
      "type": "line",
      "from": {
        "data": "table"
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
            "field": "data.FSMC"
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
        "data": "table"
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
            "field": "data.S&P/TSX Composite Index Total Return"
          },
          "stroke": {
            "value": "#cc0000"
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
        "data": "table"
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
            "field": "data.DEX Universe Bond Index Total Return"
          },
          "stroke": {
            "value": "#ff9900"
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
        "data": "table"
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
            "field": "data.Mortgage Portfolio"
          },
          "stroke": {
            "value": "#00cc00"
          },
          "strokeWidth": {
            "value": 2
          }
        }
      }
    }
  ]
}