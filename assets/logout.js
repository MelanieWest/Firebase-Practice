const btnLogout2 = document.getElementById("btnLogout2");

btnLogout2.addEventListener('click',e=>{
    firebase.auth().signOut();
    window.location.href="login.html";
});