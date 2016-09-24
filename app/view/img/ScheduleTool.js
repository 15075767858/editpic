Ext.define('editpic.view.img.ScheduleTool', {
    extend: 'editpic.view.img.BaseTool',

    layout: "absolute",

    initComponent: function () {
        var me = this;
        me.callParent()
    },

    init: function (data) {
        var me = this;
        //console.log(data)
        me.schdule = data.schdule;
        me.schduleName = me.schdule;
        me.ip = data.ip;
        me.port = data.port;
        if (me.schdule) {
            My.AjaxSimple({
                par: "gettypevalue",
                ip: me.ip,
                port: me.port,
                nodename: me.schdule,
                type: "Object_Name"
            }, "", function (response) {
                me.schduleName = response.responseText;
            })
        }
        me.callParent(arguments)
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        Ext.apply(data, {
            schdule: me.schdule,
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
        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                },
                html: me.schduleName
            })
            me.add(me.contentPanel);
        } else {
            me.contentPanel.setHtml(me.schduleName);
        }
    },
    listeners: {
        el: {
            click: function () {
                var me = this.component;
                //Ext.create("editpic.view.week.WeekWin")

                 Ext.create("editpic.view.week.WeekWin", {
                         id: "drawWindow",
                         sDevNodeName: me.schdule,
                         sDevName: me.schdule.substr(0, 4),
                         ip: me.ip,
                         port: me.port
                     }
                 )
            }
        }
    }
});
