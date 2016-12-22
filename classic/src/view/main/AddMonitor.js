
Ext.define('editpic.view.EventAlarm.AddMonitor',{
    extend: 'Ext.window.Window',
    alias:"AddMonitor",
    requires: [
        'editpic.view.EventAlarm.AddMonitorController',
        'editpic.view.EventAlarm.AddMonitorModel'
    ],

    controller: 'eventalarm-addmonitor',
    viewModel: {
        type: 'eventalarm-addmonitor'
    },
    title: "Add Monitor",
    autoShow: true,
    initComponent: function () {
        var me = this;
        me.buttons = [
            {
                text: "Ok", handler: function () {
                var form = me.down("form")
                console.log(form.getValues())
                var mm = Ext.createByAlias("MonitorModel", form.getValues())
                if (form.isValid()) {
                    me.callback(mm);
                } else {
                    Ext.Msg.alert("Massage", "valid")
                }
            }
            },
            {
                text: "Close", handler: function () {
                me.close();
            }
            }
        ];
        me.callParent()
    },
    items: {
        xtype: "form",

        defaults: {
            margin: 10
        },
        scrollable: "y",

        listeners: {
            boxready: function (form) {
                var mm = Ext.createByAlias("MonitorModel")
                form.loadRecord(mm)
            }
        },

        items: [
            {
                xtype: "combo",
                name: "ip",
                store: ["192.168.253.253", location.host],
                allowBlank: false,
                regex: /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/,
                fieldLabel: "ip"
            },
            {
                xtype: "combo",
                name: "port",
                store: ["6379"],
                allowBlank: false,
                regex: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                fieldLabel: "port"
            },
            {
                xtype: "combo", name: "key", fieldLabel: "key", allowBlank: false, listeners: {
                focus: function (field) {
                    console.log(arguments)
                    var values = field.up("form").getValues();
                    var id = "SelectKeyWinodw" + field.id
                    var component = Ext.getCmp(id)
                    if (component) {
                        return
                    }
                    var selectKeyWin = Ext.createByAlias("SelectKeyWinodw", {
                        id: id,
                        ip: values.ip,
                        port: values.port,
                        key: field.value,
                        callback: function (models) {
                            var objectname = models[0].get("text");
                            var key = models[0].get("value");
                            console.log(objectname, key)
                            field.setValue(key);
                            field.up().getComponent("objectname").setValue(objectname)
                            selectKeyWin.close();
                        }
                    })
                }
            }
            },
            {
                xtype: "textfield",
                itemId: "objectname",
                fieldLabel: "object name",
                editable: false,
                name: "objectname"
            },
            {xtype: "textfield", name: "alarmtxt", fieldLabel: "alarmtxt"},
            {xtype: "textfield", name: "normaltxt", fieldLabel: "normaltxt"},
        ],
    }

});
