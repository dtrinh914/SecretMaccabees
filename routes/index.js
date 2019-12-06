var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/submit', function(req,res, next){
  res.send('This works');
  // gets user info from client and links their name/email in an object 
  let name = req.body.name, email = req.body.email;
  let participants = [];
  for(let i = 0; i < name.length; i++){
      participants.push({name:name[i], email:email[i], id:i});
  }

  // relationships is an array that keeps track of who is giving gifts to whom
  // the array index is the gifter id and the value at that index is the recipient id
  let relationships;
  
  do{
    relationships = [];
    
    //creates bag to draw from
    let bag = [];
    for(let i = 0; i < participants.length; i++){
      bag.push(i);
    }

    //each participant draws from the bag
    for(let i=0; i < participants.length; i++){
      drawName(i,bag,relationships);
    }
  } while(relationships.length !== participants.length); //loop generates a redraw if the last person draws their own name

  function drawName(id,bagArr,relationshipsArr){
    success = false;
    while(success === false){
      rand = Math.floor(Math.random() * bagArr.length);
      //pick random number from bag
      // if number is not the same as id, push that number into relationship array
      if(bagArr[rand] !== id){
        success = true;
        relationshipsArr.push(bagArr.splice(rand, 1)[0]);
      }
      //break out of loop if last item in bag is the same as id
      if(bagArr.length === 1 && bagArr[0] === id){
        success = true;
      }
    }
  }

});





module.exports = router;
