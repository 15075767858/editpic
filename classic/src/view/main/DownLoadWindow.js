
Ext.define('editpic.view.window.DownLoadWindow',{
    extend: 'Ext.window.Window',

    requires: [
        'editpic.view.window.DownLoadWindowController',
        'editpic.view.window.DownLoadWindowModel'
    ],

    controller: 'window-downloadwindow',
    viewModel: {
        type: 'window-downloadwindow'
    },
    initComponent:function(){
        var me=this;
        Ext.create("Ext.grid.Panel",{

        })

        me.callParent();
    }
});
