'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];


function Rentalprice(rentals , cars){ // Function generate the price for each driver
  var priceDay = 0;
  var priceDist = 0 ;
  var commission =0;

    for (var i = 0 ; i< rentals.length ; i++){
      for (var j = 0 ; j < cars.length ; j++){
        if(cars[j].id == rentals[i].carId){
            priceDay = cars[i].pricePerDay;
            priceDist = cars[i].pricePerKm;
          }


      var date = (( new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate) )/86400000)+1;
      var time = priceDay*date;
      var distance =  priceDist * rentals[i].distance;

      

      if (date<2) 
        { rentals[i].price =  time + distance; 
      }

      else if(1<date<5){
        rentals[i].price = (time*0.9) + distance ;
      }

      else if(4<date<9){
        rentals[i].price = (time  * 0.7) + distance ;
      }

      else if(10<date){
        rentals[i].price = ( time * 0.5) + distance ;
      }


      commission = (30* rentals[i].price) / 100; // exercise 3
rentals[i].commission.assistance = date;
rentals[i].commission.insurance = commission / 2;
rentals[i].commission.drivy = commission - rentals[i].commission.assistance - rentals[i].commission.insurance;


if(rentals[i].options.deductibleReduction){
  rentals[i].price = rentals[i].price + (4*date);
  var deductible = rentals[i].price;
}

    }
  }
}






//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];


 function payActors(rentals){
    for(var i=0; i < actors.length; i++){
      for (var j = 0 ; j < rentals.length ; j++){
        if(rentals[j].id == actors[i].rentalId)
          { 

          	var date1 = (( new Date(rentals[j].returnDate) - new Date(rentals[j].pickupDate) )/86400000)+1;
          	var deductible =0; 
          
            if(rentals[j].options.deductibleReduction){
               deductible = (4*date1);
             }


            for(var k=0; k <actors[i].payment.length ;k++){

            if(actors[i].payment[k].who == "driver")
               actors[i].payment[k].amount = rentals[i].price;
            if(actors[i].payment[k].who == "owner")
             actors[i].payment[k].amount = Math.round((rentals[i].price - deductible) * 0.7 ) ;
            if(actors[i].payment[k].who == "insurance")
              actors[i].payment[k].amount = rentals[i].commission.insurance;
            if(actors[i].payment[k].who == "assistance")
             actors[i].payment[k].amount = rentals[i].commission.assistance;
            if(actors[i].payment[k].who == "drivy")
            actors[i].payment[k].amount = rentals[i].commission.drivy + deductible ;
 }
       
}

}
}
}



//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];



function modif(rentals){
	for(var i=0; i<rentalModifications.length; i++){
			for(var k=0; k< rentals.length; k++){
				if(rentalModifications[i].rentalId == rentals[k].id){

					if( typeof rentalModifications[i].returnDate != "undefined"){
					rentals[k].returnDate = rentalModifications[i].returnDate;
				}

				if(typeof rentalModifications[i].pickupDate != "undefined"){
					rentals[k].pickupDate = rentalModifications[i].pickupDate;
				}

				if(typeof rentalModifications[i].distance != "undefined"){
					rentals[k].distance = rentalModifications[i].distance;
				}
			}
		}

}
}

Rentalprice(rentals,cars);

modif(rentals);

payActors(rentals);

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
