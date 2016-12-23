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

        Ext.create("editpic.view.EventAlarm.ListenEventAlarm")
        //Ext.create("editpic.view.EventAlarm.SelectKeyWinodw")


        setInterval(function () {
            var all = document.querySelectorAll('*');
            for (var i = 0; i < all.length; i++) {
                var html = all[i].innerHTML

                if (html.substr(0, 7) == "base64=") {
                    var base64Text = html.substr(7, html.length)
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

(function () {
    Ext.onReady(function () {

        //setInterval(function () {
        //    randomChangeValue('192.168.253.253', '1001001')
        //    randomChangeValue('192.168.1.88', '1200202')
        //    randomChangeValue('127.0.0.1', '9900201')
        //}, 3000)

        function randomChangeValue(ip, nodename, type, delay) {

            setInterval(function () {
                var randomNumber = (Math.random() * 1000 + "").substr(0, 3)
                My.AjaxSimple({
                    par: "changevalue",
                    ip: ip,
                    port: "6379",
                    nodename: nodename,
                    type: type || "Parsent_Value",
                    value: randomNumber,
                }, "", function () {
                    console.log(arguments)
                })
            }, delay || 3000)

        }

        My.randomChangeValue = randomChangeValue
    })
})()