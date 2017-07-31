Ext.define('graph.view.window.SelectHistoryKeyFormWindow', {
    extend: 'Ext.window.Window',
    alias:"SelectHistoryKeyFormWindow",
    xtype:"SelectHistoryKeyFormWindow",
    requires: [
        'graph.view.window.SelectHistoryKeyFormWindowController',
        'graph.view.window.SelectHistoryKeyFormWindowModel'
    ],

    controller: 'window-selecthistorykeyformwindow',
    viewModel: {
        type: 'window-selecthistorykeyformwindow'
    },
    title: "Select Key",
    autoShow: true,
    width: 300,
    height: 215,
    buttons: [{
            text: "select",
            handler: function () {
                var me = this.up("window")
                var form = me.down("form");
                var keyfield = form.getComponent("keys");
                var tablefield = form.getComponent("tablename");
                var ip = form.getComponent("ip").value || "127.0.0.1";
                var port = form.getComponent("port").value || "6379";
                var win = Ext.create("SelectKeyWinodw", {
                    ip: ip,
                    port: port,
                    callback: function (selectArr) {
                        var keys = this.getCheckdKeys();
                        if (keys.length > 8) {
                            Ext.Msg.alert("Exception", "The maximum quantity is 8");
                            return;
                        }
                        var keysArr = [];
                        for (var i = 0; i < keys.length; i++) {
                            keysArr.push(keys[i].data.value);
                        }
                        var keysStr = keysArr.join(",");
                        keyfield.setValue(keysStr);
                        My.delayToast("info", "select ok ." + keysStr);

                        win.close()

                    }
                })
            }
        },
        "->",
        {
            text: "Ok",
            handler: function () {
                var win = this.up("window")
                var form = win.down("form");
                if (form.isValid()) {
                    win.callback(form.getValues())
                }
                //grid.store.add(form.getValues())
            }
        },
        {
            text: "Cancel",
            handler: function () {
                this.up("window").close()
            }
        }
    ],
    items: [{
        xtype: "form",
        defaultType: 'textfield',
        //margin:10,
        width: "100%",
        height: "100%",
        defaults: {
            margin: 10,
            allowBlank: false
        },
        listeners: {
            boxready: function (form) {
                var win = form.up("window")
                form.form.setValues({
                    ip: win.ip || "127.0.0.1",
                    port: win.port || 6379
                })
                //form.loadRecord(rec)
            }
        },
        items: [{
                fieldLabel: 'Table Name',
                name: 'tablename',
                itemId: "tablename",
                allowBlank: false
            },
            {
                fieldLabel: 'Keys',
                name: 'keys',
                itemId: "keys",
                allowBlank: false,
                validator: function (val) {

                    var arr = val.split(",");
                    for (var i = 0; i < arr.length; i++) {

                        if (arr[i].length != 7 || isNaN(arr[i])) {
                            return "error key " + arr[i]
                        }
                    }
                    return true;
                }
            },
            {
                xtype: "combo",
                store: [location.host, "192.168.253.253", "127.0.0.1"],
                fieldLabel: "Ip",
                itemId: "ip",
                name: "ip",
                value: "127.0.0.1"
            },
            {
                fieldLabel: "Port",
                name: "port",
                xtype: "numberfield",
                value: "6379",
                itemId: "port",
                //maxValue: 99,
                minValue: 1
            }
        ],
    }]
});