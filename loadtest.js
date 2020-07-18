import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { target: 600, duration: '1s' },
    { target: 1000, duration: '1s' },
    { target: 2000, duration: '1s' },
    { target: 3000, duration: '1s' },
    { target: 3100, duration: '1s' },
    { target: 3100, duration: '30s' },

  ],
  thresholds: {
    errors: ['rate<0.01'],
    'failed requests': ['rate<0.1'],
  },
};

export default function () {
  // const id = Math.floor(Math.random() * 9999999) + 1;
  const url = 'http://localhost:3003/api/rooms/9000000/photos';
  http.get(url);
  sleep(1);
}
