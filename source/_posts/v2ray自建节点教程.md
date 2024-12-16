---
title: v2ray自建节点教程
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMZZztWa8RGr476kNq_KY7T1QABEnY_AALkxDEbuvDhVUm20OEoV0u9AQADAgADeAADNgQ
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-11-18 22:38:08
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
# 一、免费VPS白嫖：https://www.youtube.com/watch?v=E3z-T7d2jEI

# 二、Xshell连接并登录

# 三、搭建代码
```SHELL
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)

```
> 选择N，让脚本自动生成ip和账密

# 四、搭建完后，放行端口
```SHELL
iptables -I INPUT -p tcp --dport 12611 -j ACCEPT
iptables -I INPUT -p tcp --dport 443 -j ACCEPT
iptables -I INPUT -p tcp --dport 80 -j ACCEPT
#节点对应的端口也要放行

```
如果出现此提示代表完成
![x-ui_2024-11-18_22-46-23.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMXZztThM3mVJwr6wyHLJRm-_DDCOAAAtrEMRu68OFVs07ph3zgzZIBAAMCAAN4AAM2BA)


> 或者关闭防火墙
```shell
关闭防火墙：
sudo ufw disable
关闭防火墙： sudo ufw 禁用

查看防火墙状态：
sudo ufw status
```
# 五、登录X-UI面板，添加vmess
![vmess_2024-11-18_22-52-11.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMYZztUujnbigwDVcn-_tcRUB9oXDIAAt_EMRu68OFV2ZR5oYkJCxsBAAMCAAN5AAM2BA)
> 此处需登录vps，放行添加的端口 iptables -I INPUT -p tcp --dport 27950 -j ACCEPT

# 五、开启bbr加速
```SHELL
输入：> x-ui
选择：> 23. Enable BBR
如果成功则提示：> BBR has been enabled successfully.
```

参考文献：https://github.com/kjfx/v2ray1/releases/tag/3x-ui

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
