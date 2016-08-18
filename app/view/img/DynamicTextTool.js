Ext.define('editpic.view.img.DynamicTextTool', {
    extend: 'editpic.view.img.BaseTool',


    initComponent: function () {
        var me = this;

        me.callParent();
    },
    init: function (data) {
        var me = this;
        me.callParent(arguments)
    },

    init: function (data) {
        var me = this;
        me.callParent(arguments)
        me.text = data.text;
        me.dynamictext = data.dynamictext;
        console.log(me)
        me.refreshCanvas()
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        Ext.apply(data, {
            text: me.text,
            dynamictext: me.dynamictext
        })
        return data;
    },

    /*linkData: function (data) {
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
    },

    linkData: function (data) {
        var me = this;

        me.callParent(arguments);
        setTimeout(function(){
            me.refreshCanvas()
        },500)
    },*/
    refreshCanvas: function () {
        var me = this;
        console.log(me)
        console.log(me.getLinkValue())
        if (me.getLinkValue()) {
            me.setHtml(me.dynamictext);
        } else {
            me.setHtml(me.text);
        }
    }
});
