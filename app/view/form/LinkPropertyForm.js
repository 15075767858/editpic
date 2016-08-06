Ext.define('editpic.view.form.LinkPropertyForm', {
    extend: 'editpic.view.form.CanvasMenuBaseForm',
    width: 400,
    height: "100",
    margin: 10,
    title: "Value Binding",
    border: true,
    defaults: {
        anchor: "100%",
        allowBlank: false
    },
    initComponent: function () {
        var me = this, values = me.values, itype = me.values.itype;

        console.log(values)

        console.log(itype)
        if (itype == 0 || itype == 1 || itype == 2) {
            var nodeNameStore = My.getDevStore(me.values.ip, me.values.port)
            var nodeTypeStore = My.getDevTypeStore(me.values.ip, me.values.port, me.values.nodename);

            me.items = [

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
                        hidden: "{!isBind.checked}"
                    },
                    name: "nodename",
                    fieldLabel: "Object_Name",
                    displayField: 'name',
                    valueField: 'value',
                    store: nodeNameStore,
                    disabled: !values.nodename,
                    value: values.nodename,
                    itemId: "devscombo",
                    reference: "devsfield",
                    init: function (ip, port) {
                        var combo = this;
                        combo.ip = ip;
                        combo.port = port;
                        var store = My.getDevStore(ip, port);
                        if (store) {
                            combo.setDisabled(false)
                            combo.setStore(store);
                        } else {
                            var devsfield = me.lookup("devsfield")
                            var typescombo = me.lookup("typescombo");
                            devsfield.hide()
                            typescombo.hide()
                            Ext.Msg.alert("Error", "Connect to database failed !");
                            if (combo.store) {
                                if (combo.store.data.length > 0)
                                    combo.store.clearAll()
                            }
                        }
                        /*My.Ajax("resources/main.php", function (response) {
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
                         )*/
                    },
                    editable: false,
                    listeners: {
                        boxready: function (combo) {
                            var store = My.getDevStore(me.values.ip, me.values.port)
                            if (store) {
                                combo.setStore(store);
                            }
                        },
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
                    reference: "typescombo",
                    fieldLabel: "Type",
                    editable: false,
                    name: "type",
                    disabled: !values.type,
                    store: nodeTypeStore,
                    value: values.type,
                    init: function (ip, port, nodename) {
                        var me = this;
                        var store = My.getDevTypeStore(ip, port, nodename);
                        if (store) {
                            me.setStore(store)
                            me.setDisabled(false)
                        }
                        /*
                         My.Ajax("resources/main.php", function (response) {
                         me.setStore(Ext.decode(response.responseText))
                         me.setDisabled(false)
                         }, {
                         par: "gettypes",
                         ip: ip,
                         port: port,
                         nodename: nodename
                         })*/
                    }
                }

            ]

        }

        if (itype == 3) {
            me.items = [
                {
                    xtype: 'checkbox',
                    fieldLabel: "bind",
                    name: 'isBind',
                    hidden: false,
                    reference: "isBind"

                },
                {
                    xtype: "combo",
                    bind: {
                        hidden: "{!isBind.checked}",
                        disabled: "{!isBind.checked}"
                    },
                    //flex: 2,
                    store: My.getImageNames(),
                    fieldLabel: "Type",
                    editable: false,
                    name: "linkValue",
                }
            ]
        }
        if (itype == 4) {
            me.title = "Set Value"
            me.items = [
                {
                    xtype: "textfield", allowBlank: false, name: "linkValue", fieldLabel: "Text"
                }
            ]
        }

        me.callParent();
    }

});
