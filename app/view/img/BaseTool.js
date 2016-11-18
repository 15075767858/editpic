/*
添加一个工具的流程
首先继承基础工具
然后在My.createImg 方法中注册
如果需要连接数据库则在LinkPropertyForm中新建一个关于它的itype 连接数据库方法
 */
Ext.define('editpic.view.img.BaseTool', {
    extend: 'Ext.form.Panel',

    requires: [
        'editpic.view.img.BaseToolController',
        'editpic.view.img.BaseToolModel'
    ],
    shadow: "2px 2px 10px red",
    controller: 'img-basetool',
    viewModel: {
        type: 'img-basetool'
    },

    /*resizable: true,

     draggable: true,
     */
    //draggable:!My.getSearch(),
    //resizable: !My.getSearch(),
    resizeHandles: "s,e,se",

    bodyStyle: {
        background: "transparent",
        textAlign: "center",
        //backgroundImage:"resources/SmartIO.png",
        //backgroundRepeat:"noRepeat",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
    },

    initComponent: function () {
        var me = this;
        me.callParent();
        Ext.apply(me, My.initComponentConfig)
    },
    init: function (data) {
        var me = this;
        me.mySetWidth(data.width);
        me.mySetHeight(data.height);
        me.mySetX(data.x);
        me.mySetY(data.y);
        me.mySetName(data.name);
        me.mySetZIndex(data.zindex);
        if (data.itype) {
            me.itype = me.itype || data.itype;
        }
        me.isBind = data.isBind;
        me.linkData(data);
        me.mySetConfig('font', data.font);
        me.setBoxShadow(data.boxShadow);
        me.setBackground(data.background);
        me.Priority_For_Writing = data.Priority_For_Writing;
        me.priorityValue = data.priorityValue;
        me.isBindPriority = data.isBindPriority;
        me.mySetFontPosition(data.fontPostion);
        me.setFont(data.font);
        me.setFontColor(data.fontColor);
        //me.mySubscribe()

        //me.fontStyle=data.fontStyle;
        //me.fontVariant=data.fontVariant;
        //me.fontWeight=data.fontWeight;
        //me.fontSize=data.fontSize;
        //me.fontFamily=data.fontFamily;
        //me.mySetConfig('font',data.font)
        //me.mySetBackgroundColor(data.backgroundColor);
        //me.mySetConfigEl("backgroundImage", "url(" + data.backgroundImage + ")")
        //me.mySetConfigEl("background",data.backgroundColor+" url("+data.backgroundImage+") no-repeat")
    },
    mySetFontPosition: function (value) {
        var me = this;
        if (value == undefined) {
            value = me.getHeight() / 2 - 10;
        }
        //console.log(me.contentPanel)
        me.fontPostion = value;
        if (me.contentPanel) {
            me.contentPanel.setY(value + me.getPosition()[1])
        }

    },
    setBackground: function (value) {
        //console.log(value)
        var me = this;
        if (me.el) {

            //ip连不上红色
            //key连不上黑色

            me.setStyle("background", value);
            me.setStyle("backgroundSize", "100% 100%")
            me.background = value;
        }
    },

    getBackground: function () {
        var me = this;
        return me.background;
    },

    getInitData: function () {
        var me = this;
        console.log(me)
        var data = {};
        data.x = me.x;
        data.y = me.y;
        data.width = me.width;
        data.height = me.height;
        //data.myGetName=me.myGetName();
        data.isBind = me.isBind;
        data.itype = me.itype - 0;
        data.ip = me.ip;
        data.port = me.port;
        console.log(me)
        data.nodename = me.nodename;
        data.type = me.type;
        data.linkValue = me.linkValue;
        data.zindex = me.zindex;
        data.fontColor = me.getFontColor();
        data.font = me.getFont()
        //data.font = me.myGetConfig("font");
        data.fontStyle = me.fontStyle;
        data.fontVariant = me.fontVariant;
        data.fontWeight = me.fontWeight;
        data.fontSize = me.fontSize;
        data.fontFamily = me.fontFamily;
        data.boxShadow = me.boxShadow;
        data.fontPostion = me.fontPostion;
        //data.boxShadow=me.myGetConfig("font")
        //data.backgroundColor = me.myGetBackgroundColor();
        data.background = me.background;
        me.myGetConfigEl("backgroundImage");
        data.backgroundColor = me.backgroundColor;
        data.backgroundImage = me.backgroundImage;
        data.Priority_For_Writing = me.Priority_For_Writing;
        data.priorityValue = me.priorityValue;
        data.isBindPriority = me.isBindPriority;
        data.name = me.name;

        return data;
    },


    myGetConfig: function (configName) {
        var me = this;
        if (me.field) {
            var input = me.field.el.dom.querySelector("input")
            if (input) {
                return input.style[configName];
            } else {
                return ""
            }
        }
        if (me.body) {
            return me.body.getStyle(configName);
        } else {
            return "";
        }
    },
    mySetConfig: function (configName, value) {
        var me = this;
        if (!value & value != 0) {
            return;
        }
        if (me.field) {
            var input = me.field.el.dom.querySelector("input")
            if (input) {
                input.style[configName] = value;
                return;
            } else {
                return;
            }
        }
        if (me.body) {
            me.body.setStyle(configName, value);
            me[configName] = value;
        }
    },
    myGetConfigEl: function (configName) {
        var me = this;
        if (me.el) {
            return me.el.getStyle(configName);
        } else {
            return "";
        }
    },
    mySetConfigEl: function (configName, value) {
        var me = this;
        me.setStyle(configName, value);
        me[configName] = value;
    },

    //boxShadow
    getBoxShadow: function () {
        var me = this;
        return me.boxShadow;
        /*if (me.el) {
         var boxShadow = me.el.getStyle("boxShadow");
         return boxShadow;
         } else {
         return "";
         }*/
    },
    setBoxShadow: function (shadow) {
        var me = this;
        if (!shadow) {
            return;
        }
        if (me.el) {
            me.setStyle("boxShadow", shadow);
            me.boxShadow = shadow;
        }

    },
    getFont: function () {
        var me = this;
        if (me.field) {
            var input = me.field.el.dom.querySelector("input")
            if (input) {
                var font = input.style.font;
                return font;
            } else {
                return ""
            }
        }
        return me.font||"";
        /*if (me.body) {
            var font = me.body.getStyle("font");
            return font;
        } else {
            return "";
        }*/
    },
    getLinkValue: function () {
        var me = this;
        if (me.hasLinkValue()) {
            //if (!isNaN(me.linkValue)) {
            //
            //    return parseFloat(me.linkValue);
            //}
            if (me.linkValue === false) {
                return "";
            }


            return me.linkValue;

        }
    },
    setFont: function (font) {
        var me = this;


        if (!font) {
            return;
        }

        if (!me.contentPanel) {
            return;
        }
        if (me.contentPanel.body) {
            setTimeout(function () {
                me.contentPanel.body.setStyle("font", font);
            }, 100)
            me.font = font;
        }
    },
    setFontColor: function (color) {
        var me = this;

        if (!color) {
            return;
        }

        if (!me.contentPanel) {
            return;
        }
        if (me.contentPanel.body) {
            setTimeout(function () {
                me.contentPanel.body.setStyle("color", color);
            }, 100)
            me.fontColor=color;
        }
    },
    getFontColor: function () {
        var me = this;

        if (!me.contentPanel) {
            return "#FFFFFF"
        }

        if (me.contentPanel.body) {
            var color = me.contentPanel.body.getColor("color");
            return color;
        } else {
            return "#FFFFFF";
        }
    },
    linkData: function (data) {
        var me = this;

        me.clearInterval();

        if (me.isLinkData(data)) {
            me.setLinkValue();
        }
        me.refreshCanvas()
    },


    isImg: function () {
        return false;
    },
    listeners: {
        boxready: function () {
            var me = this;
            me.el.hover(function (e, d) {
                //console.log(arguments)
                me.setStyle("border", "2px solid white");
            }, function (e, d) {
                //console.log(arguments)
                me.setStyle("border", "none");
            })

        },
        resize: function (me, width, height) {
            me.mySetWidth(width);
            me.mySetHeight(height)
        },
        move: function (me, x, y) {
            me.mySetX(x)
            me.mySetY(y)
            console.log("move")
        },
        el: {
            scope: "this",
            click: "click",

            contextmenu: "contextmenu",
            dblclick: "dblclick",
            mousedown: function () {

            }
        }
    }

});

/*
 var aaa = setInterval(function () {
 var a = document.getElementById("chat-msg-textarea");
 a.value = ""
 $("#send-btn").trigger("click")
 },3000)
 */
