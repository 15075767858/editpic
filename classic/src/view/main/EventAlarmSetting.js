Ext.define('editpic.view.EventAlarm.EventAlarmSetting', {
    extend: 'Ext.window.Window',

    alias: "EventAlarmSetting",
    requires: [
        'editpic.view.EventAlarm.EventAlarmSettingController',
        'editpic.view.EventAlarm.EventAlarmSettingModel',


        'editpic.model.ListenModel',
        'editpic.model.MonitorModel',

        'editpic.view.EventAlarm.AddMonitor',
        'editpic.view.EventAlarm.ListenEventAlarm',
        'editpic.view.EventAlarm.ListenGrid',
        'editpic.view.EventAlarm.SelectKeyWinodw',
    ],

    controller: 'eventalarm-eventalarmsetting',
    viewModel: {
        type: 'eventalarm-eventalarmsetting'
    },
    autoShow: true,
    collapsible: true,
    title: "Event Alarm Setting",
    width: 600,
    layout: "auto",
    initComponent: function () {
        var me = this;

        var grid = Ext.create("Ext.grid.Panel", {
            height: 390,
            maxHeight: 390,
            scrollable: "y",

            listeners: {
                boxready: function () {
                    grid.features[0].expandAll();
                }
            },
            saveXml: function () {
                var store = grid.store;
                var root = document.createElement("root")

                for (var i = 0; i < store.data.length; i++) {
                    root.appendChild(jsonToXml(store.getAt(i).data))
                }
                function jsonToXml(json) {
                    var item = document.createElement("item");
                    item.id = json.id
                    var ip = document.createElement("ip");
                    ip.innerHTML = json.ip;
                    item.appendChild(ip)
                    var port = document.createElement("port");
                    port.innerHTML = json.port;
                    item.appendChild(port)
                    var key = document.createElement("key");
                    key.innerHTML = json.key;
                    item.appendChild(key)
                    var objectname = document.createElement("objectname");
                    objectname.innerHTML = json.objectname;
                    item.appendChild(objectname)
                    var alarmtxt = document.createElement("alarmtxt");
                    alarmtxt.innerHTML = json.alarmtxt;
                    item.appendChild(alarmtxt)
                    var normaltxt = document.createElement("normaltxt");
                    normaltxt.innerHTML = json.normaltxt;
                    item.appendChild(normaltxt)
                    /*var presentvalue = document.createElement("presentvalue");
                     presentvalue.innerHTML = json.presentvalue;
                     item.appendChild(presentvalue)*/
                    return item
                }

                var xmlstr = '<?xml version="1.0" encoding="UTF-8"?>' + "\r\n" + root.outerHTML;
                Ext.Ajax.request({
                    url: EventAlarmUrl,
                    params: {
                        par: "saveAlarmconfXml",
                        content: xmlstr
                    }
                }).then(function (response) {
                    var responseText = response.responseText;
                    if (responseText == xmlstr.length) {
                        Ext.Msg.alert("Massage", "save ok . " + responseText);

                        Ext.Ajax.request({
                            url: EventAlarmUrl + "?par=saveAlarmhisJson"
                        })

                    } else {
                        Ext.Msg.alert("Massage", "Error" + responseText)
                        Ext.Ajax.request({
                            url: EventAlarmUrl + "?par=saveAlarmhisJson"
                        })
                    }

                })
            },
            buttons: [
                {
                    text: "Ok", handler: function () {


                    grid.saveXml()
                }
                },
                {
                    text: "close", handler: function () {
                    me.close()
                }
                }
            ],
            store: Ext.create("Ext.data.XmlStore", {
                autoLoad: true,
                groupField: 'ip',
                model: Ext.createByAlias("MonitorModel"),
                //fields: [{name: "id", mapping: "@id"}, "ip", "key", "alarmtxt", "normaltxt"],
                idPath: 'ASIN',
                proxy: {
                    type: 'ajax',
                    url: EventAlarmUrl + "?par=getAlarmconfXml",
                    reader: {
                        type: 'xml',
                        record: "item",
                        rootProperty: "root"
                    }
                }, listeners: {
                    load: function (store, records, successful, operation, eOpts) {
                        //console.log("load", arguments)
                        this.fireEvent("change", store, records)
                    },
                    add: function (store, records, index, eOpts) {
                        //console.log("add", arguments)
                        this.fireEvent("change", store, records)

                    },

                    change: function (store, records) {
                        //console.log("change", arguments)

                        for (var i = 0; i < records.length; i++) {
                            //console.log(records[i])
                            records[i].getObjcetName()
                            records[i].getPresentValue()
                        }
                        console.log(records)
                    }
                }
            }),
            features: new Ext.grid.feature.Grouping({
                //groupHeaderTpl: '{name}{renderedGroupValue} &nbsp;&nbsp;({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                groupHeaderTpl: '{renderedGroupValue} &nbsp;&nbsp;({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                hideGroupedHeader: true,
                startCollapsed: false
            }),
            tbar: [
                {
                    text: 'Expand All',
                    handler: function () {
                        var me = this.up("gridpanel");
                        me.features[0].expandAll();
                    }
                }, {
                    text: 'Collapse All',
                    handler: function () {
                        var me = this.up("gridpanel");
                        me.features[0].collapseAll();
                    }
                }, "->", {
                    text: "Add Monitor",
                    handler: function () {
                        Ext.createByAlias("AddMonitor", {
                            callback: function (model) {
                                grid.store.add(model)
                                Ext.Msg.alert("Massage", "ok , add Monitor")
                            }
                        })
                    }
                }, {
                    text: "Delete Monitor",
                    handler: function () {
                        var selectModels = grid.getSelection();
                        if (selectModels[0]) {
                            grid.store.remove(selectModels[0])
                        }
                    }
                }],
            columnLines: true,
            rowLines: true,
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 1,
                listeners: {
                    edit: function (edit, context, eOpts) {

                    }
                }
            },
            selModel: 'rowmodel',
            columns: [
                {
                    text: 'ip', dataIndex: 'ip', hidden: true
                },
                {
                    text: 'key', dataIndex: 'key', flex: 1
                },

                {
                    text: 'alarmtxt', editable: true, dataIndex: 'alarmtxt', flex: 1, editor: {
                    xtype: 'textfield'
                }
                },
                {
                    text: 'normaltxt', editable: true, dataIndex: 'normaltxt', flex: 1, editor: {
                    xtype: 'textfield'
                }
                },
                {
                    text: "object name", dataIndex: "objectname", flex: 1
                }
            ]
        })

        me.items = [grid]

        me.callParent();
    },
    listeners: {
        boxready: function (window) {
            setTimeout(function () {
                window.collapse()
            }, 1000)
        },
        collapse: function (window) {
            window.setPosition(0, 0, true)
        }
    }


});
