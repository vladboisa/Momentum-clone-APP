const rootApp = document.querySelector<HTMLDivElement>('#app');
if (rootApp != undefined) {
  rootApp.innerHTML = `
  <header class="header">
  <div class="player">
  <div class="player-controls">
  <input class="player-progressbar styled-progressbar" type="range" min="0" max="10" value="0" />
  <div class="player-time">
  <span class="player-currenttime"></span>
  <span class="player-duration"></span>
  </div>
      <div class="player-buttons">
        <button class="play-prev player-icon"></button>
        <button class="play player-icon"></button>
        <button class="play-next player-icon"></button>
      </div>
    </div>
    <ul class="play-list"></ul>
  </div>
  <div class="weather">
  <input type="text" class="city" placeholder="By default Minsk" />
  <i class="weather-icon owf"></i>
  <span class="temperature"></span>
  <div class="weather-error"></div>
  <div class="description-container">
  <span class="weather-description"></span>
  <span class="wind"></span>
  <span class="humidity"></span>
  </div>
  </div>
  </header>
  <main class="main">
  <div class="slider-icons">
  <button class="slide-prev slider-icon"></button>
  <button class="slide-next slider-icon"></button>
  </div>
  <time class="time">00:00:00</time>
  <time class="date" datetime="2022">Present</time>
  <div class="greeting-container">
    <span class="greeting"></span>
    <input type="text" class="name" placeholder="[Enter the name]" />
  </div>
  </main>
  <footer class="footer">
  <button class="change-quote"></button>
  <figure class="quotes">
  <blockquote class="quote" cite=""></blockquote>
  <p class="quote-error"></p>
  <figcaption class="author"></figcaption>
  </figure>
  </footer>
  `
}
export {};