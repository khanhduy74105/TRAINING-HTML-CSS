const calPrice = (items) => {
  return items.reduce((total, current) => {
    return total + current.item.price * current.amount;
  }, 0);
};
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const setUserDataToLocal = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

const directToLogin = () => {
  window.location.href = "./auth.html";
};
