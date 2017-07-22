/**
 * Created by Administrator on 2017/5/10.
 */
(function () {
    window.Game = Class.extend({
        // 初始化的方法
        init : function (option) {
            option = option || {};
            //0.备份指针
            var self = this;
            //  1.fps
            this.fps = option.fps || 60;
            // 2.实例化帧工具
            this.frameUtil = new FrameUtil();
            // 3.获取画布和上下文
            this.canvas = document.getElementById(option.canvasId);
            this.context = this.canvas.getContext('2d');

            //4.实例化加载本地数据
            this.staticSourceUtil = new StaticSourceUtil();

            // 5.所有的数据
            this.allImageObj = {};
            // 5.加载数据
            //需要:所有的dom对象,图片的个数,已经加载好的图片个数
            this.staticSourceUtil.loadImage('r.json',function (allImageObj,imageCount,loadImageCount) {
                // 判断图片是否加载完毕
                if(imageCount == loadImageCount){
                    self.allImageObj = allImageObj;
                    //运行游戏
                    self.run();
                }
            });
            //5. 记录游戏是否正在运行
            this.isRun = true;
        },

        // 运行游戏
        run : function () {
            // 备份指针
            var self = this;

             // 0.运行游戏循环
             this.timer = setInterval(function () {
                 self.runLoop();
             },1000/self.fps); // fps :50   1000 /fps
            // 1000/self.fps 每一帧的时间

            // 1.创建房子
            this.fangzi = new Background({
                width : 300,
                height : 256,
                y : this.canvas.height - 256 - 100,
                image : this.allImageObj['fangzi'],
                speed : 2
            });

            // 2.创建树
            this.shu = new Background({
                width : 300,
                height : 216,
                y : this.canvas.height - 216 - 48,
                image : this.allImageObj['shu'],
                speed : 3
            });
            // 3.创建地板
            this.diban = new Background({
                width : 48,
                height : 48,
                y : this.canvas.height- 48,
                image : this.allImageObj['diban'],
                speed : 4
            });

            // 4.定义管道数组
            this.pipeArr = [new Pipe()];

            //5.创建鸟
            this.bird = new Bird();

        },

        // 游戏运行循环->每一帧都要执行
        runLoop : function () {
            // 0.清屏
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            // 1.计算真实的fps
            this.frameUtil.render();
            // 2.绘制fps
            this.context.fillText('FPS/'+this.frameUtil.realFps,15,15);
             // 3.绘制总帧数
            this.context.fillText('FNO/'+this.frameUtil.currentFrame,15,30);

            // 4.渲染和更新房子
            this.fangzi.update();
            this.fangzi.render();

            // 5.渲染和更新树
            this.shu.update();
            this.shu.render();

            // 6.渲染和更新地板
            this.diban.update();
            this.diban.render();

            // 7.实例化管道
            if(this.isRun &&this.frameUtil.currentFrame % 100 ==0){
                //每隔100帧创建一个管道
                this.pipeArr.push(new Pipe());
            }

            // 8.渲染和更新管道
            for (var i = 0; i < this.pipeArr.length; i++) {
                // 先更新
                this.pipeArr[i].update();
            }
            for (var i = 0; i < this.pipeArr.length; i++) {
                // 在绘制
                this.pipeArr[i].render();
            }

            // 9.渲染和更新鸟
            this.bird.update();
            this.bird.render();
        },

        // 暂停游戏
        pause : function () {
            clearInterval(this.timer);
        },

        // 游戏结束
        gameOver : function () {
            //0.游戏结束
            this.isRun = false;
            // 1.暂停背景
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            // 2.暂停管道
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].pause();
            }

            // 3.发出通知,告诉小鸟已经挂了
            game.bird.die = true;
        }
    });
})();