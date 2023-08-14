document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;
    let isAnimating = false;

    function goToPage(index) {
        if (index < 0 || index >= pages.length || isAnimating) {
            return;
        }

        isAnimating = true;
        const offset = -index * window.innerHeight;

        // 添加过渡结束事件监听器
        document.body.addEventListener('transitionend', function() {
            isAnimating = false;
            currentPageIndex = index;
            document.body.style.transition = ''; // 重置过渡样式
        }, { once: true });

        document.body.style.transition = 'transform 0.5s'; // 这里的s是动画持续时间
        document.body.style.transform = `translateY(${offset}px)`;
    }


    // 监听滚轮事件，根据滚轮方向调整页面
    function handleScroll(event) {
        event.preventDefault(); // 阻止默认滚动行为

        const delta = event.deltaY;
        if (delta > 0) {
            goToPage(currentPageIndex + 1);
        } else if (delta < 0) {
            goToPage(currentPageIndex - 1);
        }
    }

    // 添加滚轮事件监听
    document.addEventListener('wheel', handleScroll);
});

$(function () {
    $(".btn").click(function () {
        // this相当于指针，会根据鼠标自动跳
        $("#showrole1").attr("src",$(this).attr("imgurl"));
        // attr
    })
    $(".btn1").click(function () {
        $("#clothingcontainer1").attr("src",$(this).attr("imgurl"));
    })
    $(".btn2").click(function () {
        $("#showactivity1").attr("src",$(this).attr("imgurl"));
    })
})





