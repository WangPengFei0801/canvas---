/**
 * Created by Administrator on 2017/5/10.
 */
// 加载本地数据: 图片
(function () {
    window.StaticSourceUtil = Class.extend({
        init : function () {
            // 所有的dom对象
            this.allImageObj = {};
        },

        // 加载图片数据
        // 返回:所有的dom对象,图片的个数,已经加载好的图片个数
        loadImage : function (jsonUrl,callback) {
            // 0.备份指针
            var self = this;
            // 1.创建请求对象
            var xhr = new XMLHttpRequest();
            // 2.Ajax三步走
            xhr.open('get',jsonUrl);// 设置请求类型,请求路径
            xhr.send();// 发送请求
            // 判断是否请求成功
            xhr.onreadystatechange=function()
            {
                // 当 readyState 等于 4 且状态为 200 时，表示响应已就绪
                if (xhr.readyState==4 && xhr.status==200)
                {
                    // 00 已经加载好的图片个数
                    var loadImageCount = 0;
                    // 01获取请求数据(json数据)
                    var responseText = xhr.responseText;
                    // 02json数据->对象 解析数据
                    var responseJson = JSON.parse(responseText);
                    // 03获取数组
                    var dataArr = responseJson.images;
                    // 04遍历数组
                    for (var i = 0; i < dataArr.length; i++) {
                        // 05.创建图片dom对象
                        var image = new Image();
                        image.src = dataArr[i].src;
                        image.index = i;
                        
                        // 图片对象加载完毕后,保存对象返回
                        image.onload = function () {
                            // 记录已经加载好的图片个数
                            loadImageCount++;
                            // 保存对象 {name : image}
                            var key = dataArr[this.index].name;
                            // this->image
                            self.allImageObj[key] = this;
                            callback(self.allImageObj,dataArr.length,loadImageCount);
                        }
                    }
                }
            }
        }
    });
})();