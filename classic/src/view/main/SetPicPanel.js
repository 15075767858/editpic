Ext.define('editpic.view.panel.SetPicPanel', {
    extend: 'Ext.grid.Panel',
    xtype: "setpicpanel",
    requires: [
        'editpic.view.panel.SetPicPanelController',
        'editpic.view.panel.SetPicPanelModel'
    ],
    width: "100%",
    height: "100%",
    controller: 'panel-setpicpanel',
    viewModel: {
        type: 'panel-setpicpanel'
    },

    /*store: Ext.create('Ext.data.Store', {
        storeId: 'simpsonsStore',
        fields: ['text', 'width', 'height', 'x', 'y', 'src', "zIndex","picId"],
        data: [
            {text: "11", width: "2", height: "50", x: "1", y: "2", zIndex: "1000"},
            {text: "11", width: "2", height: "50", x: "1", y: "2", zIndex: "1000"},
            {text: "11", width: "2", height: "50", x: "1", y: "2", zIndex: "1000"},
            {text: "11", width: "2", height: "50", x: "1", y: "2", zIndex: "1000"},
        ]
    }),*/
    columns: [
        {text: 'Text', dataIndex: 'text', flex: 1},
        {text: 'Width', dataIndex: 'width', flex: 1},
        {text: "Height", dataIndex: 'height', flex: 1},
        {text: 'X', dataIndex: 'x', flex: 1},
        {text: 'Y', dataIndex: 'y', flex: 1},
        {text: 'Layer', dataIndex: 'zIndex', flex: 1},
        {
            xtype: 'widgetcolumn',
            dataIndex: 'height',
            // This is the widget definition for each cell.
            // Its "value" setting is taken from the column's dataIndex
            widget: {
                xtype: 'sliderwidget',
                /*textTpl: [
                    '{percent:number("0")}% capacity'
                ]*/
            }
        }
    ],
    iconCls:"fa-rotate-270",
    selModel: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    //selType: 'checkboxmodel',

    listeners:{
        itemmouseenter:function(){
            console.log(arguments)
        },

    }

});
