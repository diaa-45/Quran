const db = require("./db");

/********      test succesfully   **********/
const getcountLetter = async (req, res) => {
  try {
    const text = req.body.text;
    const count = text.length;
    res.json({ text, count });
  } catch (error) {
    res.json({ error });
  }
};
/********      test succesfully   **********/
const getAyaText = async (req, res) => {
  const { surah_id, number_in_surah } = req.body;
  try {
    db.query(
      `SELECT text,name_arab As Surah,number_in_surah As Ayah_Number FROM ayahs INNER JOIN surah 
                ON ayahs.surah_id = surah.id WHERE surah_id = ? AND number_in_surah = ? `,
      [surah_id, number_in_surah],
      (err, results) => {
        if (err) {
          res.json({ err });
        } else {
          const Ayah_Text = results[0].text;
          const Surah = results[0].Surah;
          const Ayah_Number = results[0].Ayah_Number;
          res.json({ Surah, Ayah_Number, Ayah_Text });
        }
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred while fetching text." });
  }
};
/********      test succesfully   **********/
const getSurahAyas = async (req, res) => {
  const surah = req.body.surah;
  db.query(
    `SELECT text, name_arab As Surah,number_in_surah As Ayah_Number 
            FROM ayahs INNER JOIN surah ON ayahs.surah_id = surah.id WHERE surah_id = ?`,
    surah,
    (err, results) => {
      if (err) {
        res.json({ err });
      } else {
        const Ayahs = results
          .map((result) => result.text + `(${result.Ayah_Number})`)
          .join(" & ");
        const Surah = results[0].Surah;

        res.json({ Surah, Ayahs });
      }
    }
  );
};
/********      test succesfully   **********/
const getTextForQuran = async (req, res) => {
  db.query(
    `SELECT text,name_arab As Surah,number_in_surah As Ayah_Number 
            FROM ayahs INNER JOIN surah ON ayahs.surah_id = surah.id`,
    (err, results) => {
      if (err) {
        res.json({ err });
      } else {
        //const text = results.map(result => result.text).join(' & ');
        res.json({ results });
      }
    }
  );
};
/********      test succesfully   **********/

const countLetterForAya = async (req, res) => {
  const { surah_id, number_in_surah } = req.body;
  try {
    db.query(
      "SELECT text, normalized_text FROM ayahs WHERE surah_id = ? AND number_in_surah = ? ",
      [surah_id, number_in_surah],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching text." });
          return;
        }

        let totalLetters = 0;
        for (const result of results) {
          totalLetters += result.normalized_text.length;
        }
        const ayah = results[0].text;

        res.json({ ayah, totalLetters });
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
/********      test succesfully   **********/
const countLetterForSurah = async (req, res) => {
  const surah = req.body.surah;
  try {
    db.query(
      `SELECT text , normalized_text ,name_arab As Surah FROM ayahs INNER JOIN surah ON ayahs.surah_id = surah.id
                 WHERE surah_id = ? `,
      [surah],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching text." });
          return;
        }

        let totalLetters = 0;
        for (const result of results) {
          totalLetters += result.normalized_text.length;
        }
        const surah = results[0].Surah;
        res.json({ totalLetters, surah });
      }
    );
  } catch (error) {
    res.json("Error counting letters in Surah:", error);
  }
};
/********      test succesfully   **********/

const countLetterForQuran = async (req, res) => {
  try {
    db.query(
      "SELECT text ,normalized_text, name_arab FROM ayahs INNER JOIN surah ON ayahs.surah_id = surah.id",
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching text." });
          return;
        }
        let arr = [];
        let totalLetters = 0;
        for (const result of results) {
          totalLetters += result.normalized_text.length;
          arr.push(result.name_arab);
        }
        res.json({ totalLetters, arr });
      }
    );
  } catch (error) {
    res.json({ error });
  }
};

/********      test succesfully with english word ,, arabic under test (done perfect)   **********/
const getOccurrenc = async (req, res) => {
  try {
    const { text, word } = req.body;
    const regex = new RegExp(word, "gi");
    const count = text.match(regex).length;
    res.json({ text, word, count });
  } catch (error) {
    res.json({ error });
  }
};

/********      arabic under test done perfect ( Tashkil under test )   **********/

const getOccurrencInQuran = async (req, res) => {
  try {
    db.query(
      `SELECT text , normalized_text ,name_arab AS Surah , number_in_surah AS Ayah_Number 
                FROM quran.ayahs INNER JOIN surah ON ayahs.surah_id = surah.id `,
      (err, results) => {
        if (err) {
          res.json({ err });
        } else {
          const word = req.body.word;
          // دالة للتحقق مما إذا كانت الآية تحتوي على "الرحمن" بالتشكيل
          function hasTashkeel(verse) {
            return (
              verse.text.includes(word) || verse.normalized_text.includes(word)
            );
          }

          // تصفية الآيات التي تحتوي على "الرحمن" بالتشكيل
          const ayahSearch = results.filter((result) => {
            const regex = new RegExp(word, "gi"); // 'g' for global search, 'i' for case-insensitive
            return (
              regex.test(result.text) || regex.test(result.normalized_text)
            );
          });

          const count = ayahSearch.length;
          res.json({ "عدد النتائج": count, النتائج: ayahSearch });
        }
      }
    );
  } catch (error) {
    res.json({ error });
  }
};

// ********* Search About Ayahs In Specific Surah  *********//
const searchInSurah = async (req, res) => {
  try {
    db.query(
      `SELECT text , normalized_text , name_arab AS Surah , number_in_surah AS Ayah_Number , surah_id 
                FROM quran.ayahs INNER JOIN surah ON ayahs.surah_id = surah.id `,
      (err, results) => {
        if (err) {
          res.json({ err });
        } else {
          const { id } = req.params;
          const word = req.body.word;
          // دالة للتحقق مما إذا كانت الآية تحتوي على "الرحمن" بالتشكيل
          function hasTashkeel(verse) {
            return verse.includes(word);
          }
          let array = [];
          // تصفية الآيات التي تحتوي على "الرحمن" بالتشكيل
          const ayahSearch = results.filter((result) => {
            const regex = new RegExp(word, "gi");
            return (
              regex.test(result.text) || regex.test(result.normalized_text)
            );
          });

          for (let i = 0; i < ayahSearch.length; i++) {
            if (ayahSearch[i].surah_id == id) array.push(ayahSearch[i]);
          }
          //const surah= results[0].name_arab;
          const count = array.length;
          res.json({ "عدد النتائج": count, "النتائج ": array });
        }
      }
    );
  } catch (error) {
    res.json({ error });
  }
};

// دالة لحساب عدد تكرار كل حرف من الكلمة في كلمات الجملة
const calculateOccurrences = async(req,res) => {
 
  const { Word} = req.body;
  const  {surah,ayah} = req.params;
  if (!Word) {
    return res.status(400).json({ error: "Word are required" });
  }
 
  try {
    db.query(
      `SELECT normalized_text,name_arab As Surah,number_in_surah As Ayah_Number FROM ayahs INNER JOIN surah 
                ON ayahs.surah_id = surah.id WHERE surah_id = ? AND number_in_surah = ? `,
      [surah, ayah],
      (err, results) => {
        if (err) {
          return  err ;
        } else {
          const Ayah_Text = results[0].normalized_text;
          // تحويل الكلمة والجملة إلى حروف صغيرة للتعامل مع الأحرف الكبيرة والصغيرة بشكل متساوٍ
          const word = Word.toLowerCase();
          sentence = Ayah_Text.toLowerCase();
          const words = sentence.split(" ");
          //console.log(sentence);

          // كائن لتخزين عدد التكرارات لكل حرف من أحرف الكلمة
          const occurrences = {};
          const occurrencesWord = {};

          for (const char of word) {
            occurrences[char] = 0;
          }

          for (const word of words) {
            occurrencesWord[word] = 0;
          }
          // حساب عدد التكرارات
          for (const word of words) {
            for (const char of word) {
              if (char in occurrences) {
                occurrencesWord[word]++;
              }
            }
          }

          res.json({occurrencesWord});
        }
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred while fetching text." });
  }
  
};



module.exports = {
  getcountLetter,
  getAyaText,
  getSurahAyas,
  countLetterForAya,
  countLetterForSurah,
  getTextForQuran,
  countLetterForQuran,
  getOccurrenc,
  getOccurrencInQuran,
  searchInSurah,
  calculateOccurrences,
};
