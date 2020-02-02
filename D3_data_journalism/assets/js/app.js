// @TODO: YOUR CODE HERE!
let margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 50
}
let svgHeight = 600;
let svgWidth = 1100;
let svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;
let chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.csv("assets/data/data.csv")
    .then(data => {
        console.log(data)
        data.forEach(d => d.obesity = +d.obesity);

        let xScale = d3.scaleBand()
            .domain(data.map(d => d.state))
            .range([0, chartWidth])
            .padding(0.1)


        let yScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => d.obesity))])
            .range([chartHeight, 0])

        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis)
            .selectAll("text")	
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function(d) {
                    return "rotate(-40)" 
                    });

        chartGroup.append("g")
            .call(yAxis)
            .append("text")
              .attr("class", "label")
              .attr("x", 30)
              .attr("y", -6)
              .style("text-anchor", "end")
              .text("Obesity");
        
        chartGroup.append("text")
           .attr("class", "x label")
           .attr("text-anchor", "end")
           .attr("x", (chartWidth/2) + 50)
           .attr("y", chartHeight + 80)
           .text("State");
        
        chartGroup.append("text")
           .attr("class", "y label")
           .attr("text-anchor", "end")
           .attr("x", -180)
           .attr("y", -30)
           .text("Obesity (%)")
           .attr("transform", function(d) {
               return "rotate(-90)" 
               });
        
        chartGroup.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("r", 10)
                .attr("cx", d => xScale(d.state))
                .attr("cy", d => yScale(d.obesity))
                .attr("fill", "#DE615A")
                .on('mouseover', function(d, i) {
                  console.log("mouseover", d.obesity);
                  tooltip.transition()
                    .duration(100)
                    .style("opacity", .8)
                tooltip.html(d.state + "<br/>Obesity: " + d.obesity + "%")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 40) + "px");
                  d3.select(this)
                    .transition()
                    .duration(100)
                    .attr('r', 13)
                    .attr("fill", "#388087")
                })
                .on('mouseout', function(d, i) {
                  console.log("mouseover", d.obesity)
                  tooltip.transition()
                    .duration(100)
                    .style("opacity", 0)
                  d3.select(this)
                    .transition()
                    .duration(100)
                    .attr('r', 10)
                    .attr("fill", "#DE615A")
                });
    })
    .catch(error => console.log(error))