Ext.define('editpic.view.tree.SvgsTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree-svgstree',
    onToggleConfig: function (menuitem) {
        var me = this;
        var tree = menuitem.up("treepanel").view;
        console.log(tree)
        tree.setConfig(menuitem.config, menuitem.checked);
    },

    itemmouseenter:function(treeitem , record , item , index , e , eOpts){
      //  console.log(arguments)
        console.log(record.data.url)
        if(record.data.leaf){
            var img = new Image();
            img.src=record.data.url;

                Ext.tip.QuickTipManager.register({
                    target: treeitem.id, // Target button's ID
                    hideDelay:1,
                    showDelay: 1,
                    trackMouse: true,
                    title : record.data.text,  // QuickTip Header
                    text  : img.outerHTML // Tip content
                });


        }
    }
});
