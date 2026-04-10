require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let stats = {
  totalRequests: 0,
  successRequests: 0,
  failedRequests: 0,
  avgDelay: 0,
  lastDelay: 0,
};

app.get('/api', (req, res) => {
  const delay = Math.floor(Math.random() * 400) + 100;
  const shouldFail = false;

  setTimeout(() => {
    stats.totalRequests++;
    stats.lastDelay = delay;
    stats.avgDelay =
      ((stats.avgDelay * (stats.totalRequests - 1)) + delay) / stats.totalRequests;

    if (shouldFail) {
      stats.failedRequests++;
      return res.status(500).json({
        status: 'error',
        message: 'Simulated failure',
        delay,
      });
    }

    stats.successRequests++;
    res.json({
      status: 'success',
      message: 'API working',
      delay,
    });
  }, delay);
});

app.get('/metrics', (req, res) => {
  res.json({
    totalRequests: stats.totalRequests,
    successRequests: stats.successRequests,
    failedRequests: stats.failedRequests,
    avgDelay: Number(stats.avgDelay.toFixed(2)),
    lastDelay: stats.lastDelay,
    uptime: Number(process.uptime().toFixed(2)),
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});