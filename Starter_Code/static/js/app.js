const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function (data) {
  // Select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Populate the dropdown menu with subject IDs
  data.names.forEach(subjectID => {
    dropdownMenu.append("option")
      .text(subjectID)
      .property("value", subjectID);
  });

  // Function to update the bar chart based on the selected subject ID
  function updateBar(selectedSubjectID) {
    // Filter data for the selected subject ID
    let selectedSubjectData = data.samples.find(sample => sample.id === selectedSubjectID);

    // Select the top 10 OTUs
    let topOtuIds = selectedSubjectData.otu_ids.slice(0, 10).reverse();
    let topSampleValues = selectedSubjectData.sample_values.slice(0, 10).reverse();
    let topOtuLabels = selectedSubjectData.otu_labels.slice(0, 10).reverse();

    // Create bar chart
    let trace = {
      type: 'bar',
      x: topSampleValues,
      y: topOtuIds.map(otuId => `OTU ${otuId}`),
      text: topOtuLabels,
      orientation: 'h'
    };

    let layout = {
      title: `Top 10 OTUs for Subject ID ${selectedSubjectID}`,
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU ID' }
    };

    Plotly.newPlot('bar', [trace], layout);
  }

  // Function to update the bubble chart based on the selected subject ID
  function updateBubbleChart(selectedSubjectID) {
    // Filter data for the selected subject ID
    let selectedSubjectData = data.samples.find(sample => sample.id === selectedSubjectID);

    // Set up trace for bubble chart
    let trace = {
      x: selectedSubjectData.otu_ids,
      y: selectedSubjectData.sample_values,
      mode: 'markers',
      marker: {
        size: selectedSubjectData.sample_values,
        color: selectedSubjectData.otu_ids,
        colorscale: 'Earth'
      },
      text: selectedSubjectData.otu_labels
    };

    // Set up layout for bubble chart
    let layout = {
      title: `Bubble Chart for Subject ID ${selectedSubjectID}`,
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' },
      height: 600,
      width: 1200
    };

    // Update the bubble chart within the 'bubble' div
    Plotly.newPlot('bubble', [trace], layout);
  }

  // Display each key-value pair from the metadata
  function updateMetaData(selectedSubjectID) {
    // Filter data for the selected subject ID
    let selectedSubjectData = data.metadata.find(metadata => metadata.id === +selectedSubjectID);
  
    // Select metadata panel
    let metadataPanel = d3.select("#sample-metadata");
  
    // Clear existing metadata
    metadataPanel.html("");
  
    // Create table
    let table = metadataPanel.append("table").classed("table", true);
  
    // Append table with key-value pair
    Object.entries(selectedSubjectData).forEach(([key, value]) => {
      let row = table.append("tr");
      row.append("td").text(key);
      row.append("td").text(value);
    });
  }
    // Function to update the gauge chart based on the selected subject ID
  function updateGaugeChart(selectedSubjectID) {
    // Filter data for the selected subject ID
    let selectedSubjectData = data.metadata.find(metadata => metadata.id === +selectedSubjectID);

    // Get the washing frequency
    let washingFrequency = selectedSubjectData.wfreq;

    // Create the gauge chart
    let trace = {
      type: "indicator",
      mode: "gauge+number",
      value: washingFrequency,
      title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
      gauge: {
        axis: { range: [0, 9] },
        steps: [
          { range: [0, 1], color: "rgb(0, 150, 0)" },
          { range: [1, 2], color: "rgb(0, 140, 0)" },
          { range: [2, 3], color: "rgb(0, 120, 0)" },
          { range: [3, 4], color: "rgb(0, 100, 0)" },
          { range: [4, 5], color: "rgb(0, 80, 0)" },
          { range: [5, 6], color: "rgb(0, 60, 0)" },
          { range: [6, 7], color: "rgb(0, 40, 0)" },
          { range: [7, 8], color: "rgb(0, 20, 0)" },
          { range: [8, 9], color: "rgb(0, 0, 0)" }
        ],
        threshold: {
          line: { color: "yellow", width: 4 },
          thickness: 0.75,
          value: washingFrequency
        }
      }
    };

    // Set up layout for gauge chart
    let layout = {width: 400, height: 300};

    // Update the gauge chart within the 'gauge' div
    Plotly.newPlot("gauge", [trace], layout);
  }  
  // Default with the first subject ID
  updateBar(data.names[0]);
  updateBubbleChart(data.names[0]);
  updateMetaData(data.names[0]);
  updateGaugeChart(data.names[0]);

  // Event listener for dropdown change
  dropdownMenu.on("change", function () {
    let selectedSubjectID = dropdownMenu.property("value");
    updateBar(selectedSubjectID);
    updateBubbleChart(selectedSubjectID);
    updateMetaData(selectedSubjectID);
    updateGaugeChart(selectedSubjectID);
  });
});
