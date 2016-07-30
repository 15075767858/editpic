Ext.define('editpic.view.window.FieldMenuWindow',
    {
        extend: 'Ext.window.Window',
        title: "Propertys",

        autoShow: true,
        requires: [
            'editpic.view.window.FieldMenuWindowController',
            'editpic.view.window.FieldMenuWindowModel'
        ],

        controller: 'window-fieldmenuwindow',
        viewModel: {
            type: 'window-fieldmenuwindow'
        },

        initComponent: function () {
            var me = this;
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
                        },
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
                        console.log(bindValues)
                        var datas = labelForm.getValues();
                        me.ok(Ext.apply(datas, bindValues));
                        me.close()
                    }
                }
                },
                {
                    text: "Cancel", handler: function () {

                    me.close()
                }
                }
            ]
            me.callParent();
        }
    }
)