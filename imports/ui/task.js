import { Template } from 'meteor/templating';
 
import { myCollection } from '../api/tasks.js';
 
import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    myCollection.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    myCollection.remove(this._id);
  },
});
