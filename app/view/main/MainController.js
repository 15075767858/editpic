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
My.delayToast = function (title, html, delay) {
    setTimeout(function () {
        Ext.toast({
            minWidth: 200,
            title: title,
            html: html,
            slideInDuration: 400,

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

    setInterval(function () {
        var data = {
            par: "getLinkValues",
            datas: My.linkManger.getLinkDatas()
        }
        My.AjaxSimple(data, "", function (response) {
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
    }, 500)

}
My.initComponentConfig = {
    mySetX: function (newValue) {
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
        me.setZIndex(value);
        me.zindex = value;
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
            if (me.linkValue) {
                if (!isNaN(me.linkValue)) {
                    return parseInt(me.linkValue)
                }
                return true;
            } else {
                return false;
            }
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
    }
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
    return component;
}