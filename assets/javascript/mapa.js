//set dimensions
 var urlTotal="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",
     urlRecu="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv",
     urlActivos="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_activos.csv",
     urlMuertes="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_muertes.csv",
     urlNuevos="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_nuevos.csv",

     width = 700,//(window).width()*.97,
     height = 400;//width/1.85;


//var viewportHeight = $(window).height()/2;
//var width = viewportWidth * .97;
//var height = width/1.85;

/*if ($(window).width()<500px) {
  viewportWidth = $(window).width();
}

if ($(window).width()<500px) {
  viewportHeight = viewportWidth/1.85;
} */
/*var  adjust = window.innerWidth;
$('#mapa').scrollLeft(adjust/2);*/

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
};
   /* console.log(selector);
var prueba = new Date(2020,2,21);
d3.csv("https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv")
  .row(function(d) { console.log({selector: d.prueba, value: +d.val}); }) //return {key: d.key, value: +d.value};
  .get(function(error, rows) {console.log(rows); });*/


//define projection
var projection = d3.geoMercator()
                   .center([-100, 22])
                   .translate([ width/1.7, height/1.7])
                   .scale([ width/.7 ]);

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
d3.json("https://raw.githubusercontent.com/vidaleando/COVID-19/master/assets/javascript/mexico.json", function(json) {
            // bind data
        mapSvg.selectAll("path")
              .data(json.features)
              .enter()
              .append("path")
              .attr("d", path)
              .on("mouseover", hover);
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
/*,function(data) {
                var parsedCSV = d3.csv.parseRows(data);
                console.log(parsedCSV);
                var container = d3.select("#tabla_mapa")
                    .append("table")

                    .selectAll("tr")
                        .data(parsedCSV).enter()
                        .append("tr")

                    .selectAll("td")
                        .data(function(d) { return d; }).enter()
                        .append("td")
                        .text(function(d) { return d; });
            });*/
