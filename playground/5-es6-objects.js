// Object property shorthand

const name = 'Andrew';
const age = 27;

const user = {
    name,
    age,
    location: 'Philadelphia'
}

console.log(user)

// object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

const {label:productLabel, stock, rating = 5} = product;
console.log(productLabel);
console.log(stock);
console.log(rating);

// destructuring with function arguments
const transaction = (type, { label, price}) => {
    console.log(type, label, price);
}

transaction('order', product);