import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';
//reactive dictionary
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    //subscribe to tasks
    Meteor.subscribe('tasks');
});

//Helpers
Template.body.helpers({
    tasks() {
        //filter taskds if checkbox checkedco

        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            //if hide completed is checked, filter tasks
            return Tasks.find({
                checked: {
                    $ne: true
                }
            }, {
                sort: {
                    createdAt: -1
                }
            });
        }
        //otherwise, return all of the tasks and sort
        return Tasks.find({}, {
            sort: {
                createdAt: -1
            }
        });


    },


});

//body events
Template.body.events({

    'submit .new-task' (event) {
        //prevent browser form submit
        event.preventDefault();

        // Get value from form element
        const text = event.target[0].value;
        //insert task into collection
        // Tasks.insert({
        //     text: text,
        //     createdAt: new Date(), //current time
        //     owner: Meteor.userId(),
        //     username: Meteor.user().username,
        //
        // });
        Meteor.call('tasks.insert', text);
        //clear form
        event.target[0].value = '';
    },
    //add event handler for checkbox
    'change .hide-completed input' (event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});
