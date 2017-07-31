Ext.define('graph.view.window.ConfigHistoryTableWindow', {
    extend: 'Ext.window.Window',
    xtype: "ConfigHistoryTableWindow",
    alias: "ConfigHistoryTableWindow",
    requires: [
        'graph.view.window.ConfigHistoryTableWindowController',
        'graph.view.window.ConfigHistoryTableWindowModel',
        "graph.view.grid.ConfigXmlFileGrid"
    ],

    controller: 'window-confighistorytablewindow',
    viewModel: {
        type: 'window-confighistorytablewindow'
    },
    title: "Setting History Tables",
    autoShow: true,
    scrollable: "y",
    initComponent: function () {
        var me = this;
        var grid = Ext.createByAlias("ConfigXmlFileGrid", {
            restartServer: function () {
                Ext.Ajax.request({
                    url: "resources/mysqlinit.php",
                    params: {
                        par: "runListen"
                    }
                }).then(function (response) {
                    console.log(response.responseText)
                })
            },
            remoteDeleteSelectItem: function () {
                var grid = this;
                var selArr = grid.getSelection();
                if (selArr[0]) {
                    Ext.Msg.confirm("delete", "would you want to delete the table?", function (msg) {
                        if (msg == "yes") {
                            var model = selArr[0];
                            Ext.Ajax.request({
                                url: "resources/mysql.php",
                                params: {
                                    par: "deleteHistoryTable",
                                    tablename: model.data.tablename.trim()
                                },
                            }).then(function (response) {
                                grid.store.remove(model);
                                console.log(response)
                                My.delayToast("message", response.responseText);
                                grid.saveIpsXml()
                                grid.restartServer()
                            })
                        }
                        console.log(arguments, this)
                    }, grid)
                }
            },
            getWindowButtons: function () {
                return [{
                        xtype: "button",
                        text: "add",
                        handler: function () {
                            grid.addItemClick()
                        }
                    }, {
                        xtype: "button",
                        text: "delete",
                        handler: function () {
                            grid.remoteDeleteSelectItem();
                        }
                    },
                    "->",
                    {
                        xtype: "button",
                        text: "Ok",
                        handler: function () {
                            grid.saveIpsXml();
                        }
                    },
                    {
                        xtype: "button",
                        text: "Cancel",
                        handler: function () {
                            me.close()
                        }
                    }
                ]
            },
            fileName: "/mnt/nandflash/HistoryTable.xml",
            store: Ext.create("graph.store.HistoryStore"),
            addItemClick: function () {
                Ext.create("SelectHistoryKeyFormWindow", {
                    callback: function (data) {
                        console.log(data)
                        var isHave = grid.store.data.items.find(function (val) {
                            console.log(val)
                            if (val.data.tablename == data.tablename) {
                                return true;
                            }
                        })
                        if (isHave) {
                            Ext.Msg.alert("Exception", "This table already exists.")
                        } else {
                            grid.store.add(data)
                            grid.saveIpsXml()
                            grid.restartServer()
                            this.close();
                        }
                    }
                })
            }
        })
        me.items = grid;
        me.buttons = grid.getWindowButtons();
        me.callParent();
    }
});