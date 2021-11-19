//! модуль для створення і налаштуавння таймера на сторінці
const timer = (id, deadline) => {
   //! метод для виводу даних в розмітку в потрібному форматі
  const addZero = (num) => {
    if(num <= 9){
      return '0' + num;
    } else {
      return num;
    }
  };
  //? метод із вирахуванням часу через внесення дедлайну
  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()), //? різниця між кінцевим часом і поточним
          seconds = Math.floor((t/1000) % 60), //? отримамо к-сть секунд в секції таймера
          minutes = Math.floor((t/1000/60) % 60), //? отримаємо к-сть хвилин
          hours = Math.floor((t/(1000 * 60 * 60)) % 24),//? отримамо години
          days = Math.floor((t/(1000 * 60 * 60 * 24)));
    return {
      'total': t, //? час, який залшився
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000); //! setInterval - метод, що змушує інший метод виконуватись через заданий проміжуток часу
    updateClock(); //? для фіксу багу із виведенням статичних данних до спрацювання сктіпта
    //? визначає, скільки часу в нас залишилось до кінця
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = addZero(t.days); //! вносимо дані в розмітку
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if(t.total <= 0){
        days.textContent = "00"; //! вносимо дані в розмітку
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        clearInterval(timeInterval); //! зупиняємо таймер, зупинивши метод setInterval
      }

    }

  };

  setClock(id, deadline); //.container1, 2020-12-31
};

export default timer;