
function setCookie(token) {
    // alert("called")
    // console.log(user);
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    // document.cookie=`email=${email} ; ${expires}`
    // document.cookie = `user=${user} ; ${expires}`;
    document.cookie = `token=${token} ; ${expires}`;
    // let navigate;
    // const params = new URLSearchParams(window.location.search);
    // for (const param of params) {
    //   navigate = param[0];
    // }
    // if (navigate) return window.location.replace(navigate);
    // window.location.replace("/dashboard.html");
  }
  



  const resend_login_code = async (data) => {
    console.log(data)
    try {
      document.querySelector("#resend_code").innerHTML = "proccessing...";
      const response = await fetch(
       "https://crescentpips-backend.glitch.me/api/user/resend_login_code",
        // "http://localhost:5000/api/user/resend_login_code",
  
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({user:data.user}),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.error) {
        document.querySelector(".errMessage").innerHTML = result.errMessage;
        document.querySelector("#resend_code").innerHTML = "try again";
        return;
      }
      document.querySelector("#resend_code").innerHTML = "success";
    //   setCookie(result.token);
    //  window.location.replace("/joint_account")
      // let demo=getCookie("demo")
      // demo == 'true' ? window.location.replace("/demo"): window.location.replace("/dashboard.html")
  
    } catch (err) {
      document.querySelector(".errMessage").innerHTML = err.message;
      document.querySelector("#resend_code").innerHTML = "try again";
    }
  };


  document.querySelector("#resend_code").onclick=()=>resend_login_code({user:getCookie("user"),
})



const verify_login_code = async (data) => {
    try {
      document.querySelector("#verify_login").innerHTML = "proccessing...";
      const response = await fetch(
       "https://crescentpips-backend.glitch.me/api/user/verify_login_code",
        // "http://localhost:5000/api/user/verify_login_code",
  
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.error) {
        document.querySelector(".errMessage").innerHTML = result.errMessage;
        document.querySelector("#verify_login").innerHTML = "try again";
        return;
      }
      document.querySelector("#verify_login").innerHTML = "success";
      setCookie(result.token);
     window.location.replace("/joint_account")
      // let demo=getCookie("demo")
      // demo == 'true' ? window.location.replace("/demo"): window.location.replace("/dashboard.html")
  
    } catch (err) {
      document.querySelector(".errMessage").innerHTML = err.message;
      document.querySelector("#verify_login").innerHTML = "try again";
    }
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




  document.querySelector("#verify_login").onclick=()=>{
event.preventDefault()
const primary_email_code=document.querySelector("#primary_email_code")
const secondary_email_code=document.querySelector("#secondary_email_code")

if(!primary_email_code.value)return primary_email_code.style.border="2px solid red"
if(!secondary_email_code.value)return secondary_email_code.style.border="2px solid red"

verify_login_code({
user:getCookie("user"),
primary_email_code:primary_email_code.value,
secondary_email_code:secondary_email_code.value
})
}


document.querySelectorAll("input").forEach((input) => {
    document.querySelector(".errMessage").innerHTML = "";
    input.onkeyup = () => (input.style.border = "0.1px solid #fff");
  });

  