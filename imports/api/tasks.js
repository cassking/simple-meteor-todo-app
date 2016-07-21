import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo' ;
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

//publish tasks
if (Meteor.isServer) {
  //this code only runs onserver
  Meteor.publish('tasks', function tasksPublication(){
return Tasks.find();

  });
}
Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    //make sure the user is logged in before inserting a tasks
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.insert({
          text: text,
          createdAt: new Date(), //current time
          owner: this.userId,
          username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set:  { checked: setChecked }});
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId,String);
    check(setToPrivate,Boolean);
    const task = Tasks.findOne(taskId);
    //make sure only task owner can make task private
    if (task.owner !==this.userId) {
      throw new Meteor.error('not-authorized');
    }
    Tasks.update(taskId, {$set: {private: setToPrivate }});
  },
});
