const { exec } = require('child_process');

let vus = 10;

setInterval(() => {
    vus += 10;

    console.log("Increasing load to:", vus);

    exec(`k6 run --vus ${vus} --duration 20s loadtest.js`,
        (err, stdout, stderr) => {
            console.log(stdout);
        });

}, 30000);