import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    spike_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 5 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 50 },
        { duration: '5s', target: 5 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '2s',
    },
  },
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/api`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}