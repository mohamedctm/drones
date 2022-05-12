const fetch = require('./data.js');
const droneSchedule = require('./droneSchedule.js');

fetch.data((err, drones, locations) => {
  if (err) { throw err; }
 
   let outPut =  droneSchedule.schedule(drones, locations);
   outPut.forEach((droneSchedule, n) => {
    console.log(`[Drone #${n+1} ${droneSchedule.drone.name}]`);
    droneSchedule.trips.forEach((trip, n) => {
      console.log(`trip #${n+1}:`);
      console.log(trip.map((location, n) => {
        return `location #${n+1} (${location.name})`;
      }).join(', '));
    });
    console.log('****');
  });
  
  console.log(drones.concat('locations:').concat(locations));

});
