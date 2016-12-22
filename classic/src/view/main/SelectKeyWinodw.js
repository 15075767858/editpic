Ext.define('editpic.view.EventAlarm.SelectKeyWinodw', {
    extend: 'Ext.window.Window',
    alias: "SelectKeyWinodw",
    requires: [
        'editpic.view.EventAlarm.SelectKeyWinodwController',
        'editpic.view.EventAlarm.SelectKeyWinodwModel'
    ],

    controller: 'eventalarm-selectkeywinodw',
    viewModel: {
        type: 'eventalarm-selectkeywinodw'
    },

    title: "Select Key",
    autoShow: true,
    width: 600,
    maxHeight: 390,
    scrollable: "y",
    listeners: {
        boxready: function () {
            console.log(arguments)
        }
    },
    initComponent: function () {
        var me = this;
        me.items = [{
            rootVisible: false,
            xtype: "treepanel",
            listeners: {
                boxready: function (treePanel) {
                    setTimeout(function () {

                        var node = treePanel.store.findNode('value', me.key)
                        if (node) {
                            var path = node.getPath()
                            treePanel.selectPath(path)
                        }
                    }, 1000)
                }
            },
            tbar: [
                {
                    text: 'Expand All',
                    xtype: "button",
                    handler: function (th) {
                        var me = this.up("treepanel");
                        me.expandAll();
                    }
                }, {
                    text: 'Collapse All',
                    xtype: "button",
                    handler: function (th) {
                        var me = this.up("treepanel");
                        me.collapseAll();
                    }
                }
            ],
            width: "100%",
            height: "100%",
            scrollable: "y",
            modal: true,
            store: Ext.create("Ext.data.TreeStore", {
                autoLoad: true,
                url: EventRootUrl + "graph/resources/main.php?par=nodes",
                proxy: {
                    type: "ajax",
                    url: EventRootUrl + "graph/resources/main.php?par=nodes&ip=" + me.ip + "&port=" + me.port + "",
                    reader: {
                        type: "json"
                    }
                }
            })
        }]
        me.buttons = [{
            text: "Ok",
            handler: function () {
                //var grid = win.down("treepanel");
                var tree = me.down("treepanel")
                var selectArr = tree.getSelection();
                console.log(selectArr)
                if (!selectArr[0]) {
                    Ext.Msg.alert("Massage", "Please select a key .");

                } else {
                    me.callback(selectArr)
                }
            }
        }, {
            text: "Cancel",
            handler: function () {
                me.close();
            }
        }]
        me.callParent();
    }
});
