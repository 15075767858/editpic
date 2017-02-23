/*
 * 这是绘图中心的主面板,
 * 是绘图区域
 * */

/*var a = {x:100,y:100,width:100,height:100}
 var b = {x:101,y:101,width:99,height:99}
 isCollsionRect(a,b)
 function isCollsionRect(mR,oR){

 if(mR.x<oR.x&mR.width>oR.width&mR.height>oR.height){

 return true;

 }else{

 return false;

 }

 }*/
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
    bodyCls:"disableSelect",
    collapsible: true,
    resizable: true,
    scrollable: true,
    constrainHeader: false,
    constrain: false,
    renderTo: Ext.getBody(),
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
    getSubscribeItems: function () {
        var me = this;
        var items = me.items.items;
        var arr = [];
        for (var i = 0; i < items.length; i++) {
            if (My.initComponentConfig.isLinkData(items[i])) {
                arr.push(items[i])
            }
        }
        return arr;
    },
    initComponent: function () {
        var me = this;
        me.initMenusWindow()

        me.listeners = {
            boxready:function(panel){
                console.log(panel)
                var dom = panel.el.dom;
                //dom.onclick=My.stopEventAndPro;
                //dom.onselect=My.stopEventAndPro;
                //dom.onmousedown=stopEventAndPro;


            },
            el: {
                mousedown: function (e, target, oP) {
                    My.stopEventAndPro(e)
                    //console.log(e)
                    var dom = this.component.up().body.el.dom


                    var st = dom.scrollTop;
                    var sl = dom.scrollLeft;
                    var offsetXY = this.getOffsetsTo( this.component.up())
                    //console.log(offsetXY)
                    //b.getOffsetsTo(Ext.getBody())
                    My.pageX=-offsetXY[0];
                    My.pageY=-offsetXY[1];
                    me.unSelect()
                    if (me.body.getTop() > e.pageY) {
                        return;
                    }
                    me.selectPanel = Ext.create("Ext.panel.Panel", {
                        bodyStyle: {
                            //backgroundColor: "red"
                            backgroundColor: "transparent"
                        },
                        border: true,
                        id: "selectPanel",
                        x: e.pageX - me.body.getLeft(),
                        y: e.pageY - me.body.getTop(),
                        width: 1,
                        height: 1
                    })
                    me.add(me.selectPanel)
                    document.onmousemove = function (moveEven) {
                        var dX = e.pageX, dY = e.pageY, mX = moveEven.pageX, mY = moveEven.pageY;
                        var selectWidth = Math.abs(dX - mX);
                        var selectHeight = Math.abs(dY - mY);
                        me.selectPanel.setWidth(selectWidth);
                        me.selectPanel.setHeight(selectHeight);

                        if (dX > mX & dY > mY) {
                            me.selectPanel.setX(moveEven.pageX)
                            me.selectPanel.setY(moveEven.pageY)
                            me.selectPanel.x = moveEven.pageX - me.body.getLeft();
                            me.selectPanel.y = moveEven.pageY - me.body.getTop();
                        }
                        if (dX > mX & dY < mY) {
                            me.selectPanel.setX(moveEven.pageX)
                            me.selectPanel.x = moveEven.pageX - me.body.getLeft();

                        }
                        if (dX < mX & dY > mY) {
                            me.selectPanel.setY(moveEven.pageY)
                            me.selectPanel.y = moveEven.pageY - me.body.getTop();
                        }


                    }

                    document.onmouseup = function () {
                        me.selectPanel.close()
                        me.selectComponent(function () {
                            me.showFlowMenu()
                        })
                        document.onmousemove = null;
                        document.onmouseup = null;
                        /*setTimeout(function () {
                            dom.scrollTop = st
                            dom.scrollLeft = sl
                        }, 1)*/
                    }
                },
            }
        }
        me.callParent();
    },
    selectComponent: function (callback) {
        var me = this;
        var data = me.selectPanel;
        console.log(data)
        var x = data.x, y = data.y, width = data.width, height = data.height;
        if (!me.items) {
            return;
        }

        me.items.each(function (items, index, length) {
            var me = this;
            if (items.selectStyle) {
                var isCollsion = isCollsionRect(me.selectPanel, items)
                if (isCollsion) {
                    items.selectStyle(true);
                }
            }
        }, me)

        me.textfield = me.createMoveField(
            function (field, e) {
                me.items.each(function (item, index, length) {
                    if (!!item.moveController & item.isselect) {
                        item.moveController(e)
                    }
                }, me)
            },
            function () {
                //me.unSelect()
            }
        )
        callback()
        function isCollsionRect(mR, oR) {
            var mRwidth = mR.x + mR.width;
            var mRheight = mR.y + mR.height;
            var oRwidth = oR.x + oR.width;
            var oRheight = oR.y + oR.height;
            //console.log(mR.x < oR.x & mR.y < oR.y & mR.width > oR.width & mR.height > oR.height)
            if (mR.x < oR.x & mR.y < oR.y & mRwidth > oRwidth & mRheight > oRheight) {
                return true;
            } else {
                return false;
            }
        }
    },
    unSelect: function () {
        var me = this;
        if (me.selectPanel) {
            me.remove(me.selectPanel)
            delete me.selectPanel
        }
        if (me.textfield) {
            me.textfield.up().remove(me.textfield)
            //me.remove(me.textfield);
            delete me.textfield
        }
        me.items.each(function (item, index, length) {
            if (item.selectStyle) {
                item.selectStyle(false)
            }
        })
    },
    getSelectItems: function () {
        var me = this;
        var items = me.items.items;
        var arr = [];
        for (var i = 0; i < items.length; i++) {
//            console.log(items[i])
            if (items[i].isselect) {
                arr.push(items[i]);
            }
        }
        return arr;
    },
    showFlowMenu: function () {
        var me = this;
        var items = me.getSelectItems();
        if (!me.menuWindow) {
            return
        }
        if (items.length < 2) {
            me.menuWindow.hide();
            return;
        } else {
            me.menuWindow.show();
        }
    },
    initMenusWindow: function () {
        var me = this;
        me.menuWindow = Ext.create("Ext.window.Window", {
            hideMode: "offsets",
            title: "tools",
            width: 140,
            height: 75,
            listeners: {
                boxready: function () {
                    console.log("boxready")
                    //console.log(me.show())
                    me.textfield.setValue('asd')
                },
                show: function () {
                    console.log("show")
                    me.textfield.focus();
                    setTimeout(function () {
                        me.textfield.focus();
                    })
                },
                beforeclose: function () {
                    console.log("close")
                    me.menuWindow.hide()
                    me.textfield.focus();
                    return false;
                }
            },
            tbar: [
                {
                    icon: 'resources/icons/copy_24px.png',
                    tooltip: "copy",
                    handler: function () {
                        var items = me.getSelectItems()
                        for (var i = 0; i < items.length; i++) {
                             me.copyImg = items[i];
                            var img =  me.pasteImg();
                            img.selectStyle(true)
                            items[i].selectStyle(false)
                        }
                        me.menuWindow.close();
                        me.textfield.focus()
                        setTimeout(function(){
                            me.textfield.focus()
                        },1000)

                    }
                },
                {
                    icon: 'resources/icons/left_alignment_16px.png', tooltip: "left alignment",
                    handler: function () {
                        var items = me.getSelectItems()
                        items.sort(function (a, b) {
                            return a.x - b.x
                        })
                        for (var i = 0; i < items.length; i++) {
                            items[i].mySetX(items[0].x)
                        }

                    }
                },
                {
                    icon: 'resources/icons/top_alignment_16px.png', tooltip: "top alignment",
                    handler: function () {
                        var items = me.getSelectItems()
                        items.sort(function (a, b) {
                            return a.y - b.y
                        })
                        for (var i = 0; i < items.length; i++) {
                            items[i].mySetY(items[0].y)
                        }
                    }
                },
                {
                    icon: 'resources/icons/close_16px.png', tooltip: "delete", handler: function (btn) {
                    Ext.MessageBox.show({
                        title: 'Delete Images',
                        msg: 'Would you delete images ?',
                        buttons: Ext.MessageBox.YESNOCANCEL,
                        scope: this,
                        fn: function (ms) {
                            console.log(arguments)

                            if (ms == 'yes') {
                                var items = me.getSelectItems();
                                for (var i = 0; i < items.length; i++) {
                                    me.remove(items[i])
                                }
                            }
                        },
                        animateTarget: btn,
                        icon: Ext.MessageBox.QUESTION,
                    });

                }
                }
            ]
        })
    },
    createMoveField: function (focusFn, leaveFn) {
        var me = this;
        var textfield = Ext.create("Ext.form.field.Text", {
            hidden: false,
            width: 1,
            height: 1,
            x:My.pageX,
            y:My.pageY,
            listeners: {
                specialkey: focusFn,
                focusleave: leaveFn || function () {
                    me.selectStyle(false)
                    textfield.up().remove(textfield)
                }
            }
        })

        me.add(textfield)
        textfield.setZIndex(-1)

        textfield.focus()
        textfield.focus()
        return textfield;
    },
    getImages: function () {
        var me = this;

        setTimeout(function () {
            if (!me.items) {
                return;
            }
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
    save: function (text) {
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


        this.setTitle(text)
        My.savePicPanelData(text, Ext.encode(picpanelData));
        //return picpanelData;


    },
    refreshPanel: function () {
        var me = this;
        setTimeout(function () {

            var width = me.getWidth()
            me.setWidth(width + 1)
            me.setWidth(width)
        }, 1000)

    },
    load: function (json) {

        var start = new Date().getTime();
        console.log(json)

        var me = this;
        console.log(me.body)
        //me.load(json);

        /*if(!me.body){
            setTimeout(function(){
            },1000)
            return;
        }*/
        me.body.setStyle("backgroundColor", json.bodyColor);
        var data = json.items;
        var bufferContainer = Ext.create("Ext.panel.Panel", {
            hidden: true
        })
        for (var i = 0; i < data.length; i++) {
            var img = My.createImg(data[i])
            img.bufferDatas = data[i];
            bufferContainer.add(img);
        }
        me.add(bufferContainer.items.items);
        var items = me.items.items;
        for (var i = 0; i < items.length; i++) {
            items[i].init(items[i].bufferDatas)
        }
        console.log("Open Info", "打开成功" + data.length + "个图片 耗时" + (new Date().getTime() - start) + "ms");
        me.viewModel.set("width", json.width);
        me.viewModel.set("height", json.height);
        My.initLinkValue()
        me.refreshPanel()
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
                    /*{
                     text: "PC 1920 x 1080",
                     xtype: 'menucheckitem',
                     group: "resolution",
                     xwidth: 1920,
                     xheight: 1080,
                     handler: "setDeviceWH"
                     },*/
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
        }, {
            type: "left",
            bind: {
                disabled: "{!removeStack.length}",
            },
            handler: function () {
                var me = this.up('panel');

                me.removeStackPop();

            }
        }
    ],
    removeStackPush: function (img) {
        var me = this;
        var removeStack = me.viewModel.data.removeStack;
        var img = me.remove(img);
        removeStack.push(img);
        me.viewModel.set("removeStack", removeStack.concat([]));
    },
    removeStackPop: function () {
        var me = this;
        var removeStack = me.viewModel.data.removeStack;
        var img = removeStack.pop();
        var newImg = My.createImg(img.getInitData())

        me.add(newImg);
        me.viewModel.set("removeStack", removeStack.concat([]));
    },
    //sprites: [],
    pasteImg: function () {
        var me = this;
        if (me.copyImg) {
            var data = me.copyImg.getInitData()
            data.x = data.x + 10
            data.y = data.y + 10
            var img = My.createImg(data)
            me.add(img)
            img.init(data)
            return img;
        }
    },
    listeners: {
        boxready: "boxready",
        add: function () {
            var me = this;
            me.getImages()
            return true
        },
        el: {

            contextmenu: function (e) {
                e.stopEvent();
                var me = this.component;
                Ext.create("Ext.menu.Menu", {
                    x: e.pageX,
                    y: e.pageY,
                    autoShow: true,
                    items: [
                        {
                            text: "paste", disabled: !me.copyImg, handler: function () {
                            me.pasteImg();
                            /*
                             if (me.copyImg) {
                             var data = me.copyImg.getInitData()
                             data.x = data.x + 10
                             data.y = data.y + 10
                             var img = My.createImg(data)
                             me.add(img)
                             img.init(data)
                             }*/
                        }
                        }
                    ]
                })
            }
        }
    }
});
