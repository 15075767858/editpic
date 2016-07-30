Ext.define('editpic.view.window.ImgPanelMenuFormWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'editpic.view.window.ImgPanelMenuFormWindowController',
        'editpic.view.window.ImgPanelMenuFormWindowModel'
    ],

    controller: 'window-imgpanelmenuformwindow',
    viewModel: {
        type: 'window-imgpanelmenuformwindow'
    },
    title: "Propertys",
    autoShow: true,
    //layout: "fit",
    initComponent: function () {
        var me = this;
        console.log(me)
        me.labelFormPanel = Ext.create("Ext.form.Panel", {
                width: 400,
                height: "100",
                margin: 10,
                title: "Label",
                border: true,
                defaults: {
                    anchor: "100%",
                    allowBlank: false
                },
                items: [
                    {
                        xtype: "textfield", allowBlank: true,
                        fieldLabel: "name", name: "name"
                    },
                    {
                        xtype: "combo", fieldLabel: "Image Type",
                        name: "itype", allowBlank: true,
                        store: Ext.create("Ext.data.Store", {
                            fields: ["name", "value"],
                            data: [
                                {name: "static Image", value: 0},
                                {name: "Dynamic Image", value: 1}
                            ]
                        }),
                        editable: false,
                        value: 0,
                        displayField: 'name',
                        valueField: 'value',
                        reference: "ImageType",
                        publishes: [
                            "value"
                        ]
                    },
                    {
                        xtype: "textfield", name: "src", fieldLabel: "Image",
                        listeners: {
                            render: "dragImageSetUrl"
                        }
                    },
                    {
                        xtype: "textfield",
                        name: "dynamicSrc", fieldLabel: "Dynamic Image",
                        bind: {
                            disabled: "{!ImageType.value}",
                            hidden: "{!ImageType.value}"
                        },
                        editable: true,
                        emptyText: "Please drag the image here.",
                        displayField: "text",
                        valueField: "src",
                        listeners: {
                            render: "dragImageSetUrl"
                        }
                    },
                    {
                        name: "x", fieldLabel: "x", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "y", fieldLabel: "y", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "width", fieldLabel: "width", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "height", fieldLabel: "height", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    }
                ]
            }
        )
        me.bindFormPanel = Ext.create("Ext.form.Panel", {
                width: 400,
                height: "100",
                margin: 10,
                viewModel: me.viewModel,
                title: "Value Binding",
                border: true,
                defaults: {
                    anchor: "100%",
                    allowBlank: false
                },
                items: [

                    {
                        xtype: 'checkbox',
                        fieldLabel: "bind",
                        name: 'isBind',
                        hidden: false,
                        reference: "isBind"
                        //publishes: [
                        //    "value"
                        //]
                    },
                    {
                        xtype: "textfield",
                        flex: 3,
                        fieldLabel: "ip",
                        reference: "ipfield",
                        name: "ip",
                        bind: {
                            hidden: "{!isBind.checked}",
                            disabled: "{!isBind.checked}"
                        },
                        value: "192.168.253.253" || window.location.hostname
                    },
                    {
                        xtype: "textfield",
                        flex: 1,
                        fieldLabel: "port",
                        name: "port",
                        bind: {
                            hidden: "{!isBind.checked}",
                            disabled: "{!isBind.checked}"
                        },
                        reference: "portfield",
                        value: "6379"
                    },
                    {
                        xtype: "button",
                        text: "link",
                        bind: {
                            hidden: "{!isBind.checked}",
                        },
                        flex: 1,
                        handler: function (menu) {
                            var ip = me.lookup("ipfield").getValue();
                            var port = me.lookup("portfield").getValue();
                            var devsfield = me.lookup("devsfield")
                            devsfield.init(ip, port);
                        }
                    }, /*{
                     xtype: "container",
                     //layout: "vbox",
                     defaults: {
                     anchor: "100%",
                     allowBlank: false,
                     hidden: true
                     },
                     hideAll: function () {
                     var me = this;
                     var items = me.items.items;
                     for (var i = 0; i < items.length; i++) {
                     items[i].hide()
                     }
                     },
                     items: [*/
                    {
                        xtype: "combo",
                        //flex: 2,
                        bind: {
                            hidden: "{!isBind.checked}",
                        },
                        name: "nodename",
                        fieldLabel: "Object_Name",
                        displayField: 'name',
                        valueField: 'value',
                        disabled: true,
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
                                            me.setDisabled(false)

                                            me.setStore(store);
                                            return true;
                                        }
                                    } catch (e) {
                                        //me.up().hideAll()
                                        var devsfield = me.lookup("devsfield")
                                        var typescombo = me.lookup("typescombo");
                                        devsfield.hide()
                                        typescombo.hide()
                                        Ext.Msg.alert("Error", "Connect to database failed !");
                                        if (me.store) {
                                            if (me.store.data.length > 0)
                                                me.store.clearAll()
                                        }
                                        //me.clearValue()
                                        //me.setStore(null)
                                        return false;
                                    }
                                }, {
                                    par: "getdevs",
                                    ip: ip,
                                    port: port
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
                        xtype: "combo",
                        bind: {
                            hidden: "{!isBind.checked}",
                        },
                        //flex: 2,
                        reference: "typescombo",
                        fieldLabel: "Type",
                        editable: false,
                        name: "type",
                        disabled: true,
                        init: function (ip, port, nodename) {
                            var me = this;

                            My.Ajax("resources/main.php", function (response) {
                                me.setStore(Ext.decode(response.responseText))
                                me.setDisabled(false)
                            }, {
                                par: "gettypes",
                                ip: ip,
                                port: port,
                                nodename: nodename
                            })
                        }
                    }
                    /*  ]

                     }*/
                ]
            }
        )
        me.items = [me.labelFormPanel, me.bindFormPanel];

        me.labelFormPanel.getForm().setValues(me.values)
        me.bindFormPanel.getForm().setValues(me.values)

        me.buttons = [
            {
                text: "OK", handler: function () {

                var labelForm = me.labelFormPanel.getForm();
                var bindForm = me.bindFormPanel.getForm();

                if (labelForm.isValid()) {
                    var bindValues = bindForm.getValues()

                    var datas = labelForm.getValues();
                    console.log(datas)

                    me.ok(Ext.apply(datas,bindValues));

                    me.close()
                }

                //if(bindForm.isValid()){

                //}

            }
            },
            {
                text: "Cancel", handler: function () {
                me.close()
            }
            }
        ]
        me.callParent();
    },
    listeners: {
        destroy: function () {
            var me = this;
            me.cancel()
        }
    }
});
