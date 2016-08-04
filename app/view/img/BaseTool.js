Ext.define('editpic.view.img.BaseTool', {
    extend: 'Ext.form.Panel',

    requires: [
        'editpic.view.img.BaseToolController',
        'editpic.view.img.BaseToolModel'
    ],

    controller: 'img-basetool',
    viewModel: {
        type: 'img-basetool'
    },

    resizable: true,
    resizeHandles: "s,e,se",
    draggable: true,

    bodyStyle: {
        background: "transparent"
    },
    init: function (data) {
        var me = this;
        console.log(data)
        me.mySetWidth(data.width);
        me.mySetHeight(data.height);
        me.mySetX(data.x);
        me.mySetY(data.y);
        me.itype = data.itype-0;
        me.isBind = data.isBind;
        me.linkData(data);
    },

    linkData: function (data) {
        var me = this;
        var ip=data.ip;
        var port=data.port;
        var nodename=data.nodename;
        var type=data.type;
        if (!(!!ip & !!port & !!nodename & !!type)) {
            me.clearInterval();
            return;
        }
        me.ip = ip;
        me.port = port;
        me.nodename = nodename;
        me.type = type;
        me.clearInterval();
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
        }, 50)
    },
    isImg: function () {
        return false;
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
    getInitData: function () {
        var me = this;
        var data = {};
        data.x = me.x;
        data.y = me.y;
        data.width = me.width;
        data.height = me.height;
        data.name = me.name;
        data.isBind = me.isBind;
        data.itype = me.itype-0;
        data.ip = me.ip;
        data.port = me.port;
        console.log(me)
        data.nodename = me.nodename;
        data.type = me.type;
        data.linkValue=me.linkValue;
        return data;
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
    openMenu:function(ok,cancel){
        var me =this;
        Ext.create("editpic.view.window.CanvasConponmentWindow", {
            values: me,
            ok: ok||function (data) {
                me.init(data);
            },
            cancel: cancel||function () {

            }
        })
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
            contextmenu: function (e) {
                e.stopEvent()
                var me = this.component;
                Ext.create("Ext.menu.Menu", {
                    x: e.pageX,
                    y: e.pageY,
                    autoShow: true,
                    items: [
                        {
                            text: "delete", handler: function () {
                            me.close()
                        }
                        },
                        {
                            text: "Property", handler: function () {
                            me.openMenu()
                            /*Ext.create("editpic.view.window.CanvasConponmentWindow", {
                                values: me,
                                ok: function (data) {
                                    me.init(data);
                                },
                                cancel: function () {

                                }
                            })*/
                        }
                        }
                    ]
                })
            },
            dblclick: function () {
                var me = this.component;
                console.log(me)
                me.openMenu()
                /*Ext.create("editpic.view.window.CanvasConponmentWindow", {
                    values: me,
                    ok: function (data) {
                        me.init(data);
                    },
                    cancel: function () {

                    }
                })*/

            }
        }
    }

});
