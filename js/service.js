class ProductService {
  async getAll() {
    const response = await fetch(`${API_ADDRESS}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.data;
  }

  async getCartItem(currentCartItems) {
    const respone = await fetch(`${API_ADDRESS}/user/cart/my`, {
      credentials: "include",
    });
    const data = await respone.json();
    const promisesItem = data.data.map((cartItem) => {
      if (
        currentCartItems.find((item) => item.item._id === cartItem.product_id)
      ) {
        return null;
      } else {
        return new Promise((resolve, reject) => {
          fetch(`${API_ADDRESS}/products/${cartItem.product_id}`)
            .then((res) => res.json())
            .then((data) => {
              resolve({
                item: data.data,
                amount: cartItem.quantity,
                _id: cartItem._id,
              });
            });
        });
      }
    });
    return await Promise.all(promisesItem.filter((item) => item !== null));
  }

  async getProductById(id) {
    const response = await fetch(`${API_ADDRESS}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  }

  async addToCart(item) {
    const respone = await fetch(`${API_ADDRESS}/user/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: item._id,
      }),
      credentials: "include",
    });
    if (respone.status === 401) {
      directToLogin();
    }
    const data = await respone.json();

    return data || null;
  }

  async updateItem(item) {
    const respone = await fetch(`${API_ADDRESS}/user/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart_product_id: item._id,
        quantity: item.amount,
      }),
      credentials: "include",
    });

    const data = await respone.json();
    return data || null;
  }

  async removeItem(id) {
    const respone = await fetch(`${API_ADDRESS}/user/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart_product_id: id }),
      credentials: "include",
    });

    const data = await respone.json();
    return data || null;
  }

  async login(username, password) {
    const response = await fetch(`${API_ADDRESS}/user/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data || null;
  }

  async getUserInfo() {
    const response = await fetch(`${API_ADDRESS}/user/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data || null;
  }

  async register(username, password) {
    const response = await fetch(`${API_ADDRESS}/user/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data || null;
  }

  async logout() {
    const response = await fetch(`${API_ADDRESS}/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    return data || null;
  }
}
