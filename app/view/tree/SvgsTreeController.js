Ext.define('editpic.view.tree.SvgsTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree-svgstree',
    onToggleConfig: function (menuitem) {
        var me = this;
        var tree = menuitem.up("treepanel");
        //tree.setConfig
        console.log(tree)
        tree.setConfig("singleExpand", menuitem.checked);
    },

});
