// Assign variable to json file
var sampleData = "../../samples.json";

// Select dropdown
var dropdown = d3.select("#selDataset");

// Create init function
function init(){

    // Select dropdown
    var dropdown = d3.select("#selDataset");

    // Read data and send list of names to dropdown menu
    d3.json(sampleData).then((data) => {
        console.log(data);
        data.names.map((name) => {
            dropdown.append("option").text(name).property("value");
        })
    })
    
}

// Change function
function optionChanged(id){
    console.log(id);
    runBelly(id);

}


// Function to pull data based on id and plot it
function runBelly(id){
    
    // Read and save data
    d3.json(sampleData).then((data)=>{
        var sampleValues = data.samples.find(x => x.id).sample_values;
        var otuIDs = data.samples.find(x => x.id === id).otu_ids;
        var otuLabels = data.samples.find(x => x.id).otu_labels;
        var metadata = data.metadata.find(x => x.id)
        console.log(sampleValues);
        console.log(otuIDs);
        console.log(otuLabels);
        console.log(metadata);



        var barData =[{
            type: 'bar',
            x: sampleValues.slice(0,10).reverse(),
            y: otuIDs,
            text: otuLabels,
            orientation: 'h'    


        }];

        Plotly.newPlot('bar', barData);

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
          
          Plotly.newPlot('bubble', bubbleData);

    })

    




   
    
    
}




init();