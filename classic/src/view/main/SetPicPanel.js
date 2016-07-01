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
        {text: 'Img', dataIndex: 'src', flex: 1,renderer:function(value){
            console.log(arguments)
            return "<img style='width:20px;height:20px;' src="+value+">";
        }},
        {text: 'Width', dataIndex: 'width', flex: 1,hidden:true},
        {text: "Height", dataIndex: 'height', flex: 1,hidden:true},
        {text: 'X', dataIndex: 'x', flex: 1,hidden:true},
        {text: 'Y', dataIndex: 'y', flex: 1,hidden:true},
        {text: 'Layer', dataIndex: 'zIndex', flex: 1},
        {
            xtype: 'widgetcolumn',
            dataIndex: 'height',
            maxValue:"maxValue",
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
        itemmouseenter:function(grid , record , item , index , e , eOpts){
            document.getElementById(record.data.id).style.border="3px solid red"
            document.getElementById(record.data.id).style.background="#00FF00"
        },
        itemmouseleave:function(grid , record , item , index , e , eOpts){
            document.getElementById(record.data.id).style.border=null;
            document.getElementById(record.data.id).style.background=null;

        }

    }

});
