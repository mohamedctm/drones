exports.data = data;
const fs = require('fs');


function data(arr) {
  const source = __dirname + '/../inputs/data.txt';
  const readStream = fs.createReadStream(source, {encoding: 'utf-8'});
  
  readStream.on('error', arr);

  readStream.on('data', function(data) {
    const lines = data.split('\n');

    if (lines.length <1) {
      arr(null, [], []);
    }

    const drones = lines[0].split(',').
          reduce((name1, cap1, name2) => {
            return name1.concat(
              (name2%2) ? 
                  ((drone) => {
                    drone.capacity = cap1;
                                return drone;
                  })(name1.pop()) : { name: cap1 } 
            );
          }, []);
          if (lines.length <2) {
            arr(null, drones, []);
          }

    const locations = lines.slice(1).
          filter(item => item).
          map(item => {
            return item.split(',').
              reduce((name, weight) => ({
                name: name,
                weight: weight
              }));
          });

    arr(null, drones, locations);
  })
}

