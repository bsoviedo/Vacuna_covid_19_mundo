
const map= L.map('map', { zoomControl: false, scrollWheelZoom: false }).setView([0, 0 ], 2.4);

// Documentación API trackeo de vacunación https://documenter.getpostman.com/view/14021091/TzCJgVTT?fbclid=IwAR0Dzn0jIYZt-PkTjhA4EAI_nQNjhkBSDY5kWr8gUFt2_UTbcyJ6S8gWpK0 

//acá se lee el layer del geojson

const covid_vaccine= [];

async function onEachFeature (feature, layer) {
  const search= feature.properties.name;

  const res= await fetch(`https://api.thecovidvaccines.com/api/v1/countries/${search}`); 
  const data= await res.json();
  const vaccine= data.data


  var div = L.DomUtil.create('div', 'highchart');


  layer.on('click', function (e) {
    if (typeof (vaccine) == 'undefined'){
      document.getElementById("info").innerHTML=  " <h1>" + search + "</h1> <br>" + '<h2> No hay datos disponibles<h2> '
    }
    else{
      document.getElementById("info").innerHTML = " <h1>" + search + "</h1>" +
      "<table border=1> <tr> <td> Vacunados del día    <td>" + "<td>"+ vaccine[0].daily_vaccinations +" </td> </tr> " +
    "<tr> <td> Fecha última actualización <td>" + "<td>"+ vaccine[0].date + "</td> </tr> " +
    " <tr> <td> Total vacunados <td>" + "<td>" + vaccine[0].people_vaccinated + "</td> </tr> " +
    "<tr> <td> Vacunados por cada 100 Habitantes <td>" + "<td>" + vaccine[0].people_vaccinated_per_hundred + "</td> </tr>  </table>" ;
  }
    console.log(vaccine[0].date)


  });


}



console.log(covid_vaccine);



L.geoJson(data,{
    onEachFeature: onEachFeature
  }).addTo(map);
