const doWorkCallback = (callback) => {
    console.log('doWorkCallback called');
    setTimeout(() => {
        callback('My Error', undefined);
        callback(undefined, 'Result');
    }, 2000);
};

doWorkCallback((error, result) => {
    if (error )
        return  console.error('Error happened during I/O operation' + error);
    
    console.log('Do something after function executed' + result);
});