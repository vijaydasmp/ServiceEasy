import { Template } from 'meteor/templating';
 
import { myCollection } from '../api/tasks.js';
 
import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    myCollection.update(this._id, {
      $set: { checked: ! this.checked },
    });
    Meteor.call('myCollection.setChecked',this._id, !this.checked);
  },
  'click .delete'() {
    //myCollection.remove(this._id);
    Meteor.call('myCollection.remove',this._id);
  },
  'click .toggle-private'() {
    Meteor.call('myCollection.setPrivate', this._id, !this.private);
  },

});


Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
