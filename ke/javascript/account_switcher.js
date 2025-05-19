// const getCookie = (cname) => {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == " ") {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//     // window.location.href = "/login.html";
//   };

const switch_account = async () => {
    const user=getCookie("user")
    const token=getCookie("token")

    try {
    //   document.querySelector("#login").innerHTML = "proccessing...";
      const response = await fetch(
        "https://softjovial-backend.glitch.me/api/user/switch_account",
        // "http://localhost:5000/api/user/switch_account",
  
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({token,user, account_type:"demo_account" }),
        },
      );
      const result = await response.json();
      console.log(result);
     
      if(result.error)return alert(result.errMessage)
      window.location.replace("/demo")
 
  
    } catch (err) {
      alert(err.message)
    }
  };

document.querySelectorAll("#switch_account").forEach(button=>{
    button.onclick=()=>{
      alert("Processing your request, please wait")

        event.preventDefault()
        switch_account()
    }
})


