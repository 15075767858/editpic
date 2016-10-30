Ext.define('editpic.view.img.DynamicTextTool', {
    extend: 'editpic.view.img.BaseTool',


    initComponent: function () {
        var me = this;

        me.callParent();
    },
    layout: "absolute",


    init: function (data) {
        var me = this;
        me.callParent(arguments)
        me.text = data.text;
        me.dynamictext = data.dynamictext;
        //console.log(me)
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
    getLinkValue: function () {
        var me = this;
        var linkvalue = parseFloat(me.linkValue)
        if (linkvalue > 0) {
            return true
        } else {
            return false;
        }
    },
    refreshCanvas: function () {
        var me = this;


       /* if (me.getLinkValue()) {
            me.setHtml(me.dynamictext);
        } else {
            me.setHtml(me.text);
        }*/
        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                },
                y:me.fontPostion,
                html: me.getLinkValue()?me.dynamictext:me.text
            })
            me.add(me.contentPanel);
        } else{
            me.contentPanel.setHtml(me.getLinkValue()? me.dynamictext:me.text)
        }

    }
});
