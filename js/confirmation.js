let data = JSON.parse(localStorage.getItem('confirmation'));
let totalPrice = 0;

for(let i = 0; i < data.products.length; i++) {
    totalPrice += data.products[i].price;
}

/*data.products.forEach(elt => {
    totalPrice += elt.price;
});*/

console.log(data);

document.getElementById('orderId').innerHTML = data.orderId;
document.getElementById('totalPrice').innerHTML = totalPrice/100;