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
//   return "";
  window.location.href = "/login.html";
  return
};





const save_government_ID = async (userInformation) => {
    // alert("hey");
    try {
      document.querySelector("#submit").innerHTML = "Proccessing...";
  
      const response = await fetch(
        "https://crescentpipsltdbackend-production.up.railway.app/api/user/upload/ID",
         {
        method: "POST",
        //   headers: { "content-type": "application/json" },
        body: userInformation,
      });
      const result = await response.json();
      console.log(result);
      if (result.error) {
        document.querySelector(".errMessage").innerHTML = result.errMessage;
        document.querySelector("#submit").innerHTML = "Try again";
        return;
      }
      document.querySelector("#submit").innerHTML = "Success";
    //   window.location.reload();
    } catch (error) {
      document.querySelector(".errMessage").innerHTML = error.message;
      document.querySelector("#submit").innerHTML = "Try again";
    }
  };
  

  document.querySelector("#submit").onclick = () => {
    
    event.preventDefault();
    const errMessage = document.querySelector("#errMessage");
    const government_id = document.querySelector("#government_id");
  
    if (!government_id.value){ 
        errMessage.innerHTML="Please Upload a valid government ID"
        government_id.style.border="2px solid red"
        return
     }
    const user = getCookie("user");
    const token = getCookie("token");
  
    const formdata = new FormData();
    formdata.append("passport", government_id.files[0]);
    formdata.append("token", token);
    formdata.append("user", user);
    save_government_ID(formdata);
  };
  


    document.querySelector("input").onclick=()=> {
    document.querySelector("#errMessage").innerHTML = "";
    document.querySelector("input").style.border = "0.1px solid #fff"
  };





  document.querySelector("#upload_later").onclick=async()=>{
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "https://crescentpipsltdbackend-production.up.railway.app/api/user/find",
      // "http://localhost:5000/api/user/find",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } 
      // result.message.last_login =='demo_account' ?window.location.replace("/demo"):""
if(result.message.account_type =="KES" ){
  // setCookie(result.message._id, result.token);
  window.location.replace("/ke/dashboard.html")
  return
}
else{
    // setCookie(result.message._id, result.token);
window.location.replace("/dashboard.html")
}


    // }
  } catch (error) {
    console.log(error)
    alert(error.message);
  }

  }