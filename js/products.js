const main = async function () {
  const synchCartItems = () => {
    synchSubtotalPrice();
  };

  const synchSubtotalPrice = () => {
    let price = calPrice(cartItems);
    $(".cart-section .cart-subtotal .subtotal-price").innerHTML = `$ ${price}`;
  };

  const fetchProducts = async () => {
    $(".products-section .loading-spinner-products").classList.add("show");
    const data = await Service.getAll();
    products = data;
    $(".products-section .loading-spinner-products").classList.remove("show");
  };

  const fetchCartItems = async () => {
    $("#cart-layout .cart-loader").classList.add("show");
    const promisesItem = await Service.getCartItem(cartItems);
    cartItems = [...cartItems, ...promisesItem];
    synchCartItems();
    $("#cart-layout .cart-loader").classList.remove("show");
  };

  const addToCart = async (e, item) => {
    e.target.querySelector(".loader-spinner").classList.add("show");
    const data = await Service.addToCart(item);

    if (!data) {
      return;
    }
    if (data === "Updated") {
      cartItems = cartItems.map((current) => {
        if (current.item.id === item.id) {
          return {
            ...current,
            amount: current.amount + 1,
          };
        } else {
          return current;
        }
      });
    }
    e.target.querySelector(".loader-spinner").classList.remove("show");
    document.getElementById("cart-checkbox").checked = false;
    $("body").style.overflow = "hidden";
    await fetchCartItems();
    fillToCart();
  };

  const updateAmount = async (item) => {
    const currentCartItem = $(`.cart-products-item.product_${item.item._id}`);
    const amount_box = currentCartItem.querySelector(".amount-box");
    currentCartItem
      .querySelector(".amount-box .increase-btn")
      .setAttribute("disabled", true);
    currentCartItem
      .querySelector(".amount-box .decrease-btn")
      .setAttribute("disabled", true);
    currentCartItem.querySelector(".col-1.col-item").innerHTML = `
              <span class="material-icons">
                close
              </span>
    `;
    if (!cartItems) {
      return;
    }
    if (item.amount <= 0) {
      removeProduct(item.item.id);
      return;
    }
    $(
      `#cart-layout .cart-section .cart-products .product_${item.item._id} .img-wrapper .loader-spinner-wrapper`
    ).classList.add("show");
    const data = await Service.updateItem(item);
    if (data.success) {
      cartItems = cartItems.map((currentItem) => {
        if (currentItem.item.id === item.item._id) {
          return {
            ...currentItem,
            item: { ...currentItem.item },
            amount: item.amount,
          };
        }

        return currentItem;
      });

      synchCartItems();
      $(
        `#cart-layout .cart-section .cart-products .product_${item.item._id} .img-wrapper .loader-spinner-wrapper`
      ).classList.remove("show");
    }

    amount_box.innerHTML = `
                                  <button class="decrease-btn">
                                      <span class="material-icons">
                                          arrow_back_ios
                                      </span>
                                  </button>
                                  <input class='blur-listener-input' type="number" value="${item.amount}">
                                  <button class="increase-btn">
                                      <span class="material-icons">
                                          arrow_forward_ios
                                      </span>
                                  </button>`;
    currentCartItem
      .querySelector(".amount-box .increase-btn")
      .addEventListener("click", function () {
        updateAmount({ ...item, amount: item.amount + 1 });
      });
    currentCartItem
      .querySelector(".amount-box .decrease-btn")
      .addEventListener("click", function () {
        updateAmount({ ...item, amount: item.amount - 1 });
      });
    currentCartItem
      .querySelector(".col-1.col-item span")
      .addEventListener("click", function () {
        removeProduct(item.item._id);
      });
    currentCartItem
      .querySelector(".amount-box input")
      .addEventListener("blur", function () {
        const amount = currentCartItem.querySelector(".amount-box input").value;
        if (parseInt(amount) === parseInt(item.amount)) {
          return;
        }
        updateAmount({ ...item, amount: parseInt(amount) });
      });
  };

  const removeProduct = async (id) => {
    if (!cartItems) {
      return;
    }
    const currentCartItem = $(`.cart-products-item.product_${id}`);
    currentCartItem
      .querySelector(`.img-wrapper .loader-spinner-wrapper`)
      .classList.add("show");
    const data = await Service.removeItem(id);
    if (data.success) {
      cartItems = cartItems.filter((item) => item.item.id !== id);
      currentCartItem
        .querySelector(`.img-wrapper .loader-spinner-wrapper`)
        .classList.remove("show");
      currentCartItem.remove();
      synchCartItems();
    }
  };
  // listener DOM event function
  const listenerHideCartLayout = () => {
    const cartLayout = $("#cart-layout");
    cartLayout.addEventListener("click", function () {
      $("#cart-checkbox").checked = true;
      $("body").style.overflow = "visible";
    });
    $(".cart-section").addEventListener("click", function (e) {
      e.stopPropagation();
    });
  };
  const fillToCart = () => {
    if (!cartItems) {
      return;
    }
    const cartProducts = $("#cart-layout .cart-products");
    cartProducts.innerHTML = ``;
    cartItems.forEach((currentItem) => {
      const newItem = document.createElement("div");
      newItem.classList.add(`cart-products-item`);
      newItem.classList.add(`product_${currentItem.item._id}`);
      newItem.classList.add("row");
      newItem.innerHTML = `
                        <div class="img-wrapper col-4 col-item">
                          <img src="${currentItem.item.images[0]}" alt="">
                          <div class="loader-spinner-wrapper">
                            <img src="./assets/90-ring.svg" alt="" class="loader-spinner" >
                          </div>
                          </div>
                          <div class="item-content col-7 col-item">
                              <p>${currentItem.item.name} </p>
                              <span>$ ${currentItem.item.price} </span>
                              <div class="amount-box">
                                  <button class="decrease-btn">
                                      <span class="material-icons">
                                          arrow_back_ios
                                      </span>
                                  </button>
                                  <input class='blur-listener-input' type="number" value="${currentItem.amount}">
                                  <button class="increase-btn">
                                      <span class="material-icons">
                                          arrow_forward_ios
                                      </span>
                                  </button>
                              </div>
                          </div>
                          <div class="col-1 col-item">
                              <span class="material-icons">
                                  close
                              </span>
                          </div>
      `;
      newItem
        .querySelector(".amount-box .increase-btn")
        .addEventListener("click", function () {
          updateAmount({ ...currentItem, amount: currentItem.amount + 1 });
        });
      newItem
        .querySelector(".amount-box .decrease-btn")
        .addEventListener("click", function () {
          updateAmount({ ...currentItem, amount: currentItem.amount - 1 });
        });
      newItem
        .querySelector(".col-1.col-item span")
        .addEventListener("click", function () {
          removeProduct(currentItem.item._id);
        });
      newItem
        .querySelector(".amount-box input")
        .addEventListener("blur", function () {
          const amount = newItem.querySelector(".amount-box input").value;
          updateAmount({ ...currentItem, amount: parseInt(amount) });
        });
      cartProducts.appendChild(newItem);
    });
  };
  const settingSlider = (number) => {
    const dots = document.querySelectorAll(
      "#cart-layout .slider-control .dots span"
    );
    const slides = document.querySelectorAll("#cart-layout .slide");
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("show");
      dots[i].classList.remove("choosen");
    }
    for (let i = 0; i < slides.length; i++) {
      if (i === number) {
        slides[i].classList.add("show");
        dots[i].classList.add("choosen");
      }
    }
  };
  const fillProducts = async () => {
    const row = document.getElementById("products-row");
    products.forEach((item) => {
      const product = document.createElement("div");
      product.classList.add("col-item");
      product.classList.add("col-4");
      product.classList.add(`product_item_${item.id}`);
      product.innerHTML = `
            <div class="product_item">
              <div class="product_wrapper">
                  <img src="${item.images[0]}" alt="">
  
                  <div class="product_wrapper--layout">
                      <img src="${item.images[1]}" alt="">
  
                      <div class="interactions">
                          <span class="material-icons">
                              favorite_border
                          </span>
                          <span class="material-icons">
                              swap_horiz
                          </span>
                      </div>
                      <div class="btn-group">
                          <button>Quick view</button>
                          <button class="btn-add-to-cart" style="display:flex; align-items: center; justify-content: center;gap:8px"><img src="./assets/90-ring.svg" alt="" class="loader-spinner" style="width: 16px; height: 16px;">Add to cart</button>
                      </div>
                  </div>
              </div>
  
              <div class="product_item--title">
                  <span>${item.name}</span>
                  <span>$ ${item.price}</span>
              </div>
          </div>
      `;
      product
        .querySelector(".btn-group button.btn-add-to-cart")
        .addEventListener("click", function (e) {
          addToCart(e, item);
        });
      row.appendChild(product);
    });
  };

  const fillSlider = () => {
    let currentSlide = 0;
    settingSlider(currentSlide);
    const nextBtn = $("#cart-layout .slider-control .btn.next-btn");
    nextBtn.addEventListener("click", function () {
      if (
        currentSlide ===
        document.querySelectorAll("#cart-layout .slide").length - 1
      ) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      settingSlider(currentSlide);
    });
    const backBtn = $("#cart-layout .slider-control .btn.back-btn");
    backBtn.addEventListener("click", function () {
      if (currentSlide === 0) {
        currentSlide =
          document.querySelectorAll("#cart-layout .slide").length - 1;
      } else {
        currentSlide--;
      }
      settingSlider(currentSlide);
    });
    const dots = document.querySelectorAll(
      "#cart-layout .slider-control .dots span"
    );
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", function () {
        settingSlider(i);
      });
    }
  };

  const setUserAuth = () => {
    const logoutBlock = $(".products-header-wrapper .auth_block");
    const loginBtn = $(".products-header-wrapper #login-btn");

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      logoutBlock.style.display = "block";
      loginBtn.style.display = "none";

      logoutBlock.querySelector("span:first-child").innerHTML = user.username;
      logoutBlock
        .querySelector("span#logout-btn")
        .addEventListener("click", async () => {
          localStorage.removeItem("user");
          const x = await Service.logout();
          console.log(x);
          setUserAuth();
        });
    } else {
      logoutBlock.style.display = "none";

      loginBtn.style.display = "block";
    }
  };
  setUserAuth();

  await fetchProducts();
  fillProducts();
  fillSlider();
  listenerHideCartLayout();
};

main();
