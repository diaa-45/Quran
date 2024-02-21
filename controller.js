//import services
const {
    countLetters,
    getText,
    getSurhaText,
    getQuranText,
    countOccurrences,
}=require("./services")

const getcountLetter=async(req,res)=>{
    const count=await countLetters(req.body.text);
    res.json({count})

}

const getAyaText=async(req,res)=>{
    const {surah,ayaNumber}=req.body;
    const text= await getText(surah,ayaNumber);
    res.json({text});
}

const getSurahAyas=async(req,res)=>{
    const surah =req.body.surah;
    const text = getSurhaText(surah);
    res.json({text});
}

const countLetterForAya=async(req,res)=>{
    const {surah,ayaNumber}=req.body;
    try {
        const text =  getText(surah, ayaNumber);
        const count = countLetters(text);
        res.json({count,text});
    } catch (error) {
        res.json('Error counting letters in aya:', error);
        
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

const getTextForQuran=async(req,res)=>{
    const quranText=getQuranText();
    res.json({text});
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

const getOccurrenc=async(req,res)=>{
    const{text,word}=req.body;
    const occur= countOccurrences(text,word);
    res.json({occur});
}

const getOccurrencInQuran=async(req,res)=>{
    const word=req.body.word;
    try {
        const text =  getQuranText();
        const count = countOccurrences(text, word);
        res.json({count});
    } catch (error) {
       res.json('Error counting occurrences in Quran:', error);
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