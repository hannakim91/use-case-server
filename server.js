const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.set('port', process.env.PORT || 8001);

app.locals.title = 'Form Submissions';
app.locals.sentences = [
  { id: 1, text: 'this is the first sentence' },
  { id: 2, text: 'this is the second sentence' }
];

app.get('/', (request, response) => {
  response.send('Form submissions database. Go to http://localhost:8001/api/v1/sentences to see all form submissions.');
});

app.get('/api/v1/sentences', (request, response) => {
  const sentences = app.locals.sentences;
  response.json({ sentences })
});

app.post("/api/v1/sentences", (request, response) => {
  const { text } = request.body
  if (!text) {
    response.status(422).json({error: `Missing required information. Expected format {text: <string>}`}) } else {
    const newSentence = { id: Date.now(), text }
    app.locals.sentences.push(newSentence)
    response.status(201).json(newSentence)
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});