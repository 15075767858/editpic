Ext.define('editpic.view.panel.SetPicPanel', {
    extend: 'Ext.grid.Panel',
    xtype: "setpicpanel",
    requires: [
        'editpic.view.panel.SetPicPanelController',
        'editpic.view.panel.SetPicPanelModel'
    ],
    width: "100%",
    controller: 'panel-setpicpanel',
    viewModel: {
        type: 'panel-setpicpanel'
    },
    id: "setpicpanel",

    initComponent: function () {
        var me = this;

        var store = Ext.data.StoreManager.lookup("picdatas")

        store.getGroups();
        console.log(store)

        me.tbar = [
            "->", {
                text: "toggle group",
                reference:"GroupMenu",
            }
        ]
        me.columns = [
            {
                text: "Name", dataIndex: "name",
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },
            {
                text: 'Img', dataIndex: 'src', width: 50, renderer: function (value) {
                //console.log(arguments)
                return "<img style='width:20px;height:20px;' src=" + value + ">";
            }
            },
            //{text: 'Width', dataIndex: 'width', flex: 1, hidden: true},
            //{text: "Height", dataIndex: 'height', flex: 1, hidden: true},
            //{text: 'X', dataIndex: 'x', flex: 1, hidden: true},
            //{text: 'Y', dataIndex: 'y', flex: 1, hidden: true},
            /*{
             text: 'Layer',
             dataIndex: 'zIndex',
             flex: 1,
             hidden: true,
             editor: {
             xtype: "numberfield",
             maxValue: 1000,
             minValue: 1,
             value: 1,
             allowBlank: false,
             allowExponential: true,
             }
             },*/
            /*{
                xtype: 'widgetcolumn',
                dataIndex: 'zIndex',
                text: "Layer",
                flex: 1,
                hidden: true,
                maxValue: "maxValue",
                renderer: function () {
                    console.log(arguments)
                },
                widget: {
                    xtype: 'sliderwidget',
                    listeners: {
                        change: function (w, value) {
                            if (w.getWidgetRecord) {
                                var record = w.getWidgetRecord();
                                document.getElementById(record.id).style.zIndex = value;
                            }
                        }
                    }
                }
            },*/
            {
                hidden: false,
                flex: 1,
                dataIndex: "Group",
                text: "Group",
                editor: {
                    xtype: "combo",
                    bind: {
                        store: "{Groups}"
                    }
                }
            },
            {
                sortable: false,
                tooltip: 'Delete',
                text: "Delete",
                xtype: 'actioncolumn',
                //icon: 'extjs-build/examples/restful/images/delete.png',
                renderer: function () {
                    return "<div style='font-family: FontAwesome;margin:7px 0 0 10px; font-size: 27px;color: blanchedalmond;' class='fa-trash-o'></div>"
                },
                width: 50,
                listeners: {
                    click: function (panel, dom, index, i, record) {
                        Ext.Msg.confirm('Delete', 'Do you want to delete this picture?',
                            function (choice) {
                                if (choice === 'yes') {
                                    record.record.data.close();
                                    Ext.data.StoreManager.lookup("picdatas").load()
                                }
                            }
                        );

                    }
                }
            }
        ],
            me.callParent();
    },

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        //hideGroupedHeader: true,
        //startCollapsed: true,
        //enableGroupingMenu:true,
        //enableNoGroups:false,
        id: 'restaurantGrouping'
    }],
    iconCls: "fa-rotate-270",
    selModel: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        listeners: {
            edit: function (editor, context, eOpts) {
                console.log(arguments)
                Ext.data.StoreManager.lookup("picdatas").load()
            }
        }
    },
    listeners: {

        itemmouseenter:"itemmouseenter",
        itemmouseleave:"itemmouseleave",
        select: "select",
    }

});
