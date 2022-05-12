exports.schedule = schedule;

function schedule(drones, locations) {

  let resellers = locations.slice();
  let schedule = [];

  while(drones.length && resellers.length) {

     return schedule = drones.map(drone => {
      let DroneTrips = getTrips(drone, schedule);
      let assingedLocation = selectLocations(drone.capacity,resellers);

      if (assingedLocation.length) {
          resellers = resellers.filter(
          location => assingedLocation.every(assigned => !(assigned === location))
        );
        DroneTrips.push(assingedLocation);
      }

      return {
        drone: drone,
        trips: DroneTrips
      };
    });
  }
}

function getTrips(drone, schedule) {
  return schedule.reduce((trips, droneSchedule) => {
    return droneSchedule.drone === drone ? droneSchedule.trips : trips;
  }, []);
}

function selectLocations(capacity, locations) {
  const approved =  
  locations.reduce((assingedLocation, thisLocation, index) => {
    let Load = calculate(assingedLocation);
    let room = capacity - Load;
    if (thisLocation.weight < room && locations.length > 1) {
        let found = selectLocations(
          room - thisLocation.weight,
          locations.slice(index+1)
        );
        if (found.length) {
          return assingedLocation.concat(thisLocation, found);
        }
    } else if (thisLocation.weight <= room) {
      return assingedLocation.concat(thisLocation);
    }
    return assingedLocation;
  }, []);
  return approved;
}


function calculate(locations) {
  return locations.reduce((w, l) => {
    return w + l.weight;
  }, 0);
}

