
// SUMMON
// URL
var urlTotal="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_totales.csv",
   urlRecu="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_recuperados.csv",
   urlActivos="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_activos.csv",
   urlMuertes="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_muertes.csv",
   urlNuevos="https://raw.githubusercontent.com/LeonardoCastro/COVID19-Mexico/master/data/series_tiempo/covid19_mex_casos_nuevos.csv";

//totales
d3.csv(urlTotal,function(data) {
  var largo = data.length;
  var tope =largo-1;
  var div = document.getElementById('totales');
     div.innerHTML = data[tope]["Mexico_pais"];
  });

d3.csv(urlRecu,function(data) {
  var largo = data.length;
  var tope =largo-1;
  var div = document.getElementById('recuperados');
      div.innerHTML = data[tope]["Mexico_pais"];
  });

d3.csv(urlActivos,function(data) {
  var largo = data.length;
  var tope =largo-1;
  var div = document.getElementById('activos');
      div.innerHTML = data[tope]["Mexico_pais"];
  });

d3.csv(urlMuertes,function(data) {
  var largo = data.length;
  var tope =largo-1;
  var div = document.getElementById('muertes');
      div.innerHTML = data[tope]["Mexico_pais"];
  });

d3.csv(urlNuevos,function(data) {
  var largo = data.length;
  var tope =largo-1;
  var div = document.getElementById('nuevos');
      div.innerHTML = data[tope]["Mexico_pais"];
  });

/*
 function resta(){
 	var tot = document.getElementById('totales').innerHTML,
 		rec = document.getElementById('recu').innerHTML;
 document.getElementById('activos').innerHTML =+tot-rec ;
 var  adjust = window.screen;
    $('#mapa').scrollLeft(adjust/2);
 }
*/
//window.innerWidth;
