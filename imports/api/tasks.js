import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const myCollection = new Mongo.Collection('myCollection');

Meteor.methods({
  'myCollection.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a myCollection
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    myCollection.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'myCollection.remove'(myCollectionId) {
    check(myCollectionId, String);
 
    myCollection.remove(myCollectionId);
  },
  'myCollection.setChecked'(myCollectionId, setChecked) {
    check(myCollectionId, String);
    check(setChecked, Boolean);
 
    myCollection.update(myCollectionId, { $set: { checked: setChecked } });
  },
});