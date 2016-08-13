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
        background: "transparent"
    },
    initComponent: function () {
        var me = this;
        me.callParent()

        Ext.apply(me, My.initComponentConfig)
    },
    init: function (data) {
        var me = this;
        console.log(data)
        me.mySetWidth(data.width);
        me.mySetHeight(data.height);
        me.mySetX(data.x);
        me.mySetY(data.y);

        me.mySetZIndex(data.zindex);
        if (data.itype) {
            me.itype = me.itype || data.itype;
        }
        me.isBind = data.isBind;
        me.linkData(data);
        me.setFontColor(data.fontcolor);
        //me.setFont(data.font);
        me.mySetConfig('font',data.font)
        me.setBoxShadow(data.boxShadow)
        //me.mySetConfig('font',data.font)
        me.mySetBackgroundColor(data.backgroundColor);
        me.Priority_For_Writing = data.Priority_For_Writing;
        me.priorityValue = data.priorityValue;
        me.isBindPriority = data.isBindPriority;
    },
    /* linkData: function (ip, port, nodename, type) {

     var me = this;
     console.log(arguments)

     if (!(!!ip & !!port & !!nodename & !!type)) {
     me.clearInterval();
     return;
     }
     me.ip = ip;
     me.port = port;
     me.nodename = nodename;
     me.type = type;
     me.clearInterval();
     me.setLinkValue();
     },*/
    getInitData: function () {
        var me = this;
        var data = {};
        data.x = me.x;
        data.y = me.y;
        data.width = me.width;
        data.height = me.height;
        data.name = me.name;
        data.isBind = me.isBind;
        data.itype = me.itype - 0;
        data.ip = me.ip;
        data.port = me.port;
        console.log(me)
        data.nodename = me.nodename;
        data.type = me.type;
        data.linkValue = me.linkValue;
        data.zindex = me.zindex;
        data.fontcolor = me.getFontColor();
        //data.font = me.getFont()
        data.font=me.myGetConfig("font");
        data.font=me.getBoxShadow("boxShadow");
        //data.boxShadow=me.myGetConfig("font")
        data.backgroundColor = me.myGetBackgroundColor();
        data.Priority_For_Writing = me.Priority_For_Writing
        data.priorityValue = me.priorityValue
        data.isBindPriority = me.isBindPriority
        return data;
    },

/*
    getShadow: function () {
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
        if (me.body) {
            var font = me.body.getStyle("font");
            return font;
        } else {
            return "";
        }
    },

    setShadow: function (shadow) {
        var me = this;

        if (!font) {
            return;
        }
        if (me.field) {
            var input = me.field.el.dom.querySelector("input")
            input.style.font = font;
            return;
        }
        if (me.body) {
            me.body.setStyle("font", font);
            me.font = font;
        }
    },*/
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
            return  me.body.getStyle(configName);
        } else {
            return "";
        }
    },
    mySetConfig: function (configName, value) {
        var me = this;
        if (!value&value!=0) {
            return;
        }
        if (me.field) {
            var input = me.field.el.dom.querySelector("input")
            if(input){
            input.style[configName] = value;
            return;
            }else{
                return;
            }
        }
        if (me.body) {
            me.body.setStyle(configName, value);
            me[configName] = value;
        }
    },
    //boxShadow
    getBoxShadow:function(){
        var me = this;
        if (me.el) {
            var boxShadow = me.el.getStyle("boxShadow");
            return boxShadow;
        } else {
            return "";
        }
    },
    setBoxShadow:function(shadow){
        var me = this;
        if(!shadow){
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
        if (me.body) {
            var font = me.body.getStyle("font");
            return font;
        } else {
            return "";
        }
    },

    setFont: function (font) {
        var me = this;

        if (!font) {
            return;
        }
        if (me.field) {
            var input = me.field.el.dom.querySelector("input")
            input.style.font = font;
            return;
        }
        if (me.body) {
            me.body.setStyle("font", font);
            me.font = font;
        }
    },
    getFontColor: function () {
        var me = this;
        if (me.body) {
            var color = me.body.getColor("color");
            return color;
        } else {
            return "#FFFFFF";
        }
    },

    setFontColor: function (color) {
        if (!color) {
            return;
        }
        var me = this;
        if (me.body) {
            me.body.setStyle("color", color);
            me.fontColor = color;
        }
    },
    linkData: function (data) {
        var ip = data.ip;
        var port = data.port;
        var nodename = data.nodename;
        var type = data.type;
        var me = this;
        console.log(arguments)
        if (!(!!ip & !!port & !!nodename & !!type)) {
            me.clearInterval();
            return;
        }
        me.ip = ip;
        me.port = port;
        me.nodename = nodename;
        me.type = type;
        me.clearInterval();
        me.setLinkValue();
    },

    /*linkData: function (data) {
     var me = this;
     var ip = data.ip;
     var port = data.port;
     var nodename = data.nodename;
     var type = data.type;
     if (!(!!ip & !!port & !!nodename & !!type)) {
     //me.clearInterval();
     return;
     }
     me.ip = ip;
     me.port = port;
     me.nodename = nodename;
     me.type = type;
     //me.clearInterval();
     me.setLinkValue();

     /!*  me.interval = setInterval(function () {
     me.setLinkValue();
     me.refreshCanvas();
     },500)*!/
     /!*
     me.interval = setInterval(function () {
     My.AjaxAsync("resources/main.php", function (response) {
     if (response.responseText != me.linkValue) {
     me.linkValue = response.responseText;
     me.refreshCanvas();
     }
     }, {
     par: "gettypevalue",
     ip: ip,
     port: port,
     nodename: nodename,
     type: type
     })
     }, 50)*!/
     },
     mySetZIndex: function (value) {
     var me = this;
     me.setZIndex(value);
     me.zindex = value;
     },
     setLinkValue: function (linkValue) {
     var me = this;
     me.linkValue = linkValue || My.linkManger.getValue(me);
     me.refreshCanvas();
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
     delete me.linkValue;
     }
     if (me.interval) {
     clearInterval(me.interval);
     }
     },
     openMenu: function (ok, cancel) {
     var me = this;
     Ext.create("editpic.view.window.CanvasConponmentWindow", {
     values: me,
     ok: ok || function (data) {
     me.init(data);
     },
     cancel: cancel || function () {

     }
     })
     },
     moveController: function (e) {
     if (!e.keyCode) {
     return;
     }
     var me = this;
     if (e.keyCode == 37) {
     me.mySetX(me.x - 1)
     }
     if (e.keyCode == 38) {
     me.mySetY(me.y - 1)
     }
     if (e.keyCode == 39) {
     me.mySetX(me.x + 1)
     }
     if (e.keyCode == 40) {
     me.mySetY(me.y + 1)
     }
     },
       mySetX: function (newValue) {
     newValue = parseInt(newValue)
     var me = this;
     var panel = me.up("picpanel");
     var value = newValue + panel.body.getX();
     me.x = newValue;
     me.setX(value);
     },
     mySetY: function (newValue) {
     newValue = parseInt(newValue)
     var me = this;
     var panel = me.up("picpanel");
     var value = newValue + panel.body.getY();
     me.y = newValue;
     me.setY(value);
     },
     mySetWidth: function (value) {
     value = parseInt(value)
     var me = this;
     me.field.setWidth(value)
     console.log(me.field);
     me.setWidth(value)
     },
     mySetHeight: function (value) {
     value = parseInt(value)
     var me = this;
     me.field.setHeight(value)
     me.setHeight(value)
     },
*/
    isImg: function () {
        return false;
    },
    listeners: {

        resize: function (me, width, height) {
            me.mySetWidth(width);
            me.mySetHeight(height)
        },
        move: function (me, x, y) {
            me.mySetX(x)
            me.mySetY(y)
        },
        el: {
            scope: "this",
            click: "click",
            /*click: function (e, t, eOpts) {
             var me = this.component;
             console.log(arguments)
             var divs = me.el.dom.querySelectorAll(".x-resizable-handle");
             for (var i = 0; i < divs.length; i++) {
             divs[i].style.opacity = 1
             }
             var textfield = Ext.create("Ext.form.field.Text", {
             hidden: false,
             width: 1,
             height: 1,
             listeners: {
             specialkey: function (field, e) {
             console.log(arguments)
             me.moveController(e)
             },
             focusleave: function () {
             console.log("鼠标离开")
             for (var i = 0; i < divs.length; i++) {
             divs[i].style.opacity = 0
             }
             textfield.up().remove(textfield)
             }
             }
             })
             me.up().add(textfield)
             textfield.setZIndex(-1)
             textfield.focus()
             textfield.focus()
             },*/
            contextmenu: "contextmenu",
            dblclick: "dblclick",
            mouseenter:function(){
                var me=this;
                me.el.setStyle("backgroundColor","#da7b19");

            },
            mouseout:function(){
                var me=this;
                me.el.setStyle("backgroundColor",me.backgroundColor||"transparent");

            },
            mousedown:function(){

            }
        }
    }

});
