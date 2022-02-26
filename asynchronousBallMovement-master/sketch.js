var ball;
var database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    position = database.ref("ball/position");
    position.on("value", readPosition, showError);
}

function draw(){
    background("white");

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }

        drawSprites();
}
}

function writePosition(x,y){
    database.ref("ball/position").set({'x': ball.x+x, 'y': ball.y+y});
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("Error in writing/reading to the the database.");
}