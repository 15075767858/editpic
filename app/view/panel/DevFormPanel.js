Ext.define('editpic.view.panel.DevFormPanel', {
    extend: 'Ext.panel.Panel',
    xtype: "devformpanel",

    requires: [
        'editpic.view.panel.DevFormPanelController',
        'editpic.view.panel.DevFormPanelModel'
    ],

    controller: 'panel-devformpanel',
    viewModel: {
        type: 'panel-devformpanel'
    },
    scrollable:"y",
    resizable: true,
    collapsible: true,
    width: 300,
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: "form",
                bodyPadding: 10,
                defaults: {
                    width: "100%",
                    margin: "0 0 10 0"
                },
                items: [
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {
                                xtype: "textfield",
                                flex: 3,
                                reference: "ipfield",
                                value: "192.168.253.253" || window.location.hostname
                            },
                            {
                                xtype: "textfield",
                                flex: 1,
                                reference: "portfield",
                                value: "6379"
                            },
                            {
                                xtype: "button",
                                text: "link",
                                flex: 1,
                                handler: function (menu) {
                                    var ip = me.lookup("ipfield").getValue();
                                    var port = me.lookup("portfield").getValue();
                                    var devsfield = me.lookup("devsfield")
                                    devsfield.init(ip, port);
                                }
                            }
                        ]
                    },
                    {
                        xtype: "container",
                        layout: "hbox",
                        defaults: {
                            hidden: true
                        },
                        hideAll: function () {
                            var me = this;
                            var items = me.items.items;
                            for (var i = 0; i < items.length; i++) {
                                items[i].hide()
                            }
                        },
                        items: [
                            {
                                xtype: "combo",
                                flex: 2,
                                displayField: 'name',
                                valueField: 'value',
                                itemId: "devscombo",
                                reference: "devsfield",
                                init: function (ip, port) {
                                    var me = this;
                                    me.ip = ip;
                                    me.port = port;
                                    My.Ajax("resources/main.php", function (response) {
                                        var data = response.responseText
                                        try {
                                            var ojson = Ext.decode(data)
                                            if (ojson) {
                                                var store = Ext.create("Ext.data.Store", {
                                                    fields: ['name', 'value'],
                                                    data: ojson
                                                })
                                                me.show()
                                                me.setStore(store);
                                                return true;
                                            }
                                        } catch (e) {
                                            me.up().hideAll()
                                            Ext.Msg.alert("Error", "Connect to database failed !");
                                            if(me.store){
                                                if(me.store.data.length>0)
                                                me.store.clearAll()
                                            }
                                            //me.clearValue()
                                            //me.setStore(null)
                                            return false;
                                        }
                                    },{
                                     par:"getdevs",
                                        ip:ip,
                                        port:port
                                    }
                                    )

                                },
                                editable: false,
                                listeners: {
                                    change: function (combo, newValue, oldValue, e) {

                                        var typescombo = me.lookup("typescombo");
                                        typescombo.init(combo.ip, combo.port, newValue);
                                    }
                                }
                            },
                            {
                                xtype: "combo", flex: 2,
                                reference: "typescombo",
                                editable: false,
                                init: function (ip, port, nodename) {
                                    console.log(arguments)
                                    var me = this;

                                    My.Ajax("resources/main.php", function (response) {
                                        me.setStore(Ext.decode(response.responseText))
                                        me.show()
                                    }, {
                                        par: "gettypes",
                                        ip: ip,
                                        port: port,
                                        nodename: nodename
                                    })
                                },
                                listeners: {
                                    change: function () {
                                        var okbtn = me.lookup("okbtn");
                                        okbtn.show()
                                    }
                                }
                            },
                            {
                                xtype: "button",
                                reference: "okbtn",
                                text: "ok",
                                flex: 1,
                                handler: function () {
                                    var devsfield = me.lookup("devsfield");
                                    var typescombo = me.lookup("typescombo");
                                    var imgGrid = Ext.getCmp("imgGrid");
                                    imgGrid.linkImgData(devsfield.ip,devsfield.port,devsfield.value, typescombo.value);
                                }
                            },
                        ]

                    }
                ]
            }

        ]
        me.callParent()
    }

    , listeners: {
        boxready: function (panel) {
            var picpanel = Ext.create("editpic.view.panel.SetPicPanel", {
                id: "imgGrid",
                linkImgData:function(ip,port,nodename,type){
                    console.log(arguments)
                    var me=this;
                    var record = me.getSelection()[0]
                    if (record) {
                        var img = record.data;
                        img.linkData(ip,port,nodename,type)
                    } else {
                        Ext.Msg.alert("Massage", "Please choose a picture.")
                    }


                }


            })
            panel.add(picpanel)

        }
    }

});
