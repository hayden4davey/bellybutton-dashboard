// Assign variable to json file
var sampleData = "../../samples.json";

// Create init function
function init(){

    // Select dropdown
    var dropdown = d3.select("#selDataset")

    // Read dataset and send list of names to dropdown menu
    d3.json(sampleData).then((data)=>{
        console.log(data);
        data.names.map((name)=>{
            dropdown.append("option").text(name).property("value");
        })
        


    })
}

init();