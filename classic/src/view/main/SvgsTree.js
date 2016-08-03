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
    //ui:"svgstree",
    title: "&nbsp;&nbsp;&nbsp;&nbsp;Imgs",

    header: {
        //style:"background:red;font-family: FontAwesome !important;",
        iconCls: "fa-list-ul"

    },
    width: 300,
    autoScroll: true,
    animate: true,
    animateShadow: true,
    resizable: true,
    singleExpand: false,
    rootVisible: false,
    collapsible: true,
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
    }, {
        text: "Options",
        menu: [{
            checked: false,
            text: 'Single Expand',
            config: "singleExpand",
            handler: "onToggleConfig"
        }]
    }
    ],
    initComponent: function () {
        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                ddGroup: "picgroup",
                enableDrop: false,
                dragText: null,
                copy: true,
                dragText: null,
                stateEvents: ["drop", "beforedrop"]
            }
        }

        this.callParent();
    },
    listeners: {

        boxready: function () {
            console.log(this.items)
        },
        itemmouseenter: "itemmouseenter",
        beforedrop: "beforedrop",
    }
});

