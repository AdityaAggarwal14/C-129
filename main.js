song= "";
leftwristx=0;
leftwristy= 0;
rightwristx= 0;
rightwristy= 0;
scoreLeftWrist= 0;

function preload(){
    song= loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristx= results[0].pose.leftWrist.x;
        leftwristy= results[0].pose.leftWrist.y;
        rightwristx= results[0].pose.rightWrist.x;
        rightwristy= results[0].pose.rightWrist.y;
        console.log("LeftWristx= "+leftwristx+"RightWristx"+rightwristx);
        console.log("LeftWristy= "+leftwristy+"RightWristy"+rightwristy);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist= "+scoreLeftWrist);
    }
}


function draw(){
    image(video,0,0,600,500);
    fill('#ADD8E6');
    stroke('#ADD8E6');
    if(scoreLeftWrist>0.2){
        circle(leftwristx,leftwristy,20);
        numberleftwristy= Number(leftwristy);
        remove_decimals= floor(numberleftwristy);
        volume= remove_decimals/500;
        document.getElementById("volume").innerHTML= "volume= "+ volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
