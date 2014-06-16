drawBoxPlot = function() {

		var	keys = Object.keys(dataset)
		var boxplot_data = [];

		for (var index = 0; index < dataset[0].length; index++) {
			object = {
				visit: d3.min(dataset, function(d){ return d[index][xVar];}),
				maximum: d3.max(dataset,function(d) {return d[index][yVar]}),
				minimum: d3.min(dataset,function(d) {return d[index][yVar]}),
				median: d3.median(dataset,function(d) {return d[index][yVar]}),
				quartile_1: d3.quantile(dataset.map(function(d){ return d[index][yVar];}).sort(d3.ascending),0.25),
				quartile_3: d3.quantile(dataset.map(function(d){ return d[index][yVar];}).sort(d3.ascending),0.75)
				}
			boxplot_data.push(object);				
		}
		
		w = 600
		padding_w = 50 
		h = 400
		padding_h = 20
			
		var xScale = d3.scale.linear()
						.domain([0,(1+d3.max(boxplot_data, function(d) { return d[xVar];}))])
						.range([padding_w, w-padding_w]);

		var yScale = d3.scale.linear()
								.domain([d3.min(boxplot_data, function(d) { return d.minimum;}),d3.max(boxplot_data, function(d) { return d.maximum;})])
								.range([h-padding_h, padding_h]);

		svg_big.selectAll("rect")
			   .data(boxplot_data)
			   .enter()
			   .append("rect")
			   .attr("x",function(d) {
					return xScale(d[xVar]);
					})			
			   .attr("y",function(d){
					return yScale(d.quartile_3);
				})			
			   .attr("height",function(d) {
					return yScale(d.quartile_1)-yScale(d.quartile_3);
					})			
			   .attr("width",xScale(0.0))
			   .attr("class","box");	
					
		svg_big.selectAll("line.center.line")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d) {
					return xScale(d[xVar]) + xScale(0.5)/2;
					})			
			   .attr("y1",function(d){
					return yScale(d.minimum);
				})			
			   .attr("x2",function(d,i) {
					return xScale(d[xVar]) + xScale(0.5)/2;
					})			
			   .attr("y2",function(d){
					return yScale(d.maximum);	
				})
				.attr("class","line");
				
			svg_big.selectAll("line.whiskers.down.line")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d) {
					return xScale(d[xVar]) + xScale(0.5)/3;
					})			
			   .attr("y1",function(d){
					return yScale(d.minimum);
				})			
			   .attr("x2",function(d,i) {
					return xScale(d[xVar]) + xScale(0.5)*2/3;
					})			
			   .attr("y2",function(d){
					return yScale(d.minimum);			
				})
				.attr("class","line");

			svg_big.selectAll("line.whiskers.up.line")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d) {
					return xScale(d[xVar]) + xScale(0.5)/3;
					})			
			   .attr("y1",function(d){
					return yScale(d.maximum);
				})			
			   .attr("x2",function(d) {
					return xScale(d[xVar]) + xScale(0.5)*2/3;
					})			
			   .attr("y2",function(d){
					return yScale(d.maximum);
				})
				.attr("class","line");
								

}