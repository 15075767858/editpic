
Ext.define('editpic.view.img.BaseTool',{
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
    resizeHandles :"s,e,se",
    draggable: true,

    bodyStyle: {
        background: "transparent"
    },
    init: function (data) {
        var me = this;
        me.mySetWidth(data.width);
        me.mySetHeight(data.height);
        me.mySetX(data.x);
        me.mySetY(data.y);
        me.isBind = data.isBind;
        me.linkData(data.ip, data.port, data.nodename, data.type);
    },

    linkData: function (ip, port, nodename, type) {
        var me = this;
        if (!(!!ip & !!port & !!nodename & !!type)) {
            me.clearInterval();
            return;
        }
        me.ip = ip;
        me.port = port;
        me.nodenam = nodename;
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
    listeners:{
        resize:function(me,width,height){

            me.mySetWidth(width);
            me.mySetHeight(height)
        },
        move:function(me,x,y){
            me.mySetX(x)
            me.mySetY(y)
        }
    }

});
