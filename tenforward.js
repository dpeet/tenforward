// Define the collections that are on the client and server
Stdout = new Mongo.Collection('stdout');
Stderr = new Mongo.Collection('stderr');

if (Meteor.isClient) {
    Meteor.subscribe('stdout');
    Meteor.subscribe('stderr');
    Template.hello.events({
        'click .execpython': function () {
            Meteor.call('consoleExecSync')
        }
    });
}

if (Meteor.isServer) {
    Meteor.publish('stdout', function () {
        return Stdout.find();
    });
    Meteor.publish('stderr', function () {
        return Stderr.find();
    });

    exec = Npm.require('child_process').exec;

    Meteor.methods({
        consoleExecSync: function() {
            var cmd = "python /Users/bearb/Dropbox/Projects/meteor/tenforward/azuremsg.py";
            exec(cmd, Meteor.bindEnvironment(
                function (error, stdout, stderr) {
                    if (error) {
                        throw new Meteor.Error(error, error);
                    }
                    if (stdout) {
                        Stdout.insert({
                            timestamp: new Date().getTime(),
                            data: stdout
                        });
                    }
                    if (stderr) {
                        Stderr.insert({
                            timestamp: new Date().getTime(),
                            data: stderr
                        });
                    }
                    console.log(stderr);
                    console.log(stdout)
                }
            ));
        }
    });
}


//if (Meteor.isClient) {
//  // counter starts at 0
//  Session.setDefault('counter', 0);
//
//  Template.hello.helpers({
//    counter: function () {
//      return Session.get('counter');
//    }
//  });
//
//  Template.hello.events({
//    'click button': function () {
//      // increment the counter when button is clicked
//      Session.set('counter', Session.get('counter') + 1);
//    }
//  });
//}
//
//if (Meteor.isServer) {
//  Meteor.startup(function () {
//    // code to run on server at startup
//  });
//}

