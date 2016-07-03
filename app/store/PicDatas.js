/**
 * Created by liuzhencai on 16/7/1.
 */
Ext.define("editpic.store.PicDatas", {
    extend: "Ext.data.Store",
    fields: [
        'text',
        'width',
        'height',
        'src',
        "zIndex",
        {
            name: "zIndex", mapping: function (data) {
            //console.log(data)
            return data.el.dom.style.zIndex;
        }
        },
        {
            name: "picId", mapping: function (data) {
            return data.id;
        }
        },
        {
            name: "x", mapping: function (data) {
            return data.getX() - data.up().body.getX();
        }
        },
        {
            name: "y", mapping: function (data) {
            return data.getY() - data.up().body.getY();
        }
        }
    ]

})