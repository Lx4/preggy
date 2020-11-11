var img = new Image();
img.crossOrigin = "anonymous";
img.src = "./secret.jpg";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

img.onload = function () {
  setCanvasSize(
    Math.floor((window.innerWidth * 80) / 100),
    (window.innerHeight * 70) / 100,
    0.01
  );
  scaleToFit(this);
};

document.getElementById("lock").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("myAudio").play();
  gsap.to("#square-lt", {
    duration: 10,
    x: -window.innerWidth / 2,
    y: -window.innerHeight / 2,
  });
  gsap.to("#square-rt", {
    duration: 10,
    x: window.innerWidth / 2,
    y: -window.innerHeight / 2,
  });
  gsap.to("#square-lb", {
    duration: 10,
    x: -window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  gsap.to("#square-rb", {
    duration: 10,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  gsap.to("#lock, #text-button", {
    opacity: 0,
    duration: 0.2,
  });
  gsap.to("#text-final", {
    opacity: 1,
    delay: 8,
    duration: 4,
  });

  const maxRatio = window.devicePixelRatio || 1;
  let ratio = 0.01;
  setInterval(() => {
    ratio <= 0.21 ? (ratio += 0.001) : (ratio = maxRatio);

    console.log(ratio);
    setCanvasSize(
      Math.floor((window.innerWidth * 80) / 100),
      (window.innerHeight * 70) / 100,
      ratio
    );
    scaleToFit(img);
  }, 50);
});

//  HELPERS

function setCanvasSize(width, height, dpr) {
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

function scaleToFit(img) {
  // get the scale
  var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  var x = canvas.width / 2 - (img.width / 2) * scale;
  var y = canvas.height / 2 - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}
