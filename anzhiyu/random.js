var posts=["2024/07/18/Hexo-doc/","2024/07/06/基本简介/","2024/07/19/TCP协议深度解读/","2024/08/06/无人值守高度自定义的纯净-Windows-11-10-系统/","2024/07/30/区块链知识-Layer0-Layer1-Layer2到底是什么/","2024/07/18/搭建hexo博客/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };