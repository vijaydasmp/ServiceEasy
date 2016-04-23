import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { myCollection } from '../api/tasks.js';

import './task.js';

import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('myCollection');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();

    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return myCollection.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    return myCollection.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return myCollection.find({ checked: { $ne: true } }).count();
  },
  
  username() {
    return this.userId().username;//Meteor.users.find({_id: this.userId},{fields: {'other': 1}});
  }

});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    Meteor.call('myCollection.insert',text);
    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

});
