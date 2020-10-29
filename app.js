const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));



//Drill 1
app.get('/sum', (req, res) => {
    const{a,b} = req.query;

if(!a){
    return res
        .status(400)
        .send('a is required');
}

if(!b){
    return res
        .status(400)
        .send('b is required');
}

const numA = parseFloat(a);
const numB = parseFloat(b);

if(Number.isNaN(numA)){
    return res
        .status(400)
        .send('a must be a number');
}

if(Number.isNaN(numB)){
    return res
        .status(400)
        .send('b must be a number');
}

const c = numA + numB
const response = `The sum of ${numA} and ${numB} is ${c}`;

res 
.status(200)
.send(response);

})

//Drill 2
app.get('/cipher', (req, res) => {
    const {text, shift} = req.query;
    
    if(!text){
        return res
            .status(400)
            .send('text is required')
    }

    if(!shift){
        return res
            .status(400)
            .send('shift is required')
    }

    const shiftNum = parseFloat(shift);

    if(Number.isNaN(shiftNum)){
        return res
            .status(400)
            .send('shift must be a number')
    }

    const base = 'A'.charCodeAt(0);

    const cipher = text
        .toUpperCase()
        .split('')
        .map(char => {
            const code = char.charCodeAt(0);
            if(code < base || code > (base + 26)){
                return char;
            }

            let diff = code - base;
            diff = diff + shiftNum;
            diff = diff % 26;
            const shiftedChar = String.fromCharCode(base + diff);
            return shiftedChar;
        })
        .join('');
    res
        .status(200)
        .send(cipher);
});

//Drill 3
app.get('/lotto', (req, res) => {
    const numbers = req.query;

    if(!numbers){
        res 
            .status(400)
            .send('numbers required')
    }

    if(!Array.isArray(numbers)){
        res
            .status(400)
            .send('numbers must be in an array')
    }

    if(numbers.length !== 6){
        res
            .status(400)
            .send('numbers array must consist of 6 numbers')
    }

    const guesses = numbers
        .map(number => parseInt(number))
        .filter(number => !Number.isNaN(number) && (number >= 1 && number <= 20));
    
    if(guesses.length !== 6){
        res 
            .status(400)
            .send('must be an array of 6 numbers all between 1 and 20')
    }

    const givenNumbers = Array(20).fill(1).map((_, i) => i + 1);
    const winningNumbers = [];
    for (let i = 0; i < 6; i ++){
        const ran = Math.floor(Math.random()*givenNumbers.length);
        winningNumbers.push(givenNumbers[ran]);
        givenNumbers.splice(ran, 1);
    }

    let diff = winningNumbes.filter(n => !guesses.includes(n));
    let responseText;

    switch(diff.length){
        case 0:
            responseText = "WOOOOW Congrats!";
            break;
        case 1:
            responseText = "You win $100!!";
            break;
        case 2:
            responseText = "You win a free ticket!";
            break;
        default:
            responseText = "Sorry, please try again";

    }

    res.json({
        guesses,
        winningNumbers,
        diff,
        responseText
    });

  res.send(responseText);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});








