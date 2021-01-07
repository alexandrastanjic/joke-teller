const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
function toggleButton() {
  button.disabled = !button.disabled;
}
function tellMe(joke) {
    VoiceRSS.speech({
      key: 'be7b20f1fb7543e0800e9dd58137f36f',
      src: joke,
      hl: 'en-us',
      r: 0, 
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false
  }); 
  }


async function getJokes() {
  let joke = '';
  const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke =  data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log('whoops', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener ('ended', toggleButton);


 

