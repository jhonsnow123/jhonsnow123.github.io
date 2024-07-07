var posts=["2024/07/05/hello-world/","2024/07/06/基本简介/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };