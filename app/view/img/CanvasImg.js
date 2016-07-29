/*
 * 主绘图区的单个图片
 * */
Ext.define('editpic.view.img.CanvasImg', {
    extend: 'Ext.draw.Container',
    xtype: "canvasimg",
    requires: [
        'editpic.view.img.CanvasImgController',
        'editpic.view.img.CanvasImgModel',
        'Ext.draw.plugin.SpriteEvents'
    ],
    draggable: true,
    resizable: true,
    controller: 'img-canvasimg',
    viewModel: {
        type: 'img-canvasimg'
    },
    plugins: 'spriteevents',
    Group: "temp",
    isRelated: true,
    initComponent: function () {
        var me = this;
        me.datas = {};
        me.datas.linkRGBTrue = {};
        me.datas.linkRGBFalse = {};

        me.callParent();

    },
    init: function (data) {

        var me = this;
        me.show()
        me.setWidth(parseInt(data.width));
        me.setHeight(parseInt(data.height));
        me.src = data.src;
        me.mySetX(parseInt(data.x))
        me.mySetY(parseInt(data.y))
        me.picName = data.picName
        me.isBind=data.isBind;
        me.linkData(data.ip, data.port, data.nodename, data.type)
        me.refreshCanvas()
    },
    bodyStyle: {
        background: "transparent"
    },
    sprites: [],
    groupChecked: function (checked) {
        var me = this;
        if (me.isRelated) {
            me.datas.block = checked;
            me.refreshCanvas();
        }
    },
    linkData: function (ip, port, nodename, type) {

        var me = this;

        if (!(!!ip & !!port & !!nodename & !!type)) {
            me.clearInterval();
            return;
        }
        me.ip=ip;
        me.port=port;
        me.nodenam=nodename;
        me.type=type;

        me.clearInterval();
        me.interval = setInterval(function () {
            My.AjaxAsync("resources/main.php", function (response) {
                me.linkValue = response.responseText;
                //me.b = response.responseText;
                me.refreshCanvas();
            }, {
                par: "gettypevalue",
                ip: ip,
                port: port,
                nodename: nodename,
                type: type
            })
        }, 500)

        //Ext.data.StoreManager.lookup("picdatas").load()

        //setTimeout(function () {
        //    var singleFormPanel = Ext.getCmp("singleFormPanel")
        //    singleFormPanel.lookRGBField()
        //}, 1500)
    },
    hasLinkValue: function () {
        var me = this;
        if (me.linkValue == undefined) {
            return false;
        } else {
            return true;
        }
    },
    getLinkValue: function () {
        var me = this;
        if (me.hasLinkValue()) {
            if (me.linkValue) {
                if (!isNaN(me.linkValue)) {
                    return parseInt(me.linkValue)
                }
                return true;
            } else {
                return false;
            }
        }
    },
    clearInterval: function () {
        var me = this;
        if (me.linkValue) {
            delete me.linkValue
        }
        if (me.interval) {
            clearInterval(me.interval);
        }
    },
    setRelated: function (checked) {
        var me = this;
        me.isRelated = checked;
        me.refreshCanvas()
    },
    mySetX: function (newValue) {
        var me = this;
        var panel = Ext.getCmp("maindrawpanel");
        var value = newValue + panel.body.getX();
        me.x = newValue;
        me.setX(value);
    },
    mySetY: function (newValue) {
        var me = this;
        var panel = Ext.getCmp("maindrawpanel");
        var value = newValue + panel.body.getY();
        me.y = newValue;
        me.setY(value);
    },
    setRGB: function (type, value) {
        if (!(type == "r" || type == "g" || type == "b")) {
            return;
        }
        var me = this;
        if (me.getLinkValue()) {
            me.datas.linkRGBFalse[type] = value
        } else {
            me.datas.linkRGBTrue[type] = value
        }
        me.refreshCanvas();
    },
    refreshCanvas: function () {
        var me = this;
        var surface = me.getSurface();
        surface.removeAll();
        var img = new Image();
        var context = surface.contexts[0];
        img.src = me.src;
        img.onload = function () {
            context.drawImage(img, 0, 0, me.width, me.height);
            var pixeLength = me.width * me.height
            var imgData = context.getImageData(0, 0, me.width, me.height)
            var pixeData = imgData.data;
            if (!me.getLinkValue()) {
                imgData.data = blackEffect(pixeData, pixeLength);
            }
            context.putImageData(imgData, 0, 0, 0, 0, me.width, me.height);
        }
        function blackEffect(pixeData, pixeLength) {
            for (var i = 0; i < pixeLength; i++) {
                var r = pixeData[i * 4 + 0];
                var g = pixeData[i * 4 + 1];
                var b = pixeData[i * 4 + 2];
                var grey = r * 0.3 + g * 0.59 + b * 0.11;
                pixeData[i * 4 + 0] = grey;
                pixeData[i * 4 + 1] = grey;
                pixeData[i * 4 + 2] = grey;
            }
            return pixeData;
        }
    },
    /*refreshCanvas: function () {
     var me = this;
     //console.log(me)
     var surface = me.getSurface();
     surface.removeAll();
     var img = new Image();
     var context = surface.contexts[0];
     img.src = me.src;

     img.onload = function () {

     context.drawImage(img, 0, 0, me.width, me.height);
     var pixeLength = me.width * me.height
     //var imgData = context.getImageData(0, 0, me.width, me.height)
     //var pixeData = imgData.data;
     var imgData = context.getImageData(0, 0, me.width, me.height)
     var pixeData = imgData.data;

     if (!me.datas.block || !me.hasLinkValue()) {
     imgData.data = blackEffect(pixeData, pixeLength);
     } else {
     if (me.getLinkValue()) {
     imgData.data = rgbEffect(pixeData, pixeLength, me.datas.linkRGBFalse)
     var gifSrc = isDynamicGif(me.src, me.datas.block);
     if (gifSrc) {
     var beforeImg = me.el.dom.querySelector("img")
     if (beforeImg) {
     beforeImg.parentNode.removeChild(beforeImg);
     }
     var canvas = me.el.dom.querySelector("canvas")
     //canvas.style.display = "none"
     canvas.style.zIndex = -1;
     img.style.width = me.width + "px"
     img.style.height = me.height + "px"
     canvas.parentNode.appendChild(img)
     }
     } else {
     imgData.data = blackEffect(pixeData, pixeLength, me.datas.linkRGBTrue);
     imgData.data = rgbEffect(imgData.data, pixeLength, me.datas.linkRGBTrue)
     }
     }
     surface.removeAll()
     context.putImageData(imgData, 0, 0, 0, 0, me.width, me.height);
     }


     function rgbEffect(pixeData, pixeLength, linkRGB) {
     //console.log(arguments)
     for (var i = 0; i < pixeLength; i++) {
     var r = pixeData[i * 4 + 0]
     var g = pixeData[i * 4 + 1]
     var b = pixeData[i * 4 + 2]
     if (linkRGB.r) {
     pixeData[i * 4 + 0] = r * ((100 - linkRGB.r) / 100)
     }
     if (linkRGB.g) {
     pixeData[i * 4 + 1] = g * ((100 - linkRGB.g) / 100)
     }
     if (linkRGB.b) {
     pixeData[i * 4 + 2] = b * ((100 - linkRGB.b) / 100)
     }
     }
     return pixeData;
     }

     function blackEffect(pixeData, pixeLength) {
     for (var i = 0; i < pixeLength; i++) {
     var r = pixeData[i * 4 + 0];
     var g = pixeData[i * 4 + 1];
     var b = pixeData[i * 4 + 2];
     var grey = r * 0.3 + g * 0.59 + b * 0.11;
     pixeData[i * 4 + 0] = grey;
     pixeData[i * 4 + 1] = grey;
     pixeData[i * 4 + 2] = grey;
     }
     return pixeData;
     }
     function isDynamicGif(picName, bol) {
     //if (picName & picName.length >= 4 & typeof picName == 'string') {
     //}
     var name = picName.substring(picName.lastIndexOf("/") + 1, picName.lastIndexOf("."));
     var firstName = picName.substring(0, picName.lastIndexOf("/") + 1);
     var lastName = picName.substring(picName.lastIndexOf("."), picName.length);
     var isGif = name.substr(name.length - 4, 4);
     var gifName = name.substr(0, name.length - 4);
     if (isGif == "True" || isGif == "False") {
     if (bol) {
     return firstName + gifName + "True" + lastName
     } else {
     return firstName + gifName + "False" + lastName
     }
     } else {
     return false;
     }
     }

     },*/
    listeners: {
        resize: "resize",
        destroy: "destroy",
        el:{
            dblclick:function(e,el){
                var me=this.component;
                console.log(me)

                Ext.create("editpic.view.window.ImgPanelMenuFormWindow", {
                    values: me,
                    ok: function (data) {
                            me.init(data);
                        Ext.data.StoreManager.lookup("picdatas").load();
                    },
                    cancel: function () {
                    }
                })


            }
        }
    }
});
