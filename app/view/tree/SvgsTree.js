Ext.define('editpic.view.tree.SvgsTree', {
    extend: 'Ext.tree.Panel',
    xtype: "editpic.svgstree",
    requires: [
        'editpic.view.tree.SvgsTreeController',
        'editpic.view.tree.SvgsTreeModel',
        "editpic.store.TreeListModel"
    ],

    controller: 'tree-svgstree',
    viewModel: {
        type: 'tree-svgstree'
    },
    reference: "svgstree",

    width: 300,
    autoScroll: true,
    animate: true,
    animateShadow: true,
    resizable: true,
    singleExpand:false,
    rootVisible:false,
    store: Ext.create("editpic.store.TreeListModel"),//"viewmodel.tree-list",
    tbar: [{
        text: 'Expand All',
        xtype: "button",
        handler: function (th) {
            var me = this.up("treepanel");
            console.log(this);
            console.log(me);
            me.expandAll();
        }
    }, {
        text: 'Collapse All',
        xtype: "button",
        handler: function (th) {
            var me = this.up("treepanel");
            console.log(this);
            console.log(me);
            me.store.load();
            me.collapseAll();
        }
    },{
        text:"Options",
        menu:[{
            checked:false,
            text:'Single Expand',
            config:"singleExpand",
            handler:"onToggleConfig"
        }]
    }
    ],
    initComponent: function () {
        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                ddGroup: "DevTreeDragDropGroup"
            }
        }
        this.callParent();
    },
    listeners:{
        boxready:function(){
            console.log(this.items)
        },
        itemmouseenter:function(treeitem , record , item , index , e , eOpts){
            console.log(arguments)
            record.data.qtip="asdasasas"
        }
    }
});