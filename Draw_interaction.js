//initialises song and gesture control
let song;
let cover;
let songStart = true;
let lastGesture = "";
let bass, drum, synth, vocal;

//initialises song mute state
let drumOn = false;
let bassOn = false;
let synthOn = false;
let vocalOn = false;

//loads all songs from file structure
function prepareInteraction() {
  drum = loadSound('sounds/drums.mp3');
  bass = loadSound('sounds/bass.mp3');
  synth = loadSound('sounds/synth.mp3');
  vocal = loadSound('sounds/vocal.mp3');
  cover = loadImage('images/cover.jpg');
}

//draws interaction on each tick
function drawInteraction(faces, hands) {
 //ensures all songs loop
  if(songStart){
    drum.loop();
    bass.loop();
    synth.loop();
    vocal.loop();

    //sets all stems to muted
    drum.setVolume(0);
    bass.setVolume(0);
    synth.setVolume(0);
    vocal.setVolume(0);

    songStart = false;
  }
 
  // hand loop
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawConnections(hand);
    }

    let whatGesture = detectHandGesture(hand);

    //maps each stem to a gesture, and enables visuals and volume control
     if (whatGesture == "Thumbs Up" && lastGesture !== "Thumbs Up") {
       drum.setVolume(drum.getVolume() > 0 ? 0 : 1);
       drumOn = !drumOn;
     }

    if (whatGesture == "Pinky" && lastGesture !== "Pinky") {
      bass.setVolume(bass.getVolume() > 0 ? 0 : 1);
      bassOn = !bassOn;


    }

    if (whatGesture == "Pointing" && lastGesture !== "Pointing") {
      synth.setVolume(synth.getVolume() > 0 ? 0 : 1);
      synthOn = !synthOn;


    }

    if (whatGesture == "Middle" && lastGesture !== "Middle") {
      vocal.setVolume(vocal.getVolume() > 0 ? 0 : 1);
      vocalOn = !vocalOn;
    }
    lastGesture = whatGesture;

  }

 //face loop
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (face.leftEyebrow && face.rightEyebrow) { //sets up forehead dimensions
      let foreheadX = (face.leftEyebrow.keypoints[2].x + face.rightEyebrow.keypoints[2].x)/2;
      let foreheadY = (face.leftEyebrow.keypoints[2].y + face.rightEyebrow.keypoints[2].y)/2 -40;

      //enables the visual effects
      let pulse = sin(frameCount *0.1) *5;
      let spacing = 40;
      push();
      noStroke();
      //sets up the cover art on the forehead
      let coverWidth = 140;
      let coverHeight = 140;
      imageMode(CENTER);
      image(cover, foreheadX, foreheadY - 90, coverWidth, coverHeight);

      //draw text vertically function
      function drawVerticalText (txt, x, y){
        push();
        translate(x, y);
        rotate(HALF_PI);
        text(txt, 18, 3);
        pop();
      
      }
      //triggers for each gesture
      if (drumOn){
        fill(255, 50, 50, 180);
        circle(foreheadX - spacing *1.5, foreheadY, 30+pulse);
        drawVerticalText("Drums", foreheadX - spacing*1.5, foreheadY+ 35)
      }

      if(bassOn){
        fill(50, 255, 100, 180);
        circle(foreheadX - spacing *0.5, foreheadY, 30+pulse);
        drawVerticalText("Bass", foreheadX - spacing*0.5, foreheadY +35)

      }

      if(synthOn){
        fill(50, 150, 255, 180);
        circle(foreheadX + spacing *0.5, foreheadY, 30+pulse);
        drawVerticalText("Synth", foreheadX + spacing*0.5, foreheadY +35)

      }
      if(vocalOn){
        fill(200, 100, 255, 180);
        circle(foreheadX + spacing *1.5, foreheadY, 30+pulse);
        drawVerticalText("Vocals", foreheadX + spacing*1.5, foreheadY +35)

      }

      pop();
    }
  }
}


function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}



// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()

}