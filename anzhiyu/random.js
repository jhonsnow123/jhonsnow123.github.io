var posts=["2024/07/18/Hexo-doc/","2024/10/23/RedisUtil工具类/","2024/08/12/Hexo博客美化-主题安装配置/","2024/11/08/以注解的方式实现Redis会话token同步/","2024/10/23/Redis使用规范/","2024/07/30/区块链知识-Layer0-Layer1-Layer2到底是什么/","2024/09/22/值得珍藏的4K高清壁纸网站推荐/","2024/07/19/TCP协议深度解读/","2024/08/13/币圈入门第一天/","2024/08/28/常用工具代码组件/","2024/08/06/无人值守高度自定义的纯净-Windows-11-10-系统/","2024/08/13/币圈入门第二天/","2024/10/12/电报图床利用Cloudflare免费搭建/","2024/07/06/基本资源分享/","2024/10/11/若依框架新增自定义模块接口404问题/","2024/08/06/最强免费安装office，永久使用/","2024/07/18/搭建hexo博客/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };