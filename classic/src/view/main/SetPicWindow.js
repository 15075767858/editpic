
Ext.define('editpic.view.window.SetPicWindow',{
    extend: 'Ext.window.Widnow',

    xtype:"editpic.setpicwindow",
    requires: [
        'editpic.view.window.SetPicWindowController',
        'editpic.view.window.SetPicWindowModel'
    ],
    width:200,
    height:500,
    autoShow:true,

    controller: 'window-setpicwindow',
    viewModel: {
        type: 'window-setpicwindow'
    },

    html: 'Hello, World!!'
});
