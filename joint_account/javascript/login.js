const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
  // window.location.href = "/login.html";
};





function setCookie(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  // document.cookie = `token=${token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search);
  // for (const param of params) {
  //   navigate = param[0];
  // }
  // if (navigate) return window.location.replace(navigate);
  // window.location.replace("/dashboard.html");
}




function setCookie_01(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token_01=${token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search)
  // for (const param of params) {
  //     navigate=param[0]
  // }
  // if(navigate)return window.location.replace(navigate)
  window.location.replace("/joint_account/complete-registration.html");
}

const loginUser = async (primary_email,primary_password,secondary_password) => {
  try {
    document.querySelector("#login").innerHTML = "proccessing...";
    const response = await fetch(
     "https://crescentpips-backend.glitch.me/api/user/login",
      // "http://localhost:5000/api/user/login",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ primary_email,primary_password,secondary_password }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#login").innerHTML = "try again";
      return;
    }
    document.querySelector("#login").innerHTML = "success";
    setCookie(result.message.user, result.token);
    window.location.replace("/joint_account/verify_login_code.html")
    // let demo=getCookie("demo")
    // demo == 'true' ? window.location.replace("/demo"): window.location.replace("/dashboard.html")

  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#login").innerHTML = "try again";
  }
};

const getReferral = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};


const registerUser = async (primary_email,secondary_email,primary_phone_number,secondary_phone_number ) => {
  try {
    document.querySelector("#next").innerHTML = "proccessing...";
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/newuser/register",
      // "http://localhost:5000/api/newuser/register",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          primary_email,
          secondary_email,
          primary_phone_number,
          secondary_phone_number,
          referral: getReferral() || "",
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errmessage2").innerHTML = result.errMessage;
      document.querySelector("#next").innerHTML = "try again";
      return;
    }
    document.querySelector("#next").innerHTML = "success";
    return setCookie_01(result.message.user, result.token);
  } catch (err) {
    document.querySelector(".errmessage2").innerHTML = err.message;
    document.querySelector("#next").innerHTML = "try again";
  }
};
//response gotten

// loginUser("email@gmail.com","password")

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//           c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//           return c.substring(name.length, c.length);
//       }
//   }
//   return "";
// }

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#login").onclick = () => {
    event.preventDefault();
    const primary_email = document.querySelector("#primary_mail");
    const primary_password = document.querySelector("#primary_pass");
    const secondary_password = document.querySelector("#secondary_pass");
    console.log((primary_email.value))
    if (!primary_email.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Primary Email is required");
    if (!primary_password.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Primary Password is required");
    if (primary_password.value.length < 8)
      return (document.querySelector(".errMessage").innerHTML =
        "Primary Password must be greater than 8 characters");


        if (!secondary_password.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Secondary Password is required");
    if (secondary_password.value.length < 8)
      return (document.querySelector(".errMessage").innerHTML =
        "Secondary Password must be greater than 8 characters");



    document.querySelector(".errMessage").innerHTML = "";

    loginUser(primary_email.value,primary_password.value,secondary_password.value);
  };

  document.querySelector("#next").onclick = () => {
    let errorColor = "2px solid red";
    event.preventDefault();
    const primary_email = document.querySelector("#primary_email");
    const secondary_email = document.querySelector("#secondary_email");
    const primary_phone_number = document.querySelector("#primary_phone_number");
    const secondary_phone_number = document.querySelector("#secondary_phone_number");

    if (!primary_email.value) return (primary_email.style.border = errorColor);
    if (!secondary_email.value) return (secondary_email.style.border = errorColor);

    if (!primary_phone_number.value) return (primary_phone_number.style.border = errorColor);
    if (!secondary_phone_number.value) return (secondary_phone_number.style.border = errorColor);


    document.querySelector(".errmessage2").innerHTML = "";
    registerUser(primary_email.value, secondary_email.value, primary_phone_number.value, secondary_phone_number.value);
  };

  document.querySelectorAll("input").forEach((input) => {
    document.querySelector(".errmessage2").innerHTML = "";
    input.onkeyup = () => (input.style.border = "0.1px solid #fff");
  });
  document.querySelector("select").onchange = () =>
    (document.querySelector("select").style.border = "0.1px solid #fff");
});

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("login");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

// signInButton.addEventListener("click", () => {
//   container.classList.remove("right-panel-active");
// });

// document.addEventListener("DOMContentLoaded",()=>{
document.querySelector(".ghost").onclick = () =>
  container.classList.remove("right-panel-active");

// })
