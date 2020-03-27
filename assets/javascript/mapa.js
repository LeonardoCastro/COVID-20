//set dimensions
 var urlTotal="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",
     urlRecu="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv",
     urlActivos="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_activos.csv",
     urlMuertes="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_muertes.csv",
     urlNuevos="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_nuevos.csv";

 var width = $(".page-content").width(); //map.node().getBoundingClientRect().width;
 var height = width / 2;

 var navMap = d3.select("#mapa").append("div")
     .attr("class", "nav_map")
     .style("opacity", 0);

var hover = function(d) {
      var div = document.getElementById('tooltip');
      div.innerHTML = d.properties.name;
      var selector =div.innerHTML ;
      d3.csv(urlTotal,function(data) {
          var largo = data.length;
          var tope =largo-1;
          var tot = document.getElementById('col_tot');
              tot.innerHTML = data[tope][div.innerHTML];
      });
      d3.csv(urlRecu,function(data) {
          var largo = data.length;
          var tope =largo-1;
          var recu = document.getElementById('col_recu');
              recu.innerHTML = data[tope][div.innerHTML];
      });
      d3.csv(urlActivos,function(data) {
          var largo = data.length;
          var tope =largo-1;
          var activos = document.getElementById('col_act');
              activos.innerHTML = data[tope][div.innerHTML];
      });
      d3.csv(urlMuertes,function(data) {
          var largo = data.length;
          var tope =largo-1;
          var muertes = document.getElementById('col_muertes');
              muertes.innerHTML = data[tope][div.innerHTML];
      });
      d3.csv(urlNuevos,function(data) {
          var largo = data.length;
          var tope =largo-1;
          var nuevos = document.getElementById('col_nuevos');
              nuevos.innerHTML = data[tope][div.innerHTML];
      });
      console.log(document.getElementById('col_tot').innerHTML - document.getElementById('col_recu').innerHTML);
      var finalTot = document.getElementById('col_tot');
      var finalRecu = document.getElementById('col_recu');
      var act = document.getElementById('col_act');
      act.innerHTML = +finalTot.innerHTML - recu.innerHTML;
};



  //define projection
var projection = d3.geoMercator()
                    .center([-100, 22])
                    .translate([width / 1.85, height / 1.7])
                    .scale([width / .7]);

// projection.center.scrollIntoView();

//define path generator
var path = d3.geoPath()
             .projection(projection);

//svg
var mapSvg = d3.select("#mapa")
               .append("svg")
                .attr("width", width)
                .attr("height", height);

//load GeoJson data
d3.json("https://raw.githubusercontent.com/LeonardoCastro/COVID-20/master/assets/javascript/mexico.geojson", function(json) {
    feat = json.features;
    console.log(feat[0]["properties"]["name"]);
    // bind data
    mapSvg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        //.on("mouseover", hover);
        .on("mouseover", function(d) {
          d.properties.updated_at = new Date(d.properties.updated_at) ;
          formatMonth = d3.timeFormat("%b"), //%m
          formatDay = d3.timeFormat("%d"),
          formatHour=d3.timeFormat("%H"),
          formatMin=d3.timeFormat("%M");
          navMap.transition()
                .duration(200)
                .style("opacity", .9);
          navMap.html("<h6>" + d.properties.name + "</h6>"+ "<p class='text-danger'> Totales: "
                      + d.properties.totales + "</p>" + "<p class='text-warning'> <span style='color:#fd7e14 !important;'>Nuevos (ultimas 24h): "
                      + d.properties.nuevos + "</span></p>"+"<p class='text-primary'> Muertes: " + d.properties.muertes + "</p>"
                      +"<p><small>Actualizado el: "+formatDay(d.properties.updated_at)+ "/"+formatMonth(d.properties.updated_at)+
                      " @ "+formatHour(d.properties.updated_at)+":"+formatMin(d.properties.updated_at)+ "</small></p>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            navMap.transition()
                .duration(500)
                .style("opacity", 0);
        });
});


d3.select(window).on('resize', resize);

function resize() {

    width = parseInt(d3.select('#mapa').style('width'));
    width = $(window).width() * .95;
    height = width/1.85;

   projection
    	.scale([width/.7])
   		.translate([width/1.7,height/1.7]);


   d3.select("#mapa").attr("width",width).attr("height",height);
   d3.select("Mapsvg").attr("width",width).attr("height",height);

   d3.selectAll("path").attr('d', path);


}
