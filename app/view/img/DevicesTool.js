Ext.define('editpic.view.img.DevicesTool', {
    extend: 'editpic.view.img.BaseTool',

    layout: "absolute",
    initComponent: function () {
        var me = this;
        me.callParent();
    },

    init: function (data) {
        var me = this;
        console.log(data);
        me.device = data.device;
        me.ip = data.ip;
        me.port = data.port;
        me.callParent(arguments)
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        Ext.apply(data, {
            device: me.device
        })
        return data;
    },
    linkData: function (data) {
        var me = this;

        me.linkValue = data.linkValue;
        me.refreshCanvas();
    },
    refreshCanvas: function () {

        var me = this;

        //aliasName
        //showFilename

        if (me.device) {
            me.setHtml(me.linkValue);
        } else {
            me.setHtml("")
        }

        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                },
                //y:50,
                //height: "-50%",
                //width: "100%",
                html: me.device
            })
            me.contentPanel.setStyle("color", "red")
            me.add(me.contentPanel);
        } else {
            me.contentPanel.setHtml(me.device)
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
                if (!me.device) {
                    return;
                }

                Ext.createWidget("showdevices",{
                    device:me.device,
                    ip:me.ip,
                    port:me.port
                });

            }
        }
    }
});

