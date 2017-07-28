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
    userLogin: function () {
        var me = this.view;
        var win = Ext.create("Ext.window.Window", {
            autoShow: true,
            width: 400,
            modal: true,
            title: "Login",
            items: {
                xtype: "form",
                itemId: "form",
                defaults: {
                    width: "100%",
                    editable: false,
                    allwoBlank: false
                },
                items: []
            }
        })
        var loginForm = Ext.create("Ext.form.Panel", {
            bodyPadding: 10,
            url: "resources/main.php?par=login",
            method: "POST",
            items: [
                //My.getKeyBordFn(),
                {
                    xtype: "textfield",
                    allowBlank: false,
                    fieldLabel: 'User Name',
                    name: 'username',
                    emptyText: 'user name',
                    value: localStorage.getItem("loginUserName"),
                    listeners: {
                        focus: My.textfieldFocus
                    }
                },
                {
                    xtype: "textfield",
                    allowBlank: false,
                    fieldLabel: 'Password',
                    name: 'password',
                    emptyText: 'password',
                    inputType: 'password',
                    listeners: {
                        focus: My.textfieldFocus
                    }
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Remember me',
                    name: 'remember',
                    value: localStorage.getItem("loginRemember")
                }
            ],
            buttons: [
                /*{
                 text: 'Register'
                 },*/
                {
                    text: 'Login',
                    handler: function () {
                        var values = loginForm.getValues();
                        if (values['remember']) {
                            localStorage.setItem("loginUserName", values['username']);
                            localStorage.setItem("loginRemember", values['remember']);
                        }
                        loginForm.submit({
                            success: loginFn,
                            failure: loginFn
                        });
                    }
                }
            ],
            defaults: {
                anchor: '100%',
                labelWidth: 120
            }
        })

        function loginFn(form, action) {
            console.log(arguments);
            var res = Ext.decode(action.response.responseText);
            var vm = me.getViewModel()
            vm.set(res);
            console.log(res);
            if (res.isLogin) {
                My.delayToast("Massage", "login success .")
            } else {
                Ext.Msg.alert("Massage", "login failure ")
            }
            win.close()
        }

        win.add(loginForm)
    },

    outLogin: function () {
        var me = this.view;
        My.AjaxPost("resources/main.php?par=login", function (response) {
            var res = Ext.decode(response.responseText)
            var vm = me.getViewModel()
            vm.set(res);
            My.delayToast("Massage", "out login  ok . ")
        }, {
            username: "",
            password: ""
        })
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
            items: [{
                margin: 10,
                xtype: "textfield",
                allowBlank: false,
                value: curPanel.title,
                fieldLabel: 'File Name'
            }],
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        var text = win.down("textfield").getValue();
                        if (text == null) {
                            Ext.Msg.alert('Info', 'Plase input file name.');
                            return;
                        }
                        var picPanel = curPanel.down("picpanel");
                        picPanel.save(text);


                        win.close();
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        win.close();
                    }
                }
            ]
        })
    },
    openNewHandler: function () {
        var fileNames = My.getHomeFileNames();
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
            items: [{
                margin: 10,
                xtype: "combobox",
                allowBlank: false,
                fieldLabel: 'File Name',
                store: fileNames,
                editable: false,
                queryMode: 'local',
                autoSelect: false
            }],
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        var text = win.down("textfield").getValue();
                        if (text == null) {
                            Ext.Msg.alert('Info', 'Plase input file name.');
                            return;
                        }
                        var minTab = Ext.getCmp("mintab");
                        minTab.addTab(text);
                        win.close();
                        My.delayToast("Massage", "Open File OK !");
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        win.close();
                    }
                }
            ]
        })

    },
    createNewTab: function () {
        Ext.getCmp("mintab").createNewTab("untitled")
    },
    toNewVersion: function () {
        var textarea = Ext.create("Ext.form.field.TextArea", {
            width: "100%",
            border: false,
            height: 500
        })


        var win = Ext.create("Ext.window.Window", {
            title: "compatibility processing",
            width: 800,
            frame: true,
            autoShow: true,
            closable: true,
            layout: "auto",
            tbar: [{
                xtype: "filebutton",
                text: "Select File",
                listeners: {
                    change: function (menu, target, eOpts) {
                        var files = target.target.files;

                        if (files.length) {
                            var file = files[0];
                            var reader = new FileReader();
                            reader.onload = function () {
                                textarea.setValue(this.result);
                            };
                            reader.readAsText(file);
                        }
                    }
                }
            }],
            items: [{
                    html: "this function is take old version data.json transformational new version data .<br> so please select old version data.json . "
                },
                textarea
            ],
            buttons: [{
                text: 'OK',
                itemId: "Ok",
                handler: function (menu) {
                    menu.setDisabled(true);
                    var jsonData = Ext.decode(textarea.getValue())
                    var str = "<div style='color: darkturquoise;'>";
                    for (var name in jsonData) {
                        str += name + ".json  "
                    }
                    str += "</div>";
                    Ext.Msg.show({
                        title: 'warning !',
                        message: "select yes to ovewrite files  <br>" + str,
                        buttons: Ext.Msg.YESNOCANCEL,
                        icon: Ext.Msg.WARNING,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                for (var data in jsonData) {
                                    My.savePicPanelData(data, Ext.encode(jsonData[data]))
                                }
                                win.close();
                            } else {

                                win.close();
                            }
                        }
                    });


                }
            }, {
                text: "Close",
                itemId: "Close",
                handler: function () {
                    win.close()
                }
            }]
        })
        console.log(win);

        //\r\n warning ! this operating
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
            items: [{
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
            }],
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        var text = win.down("textfield").getValue();
                        if (text == null) {
                            Ext.Msg.alert('Info', 'Plase input file name.');
                            return;
                        }
                        var minTab = Ext.getCmp("mintab")

                        minTab.addTab(text, My.getImageData()[text])
                        console.log(text)
                        win.close();
                        My.delayToast("Massage", "Open File OK !");
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        win.close();
                    }
                }
            ]
        })
    },
    replaceHandler: function () {
        var win = Ext.create("editpic.view.window.EditFile", {
            showCombo: true,
            showFileButton: false,
            replaceClick: function () {
                var me = win;

                var win1 = Ext.create('Ext.window.Window', {
                    title: 'Replace •••',
                    frame: true,
                    width: 325,
                    bodyPadding: 10,
                    autoShow: true,
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    getReplaceTypeValueArr: function (type) {
                        var me = win;
                        var oJson = Ext.decode(me.textArea.value)
                        var resArr = [];
                        var items = oJson.items;
                        for (var i = 0; i < items.length; i++) {
                            console.log(items[i][type])

                            if (items[i][type]) {
                                resArr.push(items[i][type])
                            }
                        }
                        console.log(resArr)
                        return resArr.unique1()
                    },
                    items: [{
                            itemId: "type",
                            margin: 10,
                            xtype: "combo",
                            allowBlank: false,
                            fieldLabel: 'type',
                            store: Ext.create("Ext.data.Store", {
                                field: ["ip", "key", "name"],
                                data: [{
                                        name: "ip",
                                        value: "ip"
                                    },
                                    {
                                        name: "key",
                                        value: "nodename"
                                    },
                                    {
                                        name: "name",
                                        value: "name"
                                    }
                                ]
                            }),
                            displayField: "name",
                            valueField: "value",
                            //store: ["ip", "key", "name"],
                            listeners: {
                                change: function (combo, newValue) {
                                    var me = combo.up()
                                    var arr = me.getReplaceTypeValueArr(newValue);
                                    console.log(arr)
                                    me.getComponent("oldvalue").setStore(arr);
                                }
                            }
                        },
                        {
                            itemId: "oldvalue",
                            margin: 10,
                            xtype: "combo",
                            allowBlank: false,
                            fieldLabel: 'old value'
                        },
                        {
                            itemId: "newvalue",
                            margin: 10,
                            xtype: "textfield",
                            allowBlank: false,
                            fieldLabel: 'new value'
                        }
                    ],
                    buttons: [{
                            text: 'Ok',
                            handler: function () {
                                var type = win1.getComponent("type").getValue();
                                var oldValue = win1.getComponent("oldvalue").getValue();
                                var newValue = win1.getComponent("newvalue").getValue();
                                var oJson = Ext.decode(me.textArea.value)
                                console.log(oJson)
                                var items = oJson.items;
                                for (var i = 0; i < items.length; i++) {
                                    if (items[i][type] == oldValue) {
                                        items[i][type] = newValue
                                    }
                                }

                                me.textArea.setValue(Ext.encode(oJson));
                                win1.close();

                            }
                        },
                        {
                            text: 'Cancel',
                            handler: function () {
                                win1.close();
                            }
                        }
                    ]
                })

            },
            okHandler: function () {

                Ext.Ajax.request({
                    url: "resources/xmlRW.php",
                    async: false,
                    method: "POST",
                    params: {
                        fileName: "../../home/" + win.combo.value + ".json",
                        content: win.textArea.value,
                        rw: "w"
                    },
                    success: function (response) {
                        if (win.textArea.value.length == response.responseText) {
                            My.delayToast("Maasage", "save success ." + response.responseText);
                        } else {
                            Ext.Msg.alert("Error", response.responseText);
                        }
                        console.log(arguments)
                    }
                })
            },
            combo: Ext.create("Ext.form.field.ComboBox", {
                fieldLabel: "Select File",
                store: My.getHomeFileNames(),
                margin: 10,
                allowBlank: false,
                fieldLabel: 'File Name',
                editable: false,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'name',
                autoSelect: false,
                listeners: {
                    change: function (combo, newValue) {
                        console.log(arguments)

                        My.Ajax('/home/' + newValue + ".json", function (response) {
                            win.textArea.setValue(response.responseText);
                            console.log(arguments)
                        })
                    }
                }
            })
        })

    },
    deleteHandler: function () {
        var comboStore = My.getHomeFileNames();


        var win = Ext.create('Ext.window.Window', {
            title: 'Delete',
            frame: true,
            width: 325,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [{
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
            }],
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        var text = win.down("textfield").getValue();
                        if (text == null) {
                            Ext.Msg.alert('Info', 'Plase input file name.');
                            return;
                        }
                        var json = My.getImageData();
                        delete json[text];
                        My.deleteImageData(Ext.encode(json), text)
                        win.close();
                        My.delayToast("Massage", "Delete File OK !");
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        win.close();
                    }
                }
            ]
        })

    },
    BackupGraphice: function () {
        My.Ajax("/upload.php", function () {
            location.href = "/home.tar.gz";
        }, {
            par: "system",
            command: "tar czvf home.tar.gz home"
        })
    },

    dataJsonUpload: function () {
        //上传home目录下的文件
        console.log(arguments)
        var win = Ext.create("editpic.view.window.UploadWindow", {
            url: 'resources/main.php?par=uploadHomeFile',
            fieuploaded: function (object, file) {
                My.delayToast("Massage", file.name + " upload .")
                /*My.Ajax("/upload.php", function () {
                 }, {
                 par: "system",
                 command: "mv " + file.name + " home"
                 })*/
            },
            uploadcomplete: function () {
                My.delayToast("Status", "File Upload successfully .");
            }
        })


    },
    updateGraph: function () {
        My.AjaxAsync("/upload.php", "", {
            par: "beforeUploadGraph"
        })
        var win = Ext.create("editpic.view.window.UploadWindow", {
            url: '/upload.php?par=upload',
            uploadcomplete: function (obj, files) {

                Ext.Msg.alert("Massage", "graph uploading please wait... It takes about 5 minutes.")

                console.log(arguments)

                console.log("升级完毕")

                win.close()


            }

        })
    }
})

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
My.AjaxSimpleAsync = function (params, url, success) {
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "GET",
        async: true,
        timeout: 600000,
        params: params,
        success: success
    });
}
My.AjaxSimplePost = function (params, url, success) {
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "POST",
        async: false,
        params: params,
        success: success,
        failure: function () {
            console.log(arguments)
        }
    });
}
My.AjaxSimplePostAsync = function (params, url, success) {
    //    console.log("开始")
    //console.log(params)
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "POST",
        async: true,
        //timeout:-1,
        params: params,
        success: success,
        failure: function () {
            //Ext.Msg.alert("Massage","the failure .")
            console.log(arguments)
        }
    });

}
My.getObjectName = function (ip, port, key) {
    var data;
    Ext.Ajax.request({
        url: "resources/main.php",
        async: false,
        params: {
            par: "gettypevalue",
            ip: ip,
            port: port,
            nodename: key,
            type: "Object_Name"
        },
        success: function (response) {
            data = response.responseText
        }
    });
    return data;
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
        //        console.log(response.responseText)
        try {
            data = Ext.decode(response.responseText);
        } catch (e) {

        }
    })
    return data;
}

My.getImageDataByJson = function (text) {
    var data = null;
    My.Ajax("/home/" + text + ".json", function (response) {
        //        console.log(response.responseText)
        try {
            data = Ext.decode(response.responseText);
        } catch (e) {
            Ext.Msg.alert("Massage", "exception " + response.responseText)
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
My.deleteImageData = function (content, text) {
    console.log(content)
    var data = null;
    if (!text) {
        return data
    }
    My.AjaxPost("resources/main.php?par=deleteGraphFile", function (response) {

    }, {
        graph: text,
        content: content
    })
    return data;
}
My.getImageNames = function () {
    var imgData = My.getImageData()
    var arr = [];
    for (var name in imgData) {
        arr.push(name);
    }
    return arr;
}
My.savePicPanelData = function (text, content) {

    My.AjaxPost('resources/xmlRW.php', function (response) {
        if (response.responseText == content.length) {
            My.AjaxSimple({
                par: "saveImageAsHtml",
                graph: text
            })
            My.delayToast("Massage", "Save File OK !");
        } else {
            My.delayToast("Massage", "exception " + response.responseText)
        }
    }, {
        rw: "w",
        fileName: "../../home/" + text + ".json",
        content: content
    })

}
/**
 * by a HTTP GET ajax request in server /home directory get all files in the folder.
 * returns a {@link Ext.data.Store} ,by a filter get all .json files.
 * @returns {Array}
 */


My.getHomeFileNames = function () {
    var data = null;
    My.Ajax('resources/main.php', function (response) {
        try {
            var resArray = Ext.decode(response.responseText);
            var arr = [];
            resArray.find(function (item) {
                var extensionName = item.substr(item.indexOf("."), item.length)
                if (extensionName == ".json") {
                    var fileName = item.substr(0, item.indexOf("."));
                    arr.push(fileName)
                }
            })
            data = arr;
        } catch (e) {
            Ext.Msg.alert("Massage", "exception " + response.responseText);
            throw new Error(e);
        }
    }, {
        par: "getHomeFileNames"
    })
    return data;
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
            if (ojson["isError"]) {


                return store;
            } else {
                store = Ext.create("Ext.data.Store", {
                    fields: ['name', 'value'],
                    data: ojson
                })
            }
        } catch (e) {}
    }, {
        par: "getdevs",
        ip: ip,
        port: port
    })
    return store;
}

My.getDevsByDevName = function (ip, port, devname) {
    /*
     根据 前四位 数字 获取数据库中的keys
     */
    var store = null;
    console.log(arguments)
    if (!ip & !port) {
        return store;
    }
    My.Ajax("resources/main.php", function (response) {
        var data = response.responseText;
        try {
            var ojson = Ext.decode(data)
            if (ojson["success"]) {
                Ext.Msg.alert("info", ojson.info);
                return store;
            } else {
                store = Ext.create("Ext.data.Store", {
                    fields: ['name', 'value', 'Present_Value', 'update'],
                    data: ojson
                })
            }
        } catch (e) {}
    }, {
        par: "getDevsByDevName",
        ip: ip,
        port: port,
        devname: devname
    })
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

My.getSchdules = function (ip, port) {
    var store = null;
    if (!ip & !port) {
        return store;
    }
    My.Ajax("resources/main.php", function (response) {
        var data = response.responseText
        try {
            var ojson = Ext.decode(data)
            if (ojson["isError"]) {
                return store;
            } else {

                store = Ext.create("Ext.data.Store", {
                    fields: ['name', 'value'],
                    data: ojson
                })

            }
        } catch (e) {}
    }, {
        par: "getSchdule",
        ip: ip,
        port: port
    })
    return store;
}

My.getDevNames = function (ip, port) {
    var store = null;
    if (!ip & !port) {
        return store;
    }
    My.Ajax("resources/main.php", function (response) {
        var data = response.responseText
        try {
            var ojson = Ext.decode(data);
            store = ojson;
        } catch (e) {}
    }, {
        par: "getDevNames",
        ip: ip,
        port: port
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
My.login = function (data) {
    My.Ajax("resources/main.php?par=login", function (response) {

    }, data)
}
My.isLogin = function () {
    return My.getSession().isLogin;
}
My.getSession = function () {
    var res = null;
    My.Ajax("resources/main.php?par=getSession", function (response) {
        res = Ext.decode(response.responseText);
    })
    return res;
};


My.initComponentConfig = {
    draggable: !My.getSearch(),
    resizable: !My.getSearch(),
    style: {
        overflow: "inherit"
    },
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

    isLinkData: function (data) {
        /*
         该方法判断图形对象是否是一个完整的可以获得连接服务器数据的对象
         */
        var me = this;
        if (data) {
            var ip = data.ip;
            var port = data.port;
            var nodename = data.nodename;
            var type = data.type;
            me.ip = ip;
            me.port = port;
            me.nodename = nodename;
            me.type = type;
        }

        //        console.log(data)

        if (!!me.ip & !!me.port & !!me.nodename & !!me.type) {
            return true;
        } else {
            return false;
        }

        if (!(!!me.ip & !!me.port & !!me.nodename & !!me.type)) {
            return false;
        } else {
            return true;
        }
    },

    linkInfo: function (callback) {
        //return {"ip":true,"nodename":"1001004","type":false}

        var resJson = {};
        var me = this;
        My.AjaxAsync("resources/main.php", function (response) {
            resJson = Ext.decode(response.responseText);
            callback(resJson)
        }, {
            par: 'linkInfo',
            ip: me.ip,
            port: me.port,
            nodename: me.nodename,
            type: me.type
        })
        return resJson;
    },
    mySubscribe: function () {
        var me = this;
        if (!me.isLinkData()) {
            return;
        }

        me.linkInfo(callbackFn.bind(me));

        function callbackFn(linkJson) {
            var me = this;
            if (!(linkJson.ip & linkJson.nodename)) {
                setTimeout(function () {
                    me.mySubscribe();
                }, My.eachDelay)
                console.log("断开了连接")
                return;
            }
            console.log("开始监听 ip=" + me.ip + "nodename=" + me.nodename + " " + me.type + "=" + me.value);
            var subnode = me.nodename.substr(0, 4) + ".8.*";
            var data = {
                params: {
                    subnode: subnode
                },
                timeout: 0,

                success: function (response) {

                    console.log("success");
                    console.log(response)
                    var resJson = response;
                    if (response.responseText) {
                        resJson = Ext.decode(response.responseText)
                    }

                    var arr = resJson.value.split("\r\n");
                    console.log(arr)

                    if (arr.length != 3) {
                        console.log("length ! = 3");
                        return;
                    }

                    if (arr[0] != me.nodename) {
                        console.log(arr[0]);
                        return;
                    }
                    if (arr[1] != me.type) {
                        console.log(arr[1]);
                        return;
                    }
                    if (arr[2] != me.linkValue) {
                        console.log(arr[2]);
                        me.setLinkValue(arr[2])
                    }
                    me.mySubscribe();

                },
                failure: function () {

                    console.log(arguments)
                    setTimeout(function () {
                        me.mySubscribe()
                    }, My.eachDelay);

                }
            };
            if (location.hostname == me.ip) {
                data.url = "resources/subscribe.php";
                Ext.Ajax.request(data)
            } else {
                data.url = "http://" + me.ip + "/graph/resources/subscribe.php";
                Ext.data.JsonP.request(data)
            }
        }

    },
    subscribeCallBack: function (value) {
        var arr = []
        if (value) {
            arr = value.split('\r\n');
            if (arr.length != 3) {
                return;
            }
        }
        var items = My.linkManger.items;
        var key;
        var arr = [];
        for (key in items) {}
        console.log(arr);
    },
    getSubscribeIps: function () {
        var items = My.linkManger.items;
        var key;
        var arr = [];
        for (key in items) {
            var ip = items[key].ip
            arr.push(ip)
        }
        arr = arr.unique1();
        return arr;
    },
    mySetName: function (value) {
        var me = this;
        me.name = value;
        if (me.nameDiv) {
            me.nameDiv.parentNode.removeChild(me.nameDiv);
        }
        if (value) {
            var div = document.createElement("div");
            div.innerHTML = value;
            div.style.position = "relative";
            div.style.width = me.width + "px";
            div.style.lineHeight = "35px";
            div.style.textAlign = "center";
            me.el.dom.appendChild(div)
            me.nameDiv = div;
        } else {
            delete me.nameDiv
        }
    },
    myGetName: function () {
        var me = this;
        if (me.name) {
            return me.name;
        } else {
            return "";
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

        me.setWidth(value)
        me.width = value
    },
    mySetHeight: function (value) {
        value = parseInt(value)
        var me = this;

        me.setHeight(value)
        me.height = value;
    },

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
    /*getLinkValue: function () {
     var me = this;
     if (me.hasLinkValue()) {
     //if (!isNaN(me.linkValue)) {
     //
     //    return parseFloat(me.linkValue);
     //}

     return me.linkValue;
     /!*if (me.linkValue) {
     if (!isNaN(me.linkValue)) {
     return me.linkValue
     }
     return true;
     } else {
     return false;
     }*!/
     }
     },*/
    setLinkValue: function (linkValue) {
        var me = this;
        linkValue += ""
        //        console.log(linkValue)
        if (linkValue == "undefined" || linkValue == "" || linkValue == "false") {
            me.linkValue = My.linkManger.getValue(me);
        } else {
            me.linkValue = linkValue;
        }
        me.refreshCanvas();
    },

    clearInterval: function () {
        var me = this;
        if (me.linkValue) {

            delete me.linkValue
            delete My.linkManger.items[me.id]
            me.refreshCanvas()
        }
        if (me.interval) {
            clearInterval(me.interval);
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


        //console.log(me)
        /*if(me.itype==4){
         Ext.getCmp("mintab").addTab(me.linkValue)
         return ;
         }*/

        if (My.getSearch()) {

            if (me.clientOpenMenu()) {
                me.openAlermWindow()
            }
            return;
        }

        //console.log(arguments)
        me.createMoveField()
    },
    selectStyle: function (isSelect) {
        var me = this;
        var divs = me.el.dom.querySelectorAll(".x-resizable-handle");

        if (isSelect) {
            for (var i = 0; i < divs.length; i++) {
                divs[i].style.opacity = 1
                me.isselect = true;
            }
        } else {
            for (var i = 0; i < divs.length; i++) {
                divs[i].style.opacity = 0
                me.isselect = false;
            }
        }
    },
    createMoveField: function (focusFn, leaveFn) {
        var me = this;
        me.selectStyle(true);
        var picPanel = me.up();
        picPanel.createMoveField(function (field, e) {
            me.moveController(e)
        }, function () {
            me.selectStyle(false)
            picPanel.remove(this)
        })
        /*var textfield = Ext.create("Ext.form.field.Text", {
         hidden: false,
         width: 1,
         height: 1,
         listeners: {
         specialkey: focusFn || function (field, e) {
         me.moveController(e)
         },
         focusleave: leaveFn || function () {
         me.selectStyle(false)
         textfield.up().remove(textfield)
         }
         }
         })
         me.up().add(textfield)
         textfield.setZIndex(-1)
         textfield.focus()
         textfield.focus()*/
    },
    moveController: function (e) {
        console.log(e)
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
    clientOpenMenu: function () {
        /*if (!My.isLogin()) {
         return false;
         }*/
        return true;
    },
    contextmenu: function (e) {

        e.stopEvent()
        console.log(this)

        if (My.getSearch()) {

            return;
        }
        var me = this;
        Ext.create("Ext.menu.Menu", {
            x: e.pageX,
            y: e.pageY,
            autoShow: true,
            items: [{
                    text: "Edit",
                    handler: function () {
                        Ext.create("editpic.view.window.CanvasConponmentWindow", {
                            SimpleModel: true,
                            values: me,
                            ok: function (data) {
                                me.init(data);
                            },
                            cancel: function () {

                            }
                        })
                    }
                },
                {
                    text: "Copy",
                    handler: function () {
                        me.up().copyImg = me;
                    }
                },

                {
                    text: "Delete",
                    handler: function () {
                        console.log(me.up('panel'))
                        me.up("panel").removeStackPush(me)
                    }
                },
                {
                    text: "Duplicate",
                    handler: function () {
                        var data = me.getInitData()
                        data.x = data.x + 10
                        data.y = data.y + 10
                        var img = My.createImg(data)
                        me.up().add(img)
                        img.init(data)
                    }
                },
                {
                    text: "Property",
                    handler: function () {
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
                    if (val.trim() == "") {
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
                store: ["NULL", ""],
                listeners: {
                    focus: function (field, t, e) {
                        var form = field.up("form");

                        var win1 = Ext.getCmp("win" + field.id)
                        if (win1) {
                            return;
                        }

                        var useKeybord = form.getComponent("useKeyboard")
                        if (!useKeybord) {
                            return
                        }
                        var isUseKeyboard = useKeybord.getValue();
                        if (isUseKeyboard) {


                            var win = field.up("window");
                            Ext.create("editpic.view.ux.KeyBoard", {
                                id: "win" + field.id,
                                x: win.getX() + win.getWidth() + 5,
                                inputValue: field.getValue(),
                                okFn: function (value) {
                                    field.setValue(value)
                                }
                            })

                            field.win = win;


                        }
                        return;

                    }
                }
            })

        } else if (nodeType == 4 || nodeType == 5) {

            valueField = Ext.create("Ext.form.field.ComboBox", {
                fieldLabel: "Value",
                store: Ext.create("Ext.data.Store", {
                    field: ["name", "value"],
                    data: [{
                        name: "Off",
                        value: 0
                    }, {
                        name: "On",
                        value: 1
                    }, {
                        name: "Null",
                        value: "NULL"
                    }]
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
            xtype: "checkbox",
            inputValue: true,
            itemId: "useKeyboard",
            reference: "screenkeyboard",
            hidden: !My.getSearch(),
            disabled: !My.getSearch(),
            fieldLabel: " Screen keyboard"

        })

        items.push({
            xtype: "button",
            text: "OK",
            handler: function (button) {
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


        var formItems = me.getFormItems();
        if (!formItems) {
            return;
        }
        var form = Ext.create("Ext.form.Panel", {
            padding: 10,
            defaults: {
                anchor: '100%',
                width: "100%",
                margin: "30 0 30 0",
                height: 50
            },
            items: me.getFormItems("", function () {
                win.close()
            })
        })

        var win = Ext.create("Ext.window.Window", {
            title: "Priority",
            autoShow: true,
            width: 251,
            x: 100,

            items: form,
            height: 430

        })
        form.getForm().setValues(me);
    },

    publishPriority: function () {
        var me = this;
        var ip = me.ip,
            port = me.port,
            nodename = me.nodename,
            devname = me.nodename.substr(0, 4),
            strnull = "",
            pubstr = "";
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

            My.AjaxSimple({
                par: me.priorityValue == "NULL" ? "PresentArraySetNull" : "changevalue",
                ip: ip,
                port: port,
                nodename: nodename,
                number: me.Priority_For_Writing,
                type: "Priority_Array",
                value: pubstr.substr(0, pubstr.length - 1)
            }, "", function (response) {

                My.AjaxSimple({
                    par: "changevalue",
                    ip: ip,
                    port: port,
                    nodename: nodename,
                    type: "Present_Value",
                    value: me.priorityValue,
                }, "", function (response1) {
                    console.log("Massage", response.responseText)
                })
                console.log(response.responseText)
                My.delayToast('Success', nodename + ' Change value Priority_Array success new value is ' + strnull.substr(0, strnull.length - 1), 0)
            })
        })
        console.log(strnull)
        console.log(pubstr)
    }
};
My.textfieldFocus = function (field, t, e) {
    console.log(arguments)
    if (!My.isKeyBord) {
        return;
    }
    var id = "#" + t.target.id;
    var keybord = popKeybord(id);

    function popKeybord(id) {
        $(id).keyboard({
            layout: 'qwerty'
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
    //keybord.style.left = (field.getX() + field.labelWidth) + "px";
    //keybord.style.top = field.getY() + "px";
    keybord.style.left = "0px";
    keybord.style.top = "0px";
    keybord.style.backgroundColor = "#3f4655";
    /* var btns = document.querySelectorAll(".ui-keyboard-button");
     for (var i = 0; i < btns.length; i++) {
     console.log(btns[i].style.height)
     console.log(btns[i].style.width)
     }*/
}
My.getColorArr = function () {
    var colors = Ext.ux.colorpick.ColorUtils.colorMap;
    var arr = [];
    for (var color in colors) {
        var ojson = {};
        ojson.name = color;
        ojson.color = "rgb(" + colors[color].join(',') + ")";
        ojson.html = "<div style='background-color:" + ojson.color + "'></div>"
        arr.push(ojson);
    }

    return arr;
}
My.createKeyBordTextField = function (data) {
    var data = Ext.apply({
        listeners: {
            focus: function (field, t, e) {
                console.log(arguments)
                var id = "#" + t.target.id;
                var keybord = popKeybord(id);

                function popKeybord(id) {
                    $(id).keyboard({
                        layout: 'qwerty'
                    })

                    var keybord = document.querySelector(".ui-keyboard");
                    if (keybord) {
                        return keybord
                    } else {
                        field.focus()
                        return keybord
                    }
                }

                //keybord.style.position = "fixed";
                keybord.style.zIndex = 200000;
                //keybord.style.top ="1px";
                //keybord.style.left = "1px";

                //keybord.style.left = (field.getX() + field.labelWidth) + "px";
                //keybord.style.top = field.getY() + "px";
                keybord.style.backgroundColor = "#3f4655"
            }
        }
    }, data)
    return Ext.create("Ext.form.field.Text", data);
}
My.isKeyBord = false;
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
    if (data.itype == 8) {
        component = Ext.create("editpic.view.img.ClockTool", data)
    }
    if (data.itype == 12) {
        component = Ext.create("editpic.view.img.ScheduleTool", data)
    }
    if (data.itype == 13) {
        component = Ext.create("editpic.view.img.TimeTool", data)
    }
    if (data.itype == 16) {
        component = Ext.create("editpic.view.img.DevicesTool", data)
    }
    if (data.itype == 17) {
        component = Ext.create("graph.view.img.HistoryTool", data)
    }
    return component;
}

My.devPublish = function (key, value, success, ip, port) {

    Ext.Ajax.request({
        url: "resources/main.php",
        method: "GET",
        async: false,
        params: {
            par: "devPublish",
            key: key,
            value: value,
            ip: ip,
            port: port
        },
        success: success || function (response) {
            var text = response.responseText;
            if (text == 1) {
                My.delayToast('Success', 'Publish Ok.', 0)
            } else {
                //  Ext.Msg.alert('Info', 'Please download later.');
            }
        }
    })
}
My.util = {}
My.util.PublishPic = {
    /*获取所有点位信息后 开始订阅图片信息
     */
    run: function () {
        console.log(this)
        return;
        this.getSubscribe();
    },
    subscribeItems: null,
    /*
     获取所有
     */
    getSubscribeItems: function () {
        var items = Ext.getCmp('mintab').getCurrentTab().items.items[0].getSubscribeItems();
        this.subscribeItems = items;
        return items;
    },
    /*
     获得可以订阅的ip 以及相关ip的devname
     返回值格式{ip:[],ip:[]}
     */
    getSubscribeIpsDevNames: function (subIp) {

        var items = this.getSubscribeItems();
        var ips = [];
        for (var i = 0; i < items.length; i++) {
            ips.push(items[i].ip);
        }

        var resJson = {};
        for (var i = 0; i < ips.length; i++) {
            var ip = ips[i]
            var arr = [];
            for (var j = 0; j < items.length; j++) {
                if (items[j].ip == ip) {
                    var devname = items[j].nodename.substr(0, 4) + ".8.*";
                    arr.push(devname)
                }
            }
            if (arr.length > 0) {
                resJson[ip] = arr.unique1();
            }
        }
        if (subIp) {
            var json = {}
            json[subIp] = resJson[subIp]
            return json;
        }
        return resJson;
    },
    getSubscribe: function (subIp) {

        var me = this;
        var ips = this.getSubscribeIpsDevNames(subIp);
        for (var ip in ips) {
            console.log(ip)
            var subnodes = Ext.encode(ips[ip]);


            Ext.Ajax.request({
                params: {
                    subnodes: subnodes
                },
                callbackKey: "callback",
                callbackName: "callback",
                timeout: 0,
                url: "resources/subscribe.php?ip=" + ip,
                success: function (response) {
                    try {
                        var resJson = Ext.decode(response.responseText)
                        if (resJson.success) {
                            me.subscribeSuccess(resJson.info)
                        } else {
                            console.log(resJson.info)
                        }
                    } catch (e) {
                        //throw new Error(e)
                        console.log(e)
                        return;
                    }
                }
            });
        }
    },
    subscribeSuccess: function (resJson) {
        /*
         当订阅有返回值的时候处理函数
         */
        var me = this;
        var arr = resJson.value.split("\r\n");
        var ip = resJson.ip;
        console.log(arr)
        if (arr.length != 3) {
            console.log("length ! = 3");
            return;
        }
        var ipsArr = [];
        for (var i = 0; i < me.subscribeItems.length; i++) {
            var img = me.subscribeItems[i];
            if (img.ip == ip & img.nodename == arr[0] & img.type == arr[1]) {
                img.setLinkValue(arr[2]); //成功后设置值
                ipsArr.push(img.ip);
                //me.getSubscribe(img.ip);//得到订阅返回值后继续订阅
            }
        }

        ipsArr = ipsArr.unique1()
        console.log(ipsArr)
        for (var i = 0; i < ipsArr.length; i++) {
            console.log(ipsArr[i])
            me.getSubscribe(ipsArr[i]);
        }

        console.log(me)

    }
}
My.isTime = function (val) {
    console.log(val)
    var vals = val.split(":")
    if (vals.length != 3) {
        return "This field error";
    }
    if (!(vals[0] >= 0 & vals[0] <= 23 & vals[1] >= 0 & vals[1] <= 59 & vals[2] >= 0 & vals[2] <= 59)) {
        return "This field error";
    }
    for (var i = 0; i < vals.length; i++) {
        if (isNaN(vals[i]) || (vals[i] + "") == "-0") {
            return "This field error";
        }
    }
    return true;
}

function getNetNumberValue(filename) {
    var str = "";
    Ext.Ajax.request({
        url: "resources/xmlRW.php",
        async: false,
        params: {
            fileName: filename || "../../../../bac_config.xml",
            rw: "r"
        },
        success: function (response) {
            try {

                //var text = response.responseText
                //console.log(response)
                var xml = $($.parseXML(response.responseText));
                console.log(xml)
                //var xml = response.responseXML;
                if (xml) {
                    str = xml.find("root net").text()
                } else {
                    Ext.Msg.alert("Exception ", "bac_config is not fount .")
                }
            } catch (e) {
                Ext.Msg.alert("Massage", "Error " + response.responseText);
            }

        }
    })
    return str;
}

function isBarCollsion(x1, y1, x2, y2, w, h) {
    if (x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h) {
        return true;
    }
    return false;
}
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

Array.prototype.unique1 = function () {
    var n = []; //一个新的临时数组
    for (var i = 0; i < this.length; i++) //遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1)
            n.push(this[i]);
    }
    return n;
}


My.linkManger = {};
My.linkManger.items = {};
My.eachDelay = 1000 * 60 * 3; //侦听失败后重试时间
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

/*
 开启定时器订阅
 */
My.linkManger.init = function () {
    //  My.interval1 = setInterval(My.initLinkValue, 15000)
}

My.initLinkValue = function () {

    var data = {
        //par: "getLinkValues",
        datas: My.linkManger.getLinkDatas()
    }


    My.AjaxSimplePostAsync(data, "resources/main.php?par=getLinkValues", function (response) {
        //        console.log(response.responseText)

        try {
            Ext.decode(response.responseText);
        } catch (e) {
            clearInterval(My.interval1);
            console.log(response.responseText);
            setTimeout(function () {
                My.linkManger.init()
            }, My.eachDelay)
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

    My.util.PublishPic.run()
};

My.publish = function () {
    var curPanel = My.getCurrentPicPanel();
}

My.getCurrentPicPanle = function () {}
My.util.getFormNextTimeMillisecond = function (mill) {
    return mill - new Date().getTime() % mill;
}
/**
 * 这个方法用来轮询读取数据库
 */
Ext.onReady(function () {
    //需要查询的图片对象 存在这里
    var aInquireItems = [];

    //订阅 和 轮询数据库的间隔;
    var iQuireInterval = 10000;

    var subscribeUrl = "/graph/resources/subscribe.php";

    /**
     * 从当前画面中获取所有要进行订阅的点位
     * 失败返回false 成功返回需要查询的数组
     *
     *@return {boolean/Array} 返回false 代表没有成功或者数组为0 返回数组代表返回成功
     */
    function getSubscribeItems() {
        var mainTab = Ext.getCmp("mintab");
        if (!mainTab) {
            console.log("mintab not found")
            return false;
        }
        var currentTab = mainTab.getCurrentTab();
        if (!currentTab) {
            console.log("current tab not found")
            return false;
        }
        var picPanel = currentTab.down("picpanel");
        if (!picPanel) {
            console.log("picpanel not found")
            return false;
        }
        var subItems = picPanel.getSubscribeItems();
        if (!subItems) {
            console.log("subitems not found")
            return false;
        }
        if (subItems.length == 0) {
            console.log("subitems length = 0")
            return false;
        }
        aInquireItems = subItems;
        return subItems.map(function (item) {
            return {
                id: item.id,
                ip: item.ip,
                port: item.port,
                nodename: item.nodename,
                type: item.type
            }
        })
    }


    /**
     * 这个方法能自动获得需要请求的数据 用来向服务器请求需要轮询的数据
     *
     * @param success 成功的回调方法 {@link subscribeRequestSuccessCallback}
     * @param failure 失败的回调方法 {@link subscribeRequestFailureCallback}
     */
    function getSubscribeItemsValues(success, failure) {
        //获取需要请求的数据
        var items = getSubscribeItems();
        if (!items.length) {
            return;
        }
        var url = "resources/main.php?par=getSubscribeItemsValues";
        Ext.Ajax.request({
            url: url,
            params: {
                datas: Ext.encode(items)
            }
        }).then(success, failure)
    }

    /**
     * 这个方法用来接收 {@link getSubscribeItemsValues } 这个方法的成功回调
     * 会对 {@link aInquireItems} 这个数组中的对象 进行修改 linkValue 操作
     * @param {Object}response
     */
    function subscribeItemsSuccessCallback(response) {
        var aResData = null;
        try {
            aResData = Ext.decode(response.responseText);
            for (var i = 0; i < aResData.length; i++) {
                var id = aResData[i].id;
                var oItem = Ext.getCmp(id);
                if (oItem) {
                    if (oItem.itype != 3) {
                        oItem.setLinkValue(aResData[i].value)
                    }
                }
            }
        } catch (e) {
            My.delayToast("Massage", "Error " + response.responseText);
            throw e;
            return;
        }
    }

    /**
     * 这个方法用来接收 {@link getSubscribeItemsValues } 这个方法的失败回调
     * @param {Object}response
     */
    function subscribeItemsFailureCallback(response) {
        console.log(response)
        console.log("Massage  status " + response.status, "Error  " + response.request.url + response.responseText)
    }

    /**
     * 这里运行10秒轮询 和 订阅
     */
    setInterval(function () {
        getSubscribeItemsValues(subscribeItemsSuccessCallback, subscribeItemsFailureCallback)
        subscribeRequestFire()
    }, iQuireInterval)


    /**
     * 这个方法用来合并需要订阅的数据
     *
     * @return {Array}
     * 格式 [{ip:"111.111.111.111",port:"6379",subnodes:['1001.8.*','1200.8.*'],types:['Object_Name','Present_Value']}]
     */
    function mergeSubscribeRequest() {
        var items = getSubscribeItems();
        var ipPortArr = [];

        for (var i = 0; i < items.length; i++) {
            var item = items[i]

            var isHave = ipPortArr.find(function (v) {
                return equalIpPort(item, v);
            })
            //不存在就push
            if (isHave == undefined) {
                ipPortArr.push(items[i])
            }
        }
        console.log(ipPortArr)
        //
        ipPortArr.map(function (v) {
            var types = [];
            var subnodes = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (equalIpPort(item, v)) {
                    types.push(item.type);
                    subnodes.push(item.nodename.substr(0, 4) + ".8.*");
                }
            }
            v.types = types.unique1();
            v.subnodes = subnodes.unique1();
            delete v.id;
            delete v.nodename;
            delete v.type;
        })

        function equalIpPort(Obj1, Obj2) {
            if (Obj1.ip + Obj1.port == Obj2.ip + Obj2.port) {
                return true;
            } else {
                return false;
            }
        }

        return ipPortArr
    }

    /**
     * 这个方法用来订阅进行订阅
     * @param success
     * @param failure
     * @param time
     */
    function subscribeRequest(success, failure, time, ip) {
        var subscribeItems = mergeSubscribeRequest();
        console.log(subscribeItems)
        var startTime = new Date().getTime();
        if (time) {
            startTime = startTime - time;
        }
        for (var i = 0; i < subscribeItems.length; i++) {
            var subscribeItem = subscribeItems[i];
            if (ip != undefined) {
                if (ip != subscribeItem.ip) {
                    continue
                }
            }
            Ext.Ajax.request({
                url: subscribeUrl,
                params: {
                    ip: subscribeItem.ip,
                    port: subscribeItem.port,
                    subnodes: Ext.encode(subscribeItem.subnodes),
                    types: Ext.encode(subscribeItem.types),
                    redistimeout: Math.ceil((time || iQuireInterval) / 1000), //redis超时链接时间
                    time: startTime //记录请求的开始时间
                },
                timeout: iQuireInterval
            }).then(success, failure)
        }
    }

    /**
     * 进行一次订阅请求
     */
    function subscribeRequestFire(time, ip) {
        console.log("%c 开始订阅 间隔时间是" + time, "color:red")
        subscribeRequest(subscribeRequestSuccessCallback, subscribeRequestFailureCallback, time, ip)
    }

    /**
     * 当订阅有返回值时候的成功处理函数
     */
    function subscribeRequestSuccessCallback(response) {
        var resJson = null;
        try {
            resJson = Ext.decode(response.responseText).info;
        } catch (e) {
            console.log(e);
            throw e;
        }

        var befTime = resJson.time;
        var nowTime = new Date().getTime();
        var diffTime = nowTime - befTime;
        var ip = resJson.ip;
        //如果当前时间减去上次请求时间小于两次时间间隔 则继续进行请求
        if (diffTime < iQuireInterval) {
            console.log("再次请求" + diffTime + "ip = " + ip)
            subscribeRequestFire(diffTime, ip)
        } else {
            console.log("%c 取消请求" + diffTime + "ip = " + ip, "background:red")
        }
        if (resJson.success == false) {
            console.log(resJson.info);
            return
        }
        //iQuireInterva
        var arr = resJson.value.split("\r\n");

        console.log(arr)
        if (arr.length != 3) {
            console.log("length ! = 3");
            return;
        }
        var subscribeItems = getSubscribeItems()
        for (var i = 0; i < subscribeItems.length; i++) {
            var img = Ext.getCmp(subscribeItems[i].id);
            if (img.ip == ip & img.nodename == arr[0] & img.type == arr[1]) {
                if (img.itype != 3) {
                    img.setLinkValue(arr[2]); //成功后设置值
                }
            }
        }
    }

    /**
     * 订阅失败的返回函数
     */
    function subscribeRequestFailureCallback(response) {
        console.log("Massage  status " + response.status, "Error  " + response.statusText + response.request.url + response.responseText)
    }


    return My.mergeSubscribeRequest = mergeSubscribeRequest

})

/**
 * 测试模块
 */
Ext.onReady(function () {

    console.log(this)

    /**
     * 测试浏览器最大并发数
     * @param count
     */
    var testsubscribe = function (count) {
        for (var i = 0; i < count; i++) {

            (function (i) {
                var url = "http://127.0.0.1/graph/resources/subscribe.php?ip=192.168.253.253&subnodes=[%221001.8.*%22]";
                if (i % 2 == 0) {
                    url = "http://127.0.0.1/graph/resources/subscribe.php?ip=192.168.253.253&subnodes=[%221001.8.*%22]";
                } else {
                    url = "http://127.0.0.1/graph/resources/subscribe.php?ip=127.0.0.1&subnodes=[%221001.8.*%22]";
                }
                Ext.Ajax.request({
                    url: url,
                    timeout: 0
                }).then(function (response) {
                    console.log(i, response.status, response, new Date().toLocaleString());
                }, function (response) {
                    console.log(i, response.status, response, new Date().toLocaleString());
                })

            })(i)
        }
    }
    /**
     * 测试Ext 查找dom速度
     */
    var testgetCmp = function () {
        var startTime = new Date().getTime();
        for (var i = 0; i < 1000; i++) {
            var a = Ext.getCmp("mintab" + Math.random())
        }
        console.log((new Date().getTime() - startTime) / 1000 + "秒")
    }

    var diffSecond = function () {

        setInterval(function () {

            console.log(new Date().getTime() % 10000)

        }, 1000)

    }

    var test = {}
    test.testsubscribe = testsubscribe;
    test.testgetCmp = testgetCmp;
    test.diffSecond = diffSecond;
    My.test = test
}.bind(My))

My.stopEventAndPro = function (e) {
    console.log(e)
    e.stopPropagation();
    return false;
}