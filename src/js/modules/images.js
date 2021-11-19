const images = (workfield, overlayStyle) => {
  const imgPopup = document.createElement('div'), //? підлошка для майбутнього модального вікна
        workSection = document.querySelector(workfield), //? контейнер з фото
        bigImg = document.createElement('img');

  imgPopup.classList.add(overlayStyle); //? ставимо вже готовий стиль підстилки для модалки
  workSection.appendChild(imgPopup);

  //! встановлення стилів для нашого модального вікна
  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';

  imgPopup.appendChild(bigImg);

  //! делігірумо головний контейнер
  workSection.addEventListener('click', (e) => {
    e.preventDefault();

    let target = e.target;

    if(target && target.classList.contains('preview')) { //? перевіряємо чи даний елемент підтримує клік і чи клік відбувся по елементу із даним класом
      imgPopup.style.display = "flex";
      const path = target.parentNode.getAttribute('href'); //? беремо шлях до більшої картинки яка захована в батьківському елементі a
      bigImg.setAttribute('src', path);
    }

    if(target && target.matches('div.popup')) { //! якщо користувач клікнув на підстилку
      imgPopup.style.display = "none";
    }
  });



};

export default images;