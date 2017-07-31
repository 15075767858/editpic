Ext.define('graph.view.img.HistoryTool', {
    extend: 'editpic.view.img.BaseTool',

    requires: [
        'graph.view.img.HistoryToolController',
        'graph.view.img.HistoryToolModel'
    ],

    controller: 'img-historytool',
    viewModel: {
        type: 'img-historytool'
    },
    layout: "absolute",
    init: function (data) {
        var me = this;
        console.log(data);
        me.tablename = data.tablename;
        me.callParent(arguments)
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        Ext.apply(data, {
            tablename: me.tablename,
            hostPoint: me.hostPoint
        })
        return data;
    },
    refreshCanvas: function () {
        console.log("clock refreshCanvas")
        var me = this;
        // if (!me.contentPanel) {
        //     me.contentPanel = Ext.create("Ext.panel.Panel", {
        //         bodyStyle: {
        //             backgroundColor: "transparent"
        //         }
        //         //html: new Date().toLocaleString()
        //     })
        //     setInterval(function () {
        //         me.contentPanel.setHtml(new Date().toLocaleTimeString())
        //     }, 1000)
        //     me.add(me.contentPanel);
        // }
    },
    listeners: {
        el: {
            click: function () {
                var me = this.component;
                My.ShowHistoryTable(me.tablename)
            }
        }
    }
    //html: 'Hello, World!!'
});
