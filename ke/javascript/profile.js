const show_err = (txt) => (txt.style.color = "red");
const first_name_txt = document.querySelector("#first_name_txt");
const last_name_txt=document.querySelector("#last_name_txt")
const email_txt = document.querySelector("#email_txt");
const phone_number_txt = document.querySelector("#phone_number_txt");

const update_user = async (userInformation) => {
  
  try {
    document.querySelector("#saveuserBtn").innerHTML = "Proccessing...";

    const response = await fetch(
      // "http://localhost:5000/api/user/updateprofileInfo", 
    "https://softjovial-backend.glitch.me/api/user/updateprofileInfo",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInformation),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#profile_err").innerHTML = result.errMessage;
      document.querySelector("#saveuserBtn").innerHTML = "Try again";
      return;
    }
    document.querySelector("#saveuserBtn").innerHTML = "Success";
  } catch (error) {
    document.querySelector("#profile_err").innerHTML = error.message;
    document.querySelector("#saveuserBtn").innerHTML = "Try again";
  }
};

document.querySelector("#saveuserBtn").onclick = () => {
  event.preventDefault();
  const first_name = document.querySelector("#first_name");
  const last_name= document.querySelector("#last_name");
  const email = document.querySelector("#email");
  const phone_number = document.querySelector("#phone_number");

  if (!first_name.value) return show_err(first_name_txt);
  if (!last_name.value) return show_err(last_name_txt);
  if (!email.value) return show_err(email_txt);
  if (!phone_number.value) return show_err(phone_number_txt);

  update_user({
    user: getCookie("user"),
    token: getCookie("token"),
    first_name:first_name.value,
    last_name: last_name.value,
    email: email.value,
    phone_number: phone_number.value,
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
     first_name_txt.style.color = "#263238";
    last_name_txt.style.color = "#263238";
    email_txt.style.color = "#263238";
    phone_number_txt.style.color = "#263238";
  };
});

const handle_user_result = (result) => {
  console.log(result);
  // document.querySelector("#my_profile").src =
  //   result.user_icon || "assets/images/photo.png";
  // document.querySelector("#first_name").innerHTML = result.full_name;
  // document.querySelector("#my_email").innerHTML = result.email;

  document.querySelector("#first_name").value = result.first_name;
  document.querySelector("#last_name").value = result.last_name;

  document.querySelector("#email").value = result.email;
  document.querySelector("#phone_number").value = result.phone_number || "";
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      //   "/api/users/myaccount",
      // "http://localhost:5000/api/user/find",
      "https://softjovial-backend.glitch.me/api/user/find",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    // user_result = result.message;
    console.log(result);
    if (result.error) {
      //   document.querySelector(".email_message").innerHTML = "";
      //   errMessage_container.innerHTML = result.errMessage;
      //   errMessage_container.style.display = "block";

      // const container_fluid = document.querySelector(".container-fluid");
      // container_fluid.style.color = "red";
      // container_fluid.style.margin = "2px";
      // container_fluid.style.textAlign = "center";
      // container_fluid.innerHTML = result.errMessage;
    } else {
      //   document.querySelector("#email").href = `mailto:${result.message.email}`;
      //   document.querySelector("#email").innerHTML = `${result.message.email}`;
      //   // alert(result.message.account_is_verified);
      //   if (result.message.account_is_verified == true) {
      //     const d = new Date();
      //     d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
      //     let expires = "expires=" + d.toUTCString();
      //     document.cookie = `account_isverified=${true} ; ${expires}`;
      //     window.location.replace("dashboard.html");
      //   }

      handle_user_result(result.message);
    }
  } catch (error) {
    // const container_fluid = document.querySelector(".container-fluid");
    // container_fluid.style.color = "red";
    // container_fluid.style.margin = "2px";
    // container_fluid.style.textAlign = "center";
    // container_fluid.innerHTML = error.message;
  }
})();
