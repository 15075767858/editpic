Ext.define('editpic.model.PrintSettingModel', {
    extend: 'Ext.data.Model',
    alias: "PrintSettingModel",
    fields: [
        {name: 'number', type: 'string'},
        {name: 'mode', type: "string"}
    ],
    loadPrintSettingData: function (callback) {
        var __this = this;
        Ext.Ajax.request({
            url: "resources/print/PrintConfig.php",
            params: {
                par: "loadConfig"
            }
        }).then(function (response) {
            var resJson = Ext.decode(response.responseText)
            __this.set(resJson)
            callback(resJson)
        })
    },
    savePrintSettingData: function (callback) {
        var __this = this;
        Ext.Ajax.request({
            url: "resources/print/PrintConfig.php",
            params: {
                par: "saveConfig",
                content: Ext.encode(__this.data)
            }
        }).then(function (response) {
            //var resJson = Ext.decode(response.responseText)
            callback(response.responseText)
        })
    }
});
