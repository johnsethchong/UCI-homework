// from data.js
var tableData = data;

var tbody= d3.select("tbody");

// YOUR CODE HERE!
function showTable(ufoSightings) {
    tbody.text("")
    ufoSightings.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.html(value);
        });
    });
};

showTable(tableData);

var button = d3.select("#filter-btn");

button.on("click", function(event) {
    d3.event.preventDefault();
    var dataInput = d3.select("#datetime").property("value");

    if (dataInput === ""){
        var filteredData = tableData;
    }
    else {
        var filteredData = tableData.filter(sighting => sighting.datetime === dataInput);
    };


    console.log(filteredData);
    showTable(filteredData);
});