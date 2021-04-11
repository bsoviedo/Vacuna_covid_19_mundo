const map= L.map('map', { zoomControl: false, scrollWheelZoom: false }).setView([0, 0 ], 2.4);

// Documentación API trackeo de vacunación https://documenter.getpostman.com/view/14021091/TzCJgVTT?fbclid=IwAR0Dzn0jIYZt-PkTjhA4EAI_nQNjhkBSDY5kWr8gUFt2_UTbcyJ6S8gWpK0 

//acá se lee el layer del geojson
const country= [];
const covid_vaccine= [];

async function onEachFeature (feature, layer) {
  const search= feature.properties.name;
  

  const res= await fetch(`https://api.thecovidvaccines.com/api/v1/countries/${search}`); 
  const data= await res.json();
  const vaccine= data.data

  covid_vaccine.push(vaccine);
  country.push(data.countryName)

  layer.on('click', function (e) { //Creamos una función que nos llama con "onClick" al DIV que creemos 
    if (typeof (vaccine) == 'undefined'){  //Si no hay datos, pone en el DIV el texto
      document.getElementById("info").innerHTML=  " <h1 style='text-align:center;'>" + search + "</h1> <br>" + '<h2 style="text-align:center;" > No hay datos disponibles<h2> ';

      $("#feature_infos").stop();       //Esto, usando Jquery se pone para que aparezca y desaparezca el div
      $("#feature_infos").fadeIn("fast");
      $("#feature_infos").fadeOut(10000);
    
    }
    else{
      document.getElementById("info").innerHTML = " <h1 style='text-align:center;'>" + search + "</h1>" +
      "<table border=1> <tr> <td> Vacunados del día    <td>" + "<td>"+ vaccine[0].daily_vaccinations +" </td> </tr> " +
    "<tr> <td> Fecha última actualización <td>" + "<td>"+ vaccine[0].date + "</td> </tr> " +
    " <tr> <td> Total vacunados <td>" + "<td>" + vaccine[0].people_vaccinated + "</td> </tr> " +
    "<tr> <td> Vacunados por cada 100 Habitantes <td>" + "<td>" + vaccine[0].people_vaccinated_per_hundred + "</td> </tr>  </table>" ;

    $("#feature_infos").stop();
    $("#feature_infos").fadeIn("fast");
    $("#feature_infos").fadeOut(10000); 
  }
  });

}
function myStyle(){
  return{
    color: "green"
  }

} 


L.geoJson(data,{
    onEachFeature: onEachFeature,
    style: myStyle
  }).addTo(map);
