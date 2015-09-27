// Define the collections that are on the client and server
Stdout = new Mongo.Collection('stdout');
Stderr = new Mongo.Collection('stderr');

if (Meteor.isClient) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "1250",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    Meteor.subscribe('stdout');
    Meteor.subscribe('stderr');

    Template.buttons.events({
        'click .lightson': function () {
            if (Meteor.userId() === ('ckvHvi9g6FPAm8DeQ')){
                //Meteor.call('azureon')
            }
            console.log(Meteor.userId());
            toastr.success("Turning Lights On", "Lights On");
        },
        'click .lightsoff': function () {
            if (Meteor.userId() === ('ckvHvi9g6FPAm8DeQ')) {
                //Meteor.call('azureoff')
            }
            toastr.success("Turning Lights Off", "Lights Off");
        },
        'click .theatre': function () {
            if (Meteor.userId() === ('ckvHvi9g6FPAm8DeQ')) {
                //Meteor.call('azureon')
            }
            toastr.success("Entering Theatre Mode", "Game on!");
        },
        'click .bed': function () {
            if (Meteor.userId() === ('ckvHvi9g6FPAm8DeQ')) {
                //Meteor.call('azureon')
            }
            toastr.success("Bed Time", "Sleep Well!");
        }
    })
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
        azureoff: function() {
            var cmd = "python /Users/bearb/Dropbox/Projects/meteor/tenforward/azuremsgoff.py";
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
    Meteor.methods({
        azureon: function() {
            var cmd = "python /Users/bearb/Dropbox/Projects/meteor/tenforward/azuremsgon.py";
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

Router.route('/', function () {
    this.render('buttons');
});

Router.route('/loginpage');


