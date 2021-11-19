//! метод для взаємодії із усіма модальними вікнами на сайті
  const modals = () => {
    function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
      const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            window = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

      trigger.forEach(item => {
        item.addEventListener('click', (e) => {
          if(e.target){//! якщо клікнемо на посилання
            e.preventDefault();
          }

          window.forEach(item => { //! метод для закриття усіх модальних вікон навипадок наявності двох послідовно відкриваємих модальних вікон
            item.style.display = 'none';
          });

          modal.style.display = "block";
          document.body.style.overflow = "hidden";
          document.body.style.marginRight = `${scroll}px`; //! при відкритті вікна в нас буде відступ рівний зникаючому скролу
        });
      });

      close.addEventListener('click', () => {

        window.forEach(item => {
          item.style.display = 'none';
        });


        modal.style.display = 'none';
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;

      });

      modal.addEventListener('click', (e) => {
        if(e.target === modal && closeClickOverlay) { //! закриваємо лише при кліку на підошку чи хрестик

          window.forEach(item => {
            item.style.display = 'none';
          });

          modal.style.display ="none";
          document.body.style.overflow = "";
          document.body.style.marginRight = `0px`;
        }
      });
    }

    //! виведення модального вікна за вказаним часом
    function showModalByTime(selector, time){
      setTimeout(function() {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = "hidden";
      }, time);
    }

    //! фіксить пошарпування відображення модального вікна через зникнення скролу
    function calcScroll() {
      let div = document.createElement('div');

      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';

      document.body.appendChild(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();

      return scrollWidth;
    }

    bindModals('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModals('.phone_link', '.popup', '.popup .popup_close');
    //! робота із вікнами, що замінятимуть одне одного
    bindModals('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModals('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false); //! останній параметр вказує, що при роботі із даним вікном, ми не закриємо його кліком на підлошку
    bindModals('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

    showModalByTime('.popup', 60000);
  }

  export default modals;