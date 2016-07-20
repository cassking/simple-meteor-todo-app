import { Accounts } from 'meteor/accounts-base';


Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY",
});
//this is client side called from main.js
