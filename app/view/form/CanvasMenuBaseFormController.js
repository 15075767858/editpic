Ext.define('editpic.view.form.CanvasMenuBaseFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-canvasmenubaseform',
    dragImageSetUrl:function(field){
        console.log(field)
        new Ext.dd.DropTarget(field.id, {
            ddGroup: "picgroup",
            notifyEnter: function (ddSource, e, data) {
                console.log(arguments)
            },
            notifyDrop: function (ddSource, e, data) {
                var record = ddSource.dragData.records[0];
                field.setValue(record.data.url)
                return true;
            }
        })
    }
});
