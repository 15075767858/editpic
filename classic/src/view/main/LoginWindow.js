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
    width: 400,
    title: "Login",
    height: 155,
    x:50,
    initComponent: function () {
        var me = this;

        var loginForm = Ext.create("Ext.form.Panel", {
                bodyPadding: 10,
                items: [
                    {
                        xtype: "combo",
                        allowBlank: false,
                        fieldLabel: 'User Name',
                        name: 'username',
                        emptyText: 'user name',
                        queryMode: "local",
                        store: ['smartioengr', 'User', "mngr", "engr", "Supv", "Oper"]
                    },
                    {
                        xtype: "textfield",
                        allowBlank: false,
                        fieldLabel: 'Password',
                        name: 'password',
                        emptyText: 'password',
                        inputType: 'password'
                    }
                ],
                defaults: {
                    anchor: '100%',
                    labelWidth: 120,
                    listeners: {
                        focus: function (field) {
                            var keybord = Ext.getCmp("win"+field.id)
                            if(keybord){
                                keybord.close()
                            }
                            Ext.create("editpic.view.ux.KeyBoard", {
                                id: "win" + field.id,
                                x: me.getX() + me.getWidth() + 5,
                                inputValue: field.getValue(),
                                okFn: function (value) {
                                    field.setValue(value)
                                }
                            })
                        }
                    }
                }
            }
        )
        me.listeners={
            boxready:function(){
                me.add(loginForm)
            }
        }
        me.buttons = [
            {
                text: 'Login', handler: function () {
                var values = loginForm.getValues();
                
                My.login(values);
                if (My.isLogin()) {
                    Ext.Msg.alert("Massage", "login success .")
                    me.callbackFn();

                } else {
                    Ext.Msg.alert("Massage", 'login failure !')
                    return;
                }

                me.close()
            }
            }
        ]


        me.callParent();
    }


});
