Ext.define('editpic.view.login.LoginWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'editpic.view.login.LoginWindowController',
        'editpic.view.login.LoginWindowModel'
    ],
    controller: 'login-loginwindow',
    viewModel: {
        type: 'login-loginwindow'
    },
    autoShow: true,
    title: "Login",
    width: 490,
    height: 200,
    x: 50,
    initComponent: function () {
        var me = this;
        var loginForm = Ext.create("Ext.form.Panel", {
            bodyPadding: 10,
            defaults: {
                anchor: '100%',
                labelWidth: 160
            },
            items: [
                {
                xtype: "combo",
                allowBlank: false,
                fieldLabel: 'User Name',
                name: 'username',
                emptyText: 'user name',
                queryMode: "local",
                value: localStorage.getItem("remember") > 0 ? localStorage.getItem("username") : "mngr",
                height: 35,
                store: Ext.create("Ext.data.Store", {
                    fields: ["0"],
                    autoLoad: true,
                    proxy: {
                        type: "ajax",
                        url: "php/login.php?par=getAllUser",
                        reader: {
                            type: "json"
                        }
                    }
                }),
                displayField: "0",
                valueField: "0"
            },
            {
                layout: "hbox",
                bodyStyle: {
                },
                xtype:"fieldcontainer",
                items: [{
                        xtype: "textfield",
                        allowBlank: false,
                        fieldLabel: 'Password',
                        value: localStorage.getItem("remember") > 0 ? localStorage.getItem("password") : "",
                        name: 'password',
                        emptyText: 'password',
                        inputType: 'password',
                        itemId: "password",
                        height: 35,
                        labelWidth: 160,
                    },
                    {
                        xtype: "button",
                        text: "⌨️keybord",
                        height: 35,
                        margin: "0 0 0 5",
                        scale: "medium",
                        handler: function (field) {
                            var passwd = field.up("window").down("#password");
                            var keybord = Ext.getCmp("keybord")
                            if (keybord) {
                                keybord.close();
                            } else {
                                Ext.create("editpic.view.ux.KeyBoard", {
                                    x: me.getX() + me.getWidth() + 5,
                                    inputValue: passwd.getValue(),
                                    okFn: function (value) {
                                        passwd.setValue(value)
                                    }
                                })
                            }
                            if (Ext.getCmp("keybord")) {
                                passwd.focus();
                            }
                        }
                    }
                ]
            },
            {
                xtype: "checkbox",
                fieldLabel: 'Remember Password',
                inputValue: 1,
                uncheckedValue: 0,
                name: "remember",
                value: localStorage.getItem("remember")
            }
        ],
        
        })
        me.listeners = {
            boxready: function () {
                me.add(loginForm)
            },
            close: function () {
                var keybord = Ext.getCmp("keybord")
                if (keybord) {
                    keybord.close()
                }
            }
        }
        me.buttons = [{
            text: 'Login',
            handler: function () {
                var values = loginForm.getValues();
                localStorage.setItem("remember", values.remember)
                localStorage.setItem("username", values.username)
                localStorage.setItem("password", values.password)
                Ext.Ajax.request({
                    url: "/php/login.php?par=login",
                    method: "post",
                    params: values,
                    success: function (response) {
                        try {
                            var resJson = Ext.decode(response.responseText);
                            if (resJson.isLogin) {
                                me.callbackFn(resJson);
                                Ext.Msg.alert("Massage", "login success .")
                            } else {
                                me.callbackFn(false)
                                Ext.Msg.alert("Massage", 'login failure !')
                                //Ext.Msg.alert("Massage","please login .<br>" + (resJson.info||" "))
                            }
                        } catch (e) {
                            Ext.Msg.alert('error', e + response.responseText);
                            throw new Error(e);
                        }
                    }
                })
                // My.login(values);
                // if (My.isLogin()) {
                //     Ext.Msg.alert("Massage", "login success .")
                //     me.callbackFn();
                // } else {
                //     Ext.Msg.alert("Massage", 'login failure !')
                //     return;
                // }

                me.close()
            }
        }]


        me.callParent();
    }


});