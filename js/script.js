//Grab the form elements
const name = document.querySelector("#nameBox");
//const email = document.querySelector("#emailBox");
const message = document.querySelector("#messageBox");

function sendMessage() {
  let msgName = name.value;

  //encode data for use in mailto url
  let msgText = encodeURIComponent(message.value);
  let msgSubject = encodeURIComponent("A message from " + msgName);

  //construct the mailto url
  let emailHref = "mailto:j.ohlemacher+siteMessage@gmail.com"
    + "?subject=" + msgSubject
    + "&body=" + msgText
  ;

//create html element for link and auto click it
  let newLink = document.createElement("a");
  newLink.href = emailHref;
  //console.log(newLink);
  newLink.click();


}
