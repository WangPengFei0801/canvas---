/**
 * Created by Administrator on 2017/5/10.
 */
// 专门处理背景相关
(function () {
    window.Background = Class.extend({
        init : function (option) {
            option = option || {};
            // 图片
            this.image = option.image;
            // 位置
            this.x = 0;
            this.y = option.y || 0;
            // 宽高
            this.width = option.width || 0;
            this.height = option.height || 0;
            // 绘制的总个数
            this.count = parseInt(game.canvas.width/this.width) + 1;
            // 速度
            this.speed = option.speed || 1;

        },
        // 绘制
        render : function () {
            for (var i = 0; i < 2*this.count; i++) {
                // 绘制对应的图片dom对象
                game.context.drawImage(this.image,this.x+this.width*i,this.y,this.width,this.height);
            }
        },

        // 更新
        update : function () {
            // 更新x
            this.x -= this.speed;
            // 判断全部移出画布,复位
            if(this.x <= -this.count*this.width){
                this.x = 0;
            }

        },
        // 暂停
        pause : function () {
            this.speed = 0;
        }
    });
})();