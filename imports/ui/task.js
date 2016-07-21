import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Tasks } from '../api/tasks.js';
import './task.html';

Template.task.helpers({
  //Define helper to check ownership
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
//task events
Template.task.events({
    'click .toggle-checked' () {

        //inside the event handlers, -this- refers to an individual task object.
        //In a collection, every inserted document has a unique -_id- field
        //that can be used to refer to that specific document. We can get the -_id -of
        //the current task with -this._id-. Once we have the -_id-, we can use update and
        //remove to modify the relevant task.


        //set the checked property to the opposite of current value


        // Tasks.update(this._id, {
        //     $set: {
        //         checked: !this.checked
        //     },
        // });
        //When you call a method on the client using Meteor.call, two things happen in parallel:
        //The client sends a request to the server to run the method in a secure environment, just like an AJAX request would work
        //A simulation of the method runs directly on the client to attempt to predict the outcome of the server call using the available information
        //a newly created task actually appears on the screen before the result comes back from the server.
        Meteor.call('tasks.setChecked', this._id, !this.checked );
    },
    'click .delete' () {
        // Tasks.remove(this._id);
        Meteor.call('tasks.remove', this._id);
    },
    'click .toggle-private'() {
      Meteor.call('tasks.setPrivate', this._id, !this.private);
    },
});
