
Ext.define('editpic.view.img.ClockTool',{
    extend: 'editpic.view.img.BaseTool',

    layout: "absolute",

    refreshCanvas: function () {
        console.log("clock refreshCanvas")
        var me = this;

        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                }
                //html: new Date().toLocaleString()
            })
            setInterval(function(){
                me.contentPanel.setHtml(new Date().toLocaleTimeString())
            },1000)
            me.add(me.contentPanel);
        }


    }
});
