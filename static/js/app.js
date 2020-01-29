// Assign variable to json file
var sampleData = "samples.json";

// Create init function
function init(){

    // Select dropdown
    var dropdown = d3.select("#selDataset");

    // Read data and send list of names to dropdown menu
    d3.json(sampleData).then((data) => {
        console.log(data);
        data.names.map((name) => {
            dropdown.append("option").text(name).property("value");

        // Run plotting function for first id
        var idInit = data.names[0];
        runBelly(idInit);
        })
    })   
}

// Function triggered by change
function optionChanged(id){
    console.log(id);
    runBelly(id);
}


// Function to pull data based on id and plot it
function runBelly(id){
    
    // Read and save data
    d3.json(sampleData).then((data)=>{
        var index = data.names.indexOf(id)
        var sampleValues = data.samples[index].sample_values;
        var otuIDs = data.samples[index].otu_ids;
        var otuLabels = data.samples[index].otu_labels;
        var sampleMeta = data.metadata[index];
        var washFreq = data.metadata[index].wfreq;
        console.log(washFreq);

        // Set data for bar plot
        var barData =[{
            type: 'bar',
            x: sampleValues.sort((a, b) => b - a).slice(0,10),
            y: otuIDs.map((x) => "OTD" + x),
            text: otuLabels,
            orientation: 'h' ,
            marker: {color: '#337AB7'}   
        }];
        
        // Set up layout for bar
        var barLayout = {
            yaxis: {autorange:'reversed'},
            title: {text: "Top OTUs Found"}
        };

        // Plot bar
        Plotly.newPlot('bar', barData, barLayout);

        // Set data for bubble plot
        var bubbleData = [{
            x: otuIDs,
            y: sampleValues,
            mode: 'markers',
            marker: {
                size: sampleValues, 
                color: otuIDs
            },
            text: otuLabels
        }];

        // Set up layout for bubble
        var bubbleLayout = {
            title: {text: "Sample Distribution"}
        };
         
        // Plot bubble
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Set Data for gauge
        var gaugeData = [{
              domain: {x: [0, 1], y: [0, 1]},
              value: washFreq,
              title: {text: "Washing Frequency <br> Scrubs per Week"},
              type: "indicator",
              mode: "gauge+number+delta",
              gauge: {
                bar: {color: '#337AB7'},
                axis: {range: [null, 10]},
                steps: [
                  { range: [0, 2], color: "white" },
                  { range: [2, 4], color: "#EEEEEE" },
                  { range: [4, 6], color: "#CCCCCC" },
                  { range: [6, 8], color: "#999999" },
                  { range: [8, 10], color: "#666666" }
                ],
              }
            }];
        
        // Plot gauge
        Plotly.newPlot('gauge', gaugeData);

        // Select demographic space and set as blank
        sampleSpace = d3.select("#sample-metadata");
        sampleSpace.text("");

        // Loop through dictionary and append text on new lines
        Object.entries(sampleMeta).forEach((p) => {
            sampleSpace.append("h5").text(p[0] + ": " + p[1] + "\n")
        });
    })    
}

// Run init function
init();


