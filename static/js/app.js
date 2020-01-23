// Assign variable to json file
var sampleData = "../../samples.json";

// Select dropdown
var dropdown = d3.select("#selDataset");

// Create init function
function init(){

    // Select dropdown
    var dropdown = d3.select("#selDataset");

    // Read dataset and send list of names to dropdown menu
    d3.json(sampleData).then((data) => {
        console.log(data);
        data.names.map((name) => {
            dropdown.append("option").text(name).property("value");
        })

    })
}

// Change function
function optionChanged(id){
    getData(id);

}


// Function to pull data based on id
function getData(id){
    console.log(id)

   
    
    
}




init();