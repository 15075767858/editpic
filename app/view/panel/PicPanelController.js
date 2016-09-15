Ext.define('editpic.view.panel.PicPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panel-picpanel',

    boxready: function (panel, width, height, eOpts) {

        console.log(panel)

        if (My.getSearch()) {
            panel.header.hide();
        }
        /*panel.store = Ext.create('editpic.store.PicDatas', {
         //storeId: "picdatas",
         autoLoad: true
         })*/


        //setpicpanel


        this.PanelDropTarget = new Ext.dd.DropTarget(panel.id, {
            ddGroup: "picgroup",
            notifyEnter: function (ddSource, e, data) {

            },

            notifyDrop: function (ddSource, e, data) {
                var dragData = ddSource.dragData;

                if (dragData.itype) {
                    var tool;
                    /* var toolstr = null;
                     if (dragData.itype == 2) {
                     toolstr = "editpic.view.img.TextFieldTool"
                     /!*tool = Ext.create("editpic.view.img.TextFieldTool",
                     {
                     itype: 2,
                     x: e.event.offsetX,
                     y: e.event.offsetY,
                     width: 100,
                     height: 30
                     }
                     )*!/
                     }
                     if (dragData.itype == 3) {
                     toolstr = "editpic.view.img.LinkTool"
                     }
                     if (dragData.itype == 4) {
                     toolstr = "editpic.view.img.TextTool"
                     }
                     tool = Ext.create(toolstr,
                     {
                     itype: dragData.itype,
                     x: e.event.offsetX,
                     y: e.event.offsetY,
                     width: 100,
                     height: 30,
                     disabled: false,
                     zindex: 0
                     }
                     )*/
                    var itype=dragData.itype;
                    var zindex=0;
                    if(itype==2||itype==4){
                        zindex=20;
                    }
                    if(itype==5||itype==3){
                        zindex=15;
                    }else{
                        zindex=20;
                    }


                    tool = My.createImg({
                        itype: dragData.itype,
                        x: e.event.offsetX,
                        y: e.event.offsetY,
                        width: 100,
                        height: 100,
                        disabled: false,
                        boxShadow:"1px 1px 1px #FFFFFF",
                        zindex: zindex
                    })

                    tool.openMenu(function (data) {
                        panel.add(tool);
                        tool.init(Ext.apply(data, {itype: dragData.itype}));
                    }, function () {
                        tool.close();
                    })
                    /*Ext.create("editpic.view.window.CanvasConponmentWindow", {
                     values: tool,
                     ok: function (data) {
                     panel.add(tool);
                     tool.init(Ext.apply(data, {itype: dragData.itype}));
                     },
                     cancel: function () {
                     tool.close();
                     }
                     })*/
                }
                if (ddSource.dragData.records) {
                    var selectRecord = ddSource.dragData.records[0].data;
                    var url = selectRecord.url;

                    var data = {
                        x: e.event.offsetX,
                        y: e.event.offsetY,
                        width: 100,
                        height: 100,
                        disabled: false,
                        src: url,
                        hidden: true,
                        zindex: 2
                    };
                    //var canvasimg = Ext.create("editpic.view.img.CanvasImg", data);
                    //var gifimg = Ext.create("editpic.view.img.GifImg", data)
                    //var values = ddSource.dragData.records[0].data;
                    var selectImgWin = Ext.create("Ext.window.Window", {
                        autoShow: true,

                        title: "Image Type",
                        items: {
                            margin: 10,
                            xtype: "form",
                            items: {
                                xtype: "combo", fieldLabel: "Image Type",
                                name: "itype", allowBlank: true,
                                store: Ext.create("Ext.data.Store", {
                                    fields: ["name", "value"],
                                    data: [
                                        {name: "static Image", value: 0},
                                        {name: "Dynamic Image", value: 1}
                                    ]
                                }),
                                editable: false,
                                value: 0,
                                displayField: 'name',
                                valueField: 'value',
                                reference: "ImageType",
                                publishes: [
                                    "value"
                                ]
                            }
                        },
                        buttons: [
                            {
                                text: "OK", handler: function () {
                                var imageType = selectImgWin.down("combo").value
                                var imagePanel = null;
                                if (imageType == 0) {
                                    imagePanel = Ext.create("editpic.view.img.CanvasImg", Ext.apply(data, {itype: 0}));
                                } else if (imageType == 1) {
                                    imagePanel = Ext.create("editpic.view.img.GifImg", Ext.apply(data, {itype: 1}))
                                }

                                var win = Ext.create("editpic.view.window.CanvasConponmentWindow", {
                                    values: imagePanel,
                                    ok: function (resData) {
                                        panel.add(imagePanel);
                                        imagePanel.init(resData)
                                        selectImgWin.close()

                                    },
                                    cancel: function () {
                                        selectImgWin.close()

                                    }
                                })
                            }
                            },
                            {
                                text: "Cancel", handler: function () {
                                selectImgWin.close();
                            }
                            }
                        ]

                    })

                    /*var win = Ext.create("editpic.view.window.CanvasConponmentWindow", {
                     values: canvasimg,
                     ok: function (resData) {
                     if (resData.itype == 0) {
                     panel.add(canvasimg);
                     canvasimg.init(resData)
                     }
                     if (resData.itype == 1) {
                     panel.add(gifimg);
                     gifimg.init(resData)
                     }
                     },
                     cancel: function () {
                     if (canvasimg.hidden) {
                     canvasimg.close()
                     }
                     if (gifimg.hidden) {
                     gifimg.close()
                     }
                     }
                     })*/


                }
                //return true;
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


    download: function () {
        var me = this.view;
        var bodyColor = me.body.getStyle("backgroundColor");
        testme = me
        var items = me.getItems().items;

        var color = Ext.draw.Color.fromString(bodyColor)
        console.log(color)
        var win = Ext.create("Ext.window.Window", {
            width: me.width,
            autoShow: true,
            height: me.height,
            bodyStyle: {
                backgroundColor: "transparent"
            },
            html: "<canvas id='downcanvas'></canvas>"
        })

        var canvas = document.getElementById("downcanvas");
        canvas.width = me.width;
        canvas.height = me.height;
        var context = canvas.getContext("2d");
        context.fillStyle = bodyColor;
        context.fillRect(0, 0, canvas.width, canvas.height)
        for (var i = 0; i < items.length; i++) {
            var x = items[i].x
            var y = items[i].y
            var width = items[i].width
            var height = items[i].height
            var imgContext = items[i].el.dom.querySelector("canvas").getContext("2d")
            var imgData = imgContext.getImageData(0, 0, width, height);
            var pixeData = imgData.data;
            console.log(imgData)
            for (var j = 0; j < width * height; j++) {
                if (pixeData[j * 4 + 3] == 0) {
                    pixeData[j * 4 + 0] = color.r
                    pixeData[j * 4 + 1] = color.g
                    pixeData[j * 4 + 2] = color.b
                    pixeData[j * 4 + 3] = 255
                }
            }
            //imgData.data=pixeData
            context.putImageData(imgData, x, y, 0, 0, width, height);
        }
        saveAsLocalImage()
        win.close()
        function saveAsLocalImage() {
            var myCanvas = document.getElementById("downcanvas");
            var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            window.location.href = image; // it will save locally
        }
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
                    bind: "{width}"
                },
                {
                    xtype: 'slider',
                    width: "100%",
                    fieldLabel: "Height",
                    maxValue: 1000,
                    publishOnComplete: false,
                    minValue: 100,
                    bind: "{height}"
                },
                {
                    xtype: 'colorfield',
                    fieldLabel: 'Body Color',
                    bind: "{bodyColor}"
                    /*,
                     listeners: {
                     change: function (field, color, previousColor, eOpts) {
                     console.log(arguments)
                     //me.setBodyStyle("background", "#" + color)
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

