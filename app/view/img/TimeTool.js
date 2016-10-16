Ext.define('editpic.view.img.TimeTool', {
    extend: 'editpic.view.img.BaseTool',

    layout: "absolute",

    refreshCanvas: function () {
        //console.log("clock refreshCanvas")
        var me = this;

        if (!me.contentPanel) {
            me.contentPanel = Ext.create("Ext.panel.Panel", {
                bodyStyle: {
                    backgroundColor: "transparent"
                },
                html: new Date().toLocaleDateString()
            })
            setInterval(function () {
                me.contentPanel.setHtml(new Date().toLocaleDateString())
            }, 60000)
            me.add(me.contentPanel);
        }
    },
    listeners: {
        el: {
            click: function () {
                var me = this.component;
                var oDate = new Date(); //实例一个时间对象；
                var year = oDate.getFullYear();   //获取系统的年；
                var month = oDate.getMonth() + 1;   //获取系统月份，由于月份是从0开始计算，所以要加1
                var date = oDate.getDate(); // 获取系统日，
                var hours = oDate.getHours(); //获取系统时，
                var min = oDate.getMinutes(); //分
                var seconds = oDate.getSeconds(); //秒
                var curDate = year + "-" + month + "-" + date;
                var curTime = hours + ":" + min + ":" + seconds;
                //alert(curDate+curTime);
                $.ajax({
                    type: "post",
                    url: "resources/main.php?par=setdate",
                    dataType: 'json',
                    data: "date=" + curDate + "&time=" + curTime,
                    success: function (res) {
                        Ext.Msg.alert("Massage","Change date success ,Server time " + curDate + " " + curTime + " .")
                    }
                });

            }
        }
    }
});
