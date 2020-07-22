import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    // { target: 200, duration: '10s' },
    // { target: 200, duration: '30s' },
    // { target: 250, duration: '10s' },
    // { target: 250, duration: '1m' },
    // { target: 400, duration: '10s' },
    // { target: 400, duration: '30s' },
    // { target: 500, duration: '10s' },
    // { target: 500, duration: '30s' }, 
    { target: 700, duration: '10s' },
    { target: 700, duration: '30s' },

  ],
  thresholds: {
    errors: ['rate<0.01'],
    'failed requests': ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

// export default function () {
//   const id = Math.floor(Math.random() * 9999999) + 9500000;
//   // for (let i = 0; i < 10; i++) {
//   const url = `http://localhost:3003/api/rooms/${id}/photos`;
//   http.get(url);
//   // }
//   sleep(1);
// }


export default function () {
  const id = Math.floor(Math.random() * 9999999) + 9000000;
  const url = `http://localhost:3003/api/rooms/${id}/save`;
  const headers = {'Content-Type': 'application/json'};
  const payload = JSON.stringify({listName: 'beach vacation homes', saved: 1});
  const response = http.post(url, payload, {headers: headers});
  sleep(1);
} 