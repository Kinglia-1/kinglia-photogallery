import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    // { target: 100, duration: '1m' },
    // { target: 500, duration: '1m' },
    // { target: 200, duration: '10s' },
    { target: 2000, duration: '10s' },
    // { target: 4000, duration: '30s' },
  ],
  thresholds: {
    errors: ['rate<0.01'],
    'failed requests': ['rate<0.1'], // <10% errors
  },
};

export default function () {
  // for (let i = 0; i < 20; i++) {
  const roomId = Math.floor(Math.random() * (10000000 - 1)) + 1;
  const url = `http://localhost:3003/api/rooms/9000000/photos`;
  const res = http.get(url);
  check(res, {
    'is status 200': r => r.status === 200,
  });

  sleep(1);
}
