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
            /*Ext.apply()
            me.Priority_For_Writing = data.Priority_For_Writing;
            me.priorityValue = data.priorityValue;
            me.isBindPriority=data.isBindPriority
            console.log(me)*/
        },
        getInitData: function () {
            var me = this;
            var data = me.callParent()
            /*Ext.apply(data, {
                Priority_For_Writing: me.Priority_For_Writing,
                priorityValue: me.priorityValue,
                isBindPriority:me.isBindPriority
            })*/
            return data;
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
