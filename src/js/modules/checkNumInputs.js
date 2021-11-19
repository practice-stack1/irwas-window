//! модуль для відображення в полі телефону тільки цифр


const checkNumInput = (selector) => {
  const numInputs = document.querySelectorAll(selector);

  numInputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, ''); //! створюмо поле з суто числами через регулярний вираз
    });
  });

};

export default checkNumInput;