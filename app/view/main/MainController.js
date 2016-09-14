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
                    text: 'Login', handler: function () {
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
                        json[text] = datas;
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
    deleteHandler:function(){
        var comboStore = My.getImageNames()
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
                    var json = My.getImageData();
                    delete json[text];
                    My.deleteImageData(Ext.encode(json),text)
                    win.close();
                    My.delayToast("Massage", "Delete File OK !");
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
                url: '/upload.php?par=upload',
                fieuploaded: function (object, file) {
                    My.Ajax("/upload.php", function () {
                    }, {
                        par: "system",
                        command: "mv " + file.name + " home"
                    })
                },
                uploadcomplete: function () {
                    My.delayToast("Status", "File Upload successfully .");
                }
            }
        )

        /*  var win = Ext.create("Ext.window.Window", {
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
         /!*validator: function (val) {
         return "adsdadsa";
         },*!/
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
         */
    },
    updateGraph: function () {
        My.AjaxAsync("", "", {
            par: "beforeUploadGraph"
        })
        var win = Ext.create("editpic.view.window.UploadWindow", {
            url: '/upload.php?par=upload',
            uploadcomplete: function (obj, files) {
                console.log(files)
                My.AjaxAsync("/upload.php", "", {
                    par: "system",
                    command: "chmod 777 * -R"
                })
                if (files.length == 1) {
                    var file = files[0];
                    var fn = file.name;
                    Ext.Msg.alert("Massage", "graph uploading please wait... It takes about 5 minutes.")

                    My.AjaxAsync("/upload.php", resFn, {
                        par: "system",
                        command: "tar  -xzvf  " + fn
                    })

                } else {
                    var namesStr = ""
                    var arr = [];
                    for (var i = 0; i < files.length; i++) {
                        arr.push(files[i].name)
                        namesStr += files[i].name + ",";
                    }
                    My.AjaxSimplePostAsync(
                        {
                            par: 'afterUpload',
                            names: namesStr.substr(0, namesStr.length - 1),
                            nameArr: Ext.encode(arr)
                        }, "/upload.php?par=afterUpload", resFn
                    )


                }

                function resFn() {
                    Ext.Msg.show({
                        title: 'Massage',
                        message: 'graph update success .',
                        buttons: Ext.Msg.YES,
                        //icon: Ext.Msg.INFO,
                        fn: function (btn) {

                            My.AjaxAsync("/upload.php", "", {
                                par: "system",
                                command: "chmod 777 * -R"
                            })

                            if (btn === 'yes') {
                                location.reload()
                            }
                        }
                    });
                }

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
    Ext.Ajax.request({
        url: url || "resources/main.php",
        method: "POST",
        async: true,
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
My.deleteImageData=function(content,text){
    console.log(content)
    var data = null;
    if (!text) {
        return data
    }
    My.AjaxPost("resources/main.php?par=deleteImageData", function (response) {

    }, {
        graph: text,
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
                if (ojson["isError"]) {


                    return store;
                } else {
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
            } catch (e) {
            }
        }, {
            par: "getSchdule",
            ip: ip,
            port: port
        }
    )
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

        }, data
    )
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

    var interval1 = setInterval(My.initLinkValue, 8000)
}
My.initLinkValue = function () {

    var data = {
        //par: "getLinkValues",
        datas: My.linkManger.getLinkDatas()
    }

    My.AjaxSimplePostAsync(data, "resources/main.php?par=getLinkValues", function (response) {
        try {
            Ext.decode(response.responseText);
        } catch (e) {
            //Ext.Msg.alert("Massage"," linkDataBase Error Program 10 seconds after the automatic return to normal . "+response.responseText);
            clearInterval(interval1);
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
    linkInfo: function () {
        //return {"ip":true,"nodename":"1001004","type":false}

        var resJson = {};
        var me = this;
        My.AjaxAsync("resources/main.php", function (response) {
            resJson = Ext.decode(response.responseText);
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
        var linkJson = me.linkInfo();
        if (!(linkJson.ip & linkJson.nodename)) {
            setTimeout(function () {
                me.mySubscribe();
            }, My.eachDelay)

            return;
        }
        console.log("开始监听 ip=" + me.ip + "nodename=" + me.nodename + " " + me.type + "=" + me.value);
        console.log(me);
        var subnode = me.nodename.substr(0, 4) + ".8.*";

        var data = {
            params: {
                subnode: subnode
            },
            timeout: 0,
            success: function (response) {
                console.log("success");
                me.mySubscribe();
                var resJson = Ext.decode(response.responseText.substring(1, response.responseText.length - 1))
                console.log(resJson)

                var arr = resJson.value.split("\r\n");
                console.log(arr)
                if (arr.length != 3) {
                    console.log("length ! = 3")
                    return;
                }

                if (arr[0] != me.nodename) {
                    console.log(arr[0])
                    return;
                }
                if (arr[1] != me.type) {
                    console.log(arr[1])
                    return;
                }
                if (arr[2] != me.linkValue) {
                    console.log(arr[2])
                    me.setLinkValue(arr[2])
                }
            },
            failure: function () {
                setTimeout(function () {
                    me.mySubscribe()
                }, My.eachDelay)
            }
        };

        if (location.hostname == me.ip) {
            data.url = "resources/subscribe.php"
            Ext.Ajax.request(data)
        } else {
            data.url = "http://" + me.ip + "/graph/resources/subscribe.php"
            Ext.data.JsonP.request(data)
        }

        /*        Ext.Ajax.request({
         url: "resources/main.php?par=subscribe",
         method: "GET",
         async: true,
         params: {},
         success: function (response) {
         console.log('success')
         console.log(arguments)
         var data = response.responseText
         console.log(data.split('\r\n'))
         },
         failure: function () {
         console.log('failure')
         console.log(arguments)
         }
         });*/

    }, subscribeCallBack: function (value) {
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
        for (key in items) {
        }
        console.log(arr);
    }, getSubscribeIps: function () {
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
        }else{
            delete  me.nameDiv
        }
    }
    ,
    myGetName: function () {
        var me = this;
        if (me.name) {
            return me.name;
        } else {
            return "";
        }
    }
    ,
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

    }
    ,
    mySetX: function (newValue) {
        newValue = parseInt(newValue)
        var me = this;
        var panel = me.up("picpanel");
        var value = newValue + panel.body.getX();
        me.setX(value);

        me.x = newValue;
    }
    ,
    mySetY: function (newValue) {
        newValue = parseInt(newValue)
        var me = this;
        var panel = me.up("picpanel");
        var value = newValue + panel.body.getY();
        me.setY(value);

        me.y = newValue;
    }
    ,
    mySetWidth: function (value) {
        value = parseInt(value)
        var me = this;
        //if (me.field) {
        //    me.field.setWidth(value)
        //}
//        console.log(me.field);
        me.setWidth(value)
        me.width = value
    }
    ,
    mySetHeight: function (value) {
        value = parseInt(value)
        var me = this;
        //me.setStyle("lineHeight", value + "px")
        //if (me.field) {
        //    me.field.setHeight(value)
        //}
        me.setHeight(value)
        me.height = value;
    }
    ,

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
    }
    ,

    hasLinkValue: function () {
        var me = this;
        if (me.linkValue == undefined) {
            return false;
        } else {
            return true;
        }
    }
    ,
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
        //me.linkValue = linkValue || My.linkManger.getValue(me);
        me.refreshCanvas();
    }
    ,

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
    }
    ,

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
    }
    ,
    clientOpenMenu: function () {
        /*if (!My.isLogin()) {
         return false;
         }*/
        return true;
    }
    ,
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
    }
    ,
    dblclick: function (e, el) {
        var me = this;
        if (My.getSearch()) {
            return;
        }
        console.log(me)
        me.openMenu()
    }
    ,

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
                        var isUseKeyboard = form.getComponent("useKeyboard").getValue();
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
                        /*var id = "#" + t.target.id;
                         console.log(arguments)
                         var keybord = popKeybord(id);

                         function popKeybord(id) {

                         $(id).keyboard({
                         layout: 'custom',
                         customLayout: {
                         'normal': [
                         '7 8 9 {clear} {b}',
                         '4 5 6 {left} {right}',
                         '1 2 3 0 . {a}  '
                         ]
                         },
                         maxLength: 11,
                         maxValue: 10000
                         })
                         var keybord = document.querySelector(".ui-keyboard");
                         if (keybord) {
                         return keybord
                         } else {
                         //field.focus()
                         }
                         }

                         keybord.style.position = "fixed";
                         keybord.style.zIndex = 200000;
                         keybord.style.left = (field.getX() + field.labelWidth) + "px";
                         keybord.style.top = field.getY() + "px";
                         keybord.style.backgroundColor = "#3f4655";*/
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
            xtype: "checkbox",
            inputValue: true,
            itemId: "useKeyboard",
            reference: "screenkeyboard",
            hidden: !My.getSearch(),
            disabled: !My.getSearch(),
            fieldLabel: " Screen keyboard"
            /*,
             handler: function (field, value) {
             var id = "#" + valueField.ariaEl.dom.id;
             if (value) {
             var keybord = popKeybord(id);
             keybord.style.position = "fixed";
             keybord.style.zIndex = 200000;
             keybord.style.left = (field.getX() + field.labelWidth) + "px";
             keybord.style.top = field.getY() + "px";
             keybord.style.backgroundColor = "#3f4655";
             }
             function popKeybord(id) {
             console.log($(id).keyboard({
             layout: 'custom',
             customLayout: {
             'normal': [
             '7 8 9 {clear} {b}',
             '4 5 6 {left} {right}',
             '1 2 3 0 . {a}  '
             ]
             },
             maxLength: 11,
             maxValue: 10000
             })
             )
             $(id).getkeyboard().reveal()
             $(id).getkeyboard().close()
             var keybord = document.querySelector(".ui-keyboard");
             if (keybord) {
             return keybord
             } else {

             //field.focus()
             }
             }
             if (!value) {

             var keyboard = $(id).getkeyboard();
             keyboard.reveal()
             keyboard.removeKeyboard();

             }
             }*/
        })

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
    }
    ,
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
    }
    ,

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
    }
    ,
}
;

My.textfieldFocus = function (field, t, e) {
    console.log(arguments)
    if (!My.isKeyBord) {
        return;
    }
    var id = "#" + t.target.id;
    var keybord = popKeybord(id);

    function popKeybord(id) {
        $(id).keyboard({
            layout: 'qwerty',
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
    var data = Ext.apply(
        {
            listeners: {
                focus: function (field, t, e) {
                    console.log(arguments)
                    var id = "#" + t.target.id;
                    var keybord = popKeybord(id);

                    function popKeybord(id) {
                        $(id).keyboard({
                            layout: 'qwerty',
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
    return component;
}
My.eachDelay = 1000 * 60 * 3
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();
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
            var text = response.responseText
            var xml = $($.parseXML(text));
            str = xml.find("root net").text()

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
Array.prototype.unique1 = function () {
    var n = []; //一个新的临时数组
    for (var i = 0; i < this.length; i++) //遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
}














