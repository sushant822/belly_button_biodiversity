//Set the path to our data
var url = "./static/js/samples.json";

//Create a afunction that will plot all the necessary graphs
function plotData(id) {
  d3.json(url).then(data => {
    var samples = data.samples.filter(data => data.id.toString() === id)[0];
    var sampleValues = samples.sample_values.slice(0, 10).reverse();
    var otuIDS = samples.otu_ids.slice(0, 10).reverse();
    var otuLables = samples.otu_labels.slice(0, 10);
    var OTU_id = otuIDS.map(value => "OTU " + value);
    
    //Let's see if we are able to get our data
    console.log(OTU_id);
    console.log(otuLables);
    console.log(sampleValues);
      
    //Create trace for Bar Chart
    var traceBar = {
      type: "bar",
      x: sampleValues,
      y: OTU_id,
      orientation: "h",
      text: otuLables
      };
    //Create layout for Bar Chart
    var layoutBar = {
      title: "<b>Top 10 OTU</b>",
      yaxis:{tickmode:"linear"},
    };

// *** BONUS Gauge ***
    //Gauge Chart
    /*Let's find the index of ID in samples and compare them to the index of WFREQ which are stored in the array.*/
    var metaId = data.metadata.map(value => value.id);
    var metaIdIndex = metaId.indexOf(parseInt(samples.id));
    var wfreqArr = data.metadata.map(value => value.wfreq);
    var wfreq = wfreqArr[metaIdIndex];
    console.log(metaIdIndex);
   
    //Mathematical functions needed to plot the pie/gauge
    var level = parseFloat(wfreq) * 20;
    var degrees = 180 - level;
    var radius = 0.5; 
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var mainPath = "M-.0 -0.05 L  .0 0.05 L";
    var pathX = String(x);
    var space = " ";
    var pathY = String(y);
    var pathEnd = " Z";
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    //Create trace for Gauge chart
    var traceGauge = [
        {
          //Let's create the dot for the indicator
            x:[0],
            y:[0],
            marker: { size: 15, color: "#800000" },
            showlegend: false,
            text: level
        },
        /*We'll segement our pie chart into 10 pieces, the last piece would be the bottom half of the pie which we'll color white (#FFFFFF). Since we don't want to show any label at the bottom of the pie/gauge, we'll enter an empty string in text and label. Then we'll add 'hole' property to it so that it looks like a meter and we'll set showlegend to false.*/
        {
            values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: [
                    "#006400",
                    "#556B2F",
                    "#6B8E23",
                    "#8FBC8F",
                    "#98FB98",
                    "#F0E68C",
                    "#D2B48C",
                    "#F5DEB3",
                    "#FFE4C4",
                    "#FFFFFF"
                ]
            },
            labels:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: 0.45,
            type: "pie",
            showlegend: false
        }
    ]
    //Create layout for Gauge Chart
    var layoutGauge = {
        shapes: [
            {
                type: "path",
                path: path,
                fillcolor: "#800000",
                line: {
                  color: "#800000"
                }
            }
        ],
        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        /*We'll set zero line, tick lables and gride to false on both axis. */
        xaxis: {
            zeroline:false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        }
    }

    // *** Standard Gauge ***

    //Create trace for Gauge chart
    /*var traceGauge = [{
      domain: {
        x: [0, 1], y: [0, 1]
      },
      value: parseFloat(wfreq),
      title: {
        text: "<b>Weekly Washing Frequency</b>"
      },
      type: "indicator",      
      mode: "gauge+number",
      gauge: {
        axis: {
          range: [0, 9] 
        },
          steps: [
            { range: [0, 1], color: "#D2B48C" },
            { range: [1, 2], color: "#CD853F" },
            { range: [2, 3], color: "#BC8F8F" },
            { range: [3, 4], color: "#B0C4DE" },
            { range: [4, 5], color: "#D8BFD8" },
            { range: [5, 6], color: "#B0E0E6" },
            { range: [6, 7], color: "#98FB98" },
            { range: [7, 8], color: "#8FBC8F" },
            { range: [8, 9], color: "#696969" },
          ]}
      }
    ];
    //Create layout for Gauge Chart
    var layoutGauge = {
      width: 700,
      height: 600
    };*/

    //Create trace for Bubble Chart
    var traceBubble = {
      x: samples.otu_ids,
      y: samples.sample_values,
      mode: "markers",
      marker: {
        size: samples.sample_values,
        color: samples.otu_ids,
        opacity: [0.8]
        },
      text: samples.otu_labels
    };
    //Create layout for Bubble Chart
    var layoutBubble = {
      xaxis: {
        title: "<b>OTU ID</b>"
      },
      height: 600,
      width: 1000,
      hovermode: "closest"
    };

    //Let's plot all three charts
    Plotly.newPlot("bar", [traceBar], layoutBar);
    Plotly.newPlot("gauge", traceGauge, layoutGauge);
    Plotly.newPlot("bubble", [traceBubble], layoutBubble);
  });
};

//Function to populate Demographic Info
function infoData(id) {
  d3.json(url).then(data => {
    var metadata = data.metadata;
    var result = metadata.filter(meta => meta.id.toString() === id)[0];
    var demoGraphic = d3.select("#sample-metadata");
    demoGraphic.html("");

    Object.entries(result).forEach(data => {
      demoGraphic.append("h5").text(data[0] + ": " + data[1] + "\n");
      console.log(data);
    });
  });
};

function optionChanged(id) {
  plotData(id);
  infoData(id);
};

//Function to initialize
function init() {
  var dropdown = d3.select("#selDataset");
  d3.json(url).then(data => {
      data.names.forEach(name => {
          dropdown.append("option").text(name).property("value");
      });
      plotData(data.names[0]);
      infoData(data.names[0]);
  });
}

init();