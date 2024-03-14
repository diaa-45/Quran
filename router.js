const express = require('express');
const quranController = require('./controller');
const waysController = require('./waysController');

const router = express.Router();

// Routers For Quran

router.get('/countLetters', quranController.getcountLetter);
router.get('/getText', quranController.getAyaText);
router.get('/getSurahText', quranController.getSurahAyas);
router.get('/getQuranText', quranController.getTextForQuran);
router.get('/countLetterInAya', quranController.countLetterForAya);
router.get('/countLetterInSurah', quranController.countLetterForSurah);
router.get('/countLetterInQuran', quranController.countLetterForQuran);
router.get('/countOccurrencesInSentence', quranController.getOccurrenc);
router.get('/countOccurrencesInQuran', quranController.getOccurrencInQuran);

// Router For Ways
router.get('/way/:method', waysController.countVerse);


module.exports = router;
