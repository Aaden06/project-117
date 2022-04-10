function setup(){
    canvas=createCanvas(600,400);
    canvas.position(720, 300);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("guess").innerHTML = "Label: "+results[0].label;
    document.getElementById("number").innerHTML = "Confidence: "+Math.round(results[0].confidence*100)+"%";
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
function clearCanvas(){
    background("white");
}