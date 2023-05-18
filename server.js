const express = require('express');
const axios = require('axios');
const app = express();

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://spreadsheets.google.com/feeds/list/1dH1JOwgYeNFW3e-iWHSpOmaOlYT1N9PR3_XckpdcLWA/od6/public/values?alt=json');
    const entries = response.data.feed.entry;

    const newsItems = entries.map(entry => {
      const title = entry.gsx$title.$t;
      const description = entry.gsx$description.$t;
      return { title, description };
    });

    res.json(newsItems);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
