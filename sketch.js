//Create variables here
var database;
var dog, foodS, foodStock;
var image_1, image_2;

function preload()
{
	//load images here
  image_1 = loadImage('Dog.png')
  image_2 = loadImage('happyDog.png')
}

function setup() {
  database = firebase.database();
	createCanvas(700, 700);
  dog = createSprite(350,350,1,1);
  dog.addImage(image_1)
  dog.scale = 0.2

  foodStock = database.ref('Food');
  foodStock.on('value',readStock);
}


function draw() { 
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(image_2);
    dog.scale = 0.2
  }

  drawSprites();
  //add styles here
  fill('white');
  noStroke();
  textSize(20)
  text("Note: Press UP_ARROW key to feed Drago(i.e Dog) Milk",120,50);
  text("Total milk bottles: 20",150,220)
  text("Remaining milk bottles: "+foodS,150,250)

}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }else{
    x = x-1
  }

  database.ref('/').update({
    Food:x
  })
}
