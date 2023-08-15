const fetchProducts = async () => {
  const products = [
    {
      id: 1,
      name: "Eddie, 2-seater sofa, Andie antracit",
      price: 300,
      images: ["1.webp", "5.webp"],
    },
    {
      id: 2,
      name: "Flynn, 2-seater sofa, Sunday Dusty Rose",
      price: 251,
      images: ["3.webp", "4.webp"],
    },
    {
      id: 3,
      name: "Herman, 2-seater sofa, Hilton Dolphin",
      price: 1244,
      images: ["4.webp", "3.webp"],
    },
    {
      id: 4,
      name: "3-seater sofa w/ chaiselong",
      price: 552,
      images: ["5.webp", "1.webp"],
    },
    {
      id: 5,
      name: "Conrad, 3-seater sofa Andie Stone",
      price: 600,
      images: ["6.webp", "7.webp"],
    },
    {
      id: 6,
      name: "Conrad, 3-seater sofa Velour Navy",
      price: 700,
      images: ["1.webp", "1.webp"],
    },
  ];

  return products;
};
const getCartProducts = () => {
  const ls = localStorage;
  let currentItems = ls.getItem("cart") ? JSON.parse(ls.getItem("cart")) : [];

  return currentItems;
};
const addToCart = (item) => {
  const ls = localStorage;
  let currentItems = ls.getItem("cart") ? JSON.parse(ls.getItem("cart")) : [];
  if (currentItems.find((currentItem) => item.id === currentItem.item.id)) {
    currentItems = currentItems.map((currentItem) => {
      if (currentItem.item.id === item.id) {
        return {
          ...currentItem,
          item: { ...currentItem.item },
          amount: currentItem.amount + 1,
          total: (currentItem.amount + 1) * currentItem.item.price,
        };
      } else {
        return currentItem;
      }
    });
    ls.setItem("cart", JSON.stringify(currentItems));
  } else {
    currentItems.push({ item, amount: 1, total: item.price });
    ls.setItem("cart", JSON.stringify(currentItems));
  }

  document.getElementById("cart-checkbox").checked = false;
  fillToCart();
};

const fillToCart = () => {
  const cartItems = getCartProducts();
  if (!cartItems) {
    return;
  }
  const cartProducts = document.querySelector("#cart-layout .cart-products");
  cartProducts.innerHTML = ``;
  cartItems.forEach((currentItem) => {
    const newItem = document.createElement("div");
    newItem.classList.add("cart-products-item");
    newItem.classList.add("row");
    newItem.innerHTML = `
                      <div class="img-wrapper col-4 col-item">
                            <img src="./assets/products/${currentItem.item.images[0]}" alt="">
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
                                <input type="number" value="${currentItem.amount}">
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
        increaseAmount(currentItem.item.id);
      });
    newItem
      .querySelector(".amount-box .decrease-btn")
      .addEventListener("click", function () {
        decreaseAmount(currentItem.item.id);
      });
    newItem
      .querySelector(".col-1.col-item span")
      .addEventListener("click", function () {
        removeProduct(currentItem.item.id);
      });
    console.log(newItem.querySelector(".amount-box input"));
    newItem
      .querySelector(".amount-box input")
      .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          const amount = newItem.querySelector(".amount-box input").value;
          updateAmount(currentItem.item.id, parseInt(amount));
        }
      });
    cartProducts.appendChild(newItem);
  });

  let price = cartItems.reduce((total, current) => {
    return total + current.item.price * current.amount;
  }, 0);
  console.log(price);
  document.querySelector(
    ".cart-section .cart-subtotal .subtotal-price"
  ).innerHTML = `$ ${price}`;
};

const updateAmount = (id, amount) => {
  const cartItems = getCartProducts();
  if (!cartItems) {
    return;
  }

  const cartsNew = cartItems.map((currentItem) => {
    if (currentItem.item.id === id) {
      return {
        ...currentItem,
        item: { ...currentItem.item },
        amount: amount,
        total: amount * currentItem.item.price,
      };
    }

    return currentItem;
  });

  localStorage.setItem("cart", JSON.stringify(cartsNew));
  fillToCart();
};
const increaseAmount = (id) => {
  const cartItems = getCartProducts();
  if (!cartItems) {
    return;
  }

  const cartsNew = cartItems.map((currentItem) => {
    if (currentItem.item.id === id) {
      return {
        ...currentItem,
        item: { ...currentItem.item },
        amount: currentItem.amount + 1,
        total: (currentItem.amount + 1) * currentItem.item.price,
      };
    }

    return currentItem;
  });

  localStorage.setItem("cart", JSON.stringify(cartsNew));
  fillToCart();
};

const decreaseAmount = (id) => {
  const cartItems = getCartProducts();
  if (!cartItems) {
    return;
  }

  const cartsNew = cartItems.map((currentItem) => {
    if (currentItem.item.id === id) {
      if (currentItem.amount > 1) {
        return {
          ...currentItem,
          item: { ...currentItem.item },
          amount: currentItem.amount - 1,
          total: (currentItem.amount - 1) * currentItem.item.price,
        };
      } else {
        return null;
      }
    }

    return currentItem;
  });

  const trueCart = cartsNew.filter((item) => item !== null);
  localStorage.setItem("cart", JSON.stringify(trueCart));
  fillToCart();
};

const removeProduct = (id) => {
  const cartItems = getCartProducts();
  if (!cartItems) {
    return;
  }
  const trueCart = cartItems.filter((item) => item.item.id !== id);
  localStorage.setItem("cart", JSON.stringify(trueCart));
  fillToCart();
};

// Slider
const settingSlider = (number) => {
  const dots = document.querySelectorAll(
    "#cart-layout .slider-control .dots span"
  );
  const slides = document.querySelectorAll("#cart-layout .slide");
  const length = slides.length;
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

const onNextSlide = (slideNumber) => {
  slideNumber++;
};
const onPreviousSlide = (slideNumber) => {
  slideNumber--;
};
(async function () {
  settingSlider();
  fillToCart();
  const prds = await fetchProducts();
  const row = document.getElementById("products-row");
  prds.forEach((item) => {
    const product = document.createElement("div");
    product.classList.add("col-item");
    product.classList.add("col-4");
    product.innerHTML = `
          <div class="product_item">
            <div class="product_wrapper">
                <img src="./assets/products/${item.images[0]}" alt="">

                <div class="product_wrapper--layout">
                    <img src="./assets/products//${item.images[1]}" alt="">

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
                        <button>Add to cart</button>
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
      .querySelector(".btn-group button:nth-child(2)")
      .addEventListener("click", function () {
        addToCart(item);
      });
    row.appendChild(product);
  });

  // Slider setting
  let currentSlide = 0;
  settingSlider(currentSlide);
  const nextBtn = document.querySelector(
    "#cart-layout .slider-control .btn.next-btn"
  );
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
  const backBtn = document.querySelector(
    "#cart-layout .slider-control .btn.back-btn"
  );
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
})();
