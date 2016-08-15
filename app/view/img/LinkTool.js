Ext.define('editpic.view.img.LinkTool', {
    extend: 'editpic.view.img.BaseTool',

    /*requires: [
     'editpic.view.img.LinkToolController',
     'editpic.view.img.LinkToolModel'
     ],

     controller: 'img-linktool',
     viewModel: {
     type: 'img-linktool'
     },*/
    /*initComponent: function () {
        var me = this;
        var btn = Ext.create("Ext.button.Button",
            {}
        )
        me.field = btn;
        me.items = btn;
        me.callParent();
    },
    linkData: function (data) {
        var me = this;
        if (data.linkValue) {
            console.log(data)
            me.linkValue = data.linkValue;
            me.field.setText(data.linkValue)
            me.field.setText(data.linkValue)
            me.field.setHandler(function () {

                Ext.getCmp("mintab").addTab(data.linkValue)
            })
        }
        me.refreshCanvas()
    },*/
    linkData: function (data) {
        var me = this;
        if(data.linkValue){
            me.setHtml(data.linkValue);
        }
    },
    initComponent:function(){
      var me=this;
        me.callParent()
    },
    refreshCanvas: function () {
        var me = this;
    },
    init: function (data) {
        var me = this;
        me.callParent(arguments)
    }
});
