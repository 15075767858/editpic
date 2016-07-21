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

                /*  var img = Ext.create('Ext.Img', {
                 src: url,
                 width: imgWidth,
                 height: imgHeight,


                 x: e.event.offsetX,
                 y: e.event.offsetY,
                 draggable: true,
                 text: selectRecord.text,
                 //liveDrag:true,
                 //resizable: true,
                 //zIndex: 1000,
                 listeners: {
                 move: function (pic, pX, pY) {

                 Ext.data.StoreManager.lookup("picdatas").load()
                 },
                 resize: function () {
                 Ext.data.StoreManager.lookup("picdatas").load()

                 }
                 }
                 })

                 panel.add(img)
                 */

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

                /*var imgEl = img.el;
                 imgEl.el.dom.style.zIndex = 1;
                 imgEl.on({
                 click: function (e, t, eOpts) {
                 //console.log(arguments)
                 //t.style.zIndex = panel.maxIndex += 1;
                 },
                 mousemove: function (e, t, eOpts) {
                 //console.log(e)
                 var x = img.getX() - panel.body.getX();
                 var y = img.getY() - panel.body.getY();
                 var _me = this;
                 var text = [
                 "<div>width:" + img.width + "</div>",
                 "<div>height:" + img.height + "</div>",
                 "<div>left:" + x + "</div>",
                 "<div>top:" + y + "</div>"
                 ].join("")

                 Ext.tip.QuickTipManager.register({
                 target: t.id, // Target button's ID
                 hideDelay: 0,
                 showDelay: 1,
                 trackMouse: true,
                 dismissDelay: 10000,
                 title: selectRecord.text,  // QuickTip Header
                 text: text
                 });

                 },

                 mouseup: function (e, t, eOpts) {
                 var resizeDom = t.parentNode;


                 var x = img.getX() - panel.body.getX();
                 var y = img.getY() - panel.body.getY();
                 resizeDom.style.left = x + "px"
                 resizeDom.style.top = y + "px"
                 //resizeDom.setXY(100,100)
                 img.setPosition([0, 0])
                 console.log(img.getPosition(true));

                 }
                 })*/

                return true;
            }
        })

        /*  var singleFormPanel = Ext.create("Ext.form.Panel", {
         height: 300,
         width: "100%",
         title: "img setting",
         border: true,
         defaults: {},
         bodyPadding: 10,
         defaultType: 'textfield',
         items: [
         {name: "id", xtype: "hiddenfield", reference: "imgid"},
         {name: "Effect", fieldLabel: "Effect", xtype: 'colorfield'},
         {
         xtype: 'slider',
         width: "100%",
         fieldLabel: "变色",
         minValue: 0,
         maxValue: 100,
         increment: 1,
         publishOnComplete: false,
         listeners:{
         change:function(slider,newValue,thumb,eOpts){
         console.log(arguments)

         }
         }
         //bind: "{width}",
         },
         {name: "Bright", fieldLabel: "Bright", xtype: 'colorfield'},
         {name: "Color", fieldLabel: "Color", xtype: 'colorfield'},
         {name: "language", fieldLabel: "language", xtype: 'combo'},
         {
         name: "x", fieldLabel: "x", xtype: 'numberfield',
         listeners: {
         change: function (field, newValue, oldValue) {
         if (singleFormPanel.imgview) {
         var value = newValue + panel.body.getX();
         singleFormPanel.imgview.setX(value)
         }
         }
         }
         },
         {
         name: "y", fieldLabel: "y", xtype: 'numberfield',
         listeners: {
         change: function (field, newValue, oldValue) {
         if (singleFormPanel.imgview) {
         var value = newValue + panel.body.getY();
         singleFormPanel.imgview.setY(value)
         }
         }
         }
         },
         {
         name: "width", fieldLabel: "width", xtype: 'numberfield',
         listeners: {
         change: function (field, newValue, oldValue) {
         if (singleFormPanel.imgview) {
         singleFormPanel.imgview.setWidth(newValue)
         }
         }
         }
         },
         {
         name: "height", fieldLabel: "height", xtype: 'numberfield',
         listeners: {
         change: function (field, newValue, oldValue) {
         if (singleFormPanel.imgview) {
         singleFormPanel.imgview.setHeight(newValue)
         }
         }
         }
         }
         ]
         })*/

        Ext.create('Ext.window.Window', {
            width: 330,
            height: 400,
            x: 0,
            y: 0,
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
        })
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

