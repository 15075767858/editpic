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

    layout: "absolute",

    initComponent: function () {
        var me = this;
        me.callParent()
    },

    init: function (data) {
        var me = this;
        console.log(data)
        me.aliasName = data.aliasName;
        me.showFilename = data.showFilename;
        me.callParent(arguments)
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        Ext.apply(data, {
            aliasName: me.aliasName,
            showFilename: me.showFilename
        })
        return data;
    },
    linkData: function (data) {

        var me = this;

        me.linkValue = data.linkValue;

        me.refreshCanvas();

        /*if (data.linkValue) {
         me.setHtml(data.linkValue);
         } else {
         me.setHtml("");
         }*/
    },
    refreshCanvas: function () {

        var me = this;

        //aliasName
        //showFilename

        if (me.showFilename) {
            me.setHtml(me.linkValue);
        }else{
            me.setHtml("")
        }
        console.log(me.showFilename)

        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                },
                //y:50,
                //height: "-50%",
                //width: "100%",
                html: me.aliasName
            })
            me.add(me.contentPanel);
        } else{
            me.contentPanel.setHtml(me.aliasName)
        }

        /*if(me.linkValue){
         me.setHtml(me.aliasName)
         }else{
         me.setHtml("")
         }*/

    },
    listeners: {
        el: {
            click: function () {
                var me = this.component;
                console.log(me.linkValue)
                Ext.getCmp("mintab").addTab(me.linkValue)
            }
        }
    }
});
