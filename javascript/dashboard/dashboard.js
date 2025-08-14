
const setText=(user)=>{
  check_account_type(user.country)
document.querySelectorAll("#user_passport").forEach(passport=>{
passport.src= user.passport

})

 
}


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
  window.location.href = "/login.html";
};







(async()=>{
    const user = getCookie("user");
    const token = getCookie("token");
    try {
        const response = await fetch(
          "https://crescentpipsltdbackend-production.up.railway.app/api/user/find",
          // "http://localhost:5000https://crescentpipsltdbackend-production.up.railway.app/user/find",

          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ token, user }),
          },
        );
        const result=await response.json()
        console.log(result)
        if(result.error){
  alert(result.errMessage)
        }else{
          result.message.last_login =='demo_account' ?window.location.replace("/demo"):""

setText(result.message)
        }
    } catch (error) {
        alert(error.message)
    }
}

)()
