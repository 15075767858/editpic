Ext.define('editpic.view.EventAlarm.SelectKeyWinodwController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventalarm-selectkeywinodw',
    onFilterUp: function (field, newValue) {
        var tree = this.view.down('treepanel');
        var store = tree.store;
        var filters = store.getFilters()
        if (field.value) {
            this[field.nameFilter] = filters.add({
                filterFn: function (item) {
                    var data = item.data;
                    if (data.depth != 3) {
                        if(item.childNodes.length>0){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    var value = item.data[field.filterName];
                    if (value) {
                        return value.indexOf(newValue) > -1;
                    } else {
                        return true;
                    }
                }
            })
        } else {
            filters.remove(this[field.nameFilter])
            this[field.nameFilter] = null;
        }
    }
});
