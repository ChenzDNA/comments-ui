# 嵌入已有的系统中

具体部署完成的样式可以参考[我的博客](https://www.chenz.icu/post/Qpcv2CRwU/)

1. 部署 CommentS 前端。

2. 在 parent frame 里嵌入如下代码：

注意把 `<url to your CommentS frontend>` 替换成你的 CommentS 前端 url
```html
<iframe id="commentsFrame" src="<url to your CommentS frontend>" style="width: 100%;border: none;"></iframe>
<script>
    const commentsFrame = document.getElementById('commentsFrame')
    let rec = false
    window.addEventListener('message', (e) => {
        if (commentsFrame.src.startsWith(e.origin) && typeof e.data == 'number') {
            rec = true
            commentsFrame.setAttribute('height', e.data + 1)
        }
    })

    function send() {
        if (rec) {
            return
        }
        let a = location.pathname.split('/')
        a.pop()
        // context 为区分每个评论所在的文章，这里是取 pathname 的最后一部分。
        // 根据不同的系统，你也可以自定义为其他值，比如说 param 中的某个值。
        let context = a.pop()
        window.frames[0].postMessage(`${location.origin}\n${context}`, commentsFrame.src)
        setTimeout(send, 1000)
    }

    setTimeout(send, 1000)
</script>
```