import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import './body.html';
//reactive dictionary
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

//Helpers
Template.body.helpers({
  tasks() {
    //filter taskds if checkbox checkedco

    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      //if hide completed is checked, filter tasks
      return Tasks.find({checked: { $ne: true } }, {sort: { createdAt: -1 } });
    }
    //otherwise, return all of the tasks and sort
return Tasks.find({},{sort:{ createdAt: -1}});
 

  },


});

//body events
Template.body.events({

  'submit .new-task'(event) {
    //prevent browser form submit
    event.preventDefault();

    // Get value from form element
    const text = event.target[0].value;
//insert task into collection
    Tasks.insert({
      text: text,
      createdAt: new Date(),//current time
    });

    //clear form
    event.target[0].value = '';
  },
  //add event handler for checkbox
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
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


      Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete' () {
    Tasks.remove(this._id);
  },
})
