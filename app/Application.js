/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('editpic.Application', {
    extend: 'Ext.app.Application',
    
    name: 'editpic',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
        setInterval(function () {
            var all = document.querySelectorAll('*');
            for(var i =0;i<all.length;i++){
                var html  = all[i].innerHTML

                if(html.substr(0,7)=="base64="){
                    var base64Text = html.substr(7,html.length)
                    all[i].innerHTML = Ext.util.Base64.decode(base64Text);
                    console.log(html)
                }
            }
        }, 10000)
    },

    onAppUpdate: function () {
        window.location.reload();
/*
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );*/
    }
});

