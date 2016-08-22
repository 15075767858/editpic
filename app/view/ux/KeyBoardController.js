Ext.define('editpic.view.ux.KeyBoardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ux-keyboard',
    buttonHandler:function(field){
        var me=this.view;

        var controller=this;
        me.eventFn(field)
        //me.insertText(field)
        //console.log(arguments)
    }

});
