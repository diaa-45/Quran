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

// Search Routers 1) global  2) In Specific Surah

router.get('/searchInQuran', quranController.getOccurrencInQuran);
router.get('/searchInSurah/:id', quranController.searchInSurah);

// Router For Ways
router.get('/way/:method', waysController.countVerse);


module.exports = router;
