// from data.js
var tableData = data;

// Use D3 to select the table body
var tbody= d3.select("tbody");

// YOUR CODE HERE!
// Create function to display UFO Sightings
function showTable(ufoSightings) {
    tbody.text("")
    //Use forEach and Object.entries to get key + value data to loop through and add to the table
    ufoSightings.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

//Use function to show data in data.js
showTable(tableData);

//Use button to take user input and filter
var button = d3.select("#filter-btn");

//On every click...
button.on("click", function(event) {
    d3.event.preventDefault();
    var inputValue = d3.select("#datetime").property("value");

    if (inputValue === ""){
        var filteredData = tableData; //Shows the whole dataset by default
    }
    else {
        var filteredData = tableData.filter(sighting => sighting.datetime === inputValue); //Filters out the dataset according to user input
    };


    console.log(filteredData);
    showTable(filteredData);
});