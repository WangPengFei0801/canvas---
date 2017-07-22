/**
 * Created by Administrator on 2017/5/10.
 */
// 帧工具类:获取每秒真实的fps和总帧数

(function () {
    window.FrameUtil = Class.extend({
        init : function () {

            // 1.起始的时间
            this.sTime = new Date();
            // 2.起始的帧数
            this.sFrame = 0;
            // 3.当前的总帧数
            this.currentFrame = 0;
            // 4.真实的fps
            this.realFps = 0;
        },

        // 获取每秒真实的fps(每一帧都要执行)
        render : function () {
            // 记录当前的帧数
            this.currentFrame ++;
            // 当前的时间
            var currentTime = new Date();

            // 判断是否走过了1秒
            if(currentTime - this.sTime >=1000){ // 走过了1秒
                // 计算真实的fps
                this.realFps = this.currentFrame - this.sFrame;
                // 更新起始的时间
                this.sTime = new Date();
                // 更新起始的帧数
                this.sFrame = this.currentFrame;
            }
        }
    });
})();