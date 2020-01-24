// Assign variable to json file
var sampleData = "../../samples.json";

// Create init function
function init(){

    // Select dropdown
    var dropdown = d3.select("#selDataset");

    // Read data and send list of names to dropdown menu
    d3.json(sampleData).then((data) => {
        console.log(data);
        data.names.map((name) => {
            dropdown.append("option").text(name).property("value");
        var idInit = data.names[0];
        //runBelly(idInit);
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
        var index = data.names.indexOf(id)
        var sampleValues = data.samples[index].sample_values;
        var otuIDs = data.samples[index].otu_ids;
        var otuLabels = data.samples[index].otu_ids;
        var sampleMeta = data.metadata[index];
        console.log(sampleValues);
        console.log(otuIDs);
        console.log(otuLabels);
        console.log(sampleMeta);
        console.log(id);



        var barData =[{
            type: 'bar',
            x: sampleValues.sort((a, b) => b - a).slice(0,10),
            y: otuIDs.map((x) => "OTD" + x),
            text: otuLabels,
            orientation: 'h'    


        }];

        var layout = {
            yaxis:{
                autorange:'reversed'
            }
        };

        Plotly.newPlot('bar', barData, layout);

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

        sampleSpace = d3.select("#sample-metadata");
        sampleSpace.text("")
        Object.entries(sampleMeta).forEach((x) => {
            sampleSpace.append("h5").text(x[0] + ": " + x[1] + "\n")
        })
        

    })

    




   
    
    
}




init();