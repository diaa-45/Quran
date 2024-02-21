const express = require('express');
const quranController = require('./controller');

const router = express.Router();

router.get('/countLetters', quranController.getcountLetter);
router.get('/getText', quranController.getAyaText);
router.get('/getSurahText', quranController.getSurahAyas);
router.get('/getQuranText', quranController.getTextForQuran);
router.get('/countLetterInAya', quranController.countLetterForAya);
router.get('/countLetterInSurah', quranController.countLetterForSurah);
router.get('/countLetterInQuran', quranController.countLetterForQuran);
router.get('/countOccurrencesInSentence', quranController.getOccurrenc);
router.get('/countOccurrencesInQuran', quranController.getOccurrencInQuran);


module.exports = router;
