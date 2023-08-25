function main() {
  const login_btn = $("#login-btn");
  const register_btn = $("#register-btn");
  const loginHandler = async () => {
    const usernameInput = $('.login-form input[type="text"]');
    const passwordInput = $('.login-form input[type="password"]');
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log(username, password);

    if (username !== "" && password !== "") {
      console.log("first");
      const data = await Service.login(username, password);
      console.log(data);
      if (data.success) {
        console.log(data);
        setUserDataToLocal(data.user);
        window.location.href = "./products.html";
      }
    }
  };

  login_btn.addEventListener("click", (e) => {
    e.preventDefault();
    loginHandler();
  });
}

main();
