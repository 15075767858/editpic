Ext.define('graph.view.chart.HistoryChart', {
    extend: 'Ext.panel.Panel',
    alias: "HistoryChart",
    requires: [
        'graph.view.chart.HistoryChartController',
        'graph.view.chart.HistoryChartModel',
        "graph.store.HistoryStore"
    ],

    controller: 'chart-historychart',
    viewModel: {
        type: 'chart-historychart'
    },
    initComponent: function () {
        var me = this;
        var data;
        Ext.Ajax.request({
            url: "http://127.0.0.1/graph/resources/mysql.php?par=getDataRecord&ip=192.168.253.253&keys=1103001,1103002,1103101,1103102,1103301,1103302,1103401,1103402&_dc=1500861814067&page=1&start=0&limit=25",
            async: false,
            success: function (response) {
                var res = Ext.decode(response.responseText)
                data = res.topics
                console.log(res)
            }
        })

        var a = {
            last_update_time: 12312321,
            key1: '1',
            key2: "3",
            key3: "4",
            key4: "5",
            key5: '1',
            key6: "3",
            key7: "4",
            key8: "5",

        }
        //Ext.chart.CartesianChart
        Ext.apply(me, {
            items: [{
                xtype: 'cartesian',
                reference: 'chart',
                width: '100%',
                height: 500,
                legend: {
                    type: 'sprite',
                    docked: 'left'
                },
                store: Ext.create("Ext.data.Store", {
                    fields: [{
                            name: 'last_update_time',
                            type: 'date'
                        },
                        {
                            name: "key",
                            convert: function (v, model) {
                                //console.log(arguments)
                                return model.data.device_instance + model.data.device_type + model.data.device_number;
                            }
                        },
                        "key1", "key2", "key3", "key4", "key5", "key6", "key7", "key8",
                    ],
                    data: data
                }),
                insetPadding: 40,
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    fields: ['Present_Value', "key1"],
                    title: {
                        text: "Present Value",
                        fontSize: 15
                    },
                    grid: true,
                }, {
                    type: 'numeric',
                    grid: true,
                    //dateFormat: 'Y-m-d',
                    //visibleRange: [0, 1],
                    position: 'bottom',
                    fields: ['last_update_time'],
                    titleMargin: 12,
                    title: {
                        text: 'Time'
                    },
                    renderer: function (numeric, val) {
                        console.log(arguments)
                        return new Date(val).toLocaleString()
                    },
                    //maximum:1500605196000,
                    //minimum:1500635196000
                }],
                series: [{
                    type: 'line',
                    style: {
                        stroke: 'rgba(0,0,0,0.8)',
                        lineWidth: 1
                    },
                    highlightCfg: {
                        scaling: 2
                    },
                    renderer: function (sprite, config, rendererData, index) {
                        console.log(arguments)

                        config.y = 20;
                        //rendererData
                        // console.log(index)
                        // //rendererData.store.getAt(index).set("key1",Math.floor(Math.random()*1000))
                        // return 20;
                    },
                    xField: 'last_update_time',
                    yField: 'Present_Value',
                    label: {
                        field: 'Object_Name',
                        display: 'over',
                        fontSize: 10,
                        translateY: 5, // lower label closer to the marker
                        // renderer: function (val) {
                        //     //console.log(arguments)
                        //     return val
                        // }
                    },
                    marker: {
                        type: 'circle',
                        fill: "white",
                        fx: {
                            duration: 200,
                            easing: 'backOut'
                        }
                    },
                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: function (tooltip, record, item) {
                            var arr = ["Object Name :" + record.data.Object_Name,
                                "Device Instance :" + record.data.device_instance,
                                "Device Type :" + record.data.device_type,
                                "Device Number :" + record.data.device_number,
                                "Present Value :" + record.data.Present_Value,
                                "Time :" + new Date(record.data.last_update_time).toLocaleString()
                            ]
                            if (record.data.message_number) {
                                arr.push("message :" + record.data.message_number + "");
                            }
                            tooltip.setHtml(arr.join("<br>"))
                        }
                    }
                }]
            }]
        })


        console.log("aaaaaa")

        me.callParent();
    },

});




Ext.define("ConfigHistoryTableWindow", {
    extend: "Ext.window.Window",
    title: "Setting History Tables",
    autoShow: true,
    scrollable: "y",
    initComponent: function () {
        var me = this;
        var grid = Ext.createByAlias("ConfigXmlFileGrid", {
            restartServer:function () {
              Ext.Ajax.request({
                  url:"resources/mysqlinit.php",
                  params:{
                      par:"runListen"
                  }
              }).then(function (response) {
                  console.log(response.responseText)
              })
            },
            remoteDeleteSelectItem: function () {
                var grid = this;
                var selArr = grid.getSelection();
                if (selArr[0]) {
                    Ext.Msg.confirm("delete", "would you want to delete the table?", function (msg) {
                        if (msg == "yes") {
                            var model = selArr[0];
                            Ext.Ajax.request({
                                url: "resources/mysql.php",
                                params: {
                                    par: "deleteHistoryTable",
                                    tablename: model.data.tablename.trim()
                                },
                            }).then(function (response) {
                                grid.store.remove(model);
                                console.log(response)
                                My.delayToast("message", response.responseText);
                                grid.saveIpsXml()
                            })
                        }
                        console.log(arguments, this)
                    }, grid)
                }
            },
            getWindowButtons: function () {
                return [{
                        xtype: "button",
                        text: "add",
                        handler: function () {
                            grid.addItemClick()
                        }
                    }, {
                        xtype: "button",
                        text: "delete",
                        handler: function () {
                            grid.remoteDeleteSelectItem();
                        }
                    },
                    "->",
                    {
                        xtype: "button",
                        text: "Ok",
                        handler: function () {
                            grid.saveIpsXml();
                        }
                    },
                    {
                        xtype: "button",
                        text: "Cancel",
                        handler: function () {
                            me.close()
                        }
                    }
                ]
            },
            fileName: "/mnt/nandflash/HistoryTable.xml",
            store: Ext.create("graph.store.HistoryStore"),
            addItemClick: function () {
                Ext.create("SelectHistoryKeyFormWindow", {
                    callback: function (data) {
                        console.log(data)
                        var isHave = grid.store.data.items.find(function (val) {
                            console.log(val)
                            if (val.data.tablename == data.tablename) {
                                return true;
                            }
                        })
                        if (isHave) {
                            Ext.Msg.alert("Exception", "This table already exists.")
                        } else {
                            grid.store.add(data)
                            grid.saveIpsXml()
                            grid.restartServer()
                            this.close();
                        }
                    }
                })
            }
        })
        me.items = grid;
        me.buttons = grid.getWindowButtons();
        me.callParent();
    },
})

Ext.define("SelectHistoryKeyFormWindow", {
    extend: "Ext.window.Window",
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
})