const responseBox = document.getElementById("responseBox");

const totalRequests = document.getElementById("totalRequests");
const successRequests = document.getElementById("successRequests");
const failedRequests = document.getElementById("failedRequests");
const avgDelay = document.getElementById("avgDelay");
const lastDelay = document.getElementById("lastDelay");
const failureRate = document.getElementById("failureRate");
const uptime = document.getElementById("uptime");
const lastStatus = document.getElementById("lastStatus");

document.getElementById("testApiBtn").addEventListener("click", testApi);
document.getElementById("refreshBtn").addEventListener("click", loadMetrics);
document.getElementById("healthBtn").addEventListener("click", checkHealth);

async function testApi() {
  responseBox.textContent = "Testing API...";
  try {
    const res = await fetch("/api");
    const data = await res.json();
    responseBox.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    responseBox.textContent = `API Error: ${error.message}`;
  }
  loadMetrics();
}

async function loadMetrics() {
  try {
    const res = await fetch("/metrics");
    const data = await res.json();

    totalRequests.textContent = data.totalRequests;
    successRequests.textContent = data.successRequests;
    failedRequests.textContent = data.failedRequests;
    avgDelay.textContent = `${data.avgDelay} ms`;
    lastDelay.textContent = `${data.lastDelay} ms`;
    failureRate.textContent = `${data.failureRate}%`;
    uptime.textContent = `${data.uptime} s`;
    lastStatus.textContent = data.lastStatus;
  } catch (error) {
    responseBox.textContent = `Metrics Error: ${error.message}`;
  }
}

async function checkHealth() {
  responseBox.textContent = "Checking health...";
  try {
    const res = await fetch("/health");
    const data = await res.json();
    responseBox.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    responseBox.textContent = `Health Error: ${error.message}`;
  }
}

loadMetrics();
setInterval(loadMetrics, 3000);