
Ext.define('editpic.view.main.MainPanel',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.plugin.Viewport',
        'editpic.view.main.MainPanelController',
        'editpic.view.main.MainPanelModel'
    ],

    controller: 'main-mainpanel',
    viewModel: {
        type: 'main-mainpanel'
    },
    header:{
        height:80,
        style:{
          fontSize:20
        },
        items:[
            {
                xtype:"button",
                text:"Options"
            }
        ]
    },
    title:"SmartIO",
    icon:"resources/images/SmartIO.png",
    layout:"border",
    html: 'Hello, World!!'
});
