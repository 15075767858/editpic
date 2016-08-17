/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('editpic.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    saveHandler: function () {
        var curPanel = Ext.getCmp("mintab").getCurrentTab()
        console.log(curPanel)
        var win = Ext.create('Ext.window.Window', {
            title: 'Save',
            frame: true,
            width: 325,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    margin: 10,
                    xtype: "textfield",
                    allowBlank: false,
                    value: curPanel.title,
                    fieldLabel: 'File Name',
                }
            ],
            buttons: [
                {
                    text: 'Ok', handler: function () {
                    var text = win.down("textfield").getValue();
                    if (text == null) {
                        Ext.Msg.alert('Info', 'Plase input file name.');
                        return;
                    }

                    var picPanel = curPanel.down("picpanel");
                    var datas = picPanel.save();
                    var json = My.getImageData();
                    console.log(typeof json == "object")
                    if (typeof json == 'object') {
                        json[text] = datas;
                    } else {
                        json = {}
                        json[text] = datas
                    }
                    curPanel.setTitle(text)
                    My.putImageData(Ext.encode(json), text)
                    //console.log(json);
                    win.close();
                    My.delayToast("Massage", "Save File OK !");
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]
        })
    },
    openHandler: function () {

        var comboStore = My.getImageNames()


        var win = Ext.create('Ext.window.Window', {
            title: 'Open',
            frame: true,
            width: 325,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    margin: 10,
                    xtype: "combobox",
                    allowBlank: false,
                    fieldLabel: 'File Name',
                    store: comboStore,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    autoSelect: false
                }
            ],
            buttons: [
                {
                    text: 'Ok', handler: function () {
                    var text = win.down("textfield").getValue();
                    if (text == null) {
                        Ext.Msg.alert('Info', 'Plase input file name.');
                        return;
                    }
                    var minTab = Ext.getCmp("mintab")

                    minTab.addTab(text)
                    win.close();
                    My.delayToast("Massage", "Open File OK !");
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]
        })
    },
    BackupGraphice:function(){

    },
    dataJsonUpload: function () {

        var win = Ext.create("Ext.window.Window", {
            autoShow: true,
            width: 400,
            title: "Upload data.json",
            items: {
                xtype: "form",
                bodyPadding: 10,
                frame: true,
                items: [{
                    xtype: 'filebutton',
                    name: 'file',
                    fieldLabel: 'data.json',
                    labelWidth: 50,
                    msgTarget: 'side',
                    allowBlank: false,
                    anchor: '100%',
                    buttonText: 'Select data.json',
                    /*validator: function (val) {
                     return "adsdadsa";
                     },*/
                    //isFileUpload : Boolean
                    listeners: {
                        change: function (menu, target, eOpts) {
                            var files = target.target.files;

                            if (files.length) {
                                var file = files[0];
                                var reader = new FileReader();
                                reader.onload = function () {
                                    //document.getElementById("filecontent").innerHTML = this.result;

                                    textarea.setValue(this.result);
                                    checkbox.setValue(true)
                                };
                                reader.readAsText(file);
                            }
                        }
                    }
                }
                ],
            },
            buttons: [{
                text: 'Upload',
                handler: function () {
                    var form = win.down('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            url: 'photo-upload.php',
                            waitMsg: 'Uploading your photo...',
                            success: function (fp, o) {
                                Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                            }
                        });
                    }
                }
            }]
        });

    }
});
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}


var My = {};

My.Ajax = function (url, success, params) {
    Ext.Ajax.request({
        url: url,
        method: "GET",
        async: false,
        params: params,
        success: success
    });
}
My.AjaxAsync = function (url, success, params) {
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "GET",
        async: true,
        params: params,
        success: success
    });
}
My.AjaxPost = function (url, success, params) {
    Ext.Ajax.request({
        url: url,
        method: "POST",
        async: false,
        params: params,
        success: success
    });
}

My.AjaxSimple = function (params, url, success) {
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "GET",
        async: false,
        params: params,
        success: success
    });
}
My.AjaxSimpleAsync= function (params, url, success) {
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "GET",
        async: true,
        timeout:600000,
        params: params,
        success: success
    });
}
My.AjaxSimplePost = function (params, url, success) {
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "POST",
        async: false,
        timeout: 1000,
        params: params,
        success: success,
        failure: function () {
            console.log(arguments)
        }
    });
}
My.AjaxSimplePostAsync = function (params, url, success) {
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "POST",
        async: true,
        timeout: 1000,
        params: params,
        success: success,
        failure: function () {
            //Ext.Msg.alert("Massage","the failure .")
            console.log(arguments)
        }
    });
}

My.delayToast = function (title, html, delay) {
    setTimeout(function () {
        Ext.toast({
            minWidth: 200,
            title: title,
            html: html,
            slideInDuration: 400,
            maxWidth: 800,
            align: 't'
            //align: 'br'
        });
    }, delay)
}


My.getImageData = function () {
    var data = {};

    My.Ajax("resources/main.php?par=getImageData", function (response) {
        console.log(response.responseText)
        try {
            data = Ext.decode(response.responseText);
        } catch (e) {

        }

    })
    return data;
}

My.putImageData = function (content, text) {
    var data = null;
    if (!text) {
        return data
    }
    My.AjaxPost("resources/main.php?par=putImageData", function (response) {
        data = response.responseText;
        My.AjaxSimple({
            par: "saveImageAsHtml",
            graph: text
        })
        //saveImageAsHtml
    }, {
        content: content
    })
    return data;
}
My.getImageNames = function () {
    var imgData = My.getImageData()
    var arr = [];
    for (var name  in imgData) {
        arr.push(name);
    }
    return arr;
}
My.getDevStore = function (ip, port) {
    var store = null;

    console.log(arguments)

    if (!ip & !port) {
        return store;
    }

    My.Ajax("resources/main.php", function (response) {
            var data = response.responseText
            try {
                var ojson = Ext.decode(data)
                if (ojson) {
                    store = Ext.create("Ext.data.Store", {
                        fields: ['name', 'value'],
                        data: ojson
                    })
                }
            } catch (e) {
            }
        }, {
            par: "getdevs",
            ip: ip,
            port: port
        }
    )
    return store;
}
My.getDevTypeStore = function (ip, port, nodename) {

    var store = [];
    if (!ip & !port & !nodename) {
        return store;
    }
    My.Ajax("resources/main.php", function (response) {
        try {
            store = Ext.decode(response.responseText)
        } catch (e) {

        }
    }, {
        par: "gettypes",
        ip: ip,
        port: port,
        nodename: nodename
    })

    return store;
}
My.getSearch = function () {
    var search = window.location.search;
    if (search) {
        var resObj = Ext.Object.fromQueryString(search)
        if (resObj) {
            return resObj
        }
    }
    return false;
}
My.userLogin=function(username,password){



};
My.linkManger = {};
My.linkManger.items = {};
My.linkManger.getValue = function (data) {
    var linkManger = this;
    var items = linkManger.items;
    var id = data.id;
    if (!items[id]) {
        items[id] = {};
    }

    items[id].ip = data.ip;
    items[id].port = data.port;
    items[id].nodename = data.nodename;
    items[id].type = data.type;

    return linkManger.items[id].value;
}

My.linkManger.autoLink = function () {

}
My.linkManger.getLinkDatas = function () {

    return Ext.encode(My.linkManger.items);
}

My.linkManger.init = function () {

    var interval1 = setInterval(function () {
        var data = {
            //par: "getLinkValues",
            datas: My.linkManger.getLinkDatas()
        }

        My.AjaxSimplePost(data, "resources/main.php?par=getLinkValues", function (response) {
            try {
                Ext.decode(response.responseText);
            } catch (e) {
                //Ext.Msg.alert("Massage"," linkDataBase Error Program 10 seconds after the automatic return to normal . "+response.responseText);
                clearInterval(interval1);
                setTimeout(function () {
                    My.linkManger.init()
                }, 10000)
                return;
            }
            if (response.responseText.length == 2) {
                //console.log(response.responseText)
                My.linkManger.items = {}
            } else {
                My.linkManger.items = Ext.decode(response.responseText)
                for (var id in My.linkManger.items) {
                    var img = Ext.getCmp(id);
                    if (img) {
                        if (img.linkValue != My.linkManger.items[id].value) {
                            img.setLinkValue(My.linkManger.items[id].value)
                        }
                    } else {
                        delete My.linkManger.items[id];
                    }
                }

            }

        });
    }, 1000)
}

My.initComponentConfig = {
    draggable: !My.getSearch(),
    resizable: !My.getSearch(),
    myGetBackgroundColor: function () {
        var me = this;
        if (me.body) {
            var backgroundColor = me.body.getStyle("backgroundColor");
            var color = Ext.ux.colorpick.ColorUtils.parseColor(backgroundColor);
            return Ext.ux.colorpick.ColorUtils.getRGBAString(color);
        } else {
            //return Ext.ux.colorpick.ColorUtils.parseColor("transparent");
            return "transparent";
        }
    },
    mySetBackgroundColor: function (color) {
        if (!color) {
            return;
        }
        var me = this;
        if (me.body) {
            if (typeof color == "string") {
                me.body.setStyle("backgroundColor", color);
                me.backgroundColor = color;
            }
            if (typeof color == "object") {
                var rgbaStr = Ext.ux.colorpick.ColorUtils.getRGBAString(color)
                me.body.setStyle("backgroundColor", rgbaStr)
                me.backgroundColor = rgbaStr;
            }
        }

    },
    mySetX: function (newValue) {
        newValue = parseInt(newValue)
        var me = this;
        var panel = me.up("picpanel");
        var value = newValue + panel.body.getX();
        me.setX(value);

        me.x = newValue;
    },
    mySetY: function (newValue) {
        newValue = parseInt(newValue)
        var me = this;
        var panel = me.up("picpanel");
        var value = newValue + panel.body.getY();
        me.setY(value);

        me.y = newValue;
    },
    mySetWidth: function (value) {
        value = parseInt(value)
        var me = this;
        if (me.field) {
            me.field.setWidth(value)
        }
        console.log(me.field);
        me.setWidth(value)
        me.width = value
    },
    mySetHeight: function (value) {
        value = parseInt(value)
        var me = this;
        if (me.field) {
            me.field.setHeight(value)
        }
        me.setHeight(value)
        me.height = value;
    },

    /*    mySetX: function (newValue) {
     newValue = parseInt(newValue)
     var me = this;
     var panel = me.up("picpanel");
     var value = newValue + panel.body.getX();
     me.x = newValue;
     me.setX(value);
     },
     mySetY: function (newValue) {
     newValue = parseInt(newValue)
     var me = this;
     var panel = me.up("picpanel");
     var value = newValue + panel.body.getY();
     me.y = newValue;
     me.setY(value);
     },
     mySetWidth: function (newValue) {
     console.log(newValue)
     newValue = parseInt(newValue)
     newValue = newValue - 0
     var me = this;
     me.setWidth(newValue)
     me.width = newValue;
     },
     mySetHeight: function (newValue) {
     console.log(newValue)
     newValue = parseInt(newValue)
     newValue = newValue - 0

     var me = this;

     me.setHeight(newValue)
     me.height = newValue
     },*/
    mySetZIndex: function (value) {
        var me = this;
        if (me.el) {
            me.setZIndex(value);
            me.zindex = value;
        }
    },

    hasLinkValue: function () {
        var me = this;
        if (me.linkValue == undefined) {
            return false;
        } else {
            return true;
        }
    },
    getLinkValue: function () {
        var me = this;
        if (me.hasLinkValue()) {
            if (!isNaN(me.linkValue)) {
                return parseFloat(me.linkValue);
            }

            return me.linkValue;
            /*if (me.linkValue) {
             if (!isNaN(me.linkValue)) {
             return me.linkValue
             }
             return true;
             } else {
             return false;
             }*/
        }
    },
    setLinkValue: function (linkValue) {
        var me = this;
        me.linkValue = linkValue || My.linkManger.getValue(me);
        me.refreshCanvas();
    },

    clearInterval: function () {
        var me = this;
        if (me.linkValue) {
            delete me.linkValue
        }
        if (me.interval) {
            clearInterval(me.interval);
        }
    },
    moveController: function (e) {
        if (!e.keyCode) {
            return;
        }
        var me = this;
        if (e.keyCode == 37) {
            me.mySetX(me.x - 1)
        }
        if (e.keyCode == 38) {
            me.mySetY(me.y - 1)
        }
        if (e.keyCode == 39) {
            me.mySetX(me.x + 1)
        }
        if (e.keyCode == 40) {
            me.mySetY(me.y + 1)
        }
    },
    openMenu: function (ok, cancel) {
        var me = this;

        Ext.create("editpic.view.window.CanvasConponmentWindow", {
            values: me,
            ok: ok || function (data) {

                me.init(data);
            },
            cancel: cancel || function () {

            }
        })
    },
    click: function (e, t, eOpts) {

        var me = this;
        if (My.getSearch()) {
            if (me.clientOpenMenu()) {
                me.openAlermWindow()
            }
            return;
        }
        console.log(arguments)
        var divs = me.el.dom.querySelectorAll(".x-resizable-handle");
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.opacity = 1
        }
        var textfield = Ext.create("Ext.form.field.Text", {
            hidden: false,
            width: 1,
            height: 1,
            listeners: {
                specialkey: function (field, e) {
                    console.log(arguments)
                    me.moveController(e)


                },
                focusleave: function () {
                    console.log("鼠标离开")
                    for (var i = 0; i < divs.length; i++) {
                        divs[i].style.opacity = 0
                    }
                    textfield.up().remove(textfield)

                }
            }
        })
        me.up().add(textfield)
        textfield.setZIndex(-1)
        textfield.focus()
        textfield.focus()
    },
    clientOpenMenu: function () {
        return true;
    },
    contextmenu: function (e) {

        e.stopEvent()
        if (My.getSearch()) {

            return;
        }
        var me = this;
        Ext.create("Ext.menu.Menu", {
            x: e.pageX,
            y: e.pageY,
            autoShow: true,
            items: [

                {
                    text: "copy", handler: function () {
                    me.up().copyImg = me;
                }
                },
                {
                    text: "delete", handler: function () {
                    me.close()
                }
                },
                {
                    text: "Property", handler: function () {
                    me.openMenu()
                    /*Ext.create("editpic.view.window.CanvasConponmentWindow", {
                     values: me,
                     ok: function (data) {
                     me.init(data);
                     },
                     cancel: function () {

                     }
                     })*/
                }
                }
            ]
        })
    },
    dblclick: function (e, el) {
        var me = this;
        if (My.getSearch()) {
            return;
        }
        console.log(me)
        me.openMenu()
    },

    getFormItems: function (nodename, bloakFn) {
        var me = this;
        console.log(me);

        nodename = nodename || me.nodename;
        me.nodename = nodename
        if (!nodename) {
            return;
        }
        var nodeType = nodename.substr(4, 1);

        var items = [];
        //var textfield=Ext.create("Ext.form.field.Textfield")
        var combo1 = Ext.create("Ext.form.field.ComboBox", {
            fieldLabel: "Priority",
            name: "Priority_For_Writing",
            value: me.Priority_For_Writing || 8,
            editable: false,
            store: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        });

        var valueField = null;
        if (nodeType == 1 || nodeType == 2) {
            valueField = Ext.create("Ext.form.field.ComboBox", {
                fieldLabel: "Value",
                //decimalPrecision: 4,
                name: "priorityValue",
                value: me.priorityValue,
                validator: function (val) {
                    if (val.trim == "") {
                        return "Can not be empty";
                    }
                    if (val == "NULL") {
                        return true;
                    }
                    if (isNaN(val)) {
                        return "please input number .";
                    }
                    if (parseFloat(val) > 1000000) {
                        return "Number is too large .";
                    }
                    if (parseFloat(val) < -1000000) {
                        return "Number is too small .";
                    }
                    if (val.length > 12) {
                        return "Invalid input";
                    }
                    return true;
                },
                store: ["NULL"],
                listeners: {
                    focus: function (field, t, e) {
                        if (!My.getSearch()) {
                            return;
                        }
                        var id = "#" + t.target.id;
                        var keybord = popKeybord(id);

                        function popKeybord(id) {
                            $(id).keyboard({
                                layout: 'custom',
                                customLayout: {
                                    'normal': [
                                        '7 8 9 {clear} {b}',
                                        '4 5 6 {left} {right}',
                                        '1 2 3 . {a}  '
                                    ],
                                },
                                maxLength: 11,
                                maxValue: 10000
                            })

                            var keybord = document.querySelector(".ui-keyboard");
                            if (keybord) {
                                return keybord
                            } else {
                                field.focus()
                            }
                        }

                        keybord.style.position = "fixed";
                        keybord.style.zIndex = 200000;
                        keybord.style.left = (field.getX() + field.labelWidth) + "px";
                        keybord.style.top = field.getY() + "px";
                        keybord.style.backgroundColor = "#3f4655"
                    }
                }
            })

        } else if (nodeType == 4 || nodeType == 5) {

            valueField = Ext.create("Ext.form.field.ComboBox",
                {
                    fieldLabel: "Value",
                    store: Ext.create("Ext.data.Store", {
                        field: ["name", "value"],
                        data: [{name: "Off", value: 0}, {name: "On", value: 1}, {name: "Null", value: "NULL"}]
                    }),
                    displayField: 'name',
                    editable: false,
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
            xtype: "button", text: "OK", handler: function (button) {
                me.Priority_For_Writing = combo1.getValue();
                me.priorityValue = valueField.getValue();

                if (button.up("form").isValid()) {
                    me.publishPriority()
                    if (bloakFn) {
                        bloakFn()
                    }
                }
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
                width: "100%"
            },
            items: me.getFormItems("", function () {
                win.close()
            })
        })

        var win = Ext.create("Ext.window.Window", {
            title: "Priority",
            autoShow: true,
            width: 400,
            items: form
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
                    strnull += aPriority[i] || "NULL"
                    strnull += ","
                    pubstr += "NULL,";
                }
            }

            /* My.AjaxSimple({
             par: "changevalue",
             ip: ip,
             port: port,
             nodename: nodename,
             type: "Priority_Array",
             value: pubstr.substr(0,pubstr.length-1)
             }, "", function () {
             My.delayToast('Success', nodename + ' Change value Priority_Array success new value is ' + strnull.substr(0, strnull.length - 1), 0)
             })*/


            My.AjaxSimple({
                par: me.priorityValue == "NULL" ? "PresentArraySetNull" : "changevalue",
                ip: ip,
                port: port,
                nodename: nodename,
                number: me.Priority_For_Writing,
                type: "Priority_Array",
                value: pubstr.substr(0, pubstr.length - 1)
            }, "", function () {
                My.delayToast('Success', nodename + ' Change value Priority_Array success new value is ' + strnull.substr(0, strnull.length - 1), 0)
            })
        })


        console.log(strnull)
        console.log(pubstr)
    },
}
My.createImg = function (data) {
    var component = null;
    if (data.itype == 0) {
        component = Ext.create("editpic.view.img.CanvasImg", data)
        //component.init(data[i]);
    }
    if (data.itype == 1) {
        component = Ext.create("editpic.view.img.GifImg", data)

        //component.init(data[i]);
    }
    if (data.itype == 2) {
        component = Ext.create("editpic.view.img.TextFieldTool", data)

        //component.init(data[i]);
    }
    if (data.itype == 3) {
        component = Ext.create("editpic.view.img.LinkTool", data)
        //component.init(data[i])
    }
    if (data.itype == 4) {
        component = Ext.create("editpic.view.img.TextTool", data)
        //component.init(data[i])
    }
    if (data.itype == 5) {
        component = Ext.create("editpic.view.img.DynamicTextTool", data)
    }
    return component;
}
