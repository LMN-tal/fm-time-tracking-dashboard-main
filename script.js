const prevPeriod = {
  daily: 'Yesterday',
  weekly: 'Last Week',
  monthly: 'Last Month',
};
let data = [];

async function getData() {
  let url = 'data.json';
  const data = await (await fetch(url)).json();
  return data;
}

async function generateContent(period = 'daily') {
  if (!data.length) data = await getData();
  const cards = document.getElementById('cards');
  let cardsHtml = '';
  data.forEach((element) => {
    cardsHtml += `
      <div class="card card--${element.title.toLowerCase().replaceAll(' ', '-')}">
        <div class="card__container">
          <div class="card__header">
            <h2 class="card__name">${element.title}</h2>
            <div class="card__more">more...</div>
          </div>
          <div class="card__content"> 
            <div class="card__hours">${element.timeframes[period].current}hrs</div>
            <div class="card__previous">${prevPeriod[period]} - ${element.timeframes[period].previous}hrs</div>
          </div>
        </div>
      </div>`;
  });
  cards.innerHTML = cardsHtml;
}

generateContent();

const nav = document.getElementById('nav');
nav.addEventListener('click', handleSelect);

function handleSelect(event) {
  for (periodName in prevPeriod) {
    if (periodName === event.target.id) {
      document.getElementById(periodName).classList.add('select__option--active');
      generateContent(event.target.id);
    } else {
      document.getElementById(periodName).classList.remove('select__option--active');
    }
  }
}
