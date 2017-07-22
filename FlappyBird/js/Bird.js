/**
 * Created by Administrator on 2017/5/10.
 */
(function () {
    window.Bird = Class.extend({
        init : function () {

            this.width = 85;
            this.height = 60;
            this.x = (game.canvas.width-this.width)*0.5;
            this.y = 100;
            // 翅膀的状态 合法值 : 0, 1,2
            this.wing = 0;

            //下落的增量
            this.dy = 0;
            //下落的帧数
            this.dropFrame = game.frameUtil.currentFrame;
            //下落的角度
            this.rotateAngle = 0;
            //小鸟的状态 0 下落 1上升
            this.state = 0;

            //绑定事件
            this.blindClick();

            //空气的阻力
            this.deleteY = 1;
            //小鸟的死亡状态
            this.die = false;
            //死亡动画的索引
            this.dieAnimationIndex = 0;

        },

        render : function () {
            //鸟挂了,抛热血
            if(this.die == true){
                // 绘制热血
                var sWidth = 1625/5;
                var sHeight = 828 /6;
                // 求出行号和列号
                var row = parseInt(this.dieAnimationIndex/5);
                var col = this.dieAnimationIndex%5;

                game.context.drawImage(game.allImageObj['blood'],col*sWidth,row*sHeight,sWidth,sHeight,this.x-100,this.y,sWidth,sHeight);

                // 绘制游戏结束
                var gameOverX = (game.canvas.width-626)*0.5;
                var gameOverY = (game.canvas.height-144)*0.5;

                game.context.drawImage(game.allImageObj['gameover'],gameOverX,gameOverY);
                return;
            }

            // 保存状态
            game.context.save();
            // 位移
            game.context.translate(this.x+this.width*0.5,this.y+this.height*0.5);
            // 旋转
            game.context.rotate(this.rotateAngle*Math.PI/180);
            // 复位
            game.context.translate(-(this.x+this.width*0.5),-(this.y+this.height*0.5));
            // 绘制
            game.context.drawImage(game.allImageObj['bird'],this.wing*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            //还原
            game.context.restore();

        },

        update : function () {
            // 更新抛热血
            if(this.die== true){
                this.dieAnimationIndex++;
                if(this.dieAnimationIndex>=30){
                    game.pause();
                }
                return; //不要忘记了
            }

            // 1.每隔5帧更新翅膀的状态
            if(game.frameUtil.currentFrame%5==0){
                // 更新小鸟的状态
                this.wing++;
                if(this.wing > 2) {
                    this.wing = 0;
                }
            }

            // 2.根据小鸟的状态判断是下落还是上升
            if(this.state == 0){// 下落
                // 2.下落
                // Math.pow(2,3) 2^3,模拟一个越来越大的值
                this.dy = 0.01*Math.pow(game.frameUtil.currentFrame-this.dropFrame,2);
                // 更新下落的角度
                this.rotateAngle += 1;
            } else if(this.state == 1){//上升
                // 阻力越来越大
                this.deleteY++;
                // 默认的冲力是-15
                this.dy = -15 + this.deleteY;

                if(this.dy>=0){ //下落
                    // 改变小鸟的状态
                    this.state = 0;
                    //更新下落的帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }

            // 3.更新y
            this.y += this.dy;

            //4.封锁上空
            if(this.y<=0){
                this.y = 0;
            }

            //5.碰到地板,游戏结束
            if(this.y>=game.canvas.height-this.height-48){
                game.gameOver();
            }
        },

        blindClick : function () {


            //备份指针
            var self = this;
            game.canvas.onmousedown = function () {
                // 1.改变小鸟的状态
                self.state = 1;
                //2.更新旋转的角度
                self.rotateAngle = -25;
                //3.让空气的阻力复位
                self.deleteY = 1;
            }
        }
    });
})();