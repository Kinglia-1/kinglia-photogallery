import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { target: 200, duration: '10s' },
    { target: 200, duration: '30s' },
    // { target: 250, duration: '10s' },
    // { target: 250, duration: '1m' },
    // { target: 300, duration: '10s' },
    // { target: 300, duration: '1m' },
    // { target: 500, duration: '10s' },
    // { target: 500, duration: '30s' },

  ],
  thresholds: {
    errors: ['rate<0.01'],
    'failed requests': ['rate<0.01'],
    'http_req_duration': ['p(95)<200'],
  },
};

export default function () {
  // const id = Math.floor(Math.random() * 9999999) + 1;
  // for (let i = 0; i < 10; i++) {
  const url = 'http://localhost:3003/api/rooms/9000001/photos';
  http.get(url);
  // }
  sleep(1);
}
