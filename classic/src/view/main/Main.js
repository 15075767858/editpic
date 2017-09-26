/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

Ext.define('editpic.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.panel.Panel',
        'Ext.tab.Panel',
        'Ext.tree.Panel',
        "Ext.window.Toast",
        "Ext.form.field.*",
        "Ext.window.*",
        "Ext.data.*",
        'editpic.view.main.MainModel',
        'editpic.view.main.MainController',
        'editpic.view.tree.SvgsTree',
        "editpic.view.panel.PicPanel",
        "editpic.view.panel.SetPicPanel",
        "editpic.view.panel.DevFormPanel",
        'editpic.view.panel.ToolsPanel',
        "editpic.view.login.LoginWindow",
        "editpic.view.ux.KeyBoard",
        "editpic.view.week.WeekWin",
        "editpic.view.window.EditFile",
        "editpic.view.EventAlarm.EventAlarmSetting",
        'graph.view.window.ShowDevices',
        "graph.view.chart.HistoryChart"

        //"editpic.view.tool.PublishPic"
    ],

    id: "mainPanel",
    controller: 'main',
    viewModel: 'main',
    //ui: 'navigation',
    listeners: {
        boxready: function (panel) {
            //panel.createOutLoginMenu()
            if (!My.getSearch()) {
                var maintab = Ext.getCmp("mintab");
                setTimeout(function () {
                    maintab.addTab("index")
                }, 1000)
            }
        }
    },
    createOutLoginMenu: function () {
        Ext.create("Ext.window.Window", {
            autoShow: true,
            buttons: [{
                text: "User Manager",
                handler: function () {

                }
            }]
        })
    },
    tbar: [{
            text: "File",
            menu: [
                {
                    text: "save",
                    handler: "saveHandler"
                }, {
                    text: "open",
                    handler: "openNewHandler",
                    hidden: true
                },
                {
                    text: "open old version",
                    handler: "openHandler",
                    hidden: true
                },
                {
                    text: "open",
                    menu: [{
                            text: "open",
                            handler: "openNewHandler"
                        },
                        {
                            text: "data.json to new version data",
                            handler: "toNewVersion"
                        }
                    ]
                },
                {
                    text: "new",
                    handler: "createNewTab"
                },
                {
                    text: "delete",
                    handler: "deleteHandler"
                },
                {
                    text: "replace",
                    handler: 'replaceHandler'
                },
                {
                    text: "data.json to new version data",
                    handler: "toNewVersion",
                    hidden: true
                },
                {
                    text: "Backup Graphic",
                    handler: "BackupGraphice"
                },
                {
                    text: "Restor Graphic",
                    handler: "dataJsonUpload"
                }
            ]
        },
        {
            text: "Help",
            menu: [{
                text: "update graph",
                hidden: true,
                handler: "updateGraph"
            }, {
                text: "about",
                handler: function () {
                    Ext.Msg.alert("Version", "<code class='smartiologo'>SmartIO </code>graphTools 3.2.1")
                }
            }]
        }, {
            text: "Historical Record",
            handler: function () {
                Ext.createByAlias("DataRecordWindow")
            }
        },
        {
            xtype: 'splitbutton',
            icon: 'resources/icons/back_24px.png',
            //text: 'Back',
            id: "backButton",
            handler:"clickback",
            setBackMenu: function () {
                var me = this;
                var items = ["-"];
                for (var i = 0; i < My.backup.length; i++) {
                    var item = {
                        text: My.backup[i],
                        handler:"clickback"
                    }
                    items.push(item);
                    items.push("-");
                }
                console.log(items)
                var menu = new Ext.menu.Menu({
                    items: items
                })
                me.setMenu(menu)
            }
        },
    ],
    bbar: [] || [
        "->",
        {
            xtype: "checkbox",
            inputValue: true,
            boxLabel: " Screen keyboard",
            handler: function (field, bol) {
                My.isKeyBord = bol;
            }
        },
        {
            text: "login",
            handler: "userLogin",
            bind: {
                hidden: "{isLogin}"
            }
        },
        {
            bind: {
                text: "Welcome {username}",
                hidden: "{!isLogin}"
            },
            menu: [{
                text: "Out Login",
                handler: "outLogin"
            }]
        }
    ],
    border: true,
    header: {
        height: 50,
        style: {
            lineHeight: 50
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 1
        }
    },
    layout: "border",
    defaults: {},
    items: [{
            xtype: "tabpanel",
            region: 'center',
            id: "mintab",


            //scrollable: true,
            getCurrentTab: function () {
                var me = this;
                if (!me.items) {
                    return null;
                }
                for (var i = 0; i < me.items.items.length; i++) {
                    if (!me.items.items[i].hidden) {
                        return me.items.items[i]
                    }
                }
                return null;
            },
            getTabByTitle: function (title) {
                var me = this;
                if (!me.items) {
                    return null;
                }
                for (var i = 0; i < me.items.items.length; i++) {
                    if (me.items.items[i].title == title) {
                        return me.items.items[i]
                    }
                }
                return null;

            },
            addTab: function (text) {
                if (!text) {
                    return;
                }
                var me = this;

                var resDataJson = My.getImageDataByJson(text)
                if (resDataJson == null) {
                    Ext.Msg.alert("Exception", text + " does not exist .")
                    return;
                }

                My.backupAdd(text)
                var panel = me.getTabByTitle(text);
                if (panel) {
                    me.setActiveTab(panel)
                    //panel.close()
                    return 
                }
                
                var picPanel = me.createNewTab(text)
                picPanel.load(resDataJson)

            },
            createNewTab: function (text) {
                var me = this;
                var picPanel = Ext.create("editpic.view.panel.PicPanel", {
                    x: 0,
                    y: 0,

                    constrainHeader: false,
                    constrain: false,
                })
                me.add({
                    xtype: "panel",
                    constrainHeader: false,
                    constrain: false,
                    title: text,
                    scrollable: true,

                    //layout:"absolute",
                    items: picPanel
                }).show()
                return picPanel
            },
            defaults: {
                bodyStyle: {
                    //background: "url(resources/square.png)"
                    background: "#1491fb"
                },
                closable: true
            },
            items: [
                /*{
                 xtype: "panel",
                 title: "untitled",
                 //minWidth:1024,
                 //minHeight:768,
                 scrollable: true,
                 items: {
                 xtype: "picpanel",
                 x: 0,
                 y: 0
                 }
                 }*/
            ],
            listeners: {
                boxready: function () {
                    var me = this;

                    /*var search = window.location.search;
                     if(search){
                     var resObj = Ext.Object.fromQueryString(search)
                     if(resObj){
                     me.addTab(resObj['graph'])
                     }
                     }*/

                    var resObj = My.getSearch();
                    if (resObj) {
                        me.removeAll();
                        me.addTab(resObj['graph']);
                        Ext.getCmp("imgTreePanel").hide();
                        Ext.getCmp("toolPanel").hide();
                        Ext.getCmp("devformpanel").hide();
                        console.log(me.getDockedItems());
                        var mainPanel = Ext.getCmp("mainPanel");
                        mainPanel.getDockedItems()[0].hide();
                        mainPanel.getDockedItems()[1].hide();

                    }
                    My.linkManger.init()
                }
            }
        },
        {
            xtype: "toolspanel",
            border: true,
            region: "east"
        },
        {
            xtype: "devformpanel",
            id: "devformpanel",
            region: "east"
        }, {
            xtype: "editpic.svgstree",
            id: "imgTreePanel",
            region: 'west',
            collapsible: true
        },
    ]

});
Ext.define("UserManager", {
    extend: "Ext.window.Window",
    autoShow: true,
    title: "User Manager",
    width: 400,
    deleteUser: function () {
        var me = this;
        var combo = me.down('combo');
        Ext.Msg.show({
            title: 'Delete User',
            message: 'Do you want to delete this user ' + combo.value + ' ？',
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/php/login.php?par=deleteUser' + '&username=' + combo.value,
                        success: function (response) {
                            try {
                                var resJson = Ext.decode(response.responseText);
                                Ext.Msg.alert("Massage", resJson.info)
                            } catch (e) {
                                Ext.Msg.alert('error', e + response.responseText);
                                throw new Error(e);
                            }
                        }
                    })
                }
            }
        });
    },
    bbar: [{
            text: "Add User",
            handler: function () {
                var win = Ext.create("Ext.window.Window", {
                    title: "Please input password and level .",
                    autoShow: true,
                    width: 300,
                    resizeable: false,
                    items: [{
                        xtype: "form",
                        defaults: {
                            margin: 10,
                            allowBlank: false
                        },
                        items: [{
                                xtype: "textfield",
                                fieldLabel: "username",
                                name: "username",
                                maxLength: 20,
                                minLength: 4
                            },
                            {
                                xtype: "textfield",
                                fieldLabel: "password",
                                name: "password",
                                inputType: "password",
                                maxLength: 16,
                                minLength: 4
                            },
                            {
                                xtype: "textfield",
                                fieldLabel: "Enter again",
                                inputType: "password",
                                name: "again",
                                maxLength: 16,
                                minLength: 4
                            },
                            {
                                xtype: "numberfield",
                                fieldLabel: "level",
                                name: "level",
                                minValue: 0,
                                maxValue: 255
                            },
                        ],
                        bbar: [{
                                text: "Ok",
                                handler: function () {
                                    var form = this.up("form");
                                    if (form.isValid()) {
                                        var values = form.getValues();
                                        if (values.password != values.again) {
                                            Ext.Msg.alert("Massage", "Two passwords are not consistent .")
                                            return;
                                        }
                                        form.submit({
                                            url: "/php/login.php?par=addUser",
                                            success: function (form, resonse) {
                                                if (resonse.result.success) {
                                                    Ext.Msg.alert("Massage", resonse.result.info);
                                                }
                                                console.log(arguments)
                                            },
                                            failure: function (form, response) {
                                                Ext.Msg.alert("Massage", response.result.info)
                                                console.log(arguments)
                                            }
                                        })
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
                    }]
                })
            }
        },
        {
            text: "Delete User",
            handler: function (button) {
                var win = button.up('window');
                win.deleteUser();

            }
        },
        {
            text: "Change User",
            hidden: true,
            handler: function () {
                var win = Ext.create("Ext.window.Window", {
                    title: "Please input password and level .",
                    autoShow: true,
                    width: 300,
                    resizeable: false,
                    items: [{
                        xtype: "form",
                        defaults: {
                            margin: 10,
                            allowBlank: false
                        },
                        items: [{
                                xtype: "textfield",
                                fieldLabel: "username",
                                name: "username",
                                maxLength: 20,
                                minLength: 4,
                                hidden: true
                            },
                            {
                                xtype: "textfield",
                                fieldLabel: "password",
                                name: "password",
                                inputType: "password",
                                maxLength: 16,
                                minLength: 4
                            },
                            {
                                xtype: "textfield",
                                fieldLabel: "Enter again",
                                inputType: "password",
                                name: "again",
                                maxLength: 16,
                                minLength: 4
                            },
                            {
                                xtype: "numberfield",
                                fieldLabel: "level",
                                name: "level",
                                minValue: 0,
                                maxValue: 255
                            },
                        ],
                        bbar: [{
                                text: "Ok",
                                handler: function () {
                                    var form = this.up("form");
                                    if (form.isValid()) {
                                        var values = form.getValues();
                                        if (values.password != values.again) {
                                            Ext.Msg.alert("Massage", "Two passwords are not consistent .")
                                            return;
                                        }
                                        form.submit({
                                            url: "/php/login.php?par=addUser",
                                            success: function (form, resonse) {
                                                if (resonse.result.success) {
                                                    Ext.Msg.alert("Massage", resonse.result.info);
                                                }
                                                console.log(arguments)
                                            },
                                            failure: function (form, response) {
                                                Ext.Msg.alert("Massage", response.result.info)
                                                console.log(arguments)
                                            }
                                        })
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
                    }]
                })
            }
        }
    ],
    initComponent: function () {
        var me = this;
        var combo = Ext.create("Ext.form.field.ComboBox", {
            store: Ext.create("Ext.data.Store", {
                fields: ["0"],
                autoLoad: true,
                proxy: {
                    type: "ajax",
                    url: "/php/login.php?par=getAllUser",
                    reader: {
                        type: "json"
                    }
                }
            }),
            displayField: "0",
            valueField: "0"
        })
        me.items = [combo]
        me.callParent();
    }
})