var url = "samples.json";

function plotData(id) {
  d3.json(url).then(data => {
    var samples = data.samples.filter(data => data.id.toString() === id)[0];
    var sampleValues = samples.sample_values.slice(0, 10).reverse();
    var otuIDS = samples.otu_ids.slice(0, 10).reverse();
    var otuLables = samples.otu_labels.slice(0, 10);
    var OTU_id = otuIDS.map(value => "OTU " + value);

    console.log(OTU_id);
    console.log(otuLables);
    console.log(sampleValues);
      
    var traceBar = {
      type: 'bar',
      x: sampleValues,
      y: OTU_id,
      orientation: 'h',
      text: otuLables
      };
        
    var layoutBar = {
      title: "Top 10 OTU",
      yaxis:{tickmode:"linear"},
    };

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
            { range: [0, 2], color: "#FFD700" },
            { range: [2, 4], color: "cyan" },
            { range: [4, 6], color: "teal" },
            { range: [6, 8], color: "lime" },
            { range: [8, 9], color: "green" },
          ]}
      }
    ];

    var layoutGauge = {
      width: 700,
      height: 600
    };

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

    var layoutBubble = {
      xaxis: {
        title: "OTU ID"
      },
      height: 600,
      width: 1000
    };

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