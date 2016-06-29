Ext.define('editpic.view.panel.PicPanel', {
    extend: 'Ext.draw.Container',
    xtype: "picpanel",
    requires: [
        'editpic.view.panel.PicPanelController',
        'editpic.view.panel.PicPanelModel',
        'Ext.chart.CartesianChart',

    ],
    //plugins: ['spriteevents'],
    controller: 'panel-picpanel',
    viewModel: {
        type: 'panel-picpanel'
    },
    scrollable: true,
    bodyStyle: {
        //background:"rgba(0,0,0,0)"
    },
    layout: 'absolute',
    width: "100%",
    //engine: "Ext.draw.engine.Svg",
    //width: 650,
    id: "testdraw",
    maxIndex: 1,
    header: {
        title: "You Device",
        dock:"bottom",
        items: [
            {
                text:"Device",
                xtype:"button",
                menu:[
                    {
                        text:"Responsive",
                        handler:""
                    },
                    {
                        text:"iphone6s"

                    }
                ]
            },
            {
                xtype: "button",
                text: "Clear",
                handler: "onRemoveAll"
            }
        ]
    },

    sprites: [

    ],

    listeners: {
        boxready: "boxready",
    },
    defaults: {

    }
});
