
Ext.define('editpic.view.img.TimeTool',{
    extend: 'editpic.view.img.BaseTool',

    layout: "absolute",

    refreshCanvas: function () {
        console.log("clock refreshCanvas")
        var me = this;

        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                },
                html: new Date().toLocaleDateString()
            })
            setInterval(function(){
                me.contentPanel.setHtml(new Date().toLocaleDateString())
            },60000)
            me.add(me.contentPanel);
        }
    }
});
