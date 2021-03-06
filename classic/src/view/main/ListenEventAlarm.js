Ext.define('editpic.view.EventAlarm.ListenEventAlarm', {
    extend: 'Ext.window.Window',
    alias: "ListenEventAlarm",
    requires: [
        'editpic.view.EventAlarm.ListenEventAlarmController',
        'editpic.view.EventAlarm.ListenEventAlarmModel'
    ],

    controller: 'eventalarm-listeneventalarm',
    viewModel: {
        type: 'eventalarm-listeneventalarm'
    },
    collapsible: true,
    autoShow: true,
    header: {
        title: "Listen Event Alarm",
        items: [{
                xtype: "button",
                text: "Historical Record",
                handler: function () {
                    Ext.createByAlias("DataRecordWindow")
                }
            },
            {
                xtype: "button",
                text: "User Manager",
                handler: function () {
                    Ext.create("UserManager")
                }
            },
            {
            text:"Login Out",
                xtype: "button",
                handler: function () {
                    Ext.Ajax.request({
                        url: "/php/login.php?par=outLogin",
                        success: function (response) {
                            var resData;
                            try {
                                resData = Ext.decode(response.responseText)
                                if (resData.success) {
                                    alert("Login Out Success")
                                }
                            } catch (e) {
                                alert("Error " + response.responseText)
                            }
                            //Ext.get('userManager').hide();
                            //Ext.get('outLogin').hide();
                        }
                    })
                }
            }
        ],
        //layout:"fit"
    },
    //title: "Listen Event Alarm",
    width: 900,
    y: 100,

    initComponent: function () {
        var me = this;
        me.initItemsListen()
        me.callParent();
    },
    initItemsListen: function () {
        var me = this;
        var form = Ext.create("Ext.form.Panel", {
            layout: "hbox",
            viewModel: Ext.create("Ext.app.ViewModel", {}),
            url: EventAlarmUrl + "?par=setSaveTime",
            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Alarmtory',
                defaultType: 'radiofield',
                padding: 10,
                defaults: {
                    flex: 1,
                    margin: "0 10 0 10"
                },
                layout: 'hbox',
                items: [{
                        xtype: "radiofield",
                        reference: "alarmhis",
                        boxLabel: "disable",
                        name: "alarmhis",
                        inputValue: false,

                    },
                    {
                        xtype: "radiofield",
                        reference: "alarmhis",
                        boxLabel: "enable",
                        name: "alarmhis",
                        inputValue: true,
                        listeners: {
                            boxready: function (redio) {
                                redio.setValue(true)
                            }
                        }
                    },
                    {
                        xtype: "combo",
                        bind: {
                            disabled: "{!alarmhis.checked}",
                        },
                        displayField: "name",
                        valueField: "value",
                        editable: false,
                        name: "savetime",
                        store: Ext.create("Ext.data.Store", {
                            fields: ["name", "value"],
                            data: [{
                                    name: "1 days",
                                    value: 86400000
                                },
                                {
                                    name: "7 days",
                                    value: 604800000
                                },
                                {
                                    name: "30 days",
                                    value: 2592000000
                                },
                                {
                                    name: "180 days",
                                    value: 15552000000
                                },
                                {
                                    name: "360 days",
                                    value: 31104000000
                                }
                            ]
                        }),
                        listeners: {
                            render: function (combo) {
                                Ext.Ajax.request({
                                    url: "/graph/alarmhis.xml?par=" + Math.random()
                                }).then(function (response) {
                                    console.log(response)
                                    var xml = response.responseXML
                                    if (xml) {
                                        var savetime = xml.querySelector("savetime").innerHTML
                                        var store = combo.store;
                                        for (var i = 0; i < store.data.length; i++) {
                                            var model = store.getAt(i)
                                            console.log(savetime)
                                            console.log(model.get("value"))
                                            console.log(savetime == model.get("value"))
                                            if (savetime == model.get("value")) {
                                                combo.setValue(model)
                                            }
                                        }
                                    }
                                })
                                //console.log(combo.setValue(combo.store.getAt(0)))
                            }

                        }
                    }, {
                        xtype: "button",
                        text: "Ok",
                        handler: function () {


                            form.submit({
                                success: function (form, response) {
                                    Ext.Msg.alert("Massage", "Save ok " + response.result.info)
                                    console.log(arguments)
                                }
                            })
                        }
                    }
                ]
            }, ]
        })
        var grid = Ext.create("ListenGrid", {
            scrollable: true
        })
        me.items = [form, grid]
    },
    listeners: {
        boxready: function (window) {
            Ext.Ajax.request({
                url: EventAlarmUrl,
                params: {
                    par: "removeTimeoutTag",
                    curtime: new Date().getTime()
                }
            }).then(function () {
                console.log(arguments)
            })
            setTimeout(function () {
                window.collapse()
            }, 1000)
        },
        collapse: function (window) {
            window.setPosition(0, 0, true)
        },

        beforeclose: function (window) {
            window.hide()
            return false;
        }
    },
    buttons: [{
        text: "close",
        handler: function (button) {
            button.up("window").close()
        }
    }]
});