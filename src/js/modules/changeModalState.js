import checkNumInput from './checkNumInputs';

const changeModalState = (state) => {
  //! отримуємо доступ до полів модальних вікон, дані із якого нам потрібні для обробки
  const windowForm = document.querySelectorAll('.balcon_icons_img'), //? отримаємо таб із вікном необхідної форми
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

  checkNumInput('#width');
  checkNumInput('#height');
  //! збираємо дані із полів, які ми отримали вище


  //?метод для проведення одинакових дій із збору інформації з полів і внесення їх в стейт
  function bindActionToElems(event, elem, prop) {
    elem.forEach((item, i)=> {
      item.addEventListener(event, () => {
        switch(item.nodeName) { //! так як ми зчитуємо дані з усіх елементів, то читаємо ноду елемента, над яким проводимо дію і в залежності від типу витягуємо дані спец способом
          case 'SPAN': //? так як при виборі чекбокса ми звертаємось до спана, по контсрукції, то визначаємоь, до якого конкретно
            state[prop] = i;
            break;

          case 'INPUT':
            if(item.getAttribute('type') === 'checkbox'){ //? якщо це чекбокс, то виконуємо нижче
              i === 0 ? state[prop] = "Холодне" : state[prop] = "Тепле";
              elem.forEach((box, j) => { //! виставляємо галочки лише для 1 елемента
                box.checked = false;
                if(i == j) {
                  box.checked = true;
                  setTimeout(() => {
                    box.checked = false; //? галочка зникне з розмітки через 10c
                  }, 10000);
                }
              });
            } else {
              state[prop] = item.value; //? якщо це поля, то беремо із них днаі
            }
            break;

          case 'SELECT':
            state[prop] = item.value;
            break;
        }
        console.log(state);
      });
    });
  }

  bindActionToElems('click', windowForm, 'form');
  bindActionToElems('input', windowHeight, 'height');
  bindActionToElems('input', windowWidth, 'width');
  bindActionToElems('change', windowType, 'type');
  bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;