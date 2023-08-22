class ProductService {
  async getAll() {
    const response = await fetch(`${API_ADDRESS}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  async getCartItem(currentCartItems) {
    const respone = await fetch(`${API_ADDRESS}/your_cart`);
    const data = await respone.json();
    const promisesItem = data.map((cartItem) => {
      if (currentCartItems.find((item) => item.item.id === cartItem.id)) {
        return null;
      } else {
        return new Promise((resolve, reject) => {
          fetch(`http://localhost:3000/api/products/${cartItem.id}`)
            .then((res) => res.json())
            .then((data) => resolve({ item: data, amount: cartItem.quantity }));
        });
      }
    });
    return promisesItem.filter((item) => item != null);
  }

  async getProductById(id) {
    const response = await fetch(`${API_ADDRESS}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  async addToCart(item) {
    const respone = await fetch("http://localhost:3000/api/your_cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
      }),
    });
    const data = await respone.json();
    return data || null;
  }

  async updateItem(item) {
    const respone = await fetch(
      `http://localhost:3000/api/your_cart/update/${item.item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: item.amount,
        }),
      }
    );

    const data = await respone.json();
    return data || null;
  }

  async removeItem(id) {
    const respone = await fetch(
      `http://localhost:3000/api/your_cart/remove/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await respone.json();
    return data || null;
  }
}
