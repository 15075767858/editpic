/**
 * Created by liuzhencai on 16/7/1.
 */
Ext.define("editpic.store.PicDatas", {
    extend: "Ext.data.Store",
    groupField: "Group",
    fields: [
        "Group",
        'text',
        'width',
        'height',
        'src',
        "zIndex",
        {
            name: "zIndex", mapping: function (data) {
            //console.log(data)
            return data.el.dom.style.zIndex||0;
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
    ],
    listeners: {
        load: function () {
            var store = this;
            var panel = Ext.getCmp("setpicpanel");
            if (panel) {
                var menu = panel.lookupReference("GroupMenu")
                var toggleMenu = []
                store.getGroups().each(function (group) {
                        console.log(group)
                        toggleMenu.push({
                            xtype: 'menucheckitem',
                            text: group.getGroupKey(),
                            handler: function (checkMenu) {
                                for (var i = 0; i < group.items.length; i++) {
                                    group.items[i].data.block= checkMenu.checked;
                                    group.items[i].data.refreshCanvas()
                                }
                            }
                        })
                    }
                )
                menu.setMenu(toggleMenu)
            }
        }
    }

})