const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json()); // read JSON BODY
app.use(express.urlencoded({ extended: true })); // read URL ecnoded body
app.use(cors);

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
  });

app.post('/chatbot', (req, res) => {
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} 
    else 
    {
        res.json({
            text: "I'm sorry, I did not understand your question. Please provide a number for me to give you more infromation about."
        })
    }
});



const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
