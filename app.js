//jshint esversion:6

const express = require("express"); // require the express module
const bodyParser = require("body-parser"); // require the body-parser module
const mongoose = require("mongoose"); // require mongoose
const _ = require("lodash"); // require the lodash module



const app = express(); // initialize the app

app.set('view engine', 'ejs'); // set the view engine for the EJS templates

app.use(bodyParser.urlencoded({extended: true})); // allow us to use body-parser in the app
app.use(express.static("public")); // tells the server that our static files to be served to client are in the file named public

mongoose.connect("mongodb+srv://admin-emmanuel:home123@cluster0.tngp1.mongodb.net/todolistDB",{useNewUrlParser:true}); // create a Mongodb database and establish a connection with it

const itemsSchema = { // schema for the items
  name:String
};

const Item = mongoose.model("Item",itemsSchema); // creates a collection "items" for our items

const item1 = new Item({ // default item 1
  name: "Welcome to your todolist!"
});

const item2 = new Item({ // default item 2
  name: "Hit the + button to add a new item."
});

const item3 = new Item({ // default item 3
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3]; // array made up of our default itemss

const listSchema = { // schema for a List document
  name:String,
  items:[itemsSchema]
};

const List = mongoose.model("List",listSchema);  //creates a collection of lists




app.get("/", function(req, res) { // home route

  Item.find({},function(err,foundItems){ // finds the items in our items collection
    if(foundItems.length === 0){ // checks if the default set of items is empty

      Item.insertMany(defaultItems,function(err){ // inserts default items into the items collection
        if(err){
          console.log(err);
        } else {
          console.log("Insertion sucessful !");
        }
      });
      res.redirect("/"); // redirects to home page
    } else{  // case where the default list exists
      res.render("list", {listTitle: "Today", newListItems: foundItems}); // render the page
    }
  });

});

app.get("/:customlistName", function(req,res){ // route for a custom list

  const customListName = _.capitalize(req.params.customlistName); // store a capitalized version of the parameter

  List.findOne({name:customListName}, function(err,foundList){ // try to find the list

    if(!err){
      if(!foundList){
        // create a new list
        const list = new List({
          name:customListName,
          items:defaultItems
        });

        list.save();

        res.redirect("/"+customListName); // redirect to the current route

      } else{
        // Show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });



});

app.post("/", function(req, res){ // route accessed when we submit a new item

  const itemName = req.body.newItem; // takes up the name of the item
  const listName = req.body.list; // takes up the name of the list

  const item = new Item({ // create an item document
    name:itemName
  });

  if(listName === "Today"){
    item.save(); // save the item into the items collection (the default list)
    res.redirect("/"); // redirect to home page

  } else{
    List.findOne({name:listName},function(err, foundList){ // find the custom the user was on
      foundList.items.push(item); // add new item to the items array of that list
      foundList.save(); // save List document

      res.redirect("/"+ listName); // redirect to custom list
    });
  }




});


app.post("/delete", function(req, res){

  const checkedItemId = req.body.checkbox; // stores the item id
  const listName = req.body.listName; // stores the list name

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId,function(err){ // find and remove the item thanks to the id
      if(!err){
        console.log("Checked item removed !");
        res.redirect("/"); // redirect to the home page
      }
    });
  } else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}} , function(err,foundList){ // find and update an item among an array of items in a list document
      if(!err){
        res.redirect("/" + listName); // redirect to custom list
      }
    });
  }


});


app.get("/about", function(req, res){
  res.render("about"); // render the about page
});

let port = process.env.PORT; // let port be the port Heroku has set up
if (port == null || port == "") { // if it is not set up or port is an empty string
  port = 3000;
}

app.listen(port, function() { // connects our app to the HTTPS port 3000
  console.log("Server has started sucessfully");
});
