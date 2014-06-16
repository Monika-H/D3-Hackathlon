drawBoxPlot = function(data,svg) {

		var	keys = Object.keys(data)
		var boxplot_data = [];

		for (var index = 0; index < data[keys[1]].length; index++) {
			object = {
				visit: d3.max(data.map(function(d){ return d[index][xVar];})),
				maximum: d3.max(data.map(function(d){ return d[index][yVar];})),
				minimum: d3.min(data.map(function(d){ return d[index][yVar];})),
				median: d3.median(data.map(function(d){ return d[index][yVar];})),
				quartile_1: d3.quantile(d3.values(data.map(function(d){ return d[index][yVar];})).sort(d3.ascending),0.25),
				quartile_3: d3.quantile(d3.values(data.map(function(d){ return d[index][yVar];})).sort(d3.ascending),0.75)
				}
			boxplot_data.push(object);				
		}
		
		w = 600
		padding_w = 50 
		h = 400
		padding_h = 20
			
		var xScale = d3.scale.linear()
						.domain([d3.min(boxplot_data, function(d) { return d[xVar];}),(d3.max(boxplot_data, function(d) { return d[xVar];}))])
						.range([padding_w, w-padding_w]);

		var yScale = d3.scale.linear()
								.domain([d3.min(boxplot_data, function(d) { return d.minimum;}),d3.max(boxplot_data, function(d) { return d.maximum;})])
								.range([h-padding_h, padding_h]);

		svg.selectAll("rect")
			   .data(boxplot_data)
			   .enter()
			   .append("rect")
			   .attr("x",function(d) {
					return xScale(xVar);
					})			
			   .attr("y",function(d){
					return yScale(d.quartile_1);
				})			
			   .attr("height",function(d) {
					return yScale(d.quartile_1)-yScale(d.quartile_3);
					})			
			   .attr("width",xScale(0.5))
			   .attr("class","box");	
					
		svg.selectAll("line.center")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d) {
					return xScale(xVar) + xScale(0.5)/2;
					})			
			   .attr("y1",function(d){
					return yScale(d.minimum);
				})			
			   .attr("x2",function(d,i) {
					return xScale(xVar) + xScale(0.5)/2;
					})			
			   .attr("y2",function(d){
					return yScale(d.maximum);
				})
				
			svg.selectAll("line.whiskers.down")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d) {
					return xScale(xVar) + xScale(0.5)/3;
					})			
			   .attr("y1",function(d){
					return yScale(d.minimum);
				})			
			   .attr("x2",function(d,i) {
					return xScale(xVar) + xScale(0.5)*2/3;
					})			
			   .attr("y2",function(d){
					return yScale(d.minimum);
				})

			svg.selectAll("line.whiskers.up")
			   .data(boxplot_data)
			   .enter()
			   .append("line")
			   .attr("x1",function(d,i) {
					return xScale(i) + xScale(0.5)/3;
					})			
			   .attr("y1",function(d){
					return yScale(d.maximum);
				})			
			   .attr("x2",function(d,i) {
					return xScale(i) + xScale(0.5)*2/3;
					})			
			   .attr("y2",function(d){
					return yScale(d.maximum);
				})
								

}