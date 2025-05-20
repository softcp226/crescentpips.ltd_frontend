const show_err = (txt) => (txt.style.color = "red");
const primary_full_name_txt = document.querySelector("#primary_full_name_txt");
const secondary_full_name_txt=document.querySelector("#secondary_full_name_txt")
const primary_phone_number_txt = document.querySelector("#primary_phone_number_txt");
const secondary_phone_number_txt = document.querySelector("#secondary_phone_number_txt");

const update_user = async (userInformation) => {
  
  try {
    document.querySelector("#saveuserBtn").innerHTML = "Proccessing...";

    const response = await fetch(
      // "http://localhost:5000/api/user/updateprofileInfo", 
    "https://crescentpips-backend.glitch.me/api/user/updateprofileInfo",
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
  const primary_full_name = document.querySelector("#primary_full_name");
  const secondary_full_name= document.querySelector("#secondary_full_name");
  const primary_phone_number = document.querySelector("#primary_phone_number");
  const secondary_phone_number = document.querySelector("#secondary_phone_number");

  if (!primary_full_name.value) return show_err(primary_full_name_txt);
  if (!secondary_full_name.value) return show_err(secondary_full_name_txt);
  if (!primary_phone_number.value) return show_err(primary_phone_number_txt);
  if (!secondary_phone_number.value) return show_err(secondary_phone_number_txt);

  update_user({
    user: getCookie("user"),
    token: getCookie("token"),
    primary_full_name:primary_full_name.value,
    secondary_full_name: secondary_full_name.value,
    primary_phone_number: primary_phone_number.value,
    secondary_phone_number: secondary_phone_number.value,
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
     primary_full_name_txt.style.color = "#263238";
    secondary_full_name_txt.style.color = "#263238";
    primary_phone_number_txt.style.color = "#263238";
    secondary_phone_number_txt.style.color = "#263238";
  };
});

const handle_user_result = (result) => {
  console.log(result);
  // document.querySelector("#my_profile").src =
  //   result.user_icon || "assets/images/photo.png";
  // document.querySelector("#primary_full_name").innerHTML = result.full_name;
  // document.querySelector("#my_primary_phone_number").innerHTML = result.primary_phone_number;

  document.querySelector("#primary_full_name").value = result.primary_full_name;
  document.querySelector("#secondary_full_name").value = result.secondary_full_name;

  document.querySelector("#primary_phone_number").value = result.primary_phone_number;
  document.querySelector("#secondary_phone_number").value = result.secondary_phone_number || "";
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      //   "/api/users/myaccount",
      // "http://localhost:5000/api/user/find",
      "https://crescentpips-backend.glitch.me/api/user/find",
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
      //   document.querySelector(".primary_phone_number_message").innerHTML = "";
      //   errMessage_container.innerHTML = result.errMessage;
      //   errMessage_container.style.display = "block";

      // const container_fluid = document.querySelector(".container-fluid");
      // container_fluid.style.color = "red";
      // container_fluid.style.margin = "2px";
      // container_fluid.style.textAlign = "center";
      // container_fluid.innerHTML = result.errMessage;
    } else {
      //   document.querySelector("#primary_phone_number").href = `mailto:${result.message.primary_phone_number}`;
      //   document.querySelector("#primary_phone_number").innerHTML = `${result.message.primary_phone_number}`;
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
