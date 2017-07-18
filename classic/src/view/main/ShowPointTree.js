//tree 用来显示
Ext.define('graph.view.tree.ShowPointTree', {
    extend: 'Ext.tree.Panel',

    requires: [
        'graph.view.tree.ShowPointTreeController',
        'graph.view.tree.ShowPointTreeModel'
    ],

    controller: 'tree-showpointtree',
    viewModel: {
        type: 'tree-showpointtree'
    },
    region: "center",
    useArrows: true,
    animate: true,
    checkPropagation: "down",
    rootVisible: false,
    bufferedRenderer: false,
    listeners: {
        checkchange: function (node, checked, e, eOpts) {
            checkNode(node, checked)

            function checkNode(node, checked) {
                var childNodes = node.childNodes;
                if (childNodes.length > 0) {
                    for (var i = 0; i < childNodes.length; i++) {
                        childNodes[i].set("checked", checked)
                        if (childNodes[i].childNodes.length > 0) {
                            checkNode(childNodes[i], checked);
                        }
                    }
                }
            }
            console.log(arguments)
        }
    },
    getSelectPoints: function () {
        var me = this;
        var checkeds = me.getChecked();
        var keysArr = [];
        for (var i = 0; i < checkeds.length; i++) {
            if (checkeds[i].data.depth == 4) {
                keysArr.push(checkeds[i].data.key)
            }
        }
        return keysArr;
    },
    tbar: [{
        text: 'Expand All',
        scope: this,
        handler: function (th) {
            treePanel.expandAll()
        }
    }, {
        text: 'Collapse All',
        scope: this,
        handler: function (th) {
            treePanel.collapseAll()
        }
    }, "->", {
        text: "config filter point",
        handler: function () {
            Ext.create("FilterPointWindow", {
                callback: function (res) {
                    //Ext.Msg.alert("Info","Ok");
                }
            })
        }
    }, {
        text: "config database",
        handler: function () {
            var win = Ext.create("Ext.window.Window", {
                title: "Config database .",
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
                            fieldLabel: "Database host",
                            name: "host",
                            value: "127.0.0.1"
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "username",
                            name: "username",
                            value: "root"
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "password",
                            name: "password",
                            inputType: "password",
                            value: "root"
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "Database name",
                            name: "databasename",
                            value: "smartio_db"
                        }, {
                            xtype: "button",
                            text: "create ",
                            handler: function () {
                                var form = this.up("form");
                                form.submit({
                                    url: "resources/mysqlInit.php?par=createTable",
                                    success: function (form, action) {
                                        Ext.Msg.alert('Info ', action.response.responseText);
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert('Info ', action.response.responseText);
                                    }
                                })
                            }
                        }
                    ],
                    listeners: {
                        boxready: function (form) {
                            Ext.Ajax.request({
                                url: "resources/mysqlInit.php?par=getConfig",
                                success: function (response) {
                                    var xml = $(response.responseText);
                                    var host = xml.find("host").text()
                                    var username = xml.find("username").text()
                                    var password = xml.find("password").text()
                                    var databasename = xml.find("databasename").text()
                                    var ojson = {
                                        host: host || "127.0.0.1",
                                        username: username || "root",
                                        password: password || "root",
                                        databasename: databasename || "smartio_db"
                                    }
                                    form.getForm().setValues(ojson)
                                }
                            })
                        }
                    },
                    buttons: [{
                            text: "Test Connect",
                            handler: function () {
                                var form = this.up("form");
                                form.submit({
                                    url: "resources/mysqlInit.php?par=testConnect",
                                    success: function (form, action) {
                                        Ext.Msg.alert('Info ', action.response.responseText);
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert('Info ', action.response.responseText);
                                    }
                                })

                            }
                        },
                        "->",
                        {
                            text: "Ok",
                            handler: function () {
                                var form = this.up("form");
                                if (form.isValid()) {
                                    var values = form.getValues();
                                    form.submit({
                                        url: "resources/mysqlInit.php?par=saveConfig",
                                        success: function (form, action) {
                                            Ext.Msg.alert('Info ', action.response.responseText);
                                        },
                                        failure: function (form, action) {
                                            Ext.Msg.alert('Info ', action.response.responseText);
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
    }, {
        text: "config Listeners Ip",
        handler: function () {
            setIpsWindow()
        }
    }]
});