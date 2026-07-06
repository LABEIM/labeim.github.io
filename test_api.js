const http = require('http');

const payload = {
  title: 'Test Event',
  category: 'Study Group',
  status: 'upcoming',
  event_date: '2026-07-05',
  description: 'Test description',
  link: '',
  image: ['data:image/jpeg;base64,' + 'A'.repeat(500000)], // 500KB image
  icon: 'fa-calendar',
  organizer: 'EIM',
  benefits: ['Test'],
  requirements: ['Test'],
  show_register: 1
};

const options = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/events',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`BODY: ${data}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(JSON.stringify(payload));
req.end();
