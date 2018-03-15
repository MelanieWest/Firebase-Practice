//console.log("We are here!");


//this element will be used to display data
const momDisp = document.getElementById("momDisp");
const dadDisp = document.getElementById("dadDisp");

//these next two 'blocks' or groups can display a single element each from the db
const dbRefParents = firebase.database().ref().child('parents');

const dbRefmom = firebase.database().ref('parents').child('mom');
dbRefmom.on('value',snap=>momDisp.innerText=snap.val());

const dbRefdad = firebase.database().ref('parents').child('dad');
dbRefdad.on('value',snap=>dadDisp.innerText=snap.val());


//this will be used for objects
const preObject = document.getElementById("object");
dbRefObject = firebase.database().ref().child('kids');
dbRefObject.on('value',snap=>{
    preObject.innerText = JSON.stringify(snap.val(),null,3)
});

//this is going to extract child events from an object I already have from the db
const uoList = document.getElementById("list");

//we already have the snapshot data from the 'parents' key; extract child data from it
const dbRefList = dbRefParents.child('talents')
//listen for the 'child added' event, which just means a list item has been added at some point in time
dbRefList.on('child_added',snap=>{
    const li = document.createElement('li');
    li.innerText = snap.val();
    //track the id (key) for updating the list later on
    li.id = snap.key;
    uoList.appendChild(li);
});
//continuing with the list, we're going to start listening for changes to the list
dbRefList.on('child_changed',snap=>{
    //the id we assigned to each list item is the key of that item
    const liChanged=document.getElementById(snap.key);
    liChanged.innerText = snap.val();
});
//still on the list, now listen for removal of items
dbRefList.on('child_removed',snap=>{
    //the id we assigned to each list item is the key of that item
    const liToRemove =document.getElementById(snap.key);
    liToRemove.remove();
});

//these next couple lines are used for entering new data, to the 'kids' object
var count = 0
//this isn't actually used, since we have the click event on the page...
const submitBtn = document.getElementById("submitBtn");

//this sends new 'kids' to the database. These will overwrite old values
function submitClick(){

    console.log("Clicked!");
    var mainText = document.getElementById("mainText");
    console.log(mainText.value);

    //console.log(submitBtn);

    //right now auth is disabled
    
    var firebaseRef = firebase.database().ref();

    //this next line created entries under 'kids' with a key value equal to the count.
    //every time the program refreshes the numbered values can be overwritten, since count resets.
  //  firebaseRef.child("kids").child(count).set(mainText.value);

  //this next line will create entries under 'kids' with unique key values each time so nothing will overwrite
    firebaseRef.child("kids").push().set(mainText.value);
    mainText.value = " ";
    count++;

} 