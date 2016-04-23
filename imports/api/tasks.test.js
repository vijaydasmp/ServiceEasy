/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { myCollection } from './tasks.js';

if (Meteor.isServer) {
  describe('myCollection', () => {
    describe('methods', () => {
      const userId = Random.id();
      let myCollectionId;

      beforeEach(() => {
        myCollection.remove({});
        myCollectionId = myCollection.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'vijaydasmanikpuri',
        });
      });
      // Positive test case 
      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['myCollection.remove'];
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };
        // Run the method with `this` set to the fake invocation
        deleteTask.apply(invocation, [myCollectionId]);
        // Verify that the method does what we expected
        assert.equal(myCollection.find().count(), 0);
      });
    });
  });
}
