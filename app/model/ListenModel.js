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
        }
    ],
    addLog: function (success) {
        var __this = this;
        console.log(this)
        Ext.Ajax.request({
            url: EventAlarmUrl + "?par=addLog",
            params: __this.data
        }).then(success)
    },
    delLog: function (success) {
        var __this = this;
        Ext.Ajax.request({
            url: EventAlarmUrl + "?par=delLog",
            params: __this.data
        }).then(success)
    },

    proxy: {
        type: 'post',
        url: EventAlarmUrl + "?par=addLog"
    }
});
