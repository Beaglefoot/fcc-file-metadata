#!/usr/bin/env node

const fs = require('fs');
const express = require('express');
const multer = require('multer');
const getCurrentIp = require('./helpers/getCurrentIp');
const getCurrentTime = require('./helpers/getCurrentTime');
const logger = require('./middlewares/logger');

const PORT = process.argv[2] || 3000;
const currentIp = getCurrentIp();
const currentTime = getCurrentTime();

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20971520
  }
});

app.set('view engine', 'ejs');
app.use(logger);
app.use(express.static('public'));
app.use(express.json());

app.get('/', (_, res) => {
  res.render('index', {}, (err, html) => {
    res.send(html);
  });
});

app.post('/filesize', (req, res) => {
  upload.single('file')(req, res, err => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ size: req.file.size });
  });
});

app.listen(PORT, () =>
  console.log(
    `[${currentTime}] express is running at http://${currentIp}:${PORT}`
  )
);
