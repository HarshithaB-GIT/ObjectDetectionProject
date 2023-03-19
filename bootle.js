status = "";
object=[];
function preload() {
    img = loadImage("Bootle.jpeg") ;
}
function setup(){
    canvas = createCanvas(640,420) ;
    canvas.center() ;
    objectDetector = ml5.objectDetector("cocossd",modelLoaded) ;
    document.getElementById("status").innerHTML = "Status : Dectecting objects";
}
function modelLoaded() {
    console.log("Model is initialized");
    status="true";
    objectDetector.detect(img,gotResults);
}
function gotResults(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}
function draw(){
    image(img,0,0,640,420);
    if(status !="") {
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status : Detecting Objects";
            fill("Red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("Red") ;
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
          }
    }
}