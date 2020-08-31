var url = "samples.json";

d3.json(url).then(function(data) {
    var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
    var otuIDS = data.samples[0].otu_ids.slice(0, 10).reverse();
    var otuLables = data.samples[0].otu_labels.slice(0, 10);
    var OTU_id = otuIDS.map(value => "OTU " + value)
    console.log(OTU_id);
    var data = [{
        type: 'bar',
        x: sampleValues,
        y: OTU_id,
        orientation: 'h',
        text: otuLables
      }];
      
      var layout = {
        title: "Top 10 OTU",
        yaxis:{tickmode:"linear"},
    };

    Plotly.newPlot('bar', data, layout);
});