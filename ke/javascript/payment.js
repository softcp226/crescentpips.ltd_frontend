// document.querySelector("#copy-to-clipboard").onclick = () => copyToClipboard();
// function copyToClipboard() {
//   var copyText = wallet_address.innerHTML;
//   navigator.clipboard.writeText(copyText).then(() => {
//     // Alert the user that the action took place.
//     // Nobody likes hidden stuff being done under the hood!
//     if (copyText.length < 1) return;
//     alert("Copied wallet to clipboard");
//     copied_to_clipboard = true;
//   });
// }

const getDepositID = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

// function copyToClipboard() {
//   var copyText = wallet_address.innerHTML;
//   navigator.clipboard.writeText(copyText).then(() => {
//     // Alert the user that the action took place.
//     // Nobody likes hidden stuff being done under the hood!
//     if (copyText.length < 1) return;
//     alert("Copied wallet to clipboard");
//     copied_to_clipboard = true;
//   });
// }
// const display_address = (selectedOption, wallet_container, data) => {
//   switch (selectedOption) {
//     case "qr_code":
//       document.querySelector("#qr_code").style.display = "inline-block";
//       document.querySelector("#wallet_address").style.display = "none";
//       document.querySelector(
//         "#wallet_note",
//       ).innerHTML = `Open your Crypto.com App, scan the qr code above and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method} `;
//       //  else {
//       // document.querySelector(
//       //   "#wallet_note",
//       // ).innerHTML = `Open your Crypto.com App, copy and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method} to the wallet address above `;
//       // document.querySelector("#qr_code").style.display = "none";
//       // document.querySelector("#wallet_address").style.display =
//       //   "inline-block";
//       // }
//       break;

//     case "wallet_address":
//       // if (wallet_container != "unavailable"){
//       // if (wallet_container != "unavailable") {
//       document.querySelector("#qr_code").style.display = "none";
//       document.querySelector("#wallet_address").style.display = "inline-block";
//       document.querySelector(
//         "#wallet_note",
//       ).innerHTML = `copy and send ${"KES"}${data.deposit_amount} worth of ${data.payment_method}  to the wallet above`;
//       // } else {
//       //   //   document.querySelector("#qr_code").style.display = "none";
//       //   //   document.querySelector("#wallet_address").style.display = "inline-block";
//       //   // }
//       // }else{
//       // document.querySelector("#qr_code").style.display = "none";
//       // document.querySelector("#wallet_address").style.display = "inline-block";
//       // document.querySelector("#wallet_note").innerHTML = `Send ${
//       //   data.currency
//       // }${data.deposit_amount} to the ${data.payment_method} ${
//       //   data.payment_method != "Perfect Money" ? "E-mail" : "ID"
//       // } above `;

//       break;

//     default:
//       document.querySelector("#qr_code").style.display = "none";
//       document.querySelector("#wallet_address").style.display = "inline-block";

//       break;
//   }
// };

const shape_result = (data) => {
  const wallet_address_div = document.createElement("div");
  
  const wallet_icon = document.createElement("img");
  wallet_address_div.id = "wallet_address";
  wallet_icon.id = "qr_code";
  wallet_icon.src = data.payment_method_icon;
  wallet_address_div.className = "wallet_address";
  const text_h3 = document.createElement("h3");
  text_h3.id = "wallet_note";
  
  wallet_address_div.innerHTML = data.payment_wallet;

   const copyBtn = document.createElement("a");
  copyBtn.className = "btn btn-tetiary m-2";

  copyBtn.innerHTML = "Copy Wallet";
  copyBtn.id="copy-to-clipboard"
// copyBtn.onclick = () => copyToClipboard();
  // qr_code_img.src = data.payment_qr_code;
  const nextbtn = document.createElement("a");
  nextbtn.className = "btn btn-dark";
  nextbtn.innerHTML = "I have made payment";
  nextbtn.href = `/ke/submit-receipt.html?${getDepositID()}`;


  text_h3.innerHTML = `copy the bank details above and trasnfer ${"KES"}${data.deposit_amount.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0 to the bank details and click "i have made payment" button to submit payment screenshot `;
 

  document.querySelector(".wallet-container").append(
    // wallet_icon,
    // wallet_address_div,
    // copyBtn,
    // // qr_code_img,
    text_h3,
    // select,
    nextbtn,
    document.createElement("br"),
  );

document.querySelector("#transaction_amount").innerHTML=`${"KES"}${data.deposit_amount.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`

};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://crescentpipsltdbackend-production.up.railway.app/api/user/create_deposit/fetch",
      // "http://localhost:5000/api/user/create_deposit/fetch",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token,
          user,
          deposit_request_id: getDepositID(),
        }),
      },
    );
    // console.log(response);
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);
    shape_result(result.message);
  } catch (err) {
    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
