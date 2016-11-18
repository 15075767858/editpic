Ext.define('editpic.view.tree.SvgsTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree-svgstree',
    onToggleConfig: function (menuitem) {
        var me = this;
        var tree = menuitem.up("treepanel").view;
        //console.log(tree)
        tree.setConfig(menuitem.config, menuitem.checked);
    },

    itemmouseenter: function (treeitem, record, item, index, e, eOpts) {
        console.log(arguments)
        console.log(record.data.url)

        var me = this;
        if (me.tip) {
            me.tip.close()
        }

        if (record.data.leaf) {
            var img = new Image();
            img.src = record.data.url;
            img.onload = function () {
                /*Ext.tip.QuickTipManager.register({
                 target: treeitem.id, // Target button's ID
                 hideDelay: 1,
                 showDelay: 1,
                 trackMouse: true,
                 title: record.data.text,  // QuickTip Header
                 text: img.outerHTML // Tip content
                 });*/

                /*My.singleToolTip(treeitem.id, [
                    "<div>" + record.data.text + "</div>",
                    "<div>" + img.outerHTML + "</div>"
                ].join(""), e)*/

                My.singleToolTip.getTip(treeitem.id, [
                    "<div>" + record.data.text + "</div>",
                    "<div>" + img.outerHTML + "</div>"
                ].join(""), e)
            }

        }
    },

    beforedrop: function (node, data, overModel, dropPosition, dropHandlers) {
        // Defer the handling
        dropHandlers.wait = true;
        Ext.MessageBox.confirm('Drop', 'Are you sure', function (btn) {
            if (btn === 'yes') {
                dropHandlers.processDrop();
            } else {
                dropHandlers.cancelDrop();
            }
        });
    }
});

/*
My.singleToolTip = function (id, content, e) {

    var tip  = Ext.create("Ext.tip.ToolTip", {
        target: id,
        autoShow: true,
        hideDelay: 1,
        html: content
    })
    tip.setXY([e.pageX, e.pageY])

}
*/

Ext.onReady(function(){

My.singleToolTip={
    tip: Ext.create("Ext.tip.ToolTip", {
        autoShow: true,
        hideDelay: 1
    }),
    getTip:function(id,content,e){
       var me=this;
        me.tip.setConfig("html",content);
        me.tip.setConfig("target",id)
        me.tip.setXY([e.pageX, e.pageY]);
    }
}
})