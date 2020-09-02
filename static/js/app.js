var url = "samples.json";

function plotData(id) {
  d3.json(url).then(data => {
    var samples = data.samples.filter(d => d.id.toString() === id)[0];
    var sampleValues = samples.sample_values.slice(0, 10).reverse();
    var otuIDS = samples.otu_ids.slice(0, 10).reverse();
    var otuLables = samples.otu_labels.slice(0, 10);
    var OTU_id = otuIDS.map(value => "OTU " + value);
      
    var trace1 = {
      type: 'bar',
      x: sampleValues,
      y: OTU_id,
      orientation: 'h',
      text: otuLables
      };
        
    var layout1 = {
      title: "Top 10 OTU",
      yaxis:{tickmode:"linear"},
    };

    var trace2 = {
      x: OTU_id,
      y: sampleValues,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: OTU_id 
      },
      text: otuLables
    };

    var layout2 = {
      xaxis: {
        title: "OTU ID"
      },
      height: 600,
      width: 1000
    };

    var wfreq = data.metadata.map(d => d.wfreq)
    var trace3 = {
      domain: {x:[0, 1], y:[0, 1]},
      value: parseFloat(wfreq),
      title: {
        text: "Weekly Washing Frequency"
      },
      mode: "gauge + number",
      gauge: {
        axis: {
          range: [null, 9]
        },
        steps: [
          {range: [0, 2], color: "yellow"},
          {range: [2, 4], color: "cyan"},
          {range: [4, 6], color: "teal"},
          {range: [6, 8], color: "lime"},
          {range: [8, 9], color: "green"}
        ]
      }
    };

    var layout3 = {
      width: 700,
      height: 600
    };

    Plotly.newPlot("bar", trace1, layout1);
    Plotly.newPlot("bubble", trace2, layout2);
    Plotly.newPlot("gauge", trace3, layout3);

    console.log(OTU_id);
    console.log(otuLables);
    console.log(sampleValues);
  });
};
