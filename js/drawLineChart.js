function drawLinePlot() {

    var padding = 40,
        path;

    var width = d3.select(".bigPlot").attr("width");
    var height = d3.select(".bigPlot").attr("height");
    var minX = d3.min(dataset,function(d) { return d3.min(d,function(dd) {
                                                    if (parseFloat(dd[xVar])) {return dd[xVar];}}
                                                    );});
    var maxX = d3.max(dataset,function(d) { return d3.max(d, function(dd) {
                                                    if (parseFloat(dd[xVar])) {return dd[xVar];}}
                                                    );});
    var minY = d3.min(dataset,function(d) { return d3.min(d,function(dd) {
                                                    if (parseFloat(dd[yVar])) {return dd[yVar];}}
                                                    );});
    var maxY = d3.max(dataset,function(d) { return d3.max(d, function(dd) {
                                                    if (parseFloat(dd[yVar])) {return dd[yVar];}}
                                                    );});
    var xScale = d3.scale.linear()
                     .domain([minX,maxX])
                     .range([padding, width - padding]);

    var yScale = d3.scale.linear()
                         .domain([minY,maxY])
                         .range([height - padding, padding]);

    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(10);

    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .ticks(5);

    var color = d3.scale.category20();

    var line = d3.svg.line()
    //                .interpolate("basis")
                    .x(function(d) {return xScale(d[xVar]);})
                    .y(function(d) {if (parseFloat(d[yVar])) {return yScale(d[yVar]);} else {return height/2;}});

    // in case there is already a line graph present, remove all line objects and the axes
    d3.selectAll(".line").remove();
    d3.selectAll(".axis").remove();

    svg = d3.select("svg");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding + 5) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (padding - 5) + ",0)")
        .call(yAxis);

    path = svg.selectAll(".line")
        .data(dataset)
        .enter().append("path")
        .attr("d",line)
        .attr("class","line")
        .style("stroke-width",3)
        .style("stroke", function(d,i) {
            return(color(i));
        });

    path.each(function(d) { d.totalLength = this.getTotalLength();})
        .attr("stroke-dasharray", function(d) { return d.totalLength + " " + d.totalLength;})
        .attr("stroke-dashoffset", function(d) { return d.totalLength;})
        .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

} // end of function displayData
