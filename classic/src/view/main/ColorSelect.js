Ext.define('graph.view.ux.ColorSelect', {
    extend: 'Ext.window.Window',
    autoShow: true,
    title: "select color",
    requires: [
        'graph.view.ux.ColorSelectController',
        'graph.view.ux.ColorSelectModel'
    ],
    controller: 'ux-colorselect',
    viewModel: {
        type: 'ux-colorselect'
    },
    width: 500,
    //height: 496,
    layout: {
        type: "table",
        columns: 8
    },
    defaults: {
        margin: 10,
        width: 40,
        height: 40,
        border: true,
        //bodyStyle: 'padding:20px'
    },
    getSelectPanel: function () {
        var me = this;
        var items = me.items.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].isselect) {
                return items[i]
            }
        }
        return false;
    },
    buttons: [
        {text: "Add Color", handler: "addColorHandler"},
        {text: "delete", handler: "deleteColorHandler"},
        "->",
        {text: "Ok", handler: "okHandler"},
        {
            text: "Cancel", handler: function () {
            this.up('window').close();
        }
        }
    ],
    tbar: [
        {text: "change color", handler: "changeColorHandler"},
        {text: "change color plus", handler: "changeColorPlusHandler"}
    ],
    listeners: {
        boxready: "boxready"
    }
});
