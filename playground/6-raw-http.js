const http = require('http');

const url = `http://api.weatherstack.com/current?access_key=83feab2a74815c77e3bc05ec4ddb999d&query==6.134762,1.271563`;

const request =  http.request(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    res.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);  
    });
});

request.on('error', (err) => {
    console.log('An error', err);
});

request.end();