# To-Do-List-app-v2
Simple to-do list app (updated version using a database)

Similar project to version 2, except in this one, I use a MongoDB database along with Mongoose to store the items inserted into the lists.

The user just has to write a new item in the small text field at the bottom and press the "+" button to add the new item to the list.
If the user wants to delete an item, he/she just has to press check the checkbox in front of the item. This will cross the item and remove it from the list.

It is possible to create custom lists simply by specifying a custom name list in the URL at the end of the path (ex: https://sheltered-temple-73922.herokuapp.com/Work)

The link of the live version of the app: https://sheltered-temple-73922.herokuapp.com/

In order to run this app locally, make sure that you have the following npm modules installed : Express, BodyParser, Mongoose and lodash. Make sure to also have MongoDB installed on your local machine as well as running MongoDB shell. Run the app.js file using a terminal (make sure the working directory is the project directory !) on localhost:3000 (or any other port if you like) and access the app in a browser using a URL by typing something like http://localhost:3000/ (or any other port).

Using the MongoDB shell you can have access to the local database named todolistDB and using the approriate commands access the two collections "items" and "lists" and every documents inside each of them.

The tools used for this project where mostly Javascript with Node/Express for the server side. One big challenge was the addition of database for this project. As mentionned eariler, the first version did not include a database which meant that the items inserted inside a list would be lost as soon as we restart the server. Moreover, the app could only run locally, which severly restricted its access. Ultimately I was able to solve these issues thanks to bit of research on the Internet like finding how to submit a value stored in a checkbox and tapping into it in the server.

Therefore the big challenge of this project was the implementation of database and and set up its interaction with the Node/Express server. Other difficult issues were the relationships between the two collections involved in the database : "items" and "lists" and managing to render the appropriate custom lists and deleting the items in their respective custom lists. I also had to learn how to deploy a project with a database using Heroku something that I haven't done before prior to this project.
