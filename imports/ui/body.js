import { Template } from 'meteor/templating';
 
import { myCollection } from '../api/tasks.js';
 
import './body.html';
 
Template.body.helpers({
  tasks: [
     {text : 'This is Task 1'},
     {text : 'This is Task 2'},
     {text : 'This is Task 3'} 
  ],
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
  
    // Insert a task into the collection
    myCollection.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});
