
drawBoxPlot = function(svg) {

		/*In order to draw the boxplot, we don't need the actual data but some descriptive statistics (min, max, median etc.). 
		I store them in a seperate dataset (boxplot_data) to which I will bind the svg elements later.*/
		var boxplot_data = [];

		/*First I create an array that contains all different visit numbers. For this I first use the map function that
		makes it possible to access individual property values in each object (in an array of objects, which is the data 
		structure of dataset) and map it into an array. */
        visitIds = dataset.map(function(d) {return d["visit"];}).filter(function(itm,i) {
                  return i == dataset.map(function(d) {return d["visit"];}).indexOf(itm);
		});
									 
		/*This part goes through the dataset one visit at a time and pushes all the relevant descriptive statistics into the 
		boxplot_data dataset*/
		/*The forEach function makes it possible to access every element in an array in turn (here each visit number) and 
		use the element in a function.*/
		visitIds.forEach(function(element) { 
			object = {
				visit: element,
				/*I use different d3 functions to get the statistics. In order to get the statistics for only one visit at a 
				time (forEach element), I use a filter function. The filter function will only keep the objects in the dataset
				whose visit variable is equal to the current visit number (element).*/
				maximum: d3.max(dataset.filter(function(dat) {return dat["visit"] == element;}),function(d) {return d[yVar]}),
				minimum: d3.min(dataset.filter(function(dat) {return dat["visit"] == element;}),function(d) {return d[yVar]}),
				median: d3.median(dataset.filter(function(dat) {return dat["visit"] == element;}),function(d) {return d[yVar]}),
				/*The d3.quantile functions operates only on a sorted array of numbers, so we have to get the relevant 
				information from the objects (using the map function), sort the retrieved numbers and then pass them
				to the d3.quantile function.*/
				quartile_1: d3.quantile(dataset.filter(function(dat) {return dat["visit"] == element;}).map(function(d){return d[yVar];}).sort(d3.ascending),0.25),
				quartile_3: d3.quantile(dataset.filter(function(dat) {return dat["visit"] == element;}).map(function(d){return d[yVar];}).sort(d3.ascending),0.75)
				}
			boxplot_data.push(object);				
		});

		/*Some padding variables so that there is space for axes*/
		padding_w = 50 
		padding_h = 50
		
		/*Scaling the x-axis: from min Visit to max Visit*/
		var xScale = d3.scale.linear()
						.domain([(d3.min(boxplot_data, function(d) { return d['visit'];})),(d3.max(boxplot_data, function(d) { return d['visit'];}))])
						.range([padding_w, w-padding_w]);

		/*Scaling the y-axis: From the minimum of the yVar (at any visit) to the maximum.*/				
		var yScale = d3.scale.linear()
								.domain([(d3.min(boxplot_data, function(d) { return d.minimum;})),
								(d3.max(boxplot_data, function(d) { return d.maximum;}))])
								.range([h-padding_h, padding_h]);

		
		/*In case there is already a boxplot (refreshing, new y-variable), this will delete the old plot.*/
	    d3.selectAll("line").remove();
	    d3.selectAll("rect").remove();
		d3.selectAll("circle").remove();			
		d3.selectAll(".axis").remove();						
		
		/*First up the boxes: Reaching from the 0.25-quantile to the 0.75-quantile. For the x-axis, the middle of the box
		should be at the visit, so the x-value that is passed (which indicates the left side) has to be a bit smaller (and
		the width twice this distance from the visit)*/
		svg.selectAll("rect")
			   .data(boxplot_data)
			   .enter()
			   .append("rect")
			   .attr("x",function(d) {
					/*xScale(1) is exactly the distance between 2 visits (since they increment in steps of 1.
					I decided to use half the distance as the width of the box (xScale(1)/2). This means that
					we have to put the x-value (the left side of the box) at half this width from the visit
					(xScale(1)/4).*/
					return xScale(d['visit']) - xScale(1)/4;
					})			
			   .attr("y",function(d){
					return yScale(d.quartile_3);
				})			
			   .attr("height",function(d) {
					return yScale(d.quartile_1)-yScale(d.quartile_3);
					})			
			   .attr("width",xScale(1)/2)
			   .attr("class","box");	
		
		/*The lines are drawn seperately (middle line and whiskers up and down). Note that you have to select a class of 
		lines, otherwise you would use selectAll("line") several times in a row and change the data binding every time; this
		would result in only the last lines being drawn.*/
		svg.selectAll("line.center.line")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d) {
					return xScale(d['visit']);
					})			
			   .attr("y1",function(d){
					return yScale(d.minimum);
				})			
			   .attr("x2",function(d,i) {
					return xScale(d['visit']);
					})			
			   .attr("y2",function(d){
					return yScale(d.maximum);	
				})
				.attr("class","line");
			
			/*Draws the lower whiskers.*/			
			svg.selectAll("line.whiskers.down.line")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d) {
					return xScale(d['visit']) - xScale(1)/8;
					})			
			   .attr("y1",function(d){
					return yScale(d.minimum);
				})			
			   .attr("x2",function(d,i) {
					return xScale(d['visit']) + xScale(1)/8;
					})			
			   .attr("y2",function(d){
					return yScale(d.minimum);			
				})
				.attr("class","line");


				/*Draws the upper whiskers.*/			
			svg.selectAll("line.whiskers.up.line")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d) {
					return xScale(d['visit']) - xScale(1)/8;
					})			
			   .attr("y1",function(d){
					return yScale(d.maximum);
				})			
			   .attr("x2",function(d) {
					return xScale(d['visit']) + xScale(1)/8;
					})			
			   .attr("y2",function(d){
					return yScale(d.maximum);
				})
				.attr("class","line");			
        
		
				/*Quite straightforward: x-axis and y-axis*/
				var xAxis = d3.svg.axis()
									.scale(xScale)
									.orient("bottom");
				
				svg.append("g")
					    .attr("class", "axis")
						.attr("transform", "translate(0," + (h - padding_h + 20) + ")")
						.call(xAxis);
						
				var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left");

				svg.append("g")
					    .attr("class", "axis")
						.attr("transform", "translate(" + (padding_w - 20) + ",0)")
						.call(yAxis);	


				/*This will show all the data points on top of the boxplot. This implementation is not so ideal:
				by default these points are drawn but with a radius of 0 to make them invisible. Using the "Show 
				datapoints" button will change the radius and make them visible*/	
				points = svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx",function(d) {
					/*Creating a jitter effect with adding a random number*/
					return xScale(d['visit']) + (Math.random()-0.5)*5;
					})			
			   .attr("cy",function(d){
					return yScale(d[yVar]);
					})			
			   .attr("r",0)
			   .attr("class","datapoints")
			   .attr("fill","steelBlue")
			   /*This allows to define a function that is run when one of the points is clicked on: In this case, change the 
			   color to red.*/
			   .on("click", function() {
					d3.select(this).attr("fill", "red");
				})
			   /*This allows to define a function that is run when one of the points is double-clicked on: In this case, change the 
			   color back to steelblue.*/
				.on("dblclick",  function() {d3.select(this).attr("fill", "steelBlue")});
									
}