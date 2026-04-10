import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 5 },
    { duration: '30s', target: 10 },
    { duration: '30s', target: 20 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1200'],
    http_req_failed: ['rate<0.30'],
  },
};

export default function () {
  const apiRes = http.get(`${__ENV.BASE_URL}/api`);
  check(apiRes, {
    'API status is 200 or 500': (r) => r.status === 200 || r.status === 500,
  });

  const metricsRes = http.get(`${__ENV.BASE_URL}/metrics`);
  check(metricsRes, {
    'Metrics status is 200': (r) => r.status === 200,
  });

  const healthRes = http.get(`${__ENV.BASE_URL}/health`);
  check(healthRes, {
    'Health status is 200': (r) => r.status === 200,
  });

  sleep(1);
}