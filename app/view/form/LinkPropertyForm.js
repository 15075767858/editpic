Ext.define('editpic.view.form.LinkPropertyForm', {
    extend: 'editpic.view.form.CanvasMenuBaseForm',
    title: "Value Binding",
    border: true,
    //graph.view.chart.HistoryChart
    defaults: {
        anchor: "100%",
        allowBlank: false
    },

    initComponent: function () {
        var me = this,
            values = me.values,
            itype = me.values.itype;
        console.log(itype)
        if (itype == 0 || itype == 1 || itype == 2 || itype == 5) {
            var nodeNameStore = My.getDevStore(me.values.ip, me.values.port)
            var nodeTypeStore = My.getDevTypeStore(me.values.ip, me.values.port, me.values.nodename);
            me.items = [{
                    xtype: 'checkbox',
                    fieldLabel: "bind",
                    name: 'isBind',
                    hidden: true,
                    inputValue: true,
                    reference: "isBind",
                    bind: itype != 0 || {
                        disabled: "{!isLinkDataBase.checked}"
                    },
                    listeners: {
                        render: function (checkbox) {
                            checkbox.setValue(true)
                        }
                    },
                    handler: function (field, value) {
                        var priority = me.lookup("priority");
                        var isBindPriority = me.lookup("isBindPriority");
                        if (!value) {
                            priority.hide()
                            priority.setDisabled(true)
                            isBindPriority.hide()
                            isBindPriority.setValue(value)
                        } else {
                            isBindPriority.show()
                        }
                    }
                },
                {
                    //xtype: "textfield",
                    xtype: "combo",
                    flex: 3,
                    fieldLabel: "ip",
                    reference: "ipfield",
                    name: "ip",
                    bind: {
                        hidden: "{!isBind.checked}",
                        disabled: "{!isBind.checked}"
                    },
                    store: ["127.0.0.1", window.location.hostname, "192.168.253.253"],
                    value: "127.0.0.1"

                },
                {
                    xtype: "combo",
                    flex: 1,
                    fieldLabel: "port",
                    name: "port",
                    bind: {
                        hidden: "{!isBind.checked}",
                        disabled: "{!isBind.checked}"
                    },
                    reference: "portfield",
                    store: ['6379'],
                    value: "6379"
                },
                {
                    xtype: "button",
                    text: "link",
                    bind: {
                        hidden: "{!isBind.checked}"
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
                    allowBlank: true,
                    store: nodeNameStore,
                    disabled: !values.nodename,
                    value: values.nodename,
                    itemId: "devscombo",
                    reference: "devsfield",
                    editable: true,

                    init: function (ip, port) {
                        var combo = this;
                        combo.ip = ip;
                        combo.port = port;
                        values.ip = ip;
                        values.port = port;
                        var store = My.getDevStore(ip, port);
                        if (store) {
                            combo.setDisabled(false)
                            combo.setStore(store);
                        } else {
                            var devsfield = me.lookup("devsfield")
                            var typescombo = me.lookup("typescombo");
                            //devsfield.hide()
                            //typescombo.hide()
                            Ext.Msg.alert("Error", "Connect to database failed !");
                            if (combo.store) {
                                if (combo.store.data.length > 0)
                                    combo.store.clearAll()
                            }
                        }

                    },
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
                            var a = me.lookup("priority")
                            console.log(arguments)
                            a.removeAll()
                            a.add(values.getFormItems(newValue))
                            //.setItems()
                        },
                        focus: function (combo) {

                            var win = Ext.create("Ext.window.Window", {
                                title: "Select Object_Name",
                                autoShow: true,
                                layout: "card",
                                width: 800,
                                height: 600,
                                scrollable: "y",
                                modal: true,

                                items: [{
                                        rootVisible: false,
                                        xtype: "treepanel",
                                        width: "100%",
                                        height: "100%",
                                        scrollable: "y",
                                        modal: true,
                                        listeners: {
                                            boxready: function (treePanel) {
                                                if (!combo.value) {
                                                    return
                                                }
                                                setTimeout(function () {
                                                    var node = treePanel.store.findNode('value', combo.value)
                                                    var path = node.getPath()
                                                    treePanel.selectPath(path)
                                                }, 1000)

                                            }
                                        },
                                        tbar: [{
                                            text: 'Expand All',
                                            xtype: "button",
                                            handler: function (th) {
                                                var me = this.up("treepanel");
                                                me.expandAll();
                                            }
                                        }, {
                                            text: 'Collapse All',
                                            xtype: "button",
                                            handler: function (th) {
                                                var me = this.up("treepanel");
                                                me.collapseAll();
                                            }
                                        }],

                                        store: Ext.create("Ext.data.TreeStore", {
                                            autoLoad: true,
                                            url: "resources/main.php?par=nodes",
                                            proxy: {
                                                type: "ajax",
                                                url: "resources/main.php?par=nodes&ip=" + combo.ip + "&port=" + combo.port + "",
                                                reader: {
                                                    type: "json"
                                                }
                                            }
                                        })
                                    },
                                    {
                                        xtype: "grid",
                                        width: "100%",
                                        height: "100%",
                                        scrollable: "y",
                                        plugins: 'gridfilters',
                                        store: combo.store,
                                        columns: [{
                                            text: "Object_Name",
                                            dataIndex: "name",
                                            flex: 7,
                                            filter: {
                                                type: "string"
                                            },
                                            items: {
                                                xtype: 'textfield',
                                                flex: 1,
                                                margin: 2,
                                                enableKeyEvents: true,
                                                listeners: {
                                                    change: function (field, newValue, oldValue) {
                                                        var colum = this.up()
                                                        colum.filter.setValue(newValue)
                                                    }
                                                }
                                            }
                                        }, {
                                            text: "Key",
                                            dataIndex: "value",
                                            flex: 3,
                                            filter: {
                                                type: "string"
                                            },
                                            items: {
                                                xtype: 'textfield',
                                                flex: 1,
                                                margin: 2,
                                                enableKeyEvents: true,
                                                listeners: {
                                                    change: function (field, newValue, oldValue) {
                                                        var colum = this.up()
                                                        colum.filter.setValue(newValue)
                                                    }
                                                }
                                            }
                                        }]
                                    }


                                ],

                                buttons: [{
                                        text: "Select mode",
                                        handler: function () {
                                            var activeItem = win.layout.getActiveItem();
                                            if (activeItem.next()) {
                                                win.layout.setActiveItem(activeItem.next())
                                            } else {
                                                win.layout.setActiveItem(activeItem.prev())
                                            }

                                        }
                                    },
                                    "->",
                                    {
                                        text: "Ok",
                                        handler: function () {

                                            //var grid = win.down("treepanel");
                                            var grid = win.layout.getActiveItem()
                                            var selectArr = grid.getSelection();
                                            if (selectArr.length) {
                                                combo.setValue(selectArr[0].data.value)
                                                win.close();
                                            }
                                        }
                                    },
                                    {
                                        text: "Cancel",
                                        handler: function () {
                                            win.close();
                                        }
                                    }
                                ]
                            })
                        }
                    }
                },
                {
                    xtype: "combo",
                    bind: {
                        hidden: "{!isBind.checked}"
                    },
                    reference: "typescombo",
                    fieldLabel: "Type",
                    editable: false,
                    name: "type",
                    disabled: !values.type,
                    store: nodeTypeStore,
                    value: values.type || "Present_Value",
                    init: function (ip, port, nodename) {
                        var me = this;
                        var store = My.getDevTypeStore(ip, port, nodename);
                        if (store) {
                            me.setStore(store)
                            me.setDisabled(false)
                        }
                    }
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: "bind priority",
                    name: 'isBindPriority',
                    hidden: true,
                    inputValue: true,
                    reference: "isBindPriority"
                },

                {
                    xtype: 'fieldset',
                    title: 'Priority_For_Writing',
                    reference: "priority",
                    defaultType: 'combo',
                    defaults: {
                        anchor: '100%'
                    },
                    bind: {
                        hidden: "{!isBindPriority.checked}",
                        disabled: "{!isBindPriority.checked}"
                    },
                    items: values.getFormItems ? values.getFormItems() : []
                }
            ]
        }

        if (itype == 3) {
            me.items = [{
                    xtype: 'checkbox',
                    fieldLabel: "bind",
                    name: 'isBind',
                    hidden: true,
                    reference: "isBind",
                    listeners: {
                        render: function (checkbox) {
                            checkbox.setValue(true)
                        }
                    }
                },
                {
                    xtype: "combo",
                    bind: {
                        hidden: "{!isBind.checked}",
                        disabled: "{!isBind.checked}"
                    },
                    //flex: 2,
                    store: My.getHomeFileNames(),
                    fieldLabel: "Type",
                    editable: false,
                    name: "linkValue"
                }
            ]
        }



        //redis ip port 选择框
        if (itype == 12 || itype == 16) {
            var ipFiled = {
                xtype: "combo",
                flex: 3,
                fieldLabel: "ip",
                reference: "ipfield",
                name: "ip",
                store: ["127.0.0.1", window.location.hostname, "192.168.253.253"],
                value: "127.0.0.1"
            };
            var portField = {
                xtype: "combo",
                flex: 1,
                fieldLabel: "port",
                name: "port",
                reference: "portfield",
                store: ['6379'],
                value: "6379"
            };
            /*
             var linkBtnField = {
             xtype: "button",
             text: "link",
             flex: 1
             };*/
            me.items = [
                ipFiled,
                portField
            ]
        }
        if (itype == 17) {
            me.items = []
            var setHistoryButton = {
                xtype: "button",
                flex: 1,
                text: "ConfigHistoryTableWindow",
                handler: function () {
                    Ext.create("ConfigHistoryTableWindow")
                }
            }
            var addListen = {
                xtype: "button",
                flex: 1,
                text: "AddHistoryPoint",
                handler: function () {
                    var ip = me.lookup("ipfield").getValue();
                    var port = me.lookup("portfield").getValue();
                    Ext.createByAlias("SelectKeyWinodw", {
                        ip: ip || "127.0.0.1",
                        port: port || 6379,
                        callback: function (selectArr) {
                            var win = this;
                            var keys = this.down("treepanel").getChecked();
                            this.down("treepanel")
                            keys = keys.filter(function (val, index) {
                                if (val.data.leaf) {
                                    return true;
                                } else {
                                    return false;
                                }
                            })
                            if (keys.length > 8) {
                                Ext.Msg.alert("Exception", "The maximum quantity is 8");
                                return;
                            }
                            var keysArr = [];
                            for (var i = 0; i < keys.length; i++) {
                                keysArr.push(keys[i].data.value);
                            }
                            var keysStr = keysArr.join(",");
                            hostPoint.setValue(keysStr);
                            My.delayToast("info", "select ok ." + keysStr);
                            win.close();
                        }
                    })
                }
            }
            var tableName = Ext.createWidget("combo", {
                flex: 1,
                name: "tablename",
                fieldLabel: "table name",
                //value: "",
                store: Ext.create("graph.store.HistoryStore", {
                    // filterIp: me.values.ip
                }),
                valueField: "tablename",
                displayField: "tablename",
                editable: false,
                listeners: {
                    focusleave: function () {
                        console.log("focusleave")
                    }
                }
            })
            var hostPoint = Ext.createWidget("textfield", {
                flex: 1,
                name: "hostPoint",
                fieldLabel: "host point",
                value: ""
            })
            me.items.push(tableName)
            me.items.push(setHistoryButton)

        }

        if (itype == 12) {
            var schdules = My.getSchdules(me.values.ip, me.values.port)
            me.items.push({
                xtype: "button",
                text: "link",
                flex: 1,
                handler: function () {
                    var ip = me.lookup("ipfield").getValue();
                    var port = me.lookup("portfield").getValue();
                    var store = My.getSchdules(ip, port);
                    if (store) {
                        var devscombo = me.lookup("devscombo")
                        console.log(devscombo)
                        devscombo.setStore(store)
                    } else {
                        Ext.Msg.alert("Error", "Connect to database failed !");
                    }
                }
            })
            me.items.push({
                xtype: "combo",
                name: "schdule",
                fieldLabel: "schdule",
                displayField: 'name',
                valueField: 'value',
                allowBlank: true,
                itemId: "devscombo",
                reference: "devscombo",
                editable: true,
                store: schdules
            })
        }
        if (itype == 16) {
            var devs = My.getDevNames(me.values.ip, me.values.port);

            me.items.push({
                xtype: "button",
                text: "link",
                flex: 1,
                handler: function () {
                    var ip = me.lookup("ipfield").getValue();
                    var port = me.lookup("portfield").getValue();
                    var store = My.getDevNames(ip, port);
                    if (store) {
                        var devscombo = me.lookup("devscombo")
                        console.log(devscombo)
                        devscombo.setStore(store)
                        devscombo.setDisabled(false)
                    } else {
                        Ext.Msg.alert("Error", "Connect to database failed !");
                    }
                }
            })
            me.items.push({
                xtype: "combo",
                name: "device",
                fieldLabel: "devices",
                //disabled:true,
                allowBlank: true,
                itemId: "devscombo",
                reference: "devscombo",
                editable: true,
                store: devs,
                listeners: {
                    render: function (combo) {
                        if (!combo.value) {
                            combo.setDisabled(true)
                        }
                    }

                }
            })

        }

        me.myIsValid = function () {
            if (itype == 17) {
                var isTableExist = false;
                Ext.Ajax.request({
                    url: "resources/mysql.php",
                    async: false,
                    params: {
                        par: "isTableExist"
                    },
                    success: function (response) {
                        var obj = Ext.decode(response.responseText);

                    }
                })

                return me.isValid() & confirm("table was already exist. would you like to change it? ");
            }

            return me.isValid();
        }

        me.callParent();
    },
    listeners: {
        boxready: "boxready"
    }

});

/*
 [
 /!* {
 xtype: "combo",
 reference:"priority_type",
 fieldLabel: "Type",
 editable: false,
 name: "priorityType",
 store: Ext.create("Ext.data.Store", {
 fields: ["name", "value"],
 data: [{
 name: "boolean", value: 0
 }, {
 name: "float", value: 1
 }]
 }),
 value:values.priorityType,
 displayField: 'name',
 valueField: 'value',
 listeners:{
 change:function(field,newValue){
 var value0 = me.lookup("value0");
 var value1 = me.lookup("value1");
 console.log(value0)
 console.log(value1)
 if(newValue==0){
 value0.show()
 value0.setDisabled(false)
 value1.hide()
 value1.setDisabled(true)
 }
 if(newValue==1){
 value1.show()
 value1.setDisabled(false)
 value0.hide()
 value0.setDisabled(true)
 }
 }
 }
 },
 {
 fieldLabel: "Priority",
 name:"Priority_For_Writing",
 value:values.Priority_For_Writing||8,
 editable:false,
 store: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
 },
 {
 fieldLabel:"Value",
 reference:"value0",
 store:[0,1],
 name:"Priority",
 value:values.Priority,
 disabled:values.priorityType==1,
 hidden:values.priorityType==1,

 },{
 xtype:"numberfield",
 reference:"value1",
 fieldLabel:"Value",
 decimalPrecision:4,
 name:"priorityValue",
 value:values.priorityValue,
 allowDecimals: true,
 maxValue:1000000,
 minValue:-1000000,
 disabled:values.priorityType==0,
 hidden:values.priorityType==0
 /!*listeners:{
 change:function(field,newValue,oldValue){
 console.log(arguments)
 var value = Ext.util.Format.number(newValue,"000000.0000")
 field.setValue(value)
 console.log(value)

 }
 }*!/
 },*!/
 //Ext.create("editpic.view.form.field.KeybordNumber"),

 ]*/

