function startSearch(){
		var contentText = document.getElementById("content").value;
		//"https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&wd="这个地址就是搜索内容地址，将搜索内容获取放入地址，就实现搜索了
		var searchAddress = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&wd="+contentText;
		window.location.href = searchAddress;
	}
	//js回车监听事件
	document.onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode===13) { 
            document.getElementById("enter").click();
        }
    }
