/*
 * 这是绘图中心的主面板,
 * 是绘图区域
 * */
Ext.define('editpic.view.panel.PicPanel', {
    extend: 'Ext.panel.Panel',
    xtype: "picpanel",
    requires: [
        'editpic.view.panel.PicPanelController',
        'editpic.view.panel.PicPanelModel',
        'Ext.chart.CartesianChart',
        "Ext.ux.colorpick.Field",
        "editpic.store.PicDatas",
        "editpic.view.img.CanvasImg"
        //'editpic.view.window.ImgPanelMenuFormWindow',
    ],
    //plugins: ['spriteevents'],
    controller: 'panel-picpanel',
    viewModel: {
        type: 'panel-picpanel'
    },
    scrollable: true,
    constrainHeader: true,

    iconCls: "fa-mobile",
    layout: 'absolute',
    //engine: "Ext.draw.engine.Svg",
    bind: {
        height: "{height}",
        width: "{width}",
        title: "You Device {width} x {height}",

        bodyStyle: {
            background: "#{bodyColor}"
            //background:"red"
        }
    },
    //id: "maindrawpanel",

    getImages: function () {
        var me = this;
        if (!me.items) {
            return;
        }
        setTimeout(function () {
            var items = me.items.items;
            var arr = []
            for (var i = 0; i < items.length; i++) {
                if (items[i].itype == 0 || items[i].itype == 1) {
                    arr.push(items[i]);
                }
            }
            me.images = arr;
            var store = Ext.data.StoreManager.lookup("setpicpanelstore")
            store.setData(arr)
        }, 1000)
    },
    save: function () {
        var me = this;
        var arr = [];
        if (!me.items) {
            return [];
        }
        var items = me.items.items;
        for (var i = 0; i < items.length; i++) {
            console.log(items[i])
            if (!items[i]) {
                console.log('items[i]')
                continue
            }
            ;
            if (!items[i].getInitData) {
                console.log("getInitData")
                continue
            }

            var data = items[i].getInitData()
            console.log(data)
            arr.push(data);
        }
        var picpanelData = {}
        picpanelData["items"] = arr;
        picpanelData["width"] = me.getWidth();
        picpanelData["height"] = me.getHeight();
        picpanelData['bodyColor'] = me.body.getStyle("backgroundColor")
        return picpanelData;
    },
    load: function (json) {
        var me = this;
        me.body.setStyle("backgroundColor", json.bodyColor);
        var data = json.items;
        for (var i = 0; i < data.length; i++) {
            var component;
            console.log(data[i])
            if (data[i].itype == 0) {
                component = Ext.create("editpic.view.img.CanvasImg", data[i]);
                me.add(component);

                component.init(data[i]);

            }
            if (data[i].itype == 1) {
                component = Ext.create("editpic.view.img.GifImg", data[i])
                me.add(component);

                component.init(data[i]);
            }
            if (data[i].itype == 2) {
                component = Ext.create("editpic.view.img.TextFieldTool", data[i])
                me.add(component);

                component.init(data[i]);
            }
            if (data[i].itype == 3) {
                component = Ext.create("editpic.view.img.LinkTool", data[i])
                me.add(component);
                component.init(data[i])
            }
            if (data[i].itype == 4) {
                component = Ext.create("editpic.view.img.TextTool", data[i])
                me.add(component);
                component.init(data[i])
            }


        }


        me.viewModel.set("width", json.width);
        me.viewModel.set("height", json.height);


    },
    draggable: true,
    header: {
        /*
         defaults: {
         viewModel: {
         type: 'panel-picpanel'
         },
         },*/
        items: [
            {
                text: "Device",
                iconCls: "fa-cog",
                xtype: "button",

                menu: [
                    {
                        xtype: 'menucheckitem',
                        group: "resolution",
                        //iconCls: "fa-check",
                        text: "Responsive",
                        handler: "selectDeviceWH"
                    },
                    "-",
                    {
                        text: "iphone 5 320*568",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 320,
                        xheight: 568,
                        handler: "setDeviceWH"
                    },
                    {
                        text: "iphone 6 375 x 667",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 375,
                        xheight: 667,
                        handler: "setDeviceWH"
                    },
                    {
                        text: "iphone 6 Plus 414 x 736",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 414,
                        xheight: 736,
                        handler: "setDeviceWH"
                    }, {
                        text: "iPad 768 x 1024",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 768,
                        xheight: 1024,
                        handler: "setDeviceWH"
                    }, {
                        text: "Galaxy S5 360 x 640",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 360,
                        xheight: 640,
                        handler: "setDeviceWH"
                    }, {
                        text: "Nexus 5X 411 x 731",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 411,
                        xheight: 731,
                        handler: "setDeviceWH"
                    }, {
                        text: "Nexus 6P 435 x 733",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 435,
                        xheight: 733,
                        handler: "setDeviceWH"
                    },
                    {
                        text: "PC 800 x 600",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 800,
                        xheight: 600,
                        handler: "setDeviceWH"
                    },
                    {
                        text: "PC 1024 x 768",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 1024,
                        xheight: 768,
                        handler: "setDeviceWH"
                    },
                    {
                        text: "PC 1920 x 1080",
                        xtype: 'menucheckitem',
                        group: "resolution",
                        xwidth: 1920,
                        xheight: 1080,
                        handler: "setDeviceWH"
                    },
                    "-",
                    {
                        text: "Rotate",
                        //iconCls:"",
                        handler: "onRotate"
                    }
                ]
            }
        ]
    },
    tools: [
        {
            type: 'refresh',
            handler: "onRemoveAll"
        },
        {
            type: "save",
            handler: "download"
        }
    ],
    //sprites: [],


    listeners: {
        boxready: "boxready",
        add: function () {
            var me = this;
            me.getImages()
            return true
        },
        el: {
            contextmenu: function (e) {
                e.stopEvent()
                var me = this.component;
                Ext.create("Ext.menu.Menu", {
                    x: e.pageX,
                    y: e.pageY,
                    autoShow: true,
                    items: [
                        {
                            text: "paste", disabled: !me.copyImg, handler: function () {
                            if (me.copyImg) {
                                var data = me.copyImg.getInitData()
                                data.x=data.x+10
                                data.y=data.y+10
                                var img = My.createImg(data)
                                me.add(img)
                                img.init(data)
                            }
                        }
                        }
                    ]
                })
            }
        }
    }
});
