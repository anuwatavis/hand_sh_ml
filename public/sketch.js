let video;
let classifier;
let modelURL = './model/';
let label = "waiting...";
var vid;
var vid2;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 800);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  fox = createVideo("./rabbit_1001_1.mp4");
  duck = createVideo("./rabbit_1001_2.mp4");
  rabbit = createVideo("./rabbit_1001.mp4");
  duck.loop()
  fox.loop()
  rabbit.loop()




  // STEP 2.1: Start classifying
  classifyVideo();
}

// STEP 2.2 classify!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
}


// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;

  if(label === 'Class 6'){
    fox.stop();
    duck.stop();
    rabbit.stop();
  }

  //class 1 = fox, class 2 = rabbit, class 3 = duck
  if(label ==='Class 5'){
    duck.loop()
    duck.speed(1);
    fox.stop();
    rabbit.stop();
  }

  if(label==='Class 1'){
    fox.loop()
    fox.speed(1);
    duck.stop();
    rabbit.stop();
  }

  if(label==='Class 2'){
    rabbit.loop()
    rabbit.speed(1);
    duck.stop();
    fox.stop();
  }


  classifyVideo();
}