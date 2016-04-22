import { Mongo } from 'meteor/mongo';
 
myCollection = new Mongo.Collection('myCollection');

var myData = {
   key1: "Task 1...",
   key2: "Task 2...",
   key3: "Task 3...",
   key4: "Task 4...",
   key5: "Task 5..."
}
myCollection.insert(myData);