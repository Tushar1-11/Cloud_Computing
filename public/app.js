const responseBox = document.getElementById('responseBox');

const totalRequests = document.getElementById('totalRequests');
const successRequests = document.getElementById('successRequests');
const failedRequests = document.getElementById('failedRequests');
const avgDelay = document.getElementById('avgDelay');
const lastDelay = document.getElementById('lastDelay');
const uptime = document.getElementById('uptime');

document.getElementById('testApiBtn').addEventListener('click', testApi);
document.getElementById('refreshMetricsBtn').addEventListener('click', loadMetrics);
document.getElementById('healthBtn').addEventListener('click', checkHealth);

async function testApi() {
  responseBox.textContent = 'Testing API...';

  try {
    const res = await fetch('/api');
    const data = await res.json();

    responseBox.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    responseBox.textContent = `Error: ${error.message}`;
  }

  loadMetrics();
}

async function loadMetrics() {
  try {
    const res = await fetch('/metrics');
    const data = await res.json();

    totalRequests.textContent = data.totalRequests;
    successRequests.textContent = data.successRequests;
    failedRequests.textContent = data.failedRequests;
    avgDelay.textContent = `${data.avgDelay} ms`;
    lastDelay.textContent = `${data.lastDelay} ms`;
    uptime.textContent = `${data.uptime} s`;
  } catch (error) {
    responseBox.textContent = `Metrics error: ${error.message}`;
  }
}

async function checkHealth() {
  try {
    const res = await fetch('/health');
    const data = await res.json();

    responseBox.textContent = `Health Check:\n${JSON.stringify(data, null, 2)}`;
  } catch (error) {
    responseBox.textContent = `Health error: ${error.message}`;
  }
}

loadMetrics();
setInterval(loadMetrics, 3000);