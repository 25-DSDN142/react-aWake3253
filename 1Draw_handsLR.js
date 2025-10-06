// ----=  HANDS  =----
// USING THE GESTURE DETECTORS (check their values in the debug menu)
// detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"
let song;
let songStart = true;
let lastGesture = "";
let vocal, drum,bass,synth;
// function mousePressed(){
  function prepareInteraction() {
  drum = loadSound('sounds/drums.mp3')
  bass = loadSound('sounds/bass.mp3')
  synth = loadSound('sounds/synth.mp3')
  vocal = loadSound('sounds/vocal.mp3')

}

function drawInteraction(faces, hands) {
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
 // vocal.setVolume(1)
  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // console.log(hand);
    if (showKeypoints) {
      drawConnections(hand);
    }

    let middleFingerMcpX = hand.middle_finger_mcp.x;
    let middleFingerMcpY = hand.middle_finger_mcp.y;
    /*
    Start drawing on the hands here
    */

    let whatGesture = detectHandGesture(hand);


    let fingers = fingerMap(hand);

     if (whatGesture == "Thumbs Up" && lastGesture !== "Thumbs Up") {
       drum.setVolume(drum.getVolume() > 0 ? 0 : 1);
     }

    if (whatGesture == "Pinky" && lastGesture !== "Pinky") {
      bass.setVolume(bass.getVolume() > 0 ? 0 : 1);

    }

    if (whatGesture == "Pointing" && lastGesture !== "Pointing") {
      synth.setVolume(synth.getVolume() > 0 ? 0 : 1);

    }

    if (whatGesture == "Middle" && lastGesture !== "Middle") {
      vocal.setVolume(vocal.getVolume() > 0 ? 0 : 1);

    }
    lastGesture = whatGesture;

    /*if (hand.handedness === "Right") {
      rect(middleFingerMcpX, middleFingerMcpY, 100)
    }

    if (hand.handedness === "Left") {
     ellipse(middleFingerMcpX, middleFingerMcpY, 100)
    }
    lastGesture = whatGesture;
    /*
    Stop drawing on the hands here
    */
  }
}
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 
  //------------------------------------------------------




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
    circle(element.x, element.y, 10);
  }
  pop()
  
}