const trustedOptions = document.querySelectorAll(".hide-content li");
const trustedP = document.querySelectorAll(".hide-content p");
const linkItems = document.querySelector(".link-items");
const linkMenu = document.querySelector(".link-menu");
const myform = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");
const handleErrors = document.querySelectorAll(".errors");
const checkDomain = document.querySelector(".checkDomain");
const domains = document.querySelector("#domains");
const domainResult = document.querySelector(".domainResult");
let liOptions = false;

// show-link-item

trustedOptions.forEach((li) => {
  li.addEventListener("click", (e) => {
    trustedP.forEach((p) => p.classList.add("showP"));
    e.target.nextElementSibling.classList.toggle("showP");
  });
});

linkMenu.addEventListener("click", () => {
  linkItems.classList.toggle("show-link-item");
});

myform?.addEventListener("submit", async (e) => {
  const userInfo = {
    firstname: myform.firstname.value,
    lastname: myform.lastname.value,
    email: myform.email.value,
    password: myform.password.value,
    confirmPassword: myform.confirmPassword.value,
  };
  e.preventDefault();
  handleErrors.forEach((error) => (error.textContent = ""));
  try {
    await fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.user) {
          location.assign('/login')
        }
        handleErrors.forEach((error, i) => {
          setTimeout(() => {
            error.textContent = Object.values(result)[i];
            error.style = " transition: 1s";
          }, 100);
        });
      });
  } catch (error) {
    console.log(error);
  }
});

loginForm?.addEventListener("submit", async (e) => {
  const userInfo = {
    email: loginForm.usernameOrEmail.value,
    password: loginForm.password.value,
  };
  e.preventDefault();
  handleErrors.forEach((error) => (error.textContent = ""));
  try {
    await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.user) {
          location.assign('/login')
        }
        setTimeout(() => {
          handleErrors[0].textContent = result.email;
          handleErrors[1].textContent = result.password;
        }, 100);
      });
  } catch (error) {
    console.log(error);
  }
});

// myform?.addEventListener("submit", async (e) => {
//   const userInfo = {
//     firstname: myform.firstname.value,
//     lastname: myform.lastname.value,
//     email: myform.email.value,
//     password: myform.password.value,
//     confirmPassword: myform.confirmPassword.value,
//   };
//   e.preventDefault();
//   handleErrors.forEach((error) => (error.textContent = ""));
//   try {
//     await fetch("/signup", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userInfo),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         handleErrors.forEach((error, i) => {
//           setTimeout(() => {
//             error.textContent = Object.values(result)[i];
//             error.style = " transition: 1s";
//           }, 100);
//         });
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });

checkDomain?.addEventListener("submit", async (e) => {
  const domainName = checkDomain.domainName.value.trim();
  const domain = domains.value.trim();
  e.preventDefault();
  try {
    await fetch(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_jn1JOr9WbfBXMGd80tAbS3DnelpKq&domainName=${domainName}.${domain}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then(({DomainInfo: result}) => {
        if(result.domainAvailability === "UNAVAILABLE") {
          domainResult.innerHTML = `
          <div class="alert alert-danger fs-4" role="alert">
          This domain name "${result.domainName}" is not available!
          </div>`
        } else {
          domainResult.innerHTML = `
          <div class="alert alert-success fs-4" role="alert">
          domain name "${result.domainName}" is available <button class='rounded btn-success' style="width: fit-content">buy now</button>
          </div>`
        }
        
      });
  } catch (error) {
    console.log(error);
  }
});
