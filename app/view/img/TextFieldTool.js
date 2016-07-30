Ext.define('editpic.view.img.TextFieldTool',
    {
        //extend: 'editpic.view.img.Base',
        extend: "editpic.view.img.BaseTool",
        requires: [
            'editpic.view.img.TextFieldToolController',
            'editpic.view.img.TextFieldToolModel'
        ],
        controller: 'img-textfieldtool',
        viewModel: {
            type: 'img-textfieldtool'
        },
        initComponent: function () {
            var me = this;

            var textfield = Ext.create("Ext.form.field.Text", {})

            me.items = textfield;
            me.field = textfield;
            me.callParent()
        },

        refreshCanvas: function () {
            var me = this;
            me.field.setValue(me.getLinkValue())
        },
        getInitData:function(){
            var me=this;
            var data={};
            data.x=me.x;
            data.y=me.y;
            data.width=me.width;
            data.height=me.height;
            data.name=me.name;
            data.isBind=me.isBind;
            data.itype=me.itype;
            data.ip=me.ip;
            data.port=me.port;
            data.nodename=me.nodename;
            data.type=me.type;
            return data;
        },
        listeners: {
            el: {
                dblclick: function () {
                    var me = this.component;
                    console.log(me)

                    Ext.create("editpic.view.window.FieldMenuWindow", {
                        values: me,
                        ok: function (data) {
                            me.init(data);
                        },
                        cancel: function () {

                        }
                    })

                }
            }
        }
    }
);
