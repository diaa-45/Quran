
const db =require("./db")

/********      test succesfully   **********/ 
const getcountLetter=async(req,res)=>{
    try {
        const text = req.body.text;
        const count = text.length;
        res.json({count,text})
    } catch (error) {
        res.json({error})
    }

}
/********      test succesfully   **********/ 
const getAyaText = async (req, res) => {
    const { surah_id, number_in_surah } = req.body;
    try {
        db.query('SELECT text FROM ayahs WHERE surah_id = ? AND number_in_surah = ? ', [surah_id, number_in_surah], (err, results) => {
            if (err) {
                res.json({err});
            } else {
                res.json({  surah_id, number_in_surah, results});;
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
            const text = results.map(result => result.text).join(' & ');
            res.json({surah,text});
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
/********      test succesfully   **********/ 

const countLetterForAya = async (req, res) => {
    const { surah_id, number_in_surah } = req.body;
    try {
        db.query('SELECT text FROM ayahs WHERE surah_id = ? AND number_in_surah = ? ', [surah_id, number_in_surah], async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).json({ error: "An error occurred while fetching text." });
                return;
            }
            
            let totalLetters = 0;
            for (const result of results) {
                totalLetters += result.text.length;
            }
            
            res.json({ totalLetters, results });
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
}
/********      test succesfully   **********/ 
const countLetterForSurah=async(req,res)=>{
    const surah=req.body.surah;
    try {
        db.query('SELECT text FROM ayahs WHERE surah_id = ? ', [surah], async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).json({ error: "An error occurred while fetching text." });
                return;
            }
            
            let totalLetters = 0;
            for (const result of results) {
                totalLetters += result.text.length;
            }
            
            res.json({ totalLetters, results });
        });
    } catch (error) {
        res.json('Error counting letters in Surah:', error);
    }
}
/********      test succesfully   **********/ 

const countLetterForQuran=async(req,res)=>{
    try {
        db.query('SELECT text FROM ayahs ', async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).json({ error: "An error occurred while fetching text." });
                return;
            }
            
            let totalLetters = 0;
            for (const result of results) {
                totalLetters += result.text.length;
            }
            
            res.json({ totalLetters, results });
        });
    } catch (error) {
        res.json({error})
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

/********      arabic under test done perfect ( Tashkil under test )   **********/ 

const getOccurrencInQuran=async(req,res)=>{
   
    try {
        db.query('SELECT text FROM quran.ayahs ', (err, results) => {
            
            if (err) {
                res.json({err});
            } else {

                const word=req.body.word;
                // دالة للتحقق مما إذا كانت الآية تحتوي على "الرحمن" بالتشكيل
                function hasTashkeel(verse) {
                    return verse.includes(word);
                }
        
                // تصفية الآيات التي تحتوي على "الرحمن" بالتشكيل
                const versesWithTashkeel = results.filter(result => hasTashkeel(result.text));
                const count =versesWithTashkeel.length;
                res.json({versesWithTashkeel,count});
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