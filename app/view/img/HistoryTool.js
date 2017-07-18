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
    }
    //html: 'Hello, World!!'
});