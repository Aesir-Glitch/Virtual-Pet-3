var dog,HappyDog;
var foodS,foodStock;
var lastFed = 13;

function preload() {
  dogimg = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
  bedroom = loadImage("Bedroom.png")
  washroom = loadImage("Washroom.png")
  garden = loadImage("Garden.png")
}

function setup() {
  database = firebase.database();
  createCanvas(700,500);

  dog = createSprite(600,300,10,10);
  dog.addImage(dogimg);
  dog.scale = 0.15;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed The Dog");
  feed.position(900,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(900,75);
  addFood.mousePressed(addFoods);

  foodObject = new Food();
  }

function draw() { 
  background(46,139,87); 
   
  this.addFood.mousePressed(()=>{
    foodS += 2;
    writeStock(foodS);
  }); 

  this.feed.mousePressed(()=>{
   dog.addImage(dogHappy);
   foodS -= 1;
   writeStock(foodS);
  });

  fill(255,255,255);
  textSize(15);
  if(lastFed>=12) {
    text("Last Fed : " + lastFed%12 + "PM",350,30);
  } else if(lastFed===0) {
    text("Last Fed : 12AM",350,30);  
  } else{
    text("Last Fed : " + lastFed + "AM",350,30)
  }

  text("Food : " + foodS,200,30)

  if(gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(dogimg);
  }

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  foodObject.display();

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
}

function writeStock(x){
  database.ref('/').update({Food:x})  
}

function feedDog() {
  addImage(happyDog);

  foodS -= 1;
  writeStock(foodS);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    lastFed:hour()
  })

}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state) {
  database.ref('/').update({
    gameState : state
  });
}

function Bedroom() {
  background(bedroom,550,500);
}

function Garden() {
  background(garden,550,500);
}

function Washroom() {
  background(washroom,550,500);
}