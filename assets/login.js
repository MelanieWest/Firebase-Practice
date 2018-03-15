(function(){



// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyA_oFmNvMjeV3CD24tnFPGiAFWC-J6t1BI",
//   authDomain: "fir-practice-406cc.firebaseapp.com",
//   databaseURL: "https://fir-practice-406cc.firebaseio.com",
//   projectId: "fir-practice-406cc",
//   storageBucket: "fir-practice-406cc.appspot.com",
//   messagingSenderId: "385687265563"
// };
// firebase.initializeApp(config);


const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogout = document.getElementById("btnLogout");


//add login event, on click of login button
btnLogin.addEventListener('click', e=>{
    const email= txtEmail.value;
    const pass = txtPassword.value;
    //Authentication:
    const auth = firebase.auth();
    //sign in an existing user and return a promise
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e=>console.log(e.message));
})


//add new user signup event, on click of sign up button
btnSignUp.addEventListener('click',e=>{
    //we are currently not validating if this is an actual email:
    const email= txtEmail.value;
    const pass = txtPassword.value;
    //Authentication:
    const auth = firebase.auth();
    //create a new user and return a promise
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e=>console.log(e.message));  
})

//activate logout button
btnLogout.addEventListener('click',e=>{
    firebase.auth().signOut();
});

//monitor auth 'state'- fires when state changes (user logs in or out):
//on login, firebaseUser is filled w/new user; on logout it becomes null
firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
        window.location.href="index.html";

    }else{
        console.log("not logged in");
        btnLogout.classList.add('hide');
    }
})


}());
