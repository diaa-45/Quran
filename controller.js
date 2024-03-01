//import services
const {
    countLetters,
    getText,
    getSurhaText,
    getQuranText,
    countOccurrences,
}=require("./services")
const db =require("./db")

/********      test succesfully   **********/ 
const getcountLetter=async(req,res)=>{
    const count=await countLetters(req.body.text);
    res.json({count})

}
/********      test succesfully   **********/ 
const getAyaText = async (req, res) => {
    const { surah_id, number_in_surah } = req.body;
    try {
        db.query('SELECT text FROM ayahs WHERE surah_id = ? AND number_in_surah = ? ', [surah_id, number_in_surah], (err, results) => {
            if (err) {
                res.json({err});
            } else {
                res.json({ results });;
            }
        });
        
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while fetching text." });
    }
};
/********      test succesfully   **********/ 
const getSurahAyas=async(req,res)=>{
    const surah =req.body.surah;
    db.query('SELECT text FROM quran.ayahs WHERE surah_id = ?', surah, (err, results) => {
        if (err) {
            res.json({err});
        } else {
            const text = results.map(result => result.text).join(' ');
            res.json({text});
        }
    });
}
/********      test succesfully   **********/ 
const getTextForQuran=async(req,res)=>{
    db.query('SELECT text FROM quran.ayahs', (err, results) => {
        if (err) {
            res.json({err});
        } else {
            const text = results.map(result => result.text).join(' & ');
            res.json({text}) ;
        }
    });

}

const countLetterForAya=async(req,res)=>{
    
    const { surah_id, number_in_surah } = req.body;
    try {
        db.query('SELECT text FROM ayahs WHERE surah_id = ? AND number_in_surah = ? ', [surah_id, number_in_surah], async (err, results) => {
            console.log(results);
            const count = await countLetters(results);
            res.json({count});
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while fetching text." });
    }
}

const countLetterForSurah=async(req,res)=>{
    const surah=req.body.surah;
    try {
        const text =  getSurhaText(surah);
        const count = countLetters(text);
        res.json({count});
    } catch (error) {
        res.json('Error counting letters in Surah:', error);
    }
}

const countLetterForQuran=async(req,res)=>{
    try {
        const text = getQuranText();
        const count = countLetters(text);
        return count;
    } catch (error) {
        res.json('Error counting letters in Quran:', error);
    }
}
/********      test succesfully with english word ,, arabic under test (done perfect)   **********/ 
const getOccurrenc = async (req, res) => {
    try {
        const { text, word } = req.body;
        const regex = new RegExp(word, 'gi');
        const result = text.match(regex);
        const count =result.length;
        res.json({result,count});
    } catch (error) {
        res.json({ error });
    }
}

/********      test succesfully with english word ,, arabic under test (done perfect)   **********/ 

const getOccurrencInQuran=async(req,res)=>{
   
    try {
        db.query('SELECT text FROM quran.ayahs', (err, results) => {
            if (err) {
                res.json({err});
            } else {
                const word=req.body.word;
                const text = results.map(result => result.text).join(' & ');
                const result = text.match(new RegExp(word, 'gi'));
                const count =result.length;
                res.json({result,count});
            }
        });
       
    } catch (error) {
        res.json({ error });
    }
}


module.exports={
    getcountLetter,
    getAyaText,
    getSurahAyas,
    countLetterForAya,
    countLetterForSurah,
    getTextForQuran,
    countLetterForQuran,
    getOccurrenc,
    getOccurrencInQuran
}