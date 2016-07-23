Ext.define('editpic.view.panel.PicPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panel-picpanel',

    boxready: function (panel, width, height, eOpts) {


        Ext.create('editpic.store.PicDatas', {
            storeId: "picdatas",
            autoLoad: true,
            data: panel.items.items
        })

        this.PanelDropTarget = new Ext.dd.DropTarget(panel.id, {
            ddGroup: "picgroup",
            notifyEnter: function (ddSource, e, data) {
                console.log(arguments)
            },
            notifyDrop: function (ddSource, e, data) {
                var selectRecord = ddSource.dragData.records[0].data;
                var url = selectRecord.url;
                console.log(arguments)
                var imgWidth = 100;
                var imgHeight = 100;


                var canvasimg = Ext.create("editpic.view.img.CanvasImg", {
                    x: e.event.offsetX,
                    y: e.event.offsetY,
                    Group: "temp",
                    plugins: ['spriteevents'],
                    width: imgWidth,
                    height: imgHeight,
                    src: url
                });

                panel.add(canvasimg);

                Ext.data.StoreManager.lookup("picdatas").load()


                return true;
            }
        })


       /* Ext.create('Ext.window.Window', {
            width: 330,
            height: 400,
            x: 600,
            y: 300,
            bodyPadding: 10,
            title: "&nbsp;&nbsp;&nbsp;&nbsp;Set Imgs",
            iconCls: "fa-cog",
            collapsible: true,
            layout: "hbox",
            closable: false,
            defaults: {
                flex: 1,
                frame: true
            },
            items: [
                Ext.create("editpic.view.panel.SetPicPanel", {
                    store: "picdatas",

                    height: "100%",
                    border: true,
                    title: "imgs",
                })
            ],
            autoShow: true,
            listeners: {
                collapse: function (th, eOpts) {
                    th.setPagePosition(0, 0, true)
                    console.log(arguments)
                },
                add: function (win) {
                    console.log(arguments)
                    if (!win.items) {
                        return;
                    }
                    if (win.items.items.length > 1)
                        win.setWidth(660)
                },
                remove: function (win) {
                    if (win.items.items.length == 1)
                        win.setWidth(330)
                }
            }
        })*/
    },


    maxIndex: function () {
        console.log(arguments)
        console.log(this)
        return 1000;
    },
    onRemoveAll: function () {

        var me = this.view;
        console.log(arguments)
        console.log(this)
        Ext.Msg.confirm('Clear Canvas', 'Do you want to clean up the canvas?',
            function (choice) {
                if (choice === 'yes') {
                    me.removeAll();
                }
            }
        );
    },
    setDeviceWH: function (menu) {
        console.log(arguments)
        var me = this.view;
        me.viewModel.set("width", menu.xwidth);
        me.viewModel.set("height", menu.xheight);
        //menu.setConfig("iconCls","fa-check")
        menu.iconCls = "fa-check";

    },
    selectDeviceWH: function () {

        console.log(this)
        var me = this.view//.up("picpanel");
        if (me.win) {
            me.win.show()
            return;
        }
        var win = Ext.create("Ext.window.Window", {
            autoShow: true,
            viewModel: me.viewModel,
            title: "Set Device Pixel",
            width: 1000,
            items: [
                {
                    xtype: 'slider',
                    width: "100%",
                    fieldLabel: "Width",
                    maxValue: 2000,
                    publishOnComplete: false,
                    minValue: 100,
                    bind: "{width}",
                },
                {
                    xtype: 'slider',
                    width: "100%",

                    fieldLabel: "Height",
                    maxValue: 1200,
                    publishOnComplete: false,
                    minValue: 100,
                    bind: "{height}",
                },
                {
                    xtype: 'colorfield',
                    fieldLabel: 'Body Color',
                    bind: "{bodyColor}",
                    /*listeners:{
                     change:function(field , color , previousColor , eOpts){
                     console.log(arguments)
                     me.setBodyStyle("background","#"+color)
                     }
                     }*/
                }
            ],
            listeners: {
                beforeclose: function (th) {
                    win.hide()
                    return false
                }
            }
        })
        me.win = win;
    },
    onRotate: function (menu) {
        var me = this.view//.up("picpanel");
        var width = me.viewModel.get("width");
        var height = me.viewModel.get("height");
        me.viewModel.set("width", height);
        me.viewModel.set("height", width);
    }


});
/*var surface = panel.getSurface();
 var img = Ext.create("Ext.draw.sprite.Image",{
 fillStyle: '#79BB3F',
 x: e.pageX-marginLeft-imgWidth/2,
 y: e.pageY-marginTop-imgHeight/2,
 src:selectRecord.url,
 height:imgWidth,
 width:imgHeight
 })
 console.log(img)
 surface.add(img)
 surface.renderFrame();*/

