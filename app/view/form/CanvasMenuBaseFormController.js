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
    },
    mySetConfig:function(field,newVlaue,oldValue,e){
        if(!newVlaue){
            return;
        }
        if(!field.configName){
            return;
        }

        var values= e.values;
        if(!values.body){
            return;
        }
        var configName=field.configName;

        console.log(arguments)
        console.log(values)
        //if(configName=="rotate")
        values[configName](newVlaue);

    },
    boxready:function(panel){

        console.log(this.getViewModel())
        
    },
    colorPickerFocus:function(field, newValue){
        var win= Ext.create("graph.view.ux.ColorSelect",
            {
                ok: function (color) {
                    field.setValue(color)
                    win.close();
                }
            }
        )

        /*var win = Ext.create("Ext.window.Window", {
            title: "select color",
            autoShow: true,
            items: Ext.create("Ext.picker.Color", {
                fieldLabel: "FontColor",
                name: "fontColor"
            }),
            buttons: [
                {
                    text: "Ok", handler: function () {
                    var colorPicker = win.down("colorpicker");
                    console.log(colorPicker)
                    //alert(colorPicker.value)
                    field.setValue("#"+colorPicker.value);
                    win.close();
                }
                },
                {
                    text: "Cancel", handler: function () {
                    win.close()
                }
                }
            ]
        })*/

    }
});

