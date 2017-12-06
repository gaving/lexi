import { readFileSync, writeFileSync } from "fs";
import fetch from "node-fetch";
import Config from "../config.json";

const translate = async word => {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${
      Config.GOOGLE_TRANSLATE_API_KEY
    }`,
    {
      method: "post",
      body: JSON.stringify({
        q: word,
        source: "el",
        target: "en",
        format: "text"
      })
    }
  )
    .then(res => {
      return res.json();
    })
    .catch(error => {
      console.log(error);
    });
  return response.data.translations[0].translatedText;
};

(async () => {
  const contents = await readFileSync("assets/words.json", "utf8");
  const json = JSON.parse(contents);
  const words = json.sort((a, b) => {
    return Math.floor(Math.random() * json.length);
  });

  const transform = await Promise.all(
    words.map(async (word, i) => {
      return {
        id: i,
        source: word,
        translation: await translate(word)
      };
    })
  );
  writeFileSync(`assets/translated.json`, JSON.stringify(transform, null, 2));
  console.log("assets/translated.json written");
})();
