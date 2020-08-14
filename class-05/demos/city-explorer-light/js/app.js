'use strict';


/*
Fake form

- event listener fires an event handler
- populate and render page
  - city name
  - map
  - list of restaurants

-- request 1 --
$.get - retrieve the city data (name, lat, lng)

-- request 2 --
$.get - use lat, lng, to ask for restaurants
change the src of an empty img to be the correct map

*/



$('form').on('submit', function (event) {

  event.preventDefault();

  const cityValueJQ = $('input:nth-child(2)').val();
  console.log(cityValueJQ);

  const options = {
    method: 'get',
    dataType: 'json',
    data: { city : cityValueJQ }
  };

  $.ajax('fake-data/location.json', options)

    .then(dataFromFile => {

      const lat = dataFromFile.latitude;
      const lng = dataFromFile.longitude;
      const mapSrc = `images/maplat=${lat}&lng=${lng}.png`;

      console.log(lat,lng,mapSrc);
      $('img').attr('src', mapSrc);

      const restOptions = {
        method: 'get',
        dataType: 'json',
        data: dataFromFile
      };

      $.ajax('fake-data/restaurants.json', restOptions)
        .then(renderRests);

    });



});


function renderRests(restData){\
  restData.forEach(restaurant => {
    $('main').append(Mustache.render( $('#template').html() , restaurant));
  });
}



