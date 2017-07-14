Ext.define('editpic.view.EventAlarm.AddMonitor', {
    extend: 'Ext.window.Window',
    alias: "AddMonitor",
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
                var values = form.getValues()
                //values.alarmtxt = Ext.util.Base64.encode(values.alarmtxt);
                //values.normaltxt = Ext.util.Base64.encode(values.normaltxt);
                var mm = Ext.createByAlias("MonitorModel", values)
                //mm.set("alarmtxt",Ext.util.Base64.decode(mm.get("alarmtxt")));
                //mm.set("normaltxt",Ext.util.Base64.decode(mm.get("normaltxt ")));
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
                store: ["127.0.0.1","192.168.253.253", location.host],
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
                xtype: "container",
                layout: "hbox",

                items: [
                    {
                        xtype: "textfield", itemId: "key", name: "key", fieldLabel: "key", allowBlank: false,
                        enableKeyEvents: true,
                        //checkChangeBuffer:1000,//缓冲改变时间
                        listeners: {
                            change: function (field,newValue) {
                                console.log(field)
                                if (newValue.length == 7 & !isNaN(newValue)) {
                                    var form = field.up('form');
                                    var ip = form.getValues().ip
                                    var port = form.getValues().port;
                                    Ext.Ajax.request({
                                        url: "resources/main.php?par=gettypevalue",
                                        params: {
                                            ip: ip,
                                            port: port,
                                            nodename:newValue,
                                            type: "Object_Name"
                                        }
                                    }).then(function (response) {
                                        form.getComponent("objectname").setValue(response.responseText);
                                    })
                                }

                            }
                        }
                    },
                    {
                        xtype: "button", text: "select", handler: function (button) {
                        var field = button.up().getComponent("key");
                        var form = field.up('form');
                        var values = form.getValues();
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
                                form.getComponent("objectname").setValue(objectname)
                                selectKeyWin.close();
                            }
                        })
                    }
                    }
                ]
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
