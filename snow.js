
// --------------- 【创建雪花】 ----------------
// ------------ 页面上随机生成雪花效果 ----------

/* 
整体思路：
    第一步：创建雪花，每次生成一个div元素，作为一片雪花
    第二步：随机样式，为雪花设置随机样式，位置、大小、飘落时间
    第三步：放置雪花，把雪花放在网页中
    第四步：触发动画，设置雪花初始位置和结束位置，实现飘落效果
    第五步：融化效果，动画结束后，删除雪花，实现融化效果
    第六步：持续生成，使用定时器，持续生成雪花
        ---> setInterval 实现定时器
*/

// 设置点击雪花后的话
let messages = [
    "🎄 圣诞快乐",
    "✨ 捧在手心的不是平安果,而是你的笑脸",
    "❄️ 两处相思同淋雪,此生也算共白头",
    "🎁 你是信的开头,诗的内容,童话的结尾",
    "💌 再有一万年深情也不变",
    "💕 美丽的小姐,我叫Boon GGB",
    "💕 恁咋不早说，咱俩谋以后",
    "💕 你犯了罪，偷了我的心"
];

function my_snow(){
    /* -------------- 第一步：创建雪花 ----------- */
    let snow = document.createElement('div');
    snow.className = "snow";
    snow.innerHTML = "❄";
    // // 将雪花放在网页中
    // document.body.appendChild(snow);

    /* --------------第二步：随机样式 ----------- */
    // 获取当前窗口大小
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    
    // 随机生成雪花的参数
    let startLeft = Math.random() * winWidth;   // 雪花起始横向位置
    let endLeft = Math.random() * winWidth;     // 雪花结束横向位置
    let size = 10 + Math.random() * 20;
    let duration = 4000 + Math.random()*6000;   // 雪花飘落时间

    // 设置初始样式
    snow.style.left = startLeft + "px";        // left 基于元素的绝对定位
    snow.style.fontSize = size + "px";
    snow.style.transition = duration + "ms linear";

    /* --------------第三步：放置雪花 ----------- */
    document.body.appendChild(snow);

    // --------------------------
    // 【优化一】鼠标放在雪花上停止
    // --------------------------
    snow.addEventListener("mouseenter", function(){
        // 获取当前位置
        let pos = snow.getBoundingClientRect();
        snow.style.left = pos.left + "px";
        snow.style.top = pos.top + "px";
    });

    // --------------------------
    // 【优化二】鼠标移出雪花继续飘落
    // --------------------------
    snow.addEventListener("mouseleave", function(){
        snow.style.top = winHeight-30 + "px";
        snow.style.left = endLeft + "px";
    });

    // --------------------------
    // 【优化三】鼠标点击雪花，变成一句话
    // --------------------------
    snow.addEventListener("click", function(){
        // 随机选一句话
        let text = messages[Math.floor(Math.random()*messages.length)];
        snow.innerText = text;
        snow.style.whiteSpace = "nowrap";
    });


    // 强制浏览器绘制每一片雪花
    snow.offsetHeight;  /* 强制回流 reflow */
    /* --------------第四步：触发动画 ----------- */
    // 使用 setTimeout 实现飘落效果，0 表示雪花一旦生成，就开始下落
    setTimeout(function(){
        snow.style.left = endLeft + "px";
        snow.style.top = winHeight-30 + "px";
    }, 0)

    /* --------------第五步：融化效果 ----------- */
    setTimeout(function (){
        snow.remove();
    }, duration+5000)

}
my_snow();


/* -------------- 第六步：持续生成 ----------- */
let interval = 200;
setInterval(my_snow, interval);


// --------------- 【视频播放控制】 ----------------
// -------------- 点击按钮后，播放视频 --------------
// 定义视频编号
let videoIndex = 1;
let maxVideo = 8;
// 获取按钮和视频标签
let bgVideo = document.getElementById("bgVideo");
let switchBtn = document.getElementById("switchBtn");

// 点击切换
switchBtn.onclick = function (){
    videoIndex ++;
    if (videoIndex > maxVideo){
        videoIndex = 1;
    }
    bgVideo.src = "./vedio/t" + videoIndex + ".mp4";
    bgVideo.play();
};


// --------------- 【音频播放控制】 ----------------
// -------------- 点击按钮后，播放音乐 --------------
// 获取按钮和音频标签
let musicBtn = document.getElementById("musicBtn");
let bgMusic = document.getElementById("bgMusic");

musicBtn.onclick = function(){
    if(bgMusic.paused){
        bgMusic.play();
        musicBtn.innerText = "暂停音乐";
    }else{
        bgMusic.pause();
        musicBtn.innerText = "播放音乐";
    }
};

