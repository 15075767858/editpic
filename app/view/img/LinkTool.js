Ext.define('editpic.view.img.LinkTool', {
    extend: 'editpic.view.img.BaseTool',

    requires: [
        'editpic.view.img.LinkToolController',
        'editpic.view.img.LinkToolModel'
    ],

    controller: 'img-linktool',
    viewModel: {
        type: 'img-linktool'
    },
    initComponent: function () {
        var me = this;
        var btn = Ext.create("Ext.button.Button")
        me.field = btn;
        me.items=btn;
        me.callParent();
    },
    refreshCanvas: function () {


    }
});
