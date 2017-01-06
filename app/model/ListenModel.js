Ext.define('editpic.model.ListenModel', {
    extend: 'Ext.data.Model',
    alias: "ListenModel",
    fields: [
        {name: "ip", type: "string"},
        {name: "port", type: "string"},
        {name: "key", type: "string"},
        {name: "objectname", type: "string"},
        {name: "presentvalue", type: "string"},
        {name: "alarmtxt", type: "string"},
        {name: "normaltxt", type: "string"},
        {
            name: "time", type: "int"
        }, {
            name: "status", type: "string", defaultValue: "alarm", validators: [{
                type: "inclusion", list: ['hold', 'alarm', 'normal']
            }]
        }
    ],
    comparisonModel: function (model) {
        var __this = this;
        if (__this.get('ip') == model.get('ip') & __this.get('port') == model.get('port') & __this.get('key') == model.get('key')) {
            return true;
        } else {
            return false;
        }

    },
    presentValueIs1: function (callback) {
        var __this = this;
        Ext.Ajax.request({
            url: "resources/main.php?par=gettypevalue",
            params: {
                ip: __this.data.ip,
                port: __this.data.port,
                nodename: __this.data.key,
                type: "Present_Value",
            }
        }).then(function (response) {
            callback(response.responseText == "1")
        })
    },
    getCloneModel: function (callback) {
        var __this = this;
        __this.presentValueIs1(function (bol) {
            if (bol) {
                var model = Ext.createByAlias('ListenModel')
                model.set("ip", __this.data.ip)
                model.set("port", __this.data.port)
                model.set("key", __this.data.key)
                model.set("objectname", __this.data.objectname)
                // model.set("presentvalue", __this.data.presentvalue)
                model.set("alarmtxt", __this.data.alarmtxt)
                model.set("normaltxt", __this.data.normaltxt)

                model.set('presentvalue', "1")
                model.set('time', new Date().getTime())
                console.log(model)

                callback(model)
            }
        })

    },
    modelCRUD: function (method, success) {
        var __this = this;
        Ext.Ajax.request({
            url: EventAlarmUrl + "?par=" + method,
            params: __this.data
        }).then(success)
    },
    addLog: function (success) {
        this.modelCRUD("addLog", success)
    },
    delLog: function (success) {
        this.modelCRUD("delLog", success)

    },
    setStatusNormal: function (success) {
        this.set('status', 'normal')
        this.modelCRUD("setStatusNormal", success)

    },
    setStatusHold: function (success) {
        this.set('status', 'hold')
        this.modelCRUD("setStatusHold", success)
    },
    setStatusAlarm: function (success) {
        this.set('status', 'alarm')
        this.modelCRUD("setStatusNormal", success)
    },
    proxy: {
        type: 'post',
        url: EventAlarmUrl + "?par=addLog"
    }
});
