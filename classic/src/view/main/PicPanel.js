Ext.define('editpic.view.panel.PicPanel', {
    extend: 'Ext.draw.Container',
    xtype: "picpanel",
    requires: [
        'editpic.view.panel.PicPanelController',
        'editpic.view.panel.PicPanelModel',
        'Ext.chart.CartesianChart',
        "Ext.ux.colorpick.Field",
        "editpic.store.PicDatas"
    ],
    //plugins: ['spriteevents'],
    controller: 'panel-picpanel',
    viewModel: {
        type: 'panel-picpanel'
    },
    scrollable: true,
    constrainHeader: true,

    iconCls: "fa-mobile",
    layout: 'absolute',
    //engine: "Ext.draw.engine.Svg",
    bind: {
        height: "{height}",
        width: "{width}",
        title: "You Device {width} x {height}",

        bodyStyle: {
            background:"#{bodyColor}"
            //background:"red"
        },
    },
    id: "testdraw",
    draggable: true,
    header: {
        /*
         defaults: {
         viewModel: {
         type: 'panel-picpanel'
         },
         },*/
        items: [
            {
                text: "Device",
                iconCls: "fa-cog",
                xtype: "button",

                menu: [
                    {
                        xtype: 'menucheckitem',
                        group:"resolution",
                        //iconCls: "fa-check",
                        text: "Responsive",
                        handler: "selectDeviceWH"
                    },
                    "-",
                    {
                        text: "iphone 5 320*568",
                        xtype: 'menucheckitem',
                        group:"resolution",
                        xwidth: 320,
                        xheight: 568,
                        handler: "setDeviceWH"
                    },
                    {
                        text: "iphone 6 375 x 667",
                        xtype: 'menucheckitem',
                        group:"resolution",
                        xwidth: 375,
                        xheight: 667,
                        handler: "setDeviceWH"
                    },
                    {
                        text: "iphone 6 Plus 414 x 736",
                        xtype: 'menucheckitem',
                        group:"resolution",
                        xwidth: 414,
                        xheight: 736,
                        handler: "setDeviceWH"
                    }, {
                        text: "iPad 768 x 1024",
                        xtype: 'menucheckitem',
                        group:"resolution",
                        xwidth: 768,
                        xheight: 1024,
                        handler: "setDeviceWH"
                    }, {
                        text: "Galaxy S5 360 x 640",
                        xtype: 'menucheckitem',
                        group:"resolution",
                        xwidth: 360,
                        xheight: 640,
                        handler: "setDeviceWH"
                    }, {
                        text: "Nexus 5X 411 x 731",
                        xtype: 'menucheckitem',
                        group:"resolution",
                        xwidth: 411,
                        xheight: 731,
                        handler: "setDeviceWH"
                    }, {
                        text: "Nexus 6P 435 x 733",
                        xtype: 'menucheckitem',
                        group:"resolution",
                        xwidth: 435,
                        xheight: 733,
                        handler: "setDeviceWH"
                    },
                    "-",
                    {
                        text: "Rotate",
                        //iconCls:"",
                        handler: "onRotate"
                    }
                ]
            }
        ]
    },
    tools: [
        {
            //iconCls: 'fa-undo'
            type: 'refresh',
            handler: "onRemoveAll"
        }/*,
        {
            type: "plus",

        },*/
    ],
    //sprites: [],


    listeners: {
        boxready: "boxready",
    },
});
