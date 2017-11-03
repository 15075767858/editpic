Ext.define('editpic.view.ux.KeyBoard', {
    extend: 'Ext.window.Window',
    autoShow: true,
    title: "Keybord",
    id:"keybord",
    requires: [
        'editpic.view.ux.KeyBoardController',
        'editpic.view.ux.KeyBoardModel'
    ],
    width: 251,
    height: 430,
    controller: 'ux-keyboard',
    viewModel: {
        type: 'ux-keyboard'
    },
    defaultKeyboard: "123",
    //bodyPadding: 10,
    initComponent: function () {
        var me = this;
        var input = Ext.create("Ext.form.field.Text", {
            width: "97%",
            height: 50,
            margin: 5,
            inputType: "password",
            value: me.inputValue
        });

        var form = Ext.create("Ext.form.Panel", {
            width: "100%",
            defaults: {},
            items: [
                input,
                me.getNumberKeyBoards()
                //me.loadKeyBoard(me.defaultKeyboard)
                //me.getAbcKeyBoards()
            ]
        });
        me.input = input;
        me.items = form;
        me.callParent()
    },
    listeners: {
        boxready: function () {
            var me = this;
            me.inputDom = me.input.el.dom.querySelector("input");
            if (me.inputValue) {
                me.inputDom.selectionStart = me.inputValue.length
                me.inputDom.selectionEnd = me.inputValue.length
            }
        }
    },
    getButton: function (data) {
        var me = this;
        var button = Ext.create("Ext.button.Button", Ext.apply(data, {
            //ui: "keyboard",
            style: {
                backgroundColor: "blue"
            },
            bodyStyle: {
                backgroundColor: "blue"
            },
            //cls: "opacity1",
            scale: 'large',

            handler: "buttonHandler"

        }))
        return button;
    },
    loadKeyBoard: function (keyboardType) {
        var me = this;
        var form = me.down("form");
        var keyboard = form.getComponent("keyboard")
        if (keyboard) {
            form.remove(keyboard)
        }
        if (keyboardType == "123") {
            form.add(me.getNumberKeyBoards())
        }
        if (keyboardType == "abc") {
            form.add(me.getAbcKeyBoards(0))
        }
        if (keyboardType == "ABC") {
            form.add(me.getAbcKeyBoards(32))
        }
    },
    getNumberKeyBoards: function () {
        var me = this;

        me.setWidth(251)

        var container = Ext.create("Ext.Container", {
            margin: "30 0 0 0",
            defaults: {
                //flex: 10,
                width: 50,
                height: 50
            },
            itemId: "keyboard",
            layout: {
                type: "table",
                columns: 4,
                tdAttrs: {
                    style: 'padding: 5px;'
                }
            },
            items: [
                me.getButton({
                    glyph: 55,
                    inputValue: "7"
                }),
                me.getButton({
                    glyph: 56,
                    inputValue: "8"
                }),
                me.getButton({
                    glyph: 57,
                    inputValue: "9"
                }),
                me.getButton({
                    text: "⌫",
                    inputValue: "{del}"
                }),
                me.getButton({
                    glyph: 52,
                    inputValue: "4"
                }),
                me.getButton({
                    glyph: 53,
                    inputValue: "5"
                }),
                me.getButton({
                    glyph: 54,
                    inputValue: "6"
                }),
                me.getButton({
                    text: "→",
                    inputValue: "{right}"
                }),
                me.getButton({
                    glyph: 49,
                    inputValue: "1"
                }),
                me.getButton({
                    glyph: 50,
                    inputValue: "2"
                }),
                me.getButton({
                    glyph: 51,
                    inputValue: "3"
                }),
                me.getButton({
                    text: "←",
                    inputValue: "{left}"
                }),
                me.getButton({
                    glyph: 48,
                    inputValue: "0"
                }),
                me.getButton({
                    glyph: 46,
                    inputValue: "."
                }),
                me.getButton({
                    text: "Enter",
                    inputValue: "{Enter}",
                    colspan: 2,
                    width: "100%"
                }),
                me.getButton({
                    text: "abc",
                    colspan: 3,
                    width: "100%",
                    inputValue: "{abc}"
                })
            ]
        })
        return container;
    },
    getAbcKeyBoards: function (isCase) {
        var me = this;

        me.setWidth(670)

        var container = Ext.create("Ext.Container", {
            margin: "30 0 0 0",
            itemId: "keyboard",
            defaults: {
                width: 50,
                height: 50
            },
            layout: {
                type: "table",
                columns: 11,
                tdAttrs: {
                    style: 'padding: 5px;'
                }
            },
            items: [
                me.getButton({
                    glyph: 113 - isCase,
                    inputValue: isCase ? "Q" : "q"
                }),
                me.getButton({
                    glyph: 119 - isCase,
                    inputValue: isCase ? "W" : "w"
                }),
                me.getButton({
                    glyph: 101 - isCase,
                    inputValue: isCase ? "E" : "e"
                }),
                me.getButton({
                    glyph: 114 - isCase,
                    inputValue: isCase ? "R" : "r"
                }),
                me.getButton({
                    glyph: 116 - isCase,
                    inputValue: isCase ? "T" : "t"
                }),
                me.getButton({
                    glyph: 121 - isCase,
                    inputValue: isCase ? "Y" : "y"
                }),
                me.getButton({
                    glyph: 117 - isCase,
                    inputValue: isCase ? "U" : "u"
                }),
                me.getButton({
                    glyph: 105 - isCase,
                    inputValue: isCase ? "I" : "i"
                }),
                me.getButton({
                    glyph: 111 - isCase,
                    inputValue: isCase ? "O" : "o"
                }),
                me.getButton({
                    glyph: 112 - isCase,
                    inputValue: isCase ? "P" : "p"
                }),
                me.getButton({
                    text: "⌫",
                    inputValue: "{del}"
                }),
                {},
                me.getButton({
                    glyph: 97 - isCase,
                    inputValue: isCase ? "A" : "a"
                }),
                me.getButton({
                    glyph: 115 - isCase,
                    inputValue: isCase ? "S" : "s"
                }),
                me.getButton({
                    glyph: 100 - isCase,
                    inputValue: isCase ? "D" : "d"
                }),
                me.getButton({
                    glyph: 102 - isCase,
                    inputValue: isCase ? "F" : "f"
                }),
                me.getButton({
                    glyph: 103 - isCase,
                    inputValue: isCase ? "G" : "g"
                }),
                me.getButton({
                    glyph: 104 - isCase,
                    inputValue: isCase ? "H" : "h"
                }),
                me.getButton({
                    glyph: 106 - isCase,
                    inputValue: isCase ? "J" : "j"
                }),
                me.getButton({
                    glyph: 107 - isCase,
                    inputValue: isCase ? "K" : "k"
                }),
                me.getButton({
                    glyph: 108 - isCase,
                    inputValue: isCase ? "L" : "l"
                }),
                me.getButton({
                    text: "→",
                    inputValue: "{right}"
                }),
                me.getButton({
                    text: "CapsLock",
                    inputValue: "{bksp}",
                    colspan: 2,
                    xtype: "segmentedbutton",
                    width: "100%"
                }),
                me.getButton({
                    glyph: 122 - isCase,
                    inputValue: isCase ? "Z" : "z"
                }),
                me.getButton({
                    glyph: 120 - isCase,
                    inputValue: isCase ? "X" : "x"
                }),
                me.getButton({
                    glyph: 99 - isCase,
                    inputValue: isCase ? "C" : "c"
                }),
                me.getButton({
                    glyph: 118 - isCase,
                    inputValue: isCase ? "V" : "v"
                }),
                me.getButton({
                    glyph: 98 - isCase,
                    inputValue: isCase ? "B" : "b"
                }),
                me.getButton({
                    glyph: 110 - isCase,
                    inputValue: isCase ? "N" : "n"
                }),
                me.getButton({
                    glyph: 109 - isCase,
                    inputValue: isCase ? "M" : "m"
                }),
                me.getButton({
                    glyph: 46,
                    inputValue: "."
                }),
                me.getButton({
                    text: "←",
                    inputValue: "{left}"
                }),
                me.getButton({
                    text: "123",
                    inputValue: "{123}",
                    colspan: 2,
                    width: "100%"
                }),
                me.getButton({
                    text: " ",
                    inputValue: " ",
                    colspan: 7,
                    width: "100%"
                }),
                me.getButton({
                    text: "Enter",
                    inputValue: "{Enter}",
                    colspan: 2,
                    width: "100%"
                })
            ]
        })
        return container
    },
    eventFn: function (field) {
        var me = this;
        var inputEl = me.inputDom;
        var index = inputEl.selectionStart;
        var value = inputEl.value;
        me.input.focus()
        if (field.inputValue == "{left}") {
            inputEl.selectionStart -= 1;
            inputEl.selectionEnd = inputEl.selectionStart;
            return;
        }
        if (field.inputValue == "{right}") {
            inputEl.selectionStart += 1
            inputEl.selectionEnd = inputEl.selectionStart;
            return;
        }
        if (field.inputValue == "{del}") {
            inputEl.value = value.substring(0, index - 1) + value.substring(index, value.length)
            if (index != value.length) {
                inputEl.selectionStart = index - 1;
                inputEl.selectionEnd = index - 1;
            }
            return;
        }
        if (field.inputValue == "{Enter}") {
            me.okFn(value);
            me.close();
            return;
        }
        if (field.inputValue == "{abc}") {
            me.loadKeyBoard("abc");
            return;
        }
        if (field.inputValue == "{123}") {
            me.loadKeyBoard("123");
            return;
        }
        if (field.inputValue == "{bksp}") {
            if (me.isCase) {
                me.isCase = false
                me.loadKeyBoard("abc");
            } else {
                me.loadKeyBoard("ABC");

                me.isCase = true;
            }
            return;
        }
        if (field.inputValue.length = 1) {
            inputEl.value = value.substring(0, index) + field.inputValue + value.substring(index, value.length)
            inputEl.selectionStart = index + 1;
            inputEl.selectionEnd = index + 1;
            return;
        }

    },
    /*insertText:function(field){
     if(field.inputValue.length>1){
     return;
     }
     var me=this;
     var inputEl = me.inputDom;
     me.input.focus();
     var index = inputEl.selectionStart;
     var value = inputEl.value;
     inputEl.value= value.substring(0,index)+field.inputValue+value.substring(index,value.length)
     inputEl.selectionStart=index+1;
     inputEl.selectionEnd=index+1;
     }*/

});