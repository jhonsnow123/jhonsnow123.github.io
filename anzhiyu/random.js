var posts=["2024/07/18/Hexo-doc/","2024/07/06/基本简介/","2024/07/18/搭建hexo博客/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };