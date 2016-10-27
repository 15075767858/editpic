Ext.define('editpic.view.tool.PublishPic', {
    alternateClassName: [
        "My.util.PublishPic"
    ],

    /*extend: 'Ext.panel.Panel',

     requires: [
     'editpic.view.tool.PublishPicController',
     'editpic.view.tool.PublishPicModel'
     ],

     controller: 'tool-publishpic',
     viewModel: {
     type: 'tool-publishpic'
     },*/

    singleton: true,
    run: function () {
        console.log(this)
        this.getSubscribe();
    },
    subscribeItems: null,
    getSubscribeItems: function () {
        var items = Ext.getCmp('mintab').getCurrentTab().items.items[0].getSubscribeItems();
        this.subscribeItems = items;
        return items;
    },
    getSubscribeIpsDevNames: function (subIp) {
        /*
         获得可以订阅的ip 以及相关ip的devname
         返回值格式
         {ip:[],
         ip:[]
         }
         */
        var items = this.getSubscribeItems();
        var ips = [];
        for (var i = 0; i < items.length; i++) {
            ips.push(items[i].ip);
        }

        var resJson = {};
        for (var i = 0; i < ips.length; i++) {
            var ip = ips[i]
            var arr = [];
            for (var j = 0; j < items.length; j++) {
                if (items[j].ip == ip) {
                    var devname = items[j].nodename.substr(0, 4) + ".8.*";
                    arr.push(devname)
                }
            }
            if (arr.length > 0) {
                resJson[ip] = arr.unique1();
            }
        }
        if (subIp) {
            var json = {}
            json[subIp] = resJson[subIp]
            return json;
        }
        return resJson;
    },
    getSubscribe: function (subIp) {
        var me = this;
        var ips = this.getSubscribeIpsDevNames(subIp);
        for (var ip in ips) {
            var subnodes = Ext.encode(ips[ip]);
            var data = {
                params: {
                    subnodes: subnodes
                },
                timeout: 14500,
            };
            if (location.hostname == ip) {
                data.url = "resources/subscribe.php";
                data.success = function (response) {
                    try {
                        var resJson = Ext.decode(response.responseText)
                        if (resJson.success) {
                            me.subscribeSuccess(resJson.info)
                        }
                    } catch (e) {
                        throw new Error(e)
                        console.log(e)
                        return;
                    }
                }
                Ext.Ajax.request(data);
            } else {
                data.url = "http://" + ip + "/graph/resources/subscribe.php";
                data.success = function (response) {
                    if (response.success) {
                        me.subscribeSuccess(response.info)
                    }
                }
                Ext.data.JsonP.request(data);
            }
        }
    },
    subscribeSuccess: function (resJson) {
        /*
         当订阅有返回值的时候处理函数
         */
        var me = this;
        var arr = resJson.value.split("\r\n");
        var ip = resJson.ip;
        console.log(arr)
        if (arr.length != 3) {
            console.log("length ! = 3");
            return;
        }

        for (var i = 0; i < me.subscribeItems.length; i++) {
            var img = me.subscribeItems[i];
            if (img.ip == ip & img.nodename == arr[0] & img.type == arr[1]) {
                img.setLinkValue(arr[2]);//成功后设置值
                me.getSubscribe(img.ip);//得到订阅返回值后继续订阅
            }
        }
        console.log(me)

    }
});
