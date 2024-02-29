const db =require("./db");

// Function to count letters in a text
function countLetters(text){
    if(!text)
        return error;
    const count= text.length;
    return {count,text};
}

// Function to retrieve text of a specific surah and verse
function getText (surah,ayaNumber)  {
    db.query('SELECT text FROM ayahs WHERE surah_id = ? AND number_in_surah = ? ', [surah, ayaNumber], (err, results) => {
        if (err) {
            return err;
        } else {
            return results;
        }
    });
};

function getSurhaText (surahNumber)  {
    db.query('SELECT text FROM quran.ayahs WHERE surah_id = ?', surahNumber, (err, results) => {
        if (err) {
            return err;
        } else {
            const text = results.map(result => result.text).join(' ');
            return {text};
        }
    });
};

//get text from quran
function getQuranText ()  {
    db.query('SELECT text FROM quran.ayahs', (err, results) => {
        if (err) {
            return err;
        } else {
            const text = results.map(result => result.text).join(' ');
            return {text};
        }
    });
};

// Function to count occurrences of a word in a given text
function countOccurrences (text,word) {
    if (!text) {
        return 0;
    }
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const result=text.match(regex);
    return {result};
}


module.exports = {
    countLetters,
    getText,
    getSurhaText,
    getQuranText,
    countOccurrences
};
