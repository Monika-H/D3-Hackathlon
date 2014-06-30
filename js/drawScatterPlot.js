function drawScatterPlot() {
	
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


	d3.selectAll("circle").remove();
    d3.selectAll(".axis").remove();


    //Create SVG element
	svg = d3.select("svg");

			//Create circles
	svg.append("g")
			   .attr("id", "circles")
			   .selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
					return xScale(d[0][xVar]); // THIS MEANS VISIT 1
			   })
			   .attr("cy", function(d) {
					return yScale(d[0][yVar]); // THIS MEANS VISIT 1
			   })
			   .attr("r", 2)
			   .style("fill","#000");
			
	svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding + 5) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (padding - 5) + ",0)")
        .call(yAxis);


}