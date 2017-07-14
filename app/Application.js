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

        //testComponent()

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
function testComponent() {

    Ext.create("Ext.window.Window", {
        autoShow: true,
        width: 800,
        height: 600,
        items: [
           Ext.create("graph.view.tree.DeviceTree",{
               ip:"127.0.0.1",
               port:"6379"
           })
        ]
    })


}

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
                    type: type || "Present_Value",
                    value: randomNumber,
                }, "", function () {
                    console.log(arguments)
                })
            }, delay || 3000)

        }

        My.randomChangeValue = randomChangeValue
    })
})()


function showDataRecordWindow() {
    var IPCombo = Ext.create("Ext.form.field.ComboBox", {
        fieldLabel: "Sources IP",
        store: ['127.0.0.1', window.location.hostname, "192.168.253.253"],
        labelWidth: 70,
        maxWidth: 300,
        //value: location.hostname
    });
    var PortCombo = Ext.create("Ext.form.field.ComboBox", {
        fieldLabel: "port number",
        store: ["6379"],
        value: "6379"
    });
    var formPanel = Ext.create("Ext.form.Panel", {
        region: "north",
        items: {
            xtype: "fieldset",
            title: "link option",
            layout: "hbox",
            defaults: {
                margin: 10
            },
            items: [
                IPCombo, PortCombo,
                {
                    xtype: "button",
                    text: "link",
                    handler: function () {
                        var treeStore = Ext.create("Ext.data.TreeStore", {
                            fields: ["text"],
                            proxy: {
                                type: "ajax",
                                autoLoad: true,
                                url: "/www/php/globalTree.php?ip=" + IPCombo.value + "&port=" + PortCombo.value,
                                reader: {
                                    type: "json"
                                }
                            },
                            root: {
                                text: "root"
                            }
                        })

                        treePanel.setStore(treeStore);
                    }
                }
            ]
        }
    })
    var treePanel = Ext.create("Ext.tree.Panel", {
        region: "center",
        useArrows: true,
        animate: true,
        checkPropagation: "both",
        rootVisible: false,
        bufferedRenderer: false,
        getSelectPoints: function () {
            var me = this;
            var checkeds = me.getChecked();
            var keysArr = [];
            for (var i = 0; i < checkeds.length; i++) {
                if (checkeds[i].data.depth == 4) {
                    keysArr.push(checkeds[i].data.key)
                }
            }
            return keysArr;
        },
        tbar: [{
            text: 'Expand All',
            scope: this,
            handler: function (th) {
                treePanel.expandAll()
            }
        }, {
            text: 'Collapse All',
            scope: this,
            handler: function (th) {
                treePanel.collapseAll()
            }
        }, "->", {
            text: "config filter point", handler: function () {
                Ext.create("FilterPointWindow", {
                    callback: function (res) {
                        //Ext.Msg.alert("Info","Ok");
                    }
                })
            }
        }, {
            text: "config database", handler: function () {
                var win = Ext.create("Ext.window.Window", {
                    title: "Config database .",
                    autoShow: true,
                    width: 300,
                    resizeable: false,
                    items: [
                        {
                            xtype: "form",
                            defaults: {
                                margin: 10,
                                allowBlank: false
                            },
                            items: [
                                {
                                    xtype: "textfield",
                                    fieldLabel: "Database host",
                                    name: "host",
                                    value: "127.0.0.1"
                                },
                                {
                                    xtype: "textfield",
                                    fieldLabel: "username",
                                    name: "username",
                                    value: "root"
                                },
                                {
                                    xtype: "textfield",
                                    fieldLabel: "password",
                                    name: "password",
                                    inputType: "password",
                                    value: "root"
                                },
                                {
                                    xtype: "textfield",
                                    fieldLabel: "Database name",
                                    name: "databasename",
                                    value: "smartio_db"
                                }, {
                                    xtype: "button",
                                    text: "create ", handler: function () {
                                        var form = this.up("form");
                                        form.submit({
                                            url: "/www/php/mysqlInit.php?par=createTable",
                                            success: function (form, action) {
                                                Ext.Msg.alert('Info ', action.response.responseText);
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert('Info ', action.response.responseText);
                                            }
                                        })
                                    }
                                }
                            ],
                            listeners: {
                                boxready: function (form) {
                                    Ext.Ajax.request({
                                        url: "/www/php/mysqlInit.php?par=getConfig",
                                        success: function (response) {
                                            var xml = $(response.responseText);
                                            var host = xml.find("host").text()
                                            var username = xml.find("username").text()
                                            var password = xml.find("password").text()
                                            var databasename = xml.find("databasename").text()
                                            var ojson = {
                                                host: host || "127.0.0.1",
                                                username: username || "root",
                                                password: password || "root",
                                                databasename: databasename || "smartio_db"
                                            }
                                            form.getForm().setValues(ojson)
                                        }
                                    })
                                }
                            },
                            buttons: [
                                {
                                    text: "Test Connect", handler: function () {
                                    var form = this.up("form");
                                    form.submit({
                                        url: "/www/php/mysqlInit.php?par=testConnect",
                                        success: function (form, action) {
                                            Ext.Msg.alert('Info ', action.response.responseText);
                                        },
                                        failure: function (form, action) {
                                            Ext.Msg.alert('Info ', action.response.responseText);
                                        }
                                    })

                                }
                                },
                                "->",
                                {
                                    text: "Ok", handler: function () {
                                    var form = this.up("form");
                                    if (form.isValid()) {
                                        var values = form.getValues();
                                        form.submit({
                                            url: "/www/php/mysqlInit.php?par=saveConfig",
                                            success: function (form, action) {
                                                Ext.Msg.alert('Info ', action.response.responseText);
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert('Info ', action.response.responseText);
                                            }
                                        })
                                    }
                                }
                                },
                                {
                                    text: "Cancel", handler: function () {
                                    win.close();
                                }
                                }
                            ]
                        }
                    ]
                })
            }
        }, {
            text: "config Listeners Ip", handler: function () {
                setIpsWindow()
            }
        }]
    })
    Ext.create("Ext.window.Window", {
        height: 500,
        width: 700,
        title: "Data Record",
        autoShow: true,
        layout: "border",
        items: [formPanel, treePanel],
        buttons: [
            {
                text: "Run/Restart", handler: function () {
                Ext.Ajax.request({
                    url: "/www/php/mysqlinit.php?par=runListen"
                }).then(function (response) {
                    console.log(response.responseText);
                    Ext.Msg.alert("info", " ok .");
                })
            }
            },
            "->",
            {
                text: "Show Event", handler: function () {
                var keysArr = treePanel.getSelectPoints();

                var qdr = Ext.create("QueryEventRecord", {
                    ip:  IPCombo.value,
                    keys:keysArr.join(",")
                })
                // var cdr = Ext.create("ChartDataRecord", {
                //     store: qdr.store
                // })

                Ext.create("Ext.window.Window", {
                    title: "Show Data Record",
                    autoShow: true,
                    scrollable: "y",
                    items: [ qdr]
                })


            }
            },
            {
                text: "Show", handler: function () {
                var keysArr = treePanel.getSelectPoints();
                var qdr = Ext.create("QueryDataRecord", {
                    ip: IPCombo.value,
                    keys: keysArr.join(",")
                })
                var cdr = Ext.create("ChartDataRecord", {
                    store: qdr.store
                })

                Ext.create("Ext.window.Window", {
                    title: "Show Data Record",
                    autoShow: true,
                    scrollable: "y",
                    items: [cdr, qdr]
                })
            }
            }
        ]

    })
}