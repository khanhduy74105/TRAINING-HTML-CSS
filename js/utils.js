const calPrice = (items) => {
  return items.reduce((total, current) => {
    return total + current.item.price * current.amount;
  }, 0);
};

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
