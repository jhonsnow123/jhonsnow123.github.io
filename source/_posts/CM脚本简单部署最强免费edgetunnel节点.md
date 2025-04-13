---
title: CM脚本简单部署最强免费edgetunnel节点
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN0Z_J39Y1BncMdIyqI6gr1Xw8Z0SsAAum_MRuCiphX1kLVm5t5fOkBAAMCAAN4AAM2BA
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-03-31 23:18:05
updated:
tags:
categories:
keywords:
description:
top:
top_img:
comments:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
ai:
---
这是一个基于 CF Worker 平台的脚本，在原版的基础上修改了显示 VLESS 配置信息转换为订阅内容。使用该脚本，你可以方便地将 VLESS 配置信息使用在线配置转换到 Clash 或 Singbox 等工具中。
 
# 一、准备条件
1. cloudflare 账号
2. GitHub账号
3. 免费域名（如:）

# 二、fork脚本代码
CM脚本：https://github.com/cmliu/edgetunnel
fork到自己目录并改名，因为edgetunnel容易被cloudflare识别
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANfZ_IVkLD_HuLreVPUg05U8C3J4EYAAunJMRuCipBXnSdPO9W2yYUBAAMCAAN5AAM2BA)

![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANgZ_IV-YCXnxunRME5CvjdcbX14KcAAu7JMRuCipBXbGCp0jMBjQcBAAMCAAN4AAM2BA)

# 三、cloudflare部署GitHub脚本
1. 打开cloudflare创建pages
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANhZ_IYMNzanjKeP89sZa79-RtW7yMAAvfJMRuCipBXlBzBOhITCaUBAAMCAAN5AAM2BA)
2. 连接到git并部署刚才创建的项目
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANiZ_IYhBT99MyLGueaInVfAs7006UAAvjJMRuCipBX_jpJ67wsLF4BAAMCAAN4AAM2BA)
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANjZ_IZNFZ_KJq4eFTTnnFihjEbVZwAAvnJMRuCipBXadRRJtbA-sYBAAMCAAN5AAM2BA)
3. 设置构建和部署（注：项目名称前往不要用edgetunnel字眼，其它的都可以）
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANkZ_IasETJoWJTGu-8STbG3cTfoKMAAvrJMRuCipBXMyqWw4B599YBAAMCAAN5AAM2BA)
等待部署完成。
后打开域名进行查看
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANlZ_IbrgouBFvN_SeBbnypK6MAAbzOAAL-yTEbgoqQV28XKOWuTm50AQADAgADeAADNgQ)
出现设置你的UUID变量说明成功。
4. 设置UUID（可输入任意值(非UUIDv4标准的值会自动切换成动态UUID)）
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANmZ_IcuWHlPjbj0Sdpv4Bu0xPZEJIAAgHKMRuCipBX-avjC-8dxCoBAAMCAAN5AAM2BA)
5. 设置自定义域名
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANnZ_IdWzDo5eAV6YKX7QY55fGEVIgAAgPKMRuCipBXWX0bPj1Gn64BAAMCAAN5AAM2BA)
# 三、测试并访问
1. 打开自定义连接
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANoZ_Id1mrQf2WCektYwZHCesG6N5EAAgbKMRuCipBX-OQnmFL5Y6cBAAMCAAN4AAM2BA)
2. 在浏览器自定义域增加之前添加的uuid值(/santi)获取订阅连接
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANpZ_IeYXnetLPVw35-rNeSo8qR048AAgfKMRuCipBXhWmPBeoo6pEBAAMCAAN4AAM2BA)

3. 在v2rayN创建分组并订阅
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANqZ_Ieuq4GlpFpiYygfL-9hwFQByAAAgjKMRuCipBXAAGS-ezgLYTsAQADAgADeAADNgQ)

# X附加内容，优选IP方式
1. 存储和数据库-> KV 创建命名空间
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANrZ_Io8Pt38Vaa6V_XkUN2WeJ-lQ8AAibKMRuCipBXeoU8e8XTRTQBAAMCAAN5AAM2BA)
2. 进入pages -> 设置 -> 绑定 添加KV命名空间 -> 保存
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANsZ_Ipu5MMiSBppGTAtdzk-214Y0wAAijKMRuCipBXskhqyg-4oIABAAMCAAN5AAM2BA)
3. 重试部署使其生效
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANuZ_IqQomYz1NM6l2Y5JBPBf_0gPgAAi7KMRuCipBXpM86PSWyiDQBAAMCAAN5AAM2BA)
出现了优选列表
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANvZ_IrUTdkc4iSrWkCPI1a5SMxWRwAAjrKMRuCipBXnKxemjFD6icBAAMCAAN4AAM2BA)
4. 通过此网址https://cf.090227.xyz/ 选择优选IP，将优选IP和优选域名填入
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANxZ_JzYdWOzwqUqPsVuxGJcQpDW6YAAuC_MRuCiphXpHTpjAfV_gMBAAMCAAN4AAM2BA)
具体地址参考：https://vercel.blog.cmliussss.com/p/CloudFlare%E4%BC%98%E9%80%89/
5. 进入v2rayN,订阅分组->更新当前订阅(不通过代理)
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANyZ_JzmRmKiroBr2SUMMrIOHIMLygAAuG_MRuCiphXSb04kmoMt04BAAMCAAN5AAM2BA)
最终出来的都是优选IP和域名

<div class="video-container">
[up主专用，视频内嵌代码贴在这]
</div>

<style>
.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio (height/width = 9/16 * 100%) */
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
