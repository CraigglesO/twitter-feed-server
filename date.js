var x = new Date();
console.log(x);
console.log(`${x.getHours()}:${x.getMinutes()} - `);

console.log(("0" + x.getHours()).slice(-2));
console.log(("0" + x.getMinutes()).slice(-2));
