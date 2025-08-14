// function setSwitcher() {
//     const d = new Date();
//     d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = `demo=false`;

//   alert("switched to real account")
//   window.location.replace("/dashboard.html")

//   }


const switch_account = async () => {
  
    const user=getCookie("user")
    const token=getCookie("token")
    try {
    //   document.querySelector("#login").innerHTML = "proccessing...";
      const response = await fetch(
        "https://crescentpipsltdbackend-production.up.railway.app/api/user/switch_account",
        // "http://localhost:5000/api/user/switch_account",
  
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({token,user, account_type:"real_account" }),
        },
      );
      const result = await response.json();
      console.log(result);
    if(result.error) {
      return alert(result.errMessage)
     } else {
      result.message.account_type =="KES"?window.location.replace("/ke/dashboard.html"):window.location.replace("/dashboard.html")

     }
    //   if(result.error)return alert(result.errMessage)
    //  window.location.replace("/dashboard.html")

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


