import checkNumInput from './checkNumInputs';

const forms = (state) => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

  checkNumInput('input[name="user_phone"]'); //! валідація форми на введення лише чисел

  const message = {
    loading: 'Загрузка...',
    success: 'Дякую! Скоро ми з вами сконтактумось',
    failure: 'Щось пішло не так...'
  };


  //! метод для обробки відправки даних на сервер
  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading; //? вносимо повідомлення в створений блок повідомлень
    //! змушумо js зачекти відповідь від сервера завдяки async await
    let res = await fetch(url, {
      method: "POST",
      body: data
    });

    return await res.text();
  }

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage); //! поміщамо повідомлення про статус відправки в кінець форми

      const formData = new FormData(item); //! об'єкт для збору данних з полів (будь-яких типів)
      if(item.getAttribute('data-calc') === "end"){ //? якщо форма з якою ми працюмо містить даний атребут(фінальна форма калькулятора), то... вносимо дані із стейта додатково в formData
        for(let key in state){
          formData.append(key, state[key]);
          delete state[key];
        }
        item.closest('.popup_calc_end').style.display = "none";
        document.body.style.overflow = "hidden";
      }

      postData('assets/server.php', formData)
        .then(res => {
          statusMessage.textContent = message.success;
          console.log(res);
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          //! чистимо поля і блок із повідомленнями вкінці операції
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
}

export default forms;