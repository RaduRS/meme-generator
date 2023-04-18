import { useState, useEffect } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    url: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState();

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    setMeme((prevState) => ({
      ...prevState,
      url: url,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("useEffect");
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  return (
    <main>
      <div className="meme-form">
        <div className="meme-form-container">
          <input
            type="text"
            name="topText"
            value={meme.topText}
            placeholder="Shut up"
            onChange={handleChange}
          />
          <input
            type="text"
            name="bottomText"
            value={meme.bottomText}
            placeholder="and take my money"
            onChange={handleChange}
          />
        </div>
        <button className="form-button" type="submit" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <div className="meme">
          <img src={meme.url} alt="random-meme" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}
