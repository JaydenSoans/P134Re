status ="";
objects = [];
song = "";

function preload(){
    song = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    song.volume(0.5);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,400,400);
    if(status!=""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label=="person"){
                document.getElementById("no_of_objects").innerHTML = "Baby Found";
                console.log("Houston, mission success");
                song.stop();
            }
            else{
                document.getElementById("no_of_objects").innerHTML = "Baby Not Found:(";
                console.log("Houston, we got a problem");
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("no_of_objects").innerHTML = "Baby Not Found:(";
            console.log("Houston, we got a problem");
            song.play();            
        }
    }

}

