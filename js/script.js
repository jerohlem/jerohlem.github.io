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

//build a srcset for each image on the page
function buildImgSrcSet(){
  for (let i=0; i<IMAGES.length-1; i++) {
    let imgSrc = IMAGES[i].getAttribute("src");
    imgSrc = imgSrc.split("_")[0];
    let srcSet = makeSrcSet(imgSrc);
    IMAGES[i].setAttribute("srcset", srcSet);
    let type = IMAGES[i].getAttribute("data-type");
    let sizes = SIZES[type];
    IMAGES[i].setAttribute("sizes", sizes);
  }
}

//takes an image name and makes a sourceset for filenames
//in the form of "name_size.jpg sizew"
function makeSrcSet(imgSrc) {
  let markup = [];
  let width = 400;

  for (let i=0; i<5; i++) {
    markup[i] = imgSrc + "_" + width + ".jpg " + width + "w";
    width+=400;
  }
  return markup.join();
}

//sets the large image to the passed in image
function showPic(img) {
  BIGPIC.setAttribute("srcset", img.getAttribute("srcset"));

}

//checks if there are images on the page before trying to build srcset
if(IMAGES[0]){
  buildImgSrcSet();

  //set the large image to view the first image in the thumbnails
  BIGPIC.setAttribute("srcset", IMAGES[0].getAttribute("srcset"));
  BIGPIC.setAttribute("sizes", SIZES[BIGPIC.getAttribute("data-type")]);

  //listen for clicks on any thumbnail and call showPic when clicked
  for (let i=0; i<IMAGES.length-1; i++) {
    IMAGES[i].addEventListener("click", function(){showPic(this);}, false);
  }
}
