var urlTotal="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",
    urlRecu="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv",
    urlActivos="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_activos.csv",
    urlMuertes="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_muertes.csv",
    urlNuevos="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_nuevos.csv";

var viewportWidth = $(window).width();
var viewportHeight = $(window).height()/2;
var width = viewportWidth * .97;
var height = width/1.85;

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

//Define map projection
var projection = d3.geo.mercator()
                       .center([-100, 22])
                       .scale([width/3.5])
 		                   .translate([width/1,height*1.4]);

//Define path generator
var path = d3.geo.path().projection(projection);

var svg = d3.select("#mapa")
  .append("svg")
  .attr("width",width)
  .attr("height",height);

 d3.json("https://raw.githubusercontent.com/vidaleando/COVID-19/master/assets/javascript/mexico.json", function(json) {


	//draw map
	var map = svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", "#3498db")
    .on("mouseover", hover);
 	})


d3.select(window).on('resize', resize);

function resize() {

    width = parseInt(d3.select('#mapa').style('width'));
    width = $(window).width() * .97;
    height = width/1.85;

   projection
    	.scale([width/3.5])
   		.translate([width/1,height*1.4]);


   d3.select("#mapa").attr("width",width).attr("height",height);
   d3.select("svg").attr("width",width).attr("height",height);

   d3.selectAll("path").attr('d', path);


}
