// @TODO: YOUR CODE HERE!
// Set up chart parameters (height, width, margins)
var svgHeight = 660;
var svgWidth = 960;
var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right

//Create SVG container
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read in CSV/json
d3.csv("assets/data/data.csv").then(function(healthData){
    console.log(healthData);
    //Parse data (poverty and healthcare)
    healthData.forEach(function(data){ 
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });
    //Create scales
    var xLinearScale = d3.scaleLinear().range([0, chartWidth]);
    var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

    //Create Axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xMin;
    var xMax;
    var yMin;
    var yMax;

    xMin = d3.min(healthData, function(data) {
        return data.healthcare;
    });

    xMax = d3.max(healthData, function(data) {
        return data.healthcare;
    });

    yMin = d3.min(healthData, function(data) {
        return data.poverty;
    });

    yMax=d3.max(healthData, function(data) {
        return data.poverty;
    });


    xLinearScale.domain([xMin, xMax]);
    yLinearScale.domain([yMin, yMax]);

    //Append axes to SVG group (chartGroup)
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);


    //Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", .75)
;
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
        return (abbr + '%');
        });        


    chartGroup.call(toolTip);

    //Make event listeners
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })


    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${height + margin.top + 30})`)
        .attr("class", "aText")
        .text("In Poverty (%)");
});