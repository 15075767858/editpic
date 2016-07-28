
Ext.define('editpic.view.window.ImgPanelMenuFormWindow',{
    extend: 'Ext.window.Window',

    requires: [
        "Ext.window.Window",
        'editpic.view.window.ImgPanelMenuFormWindowController',
        'editpic.view.window.ImgPanelMenuFormWindowModel'
    ],

    controller: 'window-imgpanelmenuformwindow',
    viewModel: {
        type: 'window-imgpanelmenuformwindow'
    },
    width:400,
    //height:600,
    title:"Set Property",
    autoShow: true,
    layout:"auto",
    initComponent: function () {
        var me = this;

        var formPanel = Ext.create("Ext.form.Panel", {
                width: "100%",
                height: "100",
                layout:"auto",
                defaults:{
                    //anchor:"100%",
                    width:"100",
                },
                items: [
                    {
                        name: "x", fieldLabel: "x", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "y", fieldLabel: "y", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "width", fieldLabel: "width", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "height", fieldLabel: "height", xtype: 'numberfield',
                        step: 10,
                        minValue: 0

                    }
                ]
            }
        )

        me.items = formPanel;
        me.callParent();
    }
});
