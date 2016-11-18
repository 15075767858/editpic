Ext.define('editpic.view.img.LinkTool', {
    extend: 'editpic.view.img.BaseTool',

    layout: "absolute",
    initComponent: function () {
        var me = this;
        me.callParent();
    },

    init: function (data) {
        var me = this;
        console.log(data);
        me.aliasName = data.aliasName;
        me.showFilename = data.showFilename;
        me.callParent(arguments)
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        Ext.apply(data, {
            aliasName: me.aliasName,
            showFilename: me.showFilename
        })
        return data;
    },
    linkData: function (data) {

        var me = this;

        me.linkValue = data.linkValue;

        me.refreshCanvas();

    },
    refreshCanvas: function () {

        var me = this;

        //aliasName
        //showFilename

        if (me.showFilename) {
            me.setHtml(me.linkValue);
        } else {
            me.setHtml("")
        }
        console.log(me.showFilename)

        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                },
                //y:50,
                //height: "-50%",
                //width: "100%",
                html: me.aliasName
            })
            me.contentPanel.setStyle("color","red")
            me.add(me.contentPanel);
        } else {
            me.contentPanel.setHtml(me.aliasName)
        }

        /*if(me.linkValue){
         me.setHtml(me.aliasName)
         }else{
         me.setHtml("")
         }*/

    },
    listeners: {
        el: {
            click: function () {
                var me = this.component;
                if (My.getSearch()) {
                    var session=My.getSession();
                    if(session.level>99){

                        Ext.getCmp("mintab").addTab(me.linkValue);
                        return ;
                    }

                    Ext.create("editpic.view.login.LoginWindow", {
                            callbackFn: function () {
                                var session = My.getSession();

                                if (session.level > 99) {
                                    Ext.getCmp("mintab").addTab(me.linkValue);
                                } else {
                                    Ext.Msg.alert("Error", "Permission denied .")
                                }
                            }
                        }
                    )
                } else {
                    Ext.getCmp("mintab").addTab(me.linkValue);
                }
            }
        }
    }
});
