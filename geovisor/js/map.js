
const map= L.map('map', { zoomControl: false }).setView([0, 0 ], 2.4);

//var base= L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',).addTo(map);

/*
var base= L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

base.addTo(map)*/

//acá se lee el layer del geojson






async function onEachFeature(feature, layer) {
        const search= feature.properties.name;

        const res= await fetch(`https://api.thecovidvaccines.com/api/v1/countries/${search}`);
        const data= await res.json();
        const vaccine= data.data

       

        if (typeof (vaccine) == 'undefined'){
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
         
        }
 
  
  };




 function MyStyle(feature){


  if (typeof (vaccine) == 'undefined'){
    console.log('holi, estoy indefinido')
  }
  else{
    console.log('holi, estoy definido')

   
  }



}  


  L.geoJson(data,{
    style: MyStyle,
    onEachFeature: onEachFeature,
  }).addTo(map);






