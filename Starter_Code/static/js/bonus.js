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
        { range: [0, 1], color: "#FF4500" },
        { range: [1, 2], color: "#FF6347" },
        { range: [2, 3], color: "#FF7F50" },
        { range: [3, 4], color: "#FF8C00" },
        { range: [4, 5], color: "#FFA500" },
        { range: [5, 6], color: "#FFD700" },
        { range: [6, 7], color: "#FFEC8B" },
        { range: [7, 8], color: "#F0E68C" },
        { range: [8, 9], color: "#ADFF2F" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: washingFrequency
      }
    }
  };

  // Set up layout for gauge chart
  let layout = { width: 400, height: 300, margin: { t: 0, b: 0 } };

  // Update the gauge chart within the 'gauge' div
  Plotly.newPlot("gauge", [trace], layout);
}

// Call the gauge chart function with the initial subject ID
updateGaugeChart(data.names[0]);

// Event listener for dropdown change
dropdownMenu.on("change", function () {
  let selectedSubjectID = dropdownMenu.property("value");
  updateGaugeChart(selectedSubjectID);
});
