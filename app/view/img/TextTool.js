
Ext.define('editpic.view.img.TextTool',{
    extend: 'editpic.view.img.BaseTool',

    /*requires: [
        'editpic.view.img.TextToolController',
        'editpic.view.img.TextToolModel'
    ],

    controller: 'img-texttool',
    viewModel: {
        type: 'img-texttool'
    },*/

    initComponent: function () {
        var me = this;
        /*var btn = Ext.create("Ext.form.field.Text",
            {
            }
        )

        me.field = btn;
        me.items = btn;*/
        me.callParent();
    },
    init: function () {
        var me = this;
        console.log(me)
        me.callParent(arguments)
    },
    linkData: function (data) {
        var me = this;
        if (data.linkValue) {
            console.log(data)
            me.linkValue=data.linkValue;
            me.setHtml(data.linkValue)
            //me.field.setValue(data.linkValue)
        }
        me.refreshCanvas()
    },
    refreshCanvas: function () {
        var me = this;

    }
});
