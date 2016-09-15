Ext.define('editpic.view.tree.DevTree', {
    extend: 'Ext.tree.Panel',

    requires: [
        'editpic.view.tree.DevTreeController',
        'editpic.view.tree.DevTreeModel'
    ],

    controller: 'tree-devtree',
    viewModel: {
        type: 'tree-devtree'
    },
    store: Ext.create("Ext.data.TreeStore", {

    }),
    tbar: [
        {
            text: 'Expand All',
            scope: this,
            handler: function (treePanel) {
                treePanel.expandAll()
            }
        }, {
            text: 'Collapse All',
            scope: this,
            handler: function (treePanel) {
                treePanel.collapseAll()
            }
        }
    ]
});
