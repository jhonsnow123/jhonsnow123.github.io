var posts=["2024/07/19/TCP协议深度解读/","2024/08/12/Hexo博客美化-主题安装配置/","2024/07/18/Hexo-doc/","2024/07/06/基本资源分享/","2024/08/13/币圈入门第二天/","2024/08/13/币圈入门第一天/","2024/07/30/区块链知识-Layer0-Layer1-Layer2到底是什么/","2024/08/06/无人值守高度自定义的纯净-Windows-11-10-系统/","2024/08/06/最强免费安装office，永久使用/","2024/07/18/搭建hexo博客/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };