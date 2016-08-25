Ext.define('editpic.view.form.LinkPropertyForm', {
    extend: 'editpic.view.form.CanvasMenuBaseForm',
    title: "Value Binding",
    border: true,
    defaults: {
        anchor: "100%",
        allowBlank: false
    },
    initComponent: function () {
        var me = this, values = me.values, itype = me.values.itype;


        console.log(itype)
        if (itype == 0 || itype == 1 || itype == 2 || itype == 5) {
            var nodeNameStore = My.getDevStore(me.values.ip, me.values.port)
            var nodeTypeStore = My.getDevTypeStore(me.values.ip, me.values.port, me.values.nodename);

            me.items = [

                {
                    xtype: 'checkbox',
                    fieldLabel: "bind",
                    name: 'isBind',
                    hidden: false,
                    inputValue: true,
                    reference: "isBind",
                    bind: itype != 0 || {
                        disabled: "{!isLinkDataBase.checked}"
                    }, handler: function (field, value) {
                    var priority = me.lookup("priority");
                    var isBindPriority=me.lookup("isBindPriority");
                    if(!value){
                        priority.hide()
                        priority.setDisabled(true)
                        isBindPriority.hide()
                        isBindPriority.setValue(value)
                    }else{

                        isBindPriority.show()
                    }

                   /* bind: {
                        name: 'isBindPriority',
                            hidden: "{!isBind.checked}",
                            disabled: "{!isBind.checked}",
                    },*/

                }
                },
                {
                    //xtype: "textfield",
                    xtype:"combo",
                    flex: 3,
                    fieldLabel: "ip",
                    reference: "ipfield",
                    name: "ip",
                    bind: {
                        hidden: "{!isBind.checked}",
                        disabled: "{!isBind.checked}"
                    },
                    store:[window.location.hostname,"192.168.253.253"],
                    value: window.location.hostname
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
                    allowBlank:true,
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
                            devsfield.hide()
                            typescombo.hide()
                            //Ext.Msg.alert("Error", "Connect to database failed !");
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
                    value: values.type || "Present_Value",
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
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: "bind priority",
                    name: 'isBindPriority',
                    hidden: true,
                    inputValue:true,
                    reference: "isBindPriority",
                    /*bind: itype != 0 || {
                     disabled: "{!isLinkDataBase.checked}"
                     }*/
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
                        disabled: "{!isBindPriority.checked}",
                    },
                    items: values.getFormItems ? values.getFormItems() : []
                },


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
                    name: "linkValue"
                }
            ]
        }
        /*if (itype == 4) {
         me.title = "Set Value"
         me.items = [
         {
         xtype: "textfield", allowBlank: false, name: "linkValue", fieldLabel: "Text"
         },{
         xtype: 'colorfield',
         fieldLabel: 'Font Color',
         value:values.getFontColor(),
         name:"fontColor",
         listeners:{
         change:function(field,color){
         values.setFontColor("#"+color);
         }
         }
         }
         ]
         }*/
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
