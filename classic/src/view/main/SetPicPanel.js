


/*
* 这是右边 的图片列表 点击可以加载详细的图片信息
* */
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
    //id: "setpicpanel",
    maxHeight: 300,
    height: 400,
    border: true,
    title: "imgs",
    store: "picdatas",

    initComponent: function () {
        var me = this;

        var store = Ext.data.StoreManager.lookup("picdatas")

        store.getGroups();
        console.log(store)

        me.tbar = [
            "->", {
                text: "toggle group",
                reference: "GroupMenu",
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
                flex:1,
                xtype: 'actioncolumn',
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
        itemmouseenter: "itemmouseenter",
        itemmouseleave: "itemmouseleave",
        select: "select"
    }

});
