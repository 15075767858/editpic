Ext.define('editpic.view.img.TextFieldTool',
    {
        //extend: 'editpic.view.img.Base',
        extend: "editpic.view.img.BaseTool",
        /* requires: [
         'editpic.view.img.TextFieldToolController',
         'editpic.view.img.TextFieldToolModel'
         ],
         controller: 'img-textfieldtool',
         viewModel: {
         type: 'img-textfieldtool'
         },*/
        initComponent: function () {
            var me = this;
            var textfield = Ext.create("Ext.form.field.Text", {
                editable: false,
                listeners: {
                    el: {
                        click: function () {


                        }
                    }
                }
            })
            me.items = textfield;
            me.field = textfield;

            me.callParent()
        },


        init: function (data) {
            var me = this;
            me.callParent(arguments)
            Ext.apply()
            me.Priority_For_Writing = data.Priority_For_Writing;
            me.priorityValue = data.priorityValue;

            console.log(me)
        },
        getInitData: function () {
            var me = this;
            var data = me.callParent()
            Ext.apply(data, {
                Priority_For_Writing: me.Priority_For_Writing,
                priorityValue: me.priorityValue
            })
            return data;
        },

        getFormItems: function (nodename) {
            var me = this;
            console.log(me);

            nodename = nodename || me.nodename;
            me.nodename=nodename
            if(!nodename){
             return;
             }
            var nodeType = nodename.substr(4, 1);

            var items = [];

            var combo1 = Ext.create("Ext.form.field.ComboBox", {
                fieldLabel: "Priority",
                name: "Priority_For_Writing",
                value: me.Priority_For_Writing || 8,
                editable: false,
                store: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            });

            var valueField = null;
            if (nodeType == 1 || nodeType == 2) {
                valueField = Ext.create("Ext.form.field.Number", {
                    fieldLabel: "Value",
                    decimalPrecision: 4,
                    name: "priorityValue",
                    value: me.priorityValue,
                    allowDecimals: true,
                    maxValue: 1000000,
                    minValue: -1000000
                })

            } else if (nodeType == 4 || nodeType == 5) {

                valueField = Ext.create("Ext.form.field.ComboBox",
                    {
                        fieldLabel: "Value",
                        store: Ext.create("Ext.data.Store", {
                            field: ["name", "value"],
                            data: [{name: "Off", value: 0}, {name: "On", value: 1}]
                        }),
                        displayField: 'name',
                        valueField: 'value',
                        name: "priorityValue",
                        value: me.priorityValue
                    })

            } else {
                return null;
            }

            items.push(combo1);

            items.push(valueField);

            items.push({
                xtype: "button", text: "publish", handler: function () {
                    me.Priority_For_Writing = combo1.getValue();
                    me.priorityValue = valueField.getValue();
                    me.publishPriority()
                }
            })

            return items;
        },
        openAlermWindow: function () {
            var me = this;

            /* var combo1 = Ext.create("Ext.form.field.ComboBox", {
             fieldLabel: "Priority",
             name: "Priority_For_Writing",
             value: me.Priority_For_Writing || 8,
             editable: false,
             store: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
             })

             var type0 = Ext.create("Ext.form.field.ComboBox",
             {
             fieldLabel: "Value",
             reference: "value0",
             store: [0, 1],
             name: "Priority",
             value: me.Priority,

             })

             var type1 = Ext.create("Ext.form.field.Number", {
             reference: "value1",
             fieldLabel: "Value",
             decimalPrecision: 4,
             name: "priorityValue",
             value: me.priorityValue,
             allowDecimals: true,
             maxValue: 1000000,
             minValue: -1000000,

             })*/
            /*form.add(combo1);
             if (me.priorityType == 0) {
             form.add(type0);
             } else {
             form.add(type1);
             }
             console.log(me)
             console.log(form)
             */
            var formItems = me.getFormItems();
            if (!formItems) {
                return;
            }
            var form = Ext.create("Ext.form.Panel", {
                padding: 10,
                defaults: {
                    anchor: '100%',
                    width:"100%"
                },
                items: me.getFormItems()
            })

            var win = Ext.create("Ext.window.Window", {
                title: "Priority",
                autoShow: true,
                width:400,
                items: form,
               /* buttons: [
                    {
                        text: "OK", handler: function () {
                        var formValues = form.getValues()
                        var ip = me.ip;
                        var port = me.port;
                        var nodename = me.nodename;

                        My.AjaxSimple({
                            par: "changevalue",
                            ip: ip,
                            port: port,
                            nodename: nodename,
                            type: "Priority_For_Writing",
                            value: formValues.Priority_For_Writing
                        }, "", function () {
                            My.delayToast("Massage", "Change Priority_For_Writing success , new value is " + formValues.priority);
                        })


                        My.AjaxSimple({
                            par: "changevalue",
                            ip: ip,
                            port: port,
                            nodename: nodename,
                            type: "Priority",
                            value: formValues.Priority_For_Writing
                        }, "", function () {
                            My.delayToast("Massage", "Change Priority_Value success , new value is " + formValues.Priority);
                        })

                        win.close()
                    }
                    },
                    {
                        text: "Cancel", handler: function () {
                        win.close()
                    }
                    }
                ]*/
            })
            me.publishPriority()
            form.getForm().setValues(me);
        },
        publishPriority: function () {

            var me = this;
            var ip = me.ip, port = me.port, nodename = me.nodename, devname = me.nodename.substr(0, 4), strnull = "", pubstr = "";

            My.AjaxSimple({
                par: "gettypevalue",
                ip: ip,
                port: port,
                nodename: nodename,
                type: "Priority_Array"
            }, "", function (response) {
                var aPriority = response.responseText.split(",");
                for (var i = 0; i < 16; i++) {
                    if (i + 1 == parseInt(me.Priority_For_Writing)) {
                        strnull += me.priorityValue + ",";
                        pubstr += me.priorityValue + ",";
                    } else {
                        strnull += aPriority[i] || "NULL" + ","
                        pubstr += "NULL,";
                    }
                }
                My.AjaxSimple({
                    par: "changevalue",
                    ip: ip,
                    port: port,
                    nodename: nodename,
                    type: "Priority_Array",
                    value: pubstr.substr(0,pubstr.length-1)
                }, "", function () {
                    My.delayToast('Success', nodename + ' Change value Priority_Array success new value is ' + strnull.substr(0, strnull.length - 1), 0)
                })
            })


            console.log(strnull)
            console.log(pubstr)
        },
        setPresent_Value: function (sDevNodeName, text1, text2) {

            var sDevName = sDevNodeName.substr(0, 4);
            var strnull = "";
            var pubstr = "";
            var url = "resources/test1.php?par=getvalue&nodename=" + sDevNodeName + "&type=Priority_Array";
            myAjax(url, function (response) {
                var aPriority = response.responseText.split(",");
                for (var i = 0; i < 16; i++) {
                    if (i + 1 == parseInt(text2)) {
                        strnull += text1 + ",";
                        pubstr += text1 + ",";
                    } else {
                        strnull += aPriority[i] + ","
                        pubstr += "NULL,";
                    }
                }
            })


            myAjax("resources/test1.php?par=changevaluenopublish&nodename=" + sDevNodeName + "&type=Priority_Array&value=" + strnull.substr(0, strnull.length - 1), function () {
                delayToast('Success', sDevNodeName + ' Change value Priority_Array success new value is ' + strnull.substr(0, strnull.length - 1), 0)
            })

            if (text1 == "NULL") {
                var value = sDevNodeName + "\r\nCancel_Priority_Array\r\n" + text2;
                //alert(sDevNodeName + "\r\nCancel_Priority_Array\r\n" + text2)
                devPublish(sDevName + ".8.*",
                    value,
                    function () {
                        delayToast('Success', 'Publish Ok.', 1000)
                    })

            } else {
                var value = sDevNodeName + "\r\nPriority_Array\r\n" + pubstr.substr(0, pubstr.length - 1);
                //alert(sDevNodeName + "\r\nPriority_Array\r\n" + strnull.substr(0, strnull.length - 3))
                devPublish(sDevName + ".8.*",
                    value,
                    function () {
                        delayToast('Success', 'Publish Ok.', 1000)
                    })

            }
        },

        refreshCanvas: function () {
            var me = this;
            me.field.setValue(me.getLinkValue())
        },
    }
);
