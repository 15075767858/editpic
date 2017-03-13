
Ext.define('graph.view.tree.DeviceTree',{
    extend: 'Ext.tree.Panel',

    requires: [
        'graph.view.tree.DeviceTreeController',
        'graph.view.tree.DeviceTreeModel'
    ],

    controller: 'tree-devicetree',
    viewModel: {
        type: 'tree-devicetree'
    },
    rootVisible: false,
    xtype: "treepanel",
    width: "100%",
    height: "100%",
    scrollable: "y",
    modal: true,
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
    initComponent:function(){
        var me=this;

        me.store= Ext.create("Ext.data.TreeStore", {
            autoLoad: true,
            url: "resources/main.php?par=nodes",
            proxy: {
                type: "ajax",
                url: "resources/main.php?par=nodes&ip=" + combo.ip + "&port=" + combo.port + "",
                reader: {
                    type: "json"
                }
            }
        })

        me.callParent();
    },

});
