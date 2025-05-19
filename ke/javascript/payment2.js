 document.querySelector("#copy-to-clipboard").onclick = () => copyToClipboard();
 const wallet_address = document.querySelector("#wallet_address");
function copyToClipboard() {
  var copyText = wallet_address.innerHTML;
  navigator.clipboard.writeText(copyText).then(() => {
    // Alert the user that the action took place.
    // Nobody likes hidden stuff being done under the hood!
    if (copyText.length < 1) return;
    alert("Copied wallet to clipboard");
    copied_to_clipboard = true;
  });
}