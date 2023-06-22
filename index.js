let offset = 0;

const btnPrev = document.querySelector('#btnPrev');
const btnPlay = document.querySelector('#btnPlay');
const btnNext = document.querySelector('#btnNext');
const btnPause = document.querySelector('#btnPause');

const URL = {
  getRadios: (cursor = 0) => `http://95.179.139.106/json/stations?offset=${cursor < 0 ? 0 : cursor}&limit=1`,
};

const updateRadio = function(cursor) {
  updateRadioStation(cursor);
  play.call(this);
};

const API = (url) => new Promise((resolve, reject) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((err) => reject(err));
});

const play = function(paused = false) {
  try {
    const audio = document.querySelector('#audio');
    audio.src = this.dataset.link;
    audio[paused ? 'pause' : 'play']();
  } catch (err) {
    console.error('STOP', err);
  }
};

const renderRadioStation = (payload) => {
  const data = payload[0];
  document.querySelector('.radio-name').innerHTML =`${data.name} (${data.bitrate} bit)`;
  document.querySelector('.title').innerHTML = data.country;
  document.querySelector('.votes').innerHTML = data.votes;
  btnPlay.dataset.link = data.url || data.url_resolved;
  btnNext.dataset.link = data.url || data.url_resolved;
  btnPrev.dataset.link = data.url || data.url_resolved;
};

const updateRadioStation = async (cursor = 0) => {
  const radioStationList = await API(URL.getRadios(cursor));
  renderRadioStation(radioStationList);
  document.querySelector('.loading').classList.add('hide');
};

btnPlay.addEventListener('click', function() {
  play.call(this);
});

btnPause.addEventListener('click', function() {
  play.call(this, true);
});

btnNext.addEventListener('click', function() {
  updateRadio.call(this, ++offset);
});

btnPrev.addEventListener('click', function() {
  updateRadio.call(this, --offset);
});

updateRadioStation();