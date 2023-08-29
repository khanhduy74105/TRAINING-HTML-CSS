function main() {
  const login_btn = $("#login-btn");
  const register_btn = $("#register-btn");
  const switchToRegister = $("#switch-to-register");
  const switchToLogin = $("#switch-to-login");
  const registerForm = $(".register-form");
  const loginForm = $(".login-form");

  const loginHandler = async () => {
    const usernameInput = $('.login-form input[type="text"]');
    const passwordInput = $('.login-form input[type="password"]');
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username !== "" && password !== "") {
      const data = await Service.login(username, password);
      if (data.success) {
        const respone = await Service.getUserInfo();
        if (respone.success) {
          setUserDataToLocal(respone.data);
          window.location.href = "./products.html";
        }
      } else {
        alert(data.msg);
      }
    }
  };

  const registerHandler = async () => {
    const usernameInput = $('.register-form input[type="text"]');
    const passwordInput = $('.register-form input.password[type="password"]');
    const confirmInput = $(
      '.register-form input.confirm_password[type="password"]'
    );
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirm_password = confirmInput.value;
    if (username !== "" && password !== "" && confirm_password !== "") {
      if (confirm_password !== password) {
        alert("Confirm password is wrong");
        return;
      }
      const data = await Service.register(username, password);
      if (data.success) {
        const respone = await Service.getUserInfo();
        if (respone.success) {
          console.log(respone);
          setUserDataToLocal(respone.data);
          window.location.href = "./products.html";
        }
      } else {
        alert(data.msg);
      }
    }
  };
  const swtichForm = () => {
    switchToRegister.addEventListener("click", () => {
      registerForm.classList.add("show");
      loginForm.classList.remove("show");
    });
    switchToLogin.addEventListener("click", () => {
      registerForm.classList.remove("show");
      loginForm.classList.add("show");
    });
  };

  swtichForm();
  login_btn.addEventListener("click", (e) => {
    e.preventDefault();
    loginHandler();
  });
  register_btn.addEventListener("click", (e) => {
    e.preventDefault();
    registerHandler();
  });
}

main();
