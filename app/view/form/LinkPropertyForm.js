Ext.define('editpic.view.form.LinkPropertyForm', {
    extend: 'Ext.form.Panel',

    requires: [
        'editpic.view.form.LinkPropertyFormController',
        'editpic.view.form.LinkPropertyFormModel'
    ],

    controller: 'form-linkpropertyform',
    viewModel: {
        type: 'form-linkpropertyform'
    },

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
        var me = this;

        if (!me.items) {

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
        me.callParent();
    }

});
