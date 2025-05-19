
function loguserout() {
    const cookies = document.cookie.split(";");
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.replace("/login.html");
  }
  
  document.querySelector("#logout").onclick = () => {
    event.preventDefault();
    loguserout();
  };
  
  
  const handlesetprofile = (result) => {
    // alert(result)
    document.querySelector("#my_profile").src=result.passport
 };
  
  (async () => {
    const user = getCookie("user");
    const token = getCookie("token");
    try {
      const response = await fetch(
        //   "/api/users/myaccount",
        // "http://localhost:5000/api/user/find",
        "https://softjovial-backend.glitch.me/api/user/find",
      // "http://localhost:5000/api/user/find",
        // "/api/user/myaccount",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token, user }),
        },
      );
      const result = await response.json();
      // user_result = result.message;
      console.log("result",result);
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
        handlesetprofile(result.message);
      }
    } catch (error) {
      // const container_fluid = document.querySelector(".container-fluid");
      // container_fluid.style.color = "red";
      // container_fluid.style.margin = "2px";
      // container_fluid.style.textAlign = "center";
      // container_fluid.innerHTML = error.message;
    }
  })();
  