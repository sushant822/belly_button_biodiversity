var url = "samples.json";

function plotData(id) {
  d3.json(url).then(data => {
    var samples = data.samples.filter(s => s.id.toString() === id)[0];
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

    Plotly.newPlot("bar", trace1, layout1);
    Plotly.newPlot("bubble", trace2, layout2);

    console.log(OTU_id);
    console.log(otuLables);
    console.log(sampleValues);
  });
};

plotData();