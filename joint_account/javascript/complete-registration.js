function setCookie(user, token) {
    // alert("called")
    console.log(user);
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    // document.cookie=`email=${email} ; ${expires}`
    document.cookie = `user=${user} ; ${expires}`;
    document.cookie = `token=${token} ; ${expires}`;
    // let navigate;
    // const params = new URLSearchParams(window.location.search);
    // for (const param of params) {
    //   navigate = param[0];
    // }
    // if (navigate) return window.location.replace(navigate);
   window.location.replace("/joint_account/dashboard.html")
  }

// function setCookie_01(user, token) {
//   // alert("called")
//   console.log(user);
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   // document.cookie=`email=${email} ; ${expires}`
//   document.cookie = `user=${user} ; ${expires}`;
//   document.cookie = `token_01=${token} ; ${expires}`;
//   let navigate;
//   const params = new URLSearchParams(window.location.search);
//   for (const param of params) {
//     navigate = param[0];
//   }
//   if (navigate) return window.location.replace(navigate);
// }

const loginUser = async (email, password) => {
  try {
    document.querySelector("#login").innerHTML = "proccessing...";
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/user/login",
      // "http://localhost:5000/api/user/login",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    setCookie( result.message.user, result.token);
    window.location.replace("/dashboard.html");
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#login").innerHTML = "try again";
  }
};

const complete_registration = async (userInfo) => {
  try {
    document.querySelector("#register").innerHTML = "proccessing...";
    const response = await fetch(
       "https://crescentpips-backend.glitch.me/api/new_user/complete_registration",
      // "http://localhost:5000/api/new_user/complete_registration",

      {
        method: "POST",
        //   headers: { "content-type": "application/json" },
        body: userInfo,
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errmessage2").innerHTML = result.errMessage;
      document.querySelector("#register").innerHTML = "try again";
      return;
    }
    document.querySelector("#register").innerHTML = "success";
    return setCookie(result.message.user, result.token);
  } catch (err) {
    
      document.querySelector(".errmessage2").innerHTML = err.message;
    document.querySelector("#register").innerHTML = "try again";
  err.message == "Unexpected token < in JSON at position 0"
    ? (document.querySelector(".errmessage2").innerHTML =
        "Please make sure what you are trying to submit is an image and try again")
    : (document.querySelector(".errmessage2").innerHTML = err.message);

  
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
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    if (!email.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Email is required");
    if (!password.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Password is required");
    if (password.value.length < 8)
      return (document.querySelector(".errMessage").innerHTML =
        "Password must be greater than 8 characters");

    document.querySelector(".errMessage").innerHTML = "";

    loginUser(email.value, password.value);
  };




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
      // return "";
      window.location.href = "/login.html";
    };

let user = getCookie("user");
let token_01 = getCookie("token_01");


  document.querySelector("#register").onclick = () => {
    let errorColor = "2px solid red";
    event.preventDefault();
    const primary_full_name = document.querySelector("#primary_full_name");
    const secondary_full_name = document.querySelector("#secondary_full_name");
    let passport = document.querySelector("#passport");
    
    let primary_password = document.querySelector("#primary_password");
    let confirm_primary_password = document.querySelector("#confirm_primary_password");
    let secondary_password=document.querySelector("#secondary_password");
    let confirm_secondary_password=document.querySelector("#confirm_secondary_password");

    if (!primary_full_name.value) return (primary_full_name.style.border = errorColor);
    if (!secondary_full_name.value) return (secondary_full_name.style.border = errorColor);
    if (!passport.files[0]) return (passport.style.border = errorColor);

    if (!primary_password.value) return (primary_password.style.border = errorColor);
    if (!confirm_primary_password.value) return (confirm_primary_password.style.border = errorColor);
    if (primary_password.value != confirm_primary_password.value)
      return (document.querySelector("#pwd_error").innerHTML =
        "Primary password must match");


        if (!secondary_password.value) return (secondary_password.style.border = errorColor);
    if (!confirm_secondary_password.value) return (confirm_secondary_password.style.border = errorColor);
    if (secondary_password.value != confirm_secondary_password.value)
      return (document.querySelector("#pwd_error").innerHTML =
        "Secondary password must match");


    if (primary_password.value.length < 8)
      return (document.querySelector("#pwd_error").innerHTML =
        "Primary Password must be greater than 8 characters");
    
        if (secondary_password.value.length < 8)
        return (document.querySelector("#pwd_error").innerHTML =
          "Secondary Password must be greater than 8 characters");


    const formdata = new FormData();
    formdata.append("user", user);
    formdata.append("token_01", token_01);
    formdata.append("primary_full_name", primary_full_name.value);
    formdata.append("secondary_full_name", secondary_full_name.value);
    formdata.append("passport", passport.files[0]);
    formdata.append("primary_password", primary_password.value);
    formdata.append("secondary_password", secondary_password.value);

    complete_registration(formdata);
  };

  document.querySelectorAll("input").forEach((input) => {
   
    input.onkeyup = () => {
      // alert("hey")
      (input.style.border = "0.1px solid #fff");
      document.querySelector("#pwd_error").innerHTML=""
      document.querySelector(".errmessage2").innerHTML = "";
    }

    input.onchange = () => {
      // alert("hey")
      (input.style.border = "0.1px solid #fff");
      document.querySelector("#pwd_error").innerHTML=""
      document.querySelector(".errmessage2").innerHTML = "";
    }
  });

  // document.querySelectorAll("input").forEach((input) => {
   
   
  // });
  //   document.querySelector("select").onchange = () =>
  //     (document.querySelector("select").style.border = "0.1px solid #fff");
  // });

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
});
