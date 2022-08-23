const token_container = document.querySelector(".token_container");
const copy_btn = document.querySelector(".copy");
const box = document.querySelector(".box");
const search_params = new URLSearchParams(location.search);
const token = search_params.get("user") || search_params.get("token");
token_container.innerHTML = token;
copy_btn.addEventListener("click", async () => {
    try {
        if (window.my_timeout) {
            clearTimeout(window.my_timeout);
        }
        await navigator.clipboard.writeText(token);
        let bkp = copy_btn.innerHTML;
        copy_btn.innerHTML = "Copied To Clipboard";
        window.my_timeout = setTimeout(() => {
            copy_btn.innerHTML = bkp;
        }, 3000);
    } catch (err) {
        alert("Failed To Copy to Clipboard! Kindly Copy it Manually by Clicking the Token String");
        console.log(err);
    }
});const token_container = document.querySelector(".token_container");
const copy_btn = document.querySelector(".copy");
const box = document.querySelector(".box");
const search_params = new URLSearchParams(location.search);
const token = search_params.get("user") || search_params.get("token");
token_container.innerHTML = token;
copy_btn.addEventListener("click", async () => {
    try {
        if (window.my_timeout) {
            clearTimeout(window.my_timeout);
        }
        await navigator.clipboard.writeText(token);
        let bkp = copy_btn.innerHTML;
        copy_btn.innerHTML = "Copied To Clipboard";
        window.my_timeout = setTimeout(() => {
            copy_btn.innerHTML = bkp;
        }, 3000);
    } catch (err) {
        alert("Failed To Copy to Clipboard! Kindly Copy it Manually by Clicking the Token String");
        console.log(err);
    }
});