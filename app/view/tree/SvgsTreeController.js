Ext.define('editpic.view.tree.SvgsTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree-svgstree',
    onToggleConfig: function (menuitem) {
        var me = this;
        var tree = menuitem.up("treepanel").view;
        console.log(tree)
        tree.setConfig(menuitem.config, menuitem.checked);
    }
});
