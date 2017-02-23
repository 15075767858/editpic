Ext.define('editpic.view.img.DevicesTool', {
    extend: 'editpic.view.img.BaseTool',

    layout: "absolute",
    initComponent: function () {
        var me = this;
        me.callParent();
    },

    init: function (data) {
        var me = this;
        console.log(data);
        me.device = data.device;
        me.ip = data.ip;
        me.port = data.port;
        me.callParent(arguments)
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        Ext.apply(data, {
            device: me.device
        })
        return data;
    },
    linkData: function (data) {
        var me = this;

        me.linkValue = data.linkValue;
        me.refreshCanvas();
    },
    refreshCanvas: function () {

        var me = this;

        //aliasName
        //showFilename

        if (me.device) {
            me.setHtml(me.linkValue);
        } else {
            me.setHtml("")
        }

        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                },
                //y:50,
                //height: "-50%",
                //width: "100%",
                html: me.device
            })
            me.contentPanel.setStyle("color", "red")
            me.add(me.contentPanel);
        } else {
            me.contentPanel.setHtml(me.device)
        }

        /*if(me.linkValue){
         me.setHtml(me.aliasName)
         }else{
         me.setHtml("")
         }*/

    },
    listeners: {
        el: {
            click: function () {
                var me = this.component;
                if (!me.device) {
                    return;
                }
                var types = ['AI', "AO", "AV", "BI", "BO", "BV"]
                var gridItems = [];
                for (var i = 0; i < types.length; i++) {
                    var store = My.getDevsByDevName(me.ip, me.port, me.device);
                    store.setFilters([
                        function (item) {
                            return item.data.value.substr(0, 5) == me.device + i
                        }
                    ])

                    gridItems.push({
                        title: types[i],
                        xtype: "grid",
                        border: true,
                        //split:true,
                        height: 340,
                        maxHeight: 340,
                        fields: ['name', "value", 'Present_Value'],
                        store: store,
                        autoScroll: true,
                        columns: [
                            {
                                dataIndex: "name", text: "name", flex: 3
                            }, {
                                dataIndex: "value", text: "key", flex: 1, hidden: true
                            },
                            {
                                dataIndex: "Present_Value", text: "value", flex: 1
                            }

                        ]
                    })
                }
                Ext.create("Ext.window.Window", {
                    autoShow: true,
                    title: me.device + " devices",
                    width: Ext.getBody().getWidth(),
                    height: 600,
                    //layout: "hbox",
                    layout: {
                        type: "table",
                        columns: 3,
                        tableAttrs: {
                            style: {
                                flex: 1,
                                width: "100%"
                            }
                        }
                    },
                    defaults: {
                        flex: 1,
                        margin: 3
                    },
                    autoScroll: true,
                    items: gridItems
                })
            }
        }
    }
});

