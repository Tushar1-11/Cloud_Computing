require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let stats = {
  totalRequests: 0,
  successRequests: 0,
  failedRequests: 0,
  avgDelay: 0,
  lastDelay: 0,
  lastStatus: "Idle",
};

function updateAverage(newDelay) {
  if (stats.totalRequests === 0) {
    stats.avgDelay = newDelay;
  } else {
    stats.avgDelay =
      ((stats.avgDelay * (stats.totalRequests - 1)) + newDelay) /
      stats.totalRequests;
  }
}

app.get("/api", (req, res) => {
  const delay = Math.floor(Math.random() * 900) + 100;
  const shouldFail = Math.random() < 0.08;

  setTimeout(() => {
    stats.totalRequests++;
    stats.lastDelay = delay;

    if (shouldFail) {
      stats.failedRequests++;
      stats.lastStatus = "Failed";
      updateAverage(delay);

      return res.status(500).json({
        status: "error",
        message: "Simulated overload/failure",
        delay,
        timestamp: new Date().toISOString(),
      });
    }

    stats.successRequests++;
    stats.lastStatus = "Success";
    updateAverage(delay);

    res.json({
      status: "success",
      message: "Request processed successfully",
      delay,
      timestamp: new Date().toISOString(),
    });
  }, delay);
});

app.get("/metrics", (req, res) => {
  const failureRate =
    stats.totalRequests === 0
      ? 0
      : ((stats.failedRequests / stats.totalRequests) * 100).toFixed(2);

  res.json({
    totalRequests: stats.totalRequests,
    successRequests: stats.successRequests,
    failedRequests: stats.failedRequests,
    avgDelay: Number(stats.avgDelay.toFixed(2)),
    lastDelay: stats.lastDelay,
    lastStatus: stats.lastStatus,
    failureRate: Number(failureRate),
    uptime: Number(process.uptime().toFixed(2)),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    serverTime: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});