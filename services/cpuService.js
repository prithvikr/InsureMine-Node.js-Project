const os = require('os');
const osUtils = require('os-utils');

let isServerRestarting = false;

setInterval(() => {
  osUtils.cpuUsage((cpuUsage) => {
    console.log(`CPU Usage: ${cpuUsage * 100}%`);
    if (cpuUsage > 0.7 && !isServerRestarting) {
      console.log('CPU Usage exceeds 70%. Restarting server...');
      isServerRestarting = true;
      setTimeout(() => {
        process.exit(1); // Restart the server
      }, 1000); // Delay the restart by 1 second
    }
  });
}, 5000); // Check CPU usage every 5 seconds
