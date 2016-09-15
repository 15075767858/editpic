/*
 * 设置单独一张图片的面板
 *
 * */
Ext.define('editpic.view.panel.SetAPicPanel', {
    extend: 'Ext.form.Panel',

    requires: [
        'editpic.view.panel.SetAPicPanelController',
        'editpic.view.panel.SetAPicPanelModel'
    ],

    controller: 'panel-setapicpanel',
    viewModel: {
        type: 'panel-setapicpanel'
    },

    title: "detail design",
    closable: true,
    border: true,
    bodyPadding: 10,
    draggable: true,
    constrain: true,
    id: "singleFormPanel",
    initComponent: function () {
        var me = this;
        var record = me.record;
        //var panel = Ext.getCmp("maindrawpanel")


        me.tools = [{
            type: 'refresh',
            handler: function () {
                var imgPanel = record.data;
                imgPanel.clearInterval();
                me.lookRGBField();
                imgPanel.refreshCanvas();
                //Ext.data.StoreManager.lookup("picdatas").load();
            }
        }];
        me.defaults = {
            listeners: {
                change: function (field, newValue, oldValue) {
                    if (field.name) {
                        var imgPanel = record.data;
                        imgPanel.setRGB(field.name, field.getValue())
                    }
                }
            }
        }


        var styleSlider = Ext.create("Ext.slider.Single", {
            xtype: 'slider',
            width: "100%",
            fieldLabel: "Style",
            minValue: -100,
            value: 0,
            maxValue: 100,
            increment: 1,
            publishOnComplete: false,
            listeners: {
                change: function (slider, newValue, thumb, eOpts) {
                    rSlider.setValue(newValue)
                    gSlider.setValue(newValue)
                    bSlider.setValue(newValue)

                    console.log(arguments)
                }
            }
        })
        var rSlider = Ext.create("Ext.slider.Single", {
            name: "r",
            fieldLabel: "Effect",
            value: 0,
            xtype: 'slider',
            minValue: -100,
            width: "100%",
            maxValue: 100
        })
        var gSlider = Ext.create("Ext.slider.Single", {
            name: "g",
            fieldLabel: "Bright",
            value: 0,
            xtype: 'slider',
            minValue: -100,
            width: "100%",
            maxValue: 100
        })
        var bSlider = Ext.create("Ext.slider.Single", {
            name: "b",
            fieldLabel: "Color",
            value: 0,
            xtype: 'slider',
            minValue: -100,
            width: "100%",
            maxValue: 100
        })
        me.lookRGBField = function () {
            return;
            var isShow = record.data.hasLinkValue()
            if (isShow) {
                rSlider.show()
                gSlider.show()
                bSlider.show()
                styleSlider.show()
            }else{
                console.log(isShow)
                console.log(rSlider)
                rSlider.hide()
                gSlider.hide()
                bSlider.hide()
                styleSlider.hide()
            }
        }
        me.lookRGBField()
        me.items = [
            {
                xtype: "checkbox",
                name: "isRelated",
                fieldLabel: "Related",
                listeners: {
                    change: "relatedCheckHandler"
                }
                //hidden:false
            },
            {name: "id", xtype: "hiddenfield", reference: "imgid"},
            //styleSlider,
            //rSlider,
            //gSlider,
            //bSlider,
            {
                name: "language", fieldLabel: "language", xtype: 'combo',
                store: ["中文", "English"]
            },
            {
                xtype: "container",
                defaults: {
                    margin: "0 4 5 0"

                },
                items: [
                    {
                        xtype: "container",
                        layout: "column",
                        items: [
                            {
                                xtype: "checkbox",
                                fieldLabel: "x",
                                width: 130,
                                handler: "checkedHandler"
                            },
                            {
                                name: "x", fieldLabel: "x", xtype: 'numberfield',
                                hideLabel: true,
                                itemId: "checkfield",
                                columnWidth: 1,
                                //flex: 1,
                                step: 10,
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        if (record.data) {
                                            record.data.mySetX(newValue)
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: "container",
                        layout: "column",
                        items: [
                            {
                                xtype: "checkbox",
                                fieldLabel: "y",
                                width: 130,
                                handler: "checkedHandler"

                            },
                            {
                                name: "y", fieldLabel: "y", xtype: 'numberfield',
                                hideLabel: true,
                                columnWidth: 1,
                                itemId: "checkfield",
                                step: 10,
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        if (record.data) {
                                            record.data.mySetY(newValue)
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    {
                        xtype: "container",
                        layout: "column",
                        items: [
                            {
                                xtype: "checkbox",
                                fieldLabel: "width",
                                width: 130,
                                handler: "checkedHandler"
                            },
                            {
                                name: "width", fieldLabel: "width", xtype: 'numberfield',
                                step: 10,
                                hideLabel: true,
                                columnWidth: 1,
                                itemId: "checkfield",
                                minValue: 1,
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        if (record.data) {
                                            record.data.setWidth(newValue)
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: "container",
                        layout: "column",
                        items: [
                            {
                                xtype: "checkbox",
                                fieldLabel: "height",
                                width: 130,
                                handler: "checkedHandler"
                            },
                            {
                                name: "height", fieldLabel: "height", xtype: 'numberfield',
                                step: 10,
                                hideLabel: true,
                                columnWidth: 1,
                                minValue: 1,
                                itemId: "checkfield",
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        if (record.data) {
                                            record.data.setHeight(newValue)
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                name: "zIndex", fieldLabel: "Layer", value: 0, minValue: 0, xtype: 'numberfield',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        if (record.data) {
                            record.data.el.dom.style.zIndex = newValue;
                        }
                    }
                }
            }
        ]

        me.callParent()
    }


});
