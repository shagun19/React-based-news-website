const https = require('https')
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cors = require('cors')

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});
app.use(cors());
/*var corsOptions = {
  origin: 'https://newsapp-nytimes-guardian-0408.appspot.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/

app.get('/nytimes', async (request, response) => {
  const api_url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=WLmHYQ7MGGKiVpUaRNKRcdbAO8sjJ0U8';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/nytimes/:section', async (request, response) => {
  const api_url = 'https://api.nytimes.com/svc/topstories/v2/' + request.params.section +'.json?api-key=WLmHYQ7MGGKiVpUaRNKRcdbAO8sjJ0U8';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/nytimes-article/:articleId*', async (request, response) => {
  var path = request.params.articleId + request.params[0];
  const api_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:"' + path + '"&api-key=WLmHYQ7MGGKiVpUaRNKRcdbAO8sjJ0U8';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/nytimes-search/:query', async (request, response) => {
  const api_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + request.params.query + '&api-key=WLmHYQ7MGGKiVpUaRNKRcdbAO8sjJ0U8';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/guardian/:section', async (request, response) => {
  const api_url = 'https://content.guardianapis.com/'+request.params.section+'?api-key=75cfee5a-fc9a-430f-b92a-c97a8e2dde26&show-blocks=all';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/guardian', async (request, response) => {
  const api_url = 'https://content.guardianapis.com/search?api-key=75cfee5a-fc9a-430f-b92a-c97a8e2dde26&section=(sport|business|technology|politics|world)&show-blocks=all';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/guardian-article/:articleId*', async (request, response) => {
  var path = request.params.articleId+request.params[0];
  const api_url = 'https://content.guardianapis.com/' +path+'?api-key=75cfee5a-fc9a-430f-b92a-c97a8e2dde26&show-blocks=all';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/guardian-search/:query', async (request, response) => {
  const api_url = 'https://content.guardianapis.com/search?q=' + request.params.query + '&api-key=75cfee5a-fc9a-430f-b92a-c97a8e2dde26&show-blocks=all';
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
