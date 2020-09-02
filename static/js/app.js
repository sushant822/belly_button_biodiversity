//Set the path to our data
var url = "samples.json";

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
      type: 'bar',
      x: sampleValues,
      y: OTU_id,
      orientation: 'h',
      text: otuLables
      };
    //Create layout for Bar Chart
    var layoutBar = {
      title: "<b>Top 10 OTU</b>",
      yaxis:{tickmode:"linear"},
    };

    //Create trace for Gauge Chart
    var wfreq = data.metadata.map(data => data.wfreq)
    var traceGauge = [{
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
          range: [null, 9] 
        },
          steps: [
            { range: [0, 2], color: "#F4A460" },
            { range: [2, 4], color: "#AFEEEE" },
            { range: [4, 6], color: "#5F9EA0" },
            { range: [6, 8], color: "#66CDAA" },
            { range: [8, 9], color: "#3CB371" },
          ]}
      }
    ];
    //Create layout for Gauge Chart
    var layoutGauge = {
      width: 700,
      height: 600
    };

    //Create trace for Bubble Chart
    var traceBubble = {
      x: samples.otu_ids,
      y: samples.sample_values,
      mode: "markers",
      marker: {
        size: samples.sample_values,
        color: samples.otu_ids
        },
      text: samples.otu_labels
    };
    //Create layout for Bubble Chart
    var layoutBubble = {
      xaxis: {
        title: "<b>OTU ID</b>"
      },
      height: 600,
      width: 1000
    };

    //Let's plot all three charts
    Plotly.newPlot("bar", [traceBar], layoutBar);
    Plotly.newPlot("gauge", traceGauge, layoutGauge);
    Plotly.newPlot("bubble", [traceBubble], layoutBubble);
  });
};

function infoData(id) {
  d3.json(url).then(data => {
    var metadata = data.metadata;
    var result = metadata.filter(meta => meta.id.toString() === id)[0];
    var demoGraphic = d3.select("#sample-metadata");
    demoGraphic.html("");

    Object.entries(result).forEach(data => {
      demoGraphic.append("h5").text(data[0].toUpperCase() + ": " + data[1] + "\n");
    });
  });
};

function optionChanged(id) {
  plotData(id);
  infoData(id);
};

function init() {
  var dropdown = d3.select("#selDataset");
  d3.json(url).then(data => {
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });
      plotData(data.names[0]);
      infoData(data.names[0]);
  });
}

init();