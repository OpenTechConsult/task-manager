const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('IO operation running');
    }, 2000)
});

myPromise.then(result => console.log(result))