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
        if(record.data.leaf){
            Ext.tip.QuickTipManager.register({
                target: treeitem.id, // Target button's ID
                hideDelay:0,
                trackMouse: true,
                title : record.data.text,  // QuickTip Header
                text  : "<img src='"+record.data.url+"'>" // Tip content
            });
        }
    }
});
