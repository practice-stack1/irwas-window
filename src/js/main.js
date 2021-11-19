import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

//! всі скрипти спрацюють при повній загрузці сторінки
window.addEventListener('DOMContentLoaded', () => {
  "use strict" //? активували строгий режим файлу

  let modalState = {};//? сховище данних із модальних вікон
  let deadline = '2020-12-31';

  changeModalState(modalState);
  modals();
  tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
  tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click'); //! щоб добратись до необхідних блоків контенту ми викристали > div > div , так як контент був на 2 рівня нижче
  tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
  forms(modalState);
  timer('.container1', deadline);
  images('.works', 'popup');
});