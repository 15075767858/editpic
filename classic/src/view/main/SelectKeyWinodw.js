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
    checkPropagation: "both",
    title: "Select Key",
    autoShow: true,
    width: 600,
    maxHeight: 390,
    scrollable: "y",
    getCheckdKeys: function () {
        var treepanel =  this.down("treepanel");
        var keys = treepanel.getChecked();
        keys = keys.filter(function (val, index) {
            if (val.data.leaf) {
                return true;
            } else {
                return false;
            }
        })
        keys.sort(function (a, b) {
            return a.data.value[4] - b.data.value[4];
        })
        return keys;
    },
    initComponent: function () {
        var me = this;
        me.ip = me.ip || location.host;
        me.port = me.port || "6379";

        me.items = [{
            rootVisible: false,
            xtype: "treepanel",
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
                },
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
                },
                {
                    xtype: "textfield",
                    emptyText: "Object Name",
                    filterName: "text",
                    listeners: {
                        buffer: 500,
                        change: "onFilterUp"
                    }
                },
                {
                    xtype: "textfield",
                    emptyText: "key",
                    filterName: "value",
                    //enableKeyEvents: true,
                    listeners: {
                        buffer: 500,
                        change: "onFilterUp"
                    }
                }
            ],
            width: "100%",
            height: "100%",
            scrollable: "y",
            modal: true,
            store: {
                type: "tree",
                autoLoad: true,
                filters: [],
                url: EventRootUrl + "graph/resources/main.php?par=nodes",
                proxy: {
                    type: "ajax",
                    url: EventRootUrl + "graph/resources/main.php?par=nodes&ip=" + me.ip + "&port=" + me.port + "",
                    reader: {
                        type: "json"
                    }
                }
            },
            columns: [{
                    xtype: "treecolumn",
                    dataIndex: "text",
                    flex: 1
                },
                {
                    text: "object name",
                    dataIndex: "text",
                    flex: 1
                },
                {
                    text: "key",
                    dataIndex: "value",
                    flex: 1
                },

            ]
            /*store: Ext.create("Ext.data.TreeStore", {

             autoLoad: true,
             url: EventRootUrl + "graph/resources/main.php?par=nodes",
             proxy: {
             type: "ajax",
             url: EventRootUrl + "graph/resources/main.php?par=nodes&ip=" + me.ip + "&port=" + me.port + "",
             reader: {
             type: "json"
             }
             }
             })*/
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
        //testme = me.down("treepanel");
    }
});