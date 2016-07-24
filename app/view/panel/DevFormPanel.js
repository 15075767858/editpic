Ext.define('editpic.view.panel.DevFormPanel', {
    extend: 'Ext.panel.Panel',
    xtype: "devformpanel",

    requires: [
        'editpic.view.panel.DevFormPanelController',
        'editpic.view.panel.DevFormPanelModel'
    ],

    controller: 'panel-devformpanel',
    viewModel: {
        type: 'panel-devformpanel'
    },

    resizable: true,
    collapsible: true,
    width: 300,
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: "form",
                bodyPadding: 10,
                defaults: {
                    width: "100%",
                    margin: "0 0 10 0"
                },
                items: [
                    {
                        xtype: "container",
                        layout: "hbox",
                        items: [
                            {
                                xtype: "textfield",
                                flex: 3,
                                reference: "ipfield",
                                value: "192.168.253.253" || window.location.hostname
                            },
                            {
                                xtype: "textfield",
                                flex: 1,
                                reference: "portfield",
                                value: "6379"
                            },
                            {
                                xtype: "button",
                                text: "link",
                                flex: 1,
                                handler: function (menu) {
                                    var ip = me.lookup("ipfield").getValue();
                                    var port = me.lookup("portfield").getValue();
                                    My.Ajax("resources/main.php?par=getdevs&ip=" + ip + "&port=" + port, function (response) {
                                        var devsfield = me.lookup("devsfield")
                                        console.log(devsfield)
                                        devsfield.show()
                                        devsfield.setStore(Ext.decode(response.responseText))
                                    })
                                }
                            }
                        ]
                    },
                    {
                        xtype: "container",
                        layout: "hbox",
                        defaults:{
                          hidden:true
                        },
                        items: [
                            {
                                xtype: "combo",
                                flex: 2,
                                itemId: "devscombo",
                                reference: "devsfield",
                                editable:false,
                                listeners: {
                                    change: function (combo,newValue,oldValue,e) {
                                        console.log(arguments)
                                        var typescombo =  me.lookup("typescombo");
                                        typescombo.show()
                                        My.Ajax("resources/main.php?par=gettypes&nodename="+newValue,function(response){
                                            typescombo.setStore(Ext.decode(response.responseText))
                                        })

                                    }
                                }
                            },
                            {
                                xtype: "combo", flex: 2,
                                reference: "typescombo",
                                editable:false,
                                listeners:{
                                    change:function(){
                                        var okbtn =  me.lookup("okbtn");
                                        okbtn.show()
                                    }
                                }
                            },
                            {

                                xtype: "button",
                                reference:"okbtn",
                                text: "ok",
                                flex: 1,
                                handler:function(){
                                    var imgGrid = Ext.getCmp("imgGrid")
                                    var record = imgGrid.getSelection()[0]
                                    if(record){
                                        var img = record.data;
                                        var devsfield = me.lookup("devsfield")
                                        var typescombo =  me.lookup("typescombo");

                                        img.linkData(devsfield.value,typescombo.value)
                                        console.log(img)
                                    }

                                }
                            },
                        ]

                    }
                ]
            }
        ]
        me.callParent()
    }
    , listeners: {
        boxready: function (panel) {
            var picpanel = Ext.create("editpic.view.panel.SetPicPanel", {
                store: "picdatas",
                id:"imgGrid",
                maxHeight: 300,
                height: 400,
                border: true,
                title: "imgs",

            })
            panel.add(picpanel)

        }
    }

});
