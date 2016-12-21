Ext.define('graph.view.ux.ColorSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ux-colorselect',
    addColorHandler: function () {
        var win = this.view;
        var panel = this.createColorPanel();
        win.add(panel);
    },
    deleteColorHandler: function () {
        var win = this.view;
        var panel = win.getSelectPanel();
        win.remove(panel)
    },
    changeColorHandler: function () {
        var colorWin = this.view;
        var colorField = Ext.create("Ext.picker.Color", {
            fieldLabel: "FontColor",
            name: "fontColor",
            listeners: {
                select: function (picker, selColor) {
                    var color = "#" + selColor;
                    var panel = colorWin.getSelectPanel()
                    if (panel) {
                        panel.changeBackgroundColor(color);
                        win.close();
                    } else {
                        Ext.Msg.alert("Massage", "Exception please select a color chunk !")
                    }
                }
            }
        });
        var win = Ext.create("Ext.window.Window", {
            title: "select color",
            autoShow: true,
            items: colorField
        });
    },
    changeColorPlusHandler: function () {
        var colorWin = this.view;
        var colorField = Ext.create("Ext.ux.colorpick.Selector", {
            fieldLabel: "FontColor",
            name: "fontColor",
            showOkCancelButtons: true,
            showPreviousColor: true,
            listeners: {
                ok: function (picker, selColor) {
                    var color = "#" + selColor;
                    var panel = colorWin.getSelectPanel();
                    if (panel) {
                        panel.changeBackgroundColor(color);
                        win.close();
                    } else {
                        Ext.Msg.alert("Massage", "Exception please select a color chunk !")
                    }
                },
                cancel: function () {
                    win.close();
                }
            }
        });
        var win = Ext.create("Ext.window.Window", {
            title: "select color",
            autoShow: true,
            items: colorField
        })
    },
    createColorPanel: function (color) {
        var panel = Ext.create("Ext.panel.Panel", {

            changeBackgroundColor: function (color) {
                var panel = this;
                panel.body.setStyle("backgroundColor", color);
                panel.backgroundColor = color;
            },
            selectChange: function (bol) {
                var selectBorder = "3px solid white";
                var unSelectBorder = "";
                if (bol) {
                    this.isselect = true;
                    this.setStyle("border", selectBorder);
                } else {
                    this.isselect = false;
                    this.setStyle("border", unSelectBorder);
                }
            },

            select: function () {
                var panel = this;
                //panel.changeBackgroundColor("red")

                var win = this.up("window")
                if (panel.isselect) {
                    panel.selectChange(true)
                } else {
                    var selectPanle = win.getSelectPanel()
                    if (selectPanle) {
                        selectPanle.selectChange(false)
                    }
                    panel.selectChange(true)
                }
            },


            listeners: {
                boxready: function () {
                    this.changeBackgroundColor(color);
                },
                el: {
                    mousedown: function () {
                        this.component.select()
                    },
                    mouseover: function () {
                        Ext.tip.QuickTipManager.register({
                            target: panel.id, // Target button's ID
                            title: 'color',  // QuickTip Header
                            text: panel.backgroundColor // Tip content
                        });

                    }
                }
            }
        })
        return panel;
    },

    getColorInitData: function (callback) {
        var defalutColors = ["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffffff"];
        var url = "resources/xmlRW.php";
        Ext.Ajax.request({
            url: url,
            params: {rw: "r", fileName: "../UserColor.json"},
            success: function (response) {
                try {
                    var resArr = Ext.decode(response.responseText)
                    callback(resArr);
                } catch (e) {
                    callback(defalutColors);
                    console.log(e);
                }
            }
        })

    },
    setColorInitData: function () {
        var me = this.view;
        var items = me.items.items;
        var colorArr = [];
        for (var i = 0; i < items.length; i++) {
            colorArr.push(items[i].backgroundColor);
        }
        var content = Ext.encode(colorArr);
        Ext.Ajax.request({
            url: "resources/xmlRW.php",
            method: "post",
            params: {rw: "w", fileName: "../UserColor.json", content: content},
            success: function (response) {
                if (response.responseText != content.length) {
                    Ext.Msg.alert("Massage", "Error " + response.responseText);
                } else {
                    My.delayToast("Massage", "save successlly " + response.responseText);
                }
                console.log(response)
            }
        })

    },
    boxready: function () {
        var me = this.view;
        var __this = this;
        console.log(this)
        this.getColorInitData(function (resArr) {
            console.log(resArr);
            for (var i = 0; i < resArr.length; i++) {
                var panel = __this.createColorPanel(resArr[i])
                me.add(panel)
            }
        })

    },
    okHandler: function () {
        this.setColorInitData()
        var win = this.view;
        if (win.ok) {
            var panel = win.getSelectPanel();
            var color = panel.backgroundColor;
            win.ok(color);
        }

    }
});
