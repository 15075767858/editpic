Ext.define('editpic.view.panel.SetPicPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panel-setpicpanel',
    itemmouseenter: function (grid, record, item, index, e, eOpts) {

        var img=document.getElementById(record.data.id);

        if(img){
        img.style.border = "3px solid red"
        img.style.background = "#00FF00"
        setTimeout(function(){
            img.style.border = null;
            img.style.background = null;
        },5000)
        }
    },
    itemmouseleave:function (grid, record, item, index, e, eOpts) {
        var img=document.getElementById(record.data.id);
        if(img){
        img.style.border = null;
        img.style.background = null;
        }
    },
    select: function (view, record, index, eOpts) {
        var panel = Ext.getCmp("maindrawpanel")
        var me = this.view;

        if (me.singleFormPanel) {
            me.up("panel").remove(me.singleFormPanel);
        }
        me.singleFormPanel = Ext.create("Ext.form.Panel", {
            title: "detail design",
            closable: true,
            border: true,
            //viewModel:Ext.create("editpic.view.panel.SetPicPanelModel"),
            viewModel: {
                type: 'panel-setpicpanel'
            },
            defaults: {},
            //margin: "0 0 0 10",
            bodyPadding: 10,
            draggable: true,
            constrain: true,
            //height: "100%",
            flex:1,
            tools:[{
                type: 'refresh',
                handler: function(){
                    delete record.data.r;
                    delete record.data.g;
                    delete record.data.b;
                    record.data.refreshCanvas()
                    Ext.data.StoreManager.lookup("picdatas").load()

                }
            }],

            defaultType: 'textfield',
            items: [
                {name: "id", xtype: "hiddenfield", reference: "imgid"},
                {
                    xtype: 'slider',
                    width: "100%",
                    fieldLabel: "Style",
                    minValue: -100,
                    reference: "rgbSlider",
                    dirty:true,
                    publishes:{
                        value:true
                    },
                    //bind:"{rgbSlider}",
                    value: 0,
                    maxValue: 100,
                    increment: 1,
                    publishOnComplete: false,
                    listeners: {
                        change: function (slider, newValue, thumb, eOpts) {

                            console.log(arguments)
                        }
                    }
                },
                {
                    name: "r", fieldLabel: "Effect",bind:"{rgbSlider.value}", value: 0, xtype: 'slider', minValue: -100, width: "100%",
                    maxValue: 100, listeners: {
                    change: function (field, newValue, oldValue) {
                        record.data.r = newValue
                        record.data.refreshCanvas();

                    }
                }
                },
                {
                    name: "g", fieldLabel: "Bright",bind:"{rgbSlider.value}", value: 0, xtype: 'slider', minValue: -100, width: "100%",
                    maxValue: 100, listeners: {
                    change: function (field, newValue, oldValue) {
                        record.data.g = newValue
                        record.data.refreshCanvas();

                    }
                }
                },
                {
                    name: "b", fieldLabel: "Color", bind:"{rgbSlider.value}",value: 0, xtype: 'slider', minValue: -100, width: "100%",
                    maxValue: 100, listeners: {
                    change: function (field, newValue, oldValue) {
                        record.data.b = newValue
                        record.data.refreshCanvas();

                    }
                }
                },
                {
                    name: "language", fieldLabel: "language", xtype: 'combo',
                    store:["中文","English"]
                },
                {
                    name: "x", fieldLabel: "x", xtype: 'numberfield',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            if (record.data) {
                                var value = newValue + panel.body.getX();
                                record.data.setX(value)
                            }
                        }
                    }
                },
                {
                    name: "y", fieldLabel: "y", xtype: 'numberfield',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            if (record.data) {
                                var value = newValue + panel.body.getY();
                                record.data.setY(value)
                            }
                        }
                    }
                },
                {
                    name: "width", fieldLabel: "width", xtype: 'numberfield',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            if (record.data) {
                                record.data.setWidth(newValue)
                            }
                        }
                    }
                },
                {
                    name: "height", fieldLabel: "height", xtype: 'numberfield',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            if (record.data) {
                                record.data.setHeight(newValue)
                            }
                        }
                    }
                },{
                    name: "zIndex", fieldLabel: "Layer",value:0,minValue:0, xtype: 'numberfield',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            if (record.data) {
                                record.data.el.dom.style.zIndex = newValue;
                            }
                        }
                    }
                }
            ]
        })

        function setRGBConfig(field, newValue, oldValue) {
            console.log(field)

            me.field.config1 = newValue
            me.hide()
            me.show()
        }

        me.singleFormPanel.loadRecord(record);
        var win = me.up("panel");
        win.add(me.singleFormPanel);

    }
});
