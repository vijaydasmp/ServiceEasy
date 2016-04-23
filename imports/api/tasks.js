import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const myCollection = new Mongo.Collection('myCollection');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('myCollection', function tasksPublication() {
    return myCollection.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });

  });
}
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
 
    const myColl = myCollection.findOne(myCollectionId);
    if (myColl.owner !== this.userId()) {
      // make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    myCollection.remove(myCollectionId);
  },
  'myCollection.setChecked'(myCollectionId, setChecked) {
    check(myCollectionId, String);
    check(setChecked, Boolean);
    
    const myColl = myCollection.findOne(myCollectionId);
    if (myColl.private && myColl.owner !== this.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    myCollection.update(myCollectionId, { $set: { checked: setChecked } });
  },
  'myCollection.setPrivate'(myCollectionId, setToPrivate) {
    check(myCollectionId, String);
    check(setToPrivate, Boolean);
 
    const task = myCollection.findOne(myCollectionId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    myCollection.update(myCollectionId, { $set: { private: setToPrivate } });
  },
});