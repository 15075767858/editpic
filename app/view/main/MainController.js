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
                    My.putImageData(Ext.encode(json),text)
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
        url: url,
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
My.AjaxSimple=function(params,url,success){
    Ext.Ajax.request({
        url: url||"resources/main.php",
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

My.putImageData = function (content,text) {
    var data = null;
    if(!text){
        return data
    }
    My.AjaxPost("resources/main.php?par=putImageData", function (response) {
        data = response.responseText;
        My.AjaxSimple({
            par:"saveImageAsHtml",
            graph:text
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
        try{
        store = Ext.decode(response.responseText)
        }catch (e){

        }
    }, {
        par: "gettypes",
        ip: ip,
        port: port,
        nodename: nodename
    })

    return store;
}