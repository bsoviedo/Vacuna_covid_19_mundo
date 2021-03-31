
const map= L.map('map', { zoomControl: false }).setView([0, 0 ], 2.4);

// Documentación API trackeo de vacunación https://documenter.getpostman.com/view/14021091/TzCJgVTT?fbclid=IwAR0Dzn0jIYZt-PkTjhA4EAI_nQNjhkBSDY5kWr8gUFt2_UTbcyJ6S8gWpK0 

//acá se lee el layer del geojson

const covid_vaccine= [];

async function onEachFeature (feature, layer) {
  const search= feature.properties.name;

  const res= await fetch(`https://api.thecovidvaccines.com/api/v1/countries/${search}`);
  const data= await res.json();
  const vaccine= data.data


  if (typeof (vaccine) == 'undefined'){
    console.log('err')
    layer.bindPopup('No hay datos disponibles');
   
  }
  else{
     layer.bindPopup(
      "<h1>" + search + "</h1>" +
      "Vacunados del día = " + vaccine[0].daily_vaccinations +"<br>" +
    "Fecha última actualización= " + vaccine[0].date + "<br>" +
    "Total vacunados= " + vaccine[0].people_vaccinated + "<br>" +
    "Vacunados por cada 100 Habitantes= " + vaccine[0].people_vaccinated_per_hundred + "<br>" 
    ); 

    covid_vaccine.push(data);
  }
}



console.log(covid_vaccine);



  L.geoJson(data,{
    onEachFeature: onEachFeature
  }).addTo(map);
