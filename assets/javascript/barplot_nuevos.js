// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var urlNuevos = "https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_nuevos.csv";

var widthBar = 6;

var tip = d3.select("#grafica_totales").append("div")
    .attr("class", "tip")
    .style("opacity", 0);

// append the svg object to the body of the page
var svgBar = d3.select("#barplot_nuevos")
  .append("svg")
  .attr("width","460")
  .attr("height","430")
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv(urlNuevos, function(data) {

  data.forEach(function(d) {
             d.Fecha = new Date(d.Fecha);
             d.México = +d.México;
          });

  // X axis
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  //today = mm + '/' + dd + '/' + yyyy;


  var mindate = new Date(2020,1,28);

  // Add X axis --> it is a date format
  var x = d3.scaleTime()
            .domain([mindate,today])
            .range([ 0, width ]);

  svgBar.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class","graph_date")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");

  // Add Y axis
  var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d){return d.México;  })])
            .range([ height, 0]);

  svgBar.append("g")
        .call(d3.axisLeft(y));

  // Bars
  var bar = svgBar.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(+d.Fecha) - widthBar/2; })
          //.attr("y", function(d) { return y(+d.Mexico_pais); })
          .attr("width", widthBar)
          //.attr("height", function(d) { return height - y(+d.Mexico_pais); })
          .attr("fill", '#1f9bcf')
          // no bar at the beginning thus:
          .attr("height", function(d) { return height - y(0); }) // always equal to 0
          .attr("y", function(d) { return y(0); })
          .on("mouseover", function(d) {
              tip.transition()
                  .duration(200)
                  .style("opacity", 0.9);
              tip.html("<h6>" + formatDay(d.Fecha) + "/" + formatMonth(d.Fecha) + "</h6>"+ " <p class='text-primary'>"  + d.México + "</p>")
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
              //.style("opacity", 0.2)
              })
          .on("mouseout", function(d) {
              tip.transition()
                  .duration(500)
                  .style("opacity", 0);
                //.style("opacity", 0.8)
          });

  // Animation
  svgBar.selectAll("rect")
  .transition()
  .duration(400)
  .attr("y", function(d) { return y(+d.México); })
  .attr("height", function(d) { return height - y(+d.México); })
  .delay(function(d,i){console.log(i) ; return(i*100)})


})
