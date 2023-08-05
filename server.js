const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.YOUTUBE_API_KEY;

app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!ytdl.validateURL(url)) {
    res.status(400).send('Invalid YouTube URL');
    return;
  }

  const audioStream = ytdl(url, {
    quality: 'highestaudio',
  });

  res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
  res.setHeader('Content-Type', 'audio/mpeg');

  audioStream.pipe(res);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
