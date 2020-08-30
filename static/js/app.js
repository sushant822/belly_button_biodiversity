var url = "samples.json";

function unpack(rows, index) {
    return rows.map(row => row[index]);
  }

d3.json(url).then(function(data) {
    var sampleValues = data.samples[0].sample_values.slice(0, 10);
    var otuIDS = data.samples[0].otu_ids;
    var otuLables = data.samples[0].otu_labels;
    //console.log(otuLables);
    var data = [{
        type: 'bar',
        x: sampleValues,
        y: otuLables,
        orientation: 'h',
        hoverinfo: otuLables
      }];
      
      Plotly.newPlot('bar', data);
});