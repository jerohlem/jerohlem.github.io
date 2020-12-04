//Grab the form elements
const NAME = document.querySelector("#nameBox");
//const email = document.querySelector("#emailBox");
const MESSAGE = document.querySelector("#messageBox");

const IMAGES = document.querySelectorAll("img");
const SIZES = {bigPhoto: "60vw", thumbnail: "(max-width: 799px) 60vw, 150px"};

const BIGPIC = document.querySelector("#bigPhoto");

//called when clicking on send button on contact form
function sendMessage() {
  let msgName = NAME.value;

  //encode data for use in mailto url
  let msgText = encodeURIComponent(MESSAGE.value);
  let msgSubject = encodeURIComponent("A message from " + msgName);

  //construct the mailto url
  let emailHref = "mailto:j.ohlemacher+siteMessage@gmail.com"
    + "?subject=" + msgSubject
    + "&body=" + msgText
  ;

//create html element for link and auto click it
  let newLink = document.createElement("a");
  newLink.href = emailHref;
  newLink.click();
}

function buildImgSrcSet(){
  for (let i=0; i<IMAGES.length; i++) {
    let imgSrc = IMAGES[i].getAttribute("src");
    imgSrc = imgSrc.split("_")[0];
    let srcSet = makeSrcSet(imgSrc);
    IMAGES[i].setAttribute("srcset", srcSet);
    let type = IMAGES[i].getAttribute("data-type");
    let sizes = SIZES[type];
    IMAGES[i].setAttribute("sizes", sizes);
  }
}

function makeSrcSet(imgSrc) {
  let markup = [];
  let width = 400;

  for (let i=0; i<5; i++) {
    markup[i] = imgSrc + "_" + width + ".jpg " + width + "w";
    width+=400;
  }
  return markup.join();
}

function showPic(img) {
  BIGPIC.setAttribute("srcset", img.getAttribute("srcset"));

}

//checks if there are images on the page before trying to build srcset
if(IMAGES[0]){
  buildImgSrcSet();
  BIGPIC.setAttribute("srcset", IMAGES[0].getAttribute("srcset"));

  for (let i=0; i<IMAGES.length-1; i++) {
    IMAGES[i].addEventListener("click", function(){showPic(this);}, false);
  }
}
