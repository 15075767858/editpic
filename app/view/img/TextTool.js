/*
 * 这个是自己输入文字 仅用做展示
 * */
Ext.define('editpic.view.img.TextTool', {
    extend: 'editpic.view.img.BaseTool',

    /*requires: [
     'editpic.view.img.TextToolController',
     'editpic.view.img.TextToolModel'
     ],

     controller: 'img-texttool',
     viewModel: {
     type: 'img-texttool'
     },*/

    itype: 4,
    initComponent: function () {
        var me = this;
        me.callParent();
    },

    init: function (data) {
        var me = this;
        me.callParent(arguments)
        me.text = data.text;
        console.log(me)
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        Ext.apply(data, {
            text: me.text
        })
        return data;
    },
    linkData: function (data) {
        var me = this;
        if (data.text) {
            console.log(data)
            me.text = data.text;
            me.setHtml(data.text)
            //me.field.setValue(data.text)
        }else{
            me.setHtml("")
        }
        me.refreshCanvas()
    },
    refreshCanvas: function () {

    }

});
