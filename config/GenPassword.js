const bcrypt = require('bcrypt');

let pswrd = bcrypt.hashSync('123abc', 9);
console.log(pswrd);