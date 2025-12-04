let gif;
let frameSlider;
let sound; // サウンドオブジェクトを格納する変数
let index = 0;
let index_old;
let maxFrame;
let uX, uY;
let snd = [];
let bar_y;

// Load the image.
function preload() {
  gif = loadImage("階段を降りる人アニメ正方形.gif");
  snd[0] = loadSound('flipbook01_short.wav');
  snd[1] = loadSound('flipbook02_short.wav');
  snd[2] = loadSound('flipbook03_short.wav');
}

function setup() {
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  createCanvas(windowWidth, windowWidth);
  ww = windowWidth;
  wh = ww;
  bar_y = wh*0.86;

  // Get the index of the last frame.
  maxFrame = gif.numFrames() - 1;
/*  
  // Create a slider to control which frame is drawn.
  frameSlider = createSlider(0, maxFrame);
  frameSlider.position(ww*0.1, ww*1.1);
  frameSlider.size(ww*0.8);
*/
}

function draw() 
{
  background(255);


  // タッチがある場合はタッチ座標を使用し、ない場合はマウス座標を使用

     if (touches.length > 0) {
        uX = touches[0].x;
        uY = touches[0].y;
      } else {
        uX = mouseX;
        uY = mouseY;
      }

  if(uX>=ww*0.1 && uX<=ww*0.9)
  {
    index = (int)(map(uX, ww*0.1, ww*0.9, 0, maxFrame));
  }

  if(uX<ww*0.1)
  {
    index = 0;
  }
  if(uX>ww*0.9)
  {
    index = maxFrame;
  }
  
  if(index != index_old)
  {
    snd[index%3].stop();
    snd[index%3].play();
  }
  
  // Set the GIF's frame.
  gif.setFrame(index);
  
  // Display the image.
  image(gif, 0, 0, ww,wh);

  // さわるバーを描く
  fill(255,200,200);
  noStroke();
  rect(ww*0.1, bar_y, ww*0.8, ww*0.1);
  ellipse(ww*0.1, bar_y+ww*0.05, ww*0.1, ww*0.1);
  ellipse(ww*0.9, bar_y+ww*0.05, ww*0.1, ww*0.1);
  
  fill(255);
  //文字の設定
  textAlign(CENTER);
  textSize(ww*0.07);

  //カウント表示
  text(index, ww/2, bar_y+ww*0.075);

  index_old = index;
}

// On mouse click
function mousePressed() 
{
    snd[0].play();
          uX = mouseX;
        uY = mouseY;

}

function touchMoved() 
{
  uX = touches[0].x;
  uY = touches[0].y;
}
