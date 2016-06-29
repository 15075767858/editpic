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

    store: Ext.create('Ext.data.Store', {
        storeId: 'simpsonsStore',
        fields: ['text', 'width', 'height', 'x', 'y', 'src', "zIndex","picId"],
        data: [
            {text: "11", width: "2", height: "3", x: "1", y: "2", zIndex: "1000"},
            {text: "11", width: "2", height: "3", x: "1", y: "2", zIndex: "1000"},
            {text: "11", width: "2", height: "3", x: "1", y: "2", zIndex: "1000"},
            {text: "11", width: "2", height: "3", x: "1", y: "2", zIndex: "1000"},
        ]
    }),
    columns: [
        {text: 'Text', dataIndex: 'text', flex: 1},
        {text: 'Width', dataIndex: 'width', flex: 1},
        {text: "Height", dataIndex: 'height', flex: 1},
        {text: 'X', dataIndex: 'x', flex: 1},
        {text: 'Y', dataIndex: 'y', flex: 1},
        {text: 'Layer', dataIndex: 'zIndex', flex: 1}
    ],
    selModel: {
        type: 'spreadsheet',
        // Disables sorting by header click, though it will be still available via menu
        //columnSelect: true,
        checkboxSelect: true,
        //pruneRemoved: false,
        //extensible: 'y'
    },
    listeners:{
        itemmouseenter:function(){
            console.log(arguments)
        },

    }

});
