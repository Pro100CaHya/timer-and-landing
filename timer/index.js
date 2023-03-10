const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formatTimerNumber = (num) => {
  return num < 10
    ? `0${num}`
    : num;
}

const createTimerAnimator = () => {
  let timer;

  return (seconds) => {
    clearInterval(timer);

    const updateTimerEl = () => {
      const hoursLeft = formatTimerNumber(
        Math.floor(seconds / (60 * 60))
      );

      const minutesLeft = formatTimerNumber(
        Math.floor((seconds % (60 * 60)) / 60)
      );

      const secondsLeft = formatTimerNumber(
        Math.floor(seconds % 60)
      );

      timerEl.innerText = `${hoursLeft}:${minutesLeft}:${secondsLeft}`;

      if (seconds > 0) {
        seconds--;
        timer = setTimeout(updateTimerEl, 1000);
      } else {
        timerEl.innerText = "The time is out";
      }
    };

    timer = setTimeout(updateTimerEl, 0);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]+/g, "");
});

buttonEl.addEventListener('click', () => {
  if (inputEl.value === "") {
    timerEl.innerText = "Enter seconds, please";
    return;
  }

  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
