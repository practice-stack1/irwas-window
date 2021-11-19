const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
  const header = document.querySelector(headerSelector),//? контейнер із табами
        tab = document.querySelectorAll(tabSelector),//? окремий таб
        content = document.querySelectorAll(contentSelector);//? контент конкретного таба

  function hideTabContent() {
    content.forEach(item => {
      item.style.display = 'none';
    });

    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    content[i].style.display = 'block';
    tab[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  //! делігірування події кліку на таб контейнер
  header.addEventListener('click', (e) => {
    const target = e.target; //! отримуємо елемент на який безпосередньо створено клік
    if(target && (target.classList.contains(tabSelector.replace(/\./, ""))
    || target.parentNode.classList.contains(tabSelector.replace(/\./, "")))){//! перевіряємо чи містить даний таб необхідний нам клас (в селектора видалямо точку через регулярний вирах)
      tab.forEach( (item, i) => {
        if(target == item || target.parentNode == item){
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

export default tabs;