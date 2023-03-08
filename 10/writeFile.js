const fs = require('fs');

fs.writeFile('message.txt', 'Esercizio 10', 'utf8', () => {
    console.log("Ciao Patri bell'esercizio questo")
});
