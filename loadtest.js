import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { target: 700, duration: '10s' },
    { target: 700, duration: '30s' },

  ],
  thresholds: {
    errors: ['rate<0.01'],
    'failed requests': ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};


export default function () {
  const id = Math.floor(Math.random() * 9999999) + 9000000;
  const url = `http://localhost:3003/api/rooms/${id}/save`;
  const headers = {'Content-Type': 'application/json'};
  const payload = JSON.stringify({listName: 'beach vacation homes', saved: 1});
  const response = http.post(url, payload, {headers: headers});
  sleep(1);
}