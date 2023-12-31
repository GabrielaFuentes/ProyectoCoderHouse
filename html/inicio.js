document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginStatus = document.getElementById("loginStatus");

  function showLoginForm() {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  }

  function showRegisterForm() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }

  function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
  }

  function setLoggedInStatus(isLoggedIn) {
    localStorage.setItem("loggedIn", isLoggedIn ? "true" : "false");
  }

  function isRegistered() {
    return localStorage.getItem("registered") === "true";
  }

  function setRegisteredStatus(isRegistered) {
    localStorage.setItem("registered", isRegistered ? "true" : "false");
  }

  function checkLoginStatus() {
    if (isLoggedIn()) {
      const storedUsername = localStorage.getItem("username");
      loginButton.innerText = "Cerrar Sesión";
      loginStatus.innerText = "Hola, " + storedUsername + "!";
    }
  }

  checkLoginStatus();

  loginButton.addEventListener("click", function () {
    if (isLoggedIn()) {
      loginButton.innerText = "Iniciar Sesión";
      loginStatus.innerText = "";
      setLoggedInStatus(false);
      setRegisteredStatus(false);
    } else {
      showLoginForm();
      loginModal.show();
    }
  });

  document.getElementById("showRegisterFormLink").addEventListener("click", function (event) {
    event.preventDefault();
    showRegisterForm();
  });

  document.getElementById("showLoginFormLink").addEventListener("click", function (event) {
    event.preventDefault();
    showLoginForm();
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = loginForm.elements["username"].value;
    const password = loginForm.elements["password"].value;

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      loginButton.innerText = "Cerrar Sesión";
      loginStatus.innerText = "Hola, " + username + "!";
      setLoggedInStatus(true);
      loginModal.hide();
    } else {
      Swal.fire({
        color: "white",
        background: "black",
        title: "Credenciales incorrectas",
        text: "Por favor, verifica tu nombre de usuario y contraseña.",
        icon: "error",
      });
    }
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = registerForm.elements["newUsername"].value;
    const newPassword = registerForm.elements["newPassword"].value;
    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword);
    Swal.fire({
      title: "Usuario registrado exitosamente",
      color: "white",
      background: "black"
    });
    showLoginForm();
    setRegisteredStatus(true);
    setLoggedInStatus(true);
  });
});
