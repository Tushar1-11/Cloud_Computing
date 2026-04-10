import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 5 },
    { duration: '40s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/api`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}