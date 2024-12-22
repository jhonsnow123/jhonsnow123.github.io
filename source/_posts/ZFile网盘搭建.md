---
title: ZFile网盘搭建
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMfZ2ggO1GKfpxfZWoAAWy45wizN96sAAKawTEboJBBV2mB_x4RWBYpAQADAgADeAADNgQ
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-12-22 22:00:58
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
# 前言
ZFile 是一个适用于个人的在线网盘(列目录)程序，可以将你各个存储类型的存储源，统一到一个网页中查看、预览、维护，再也不用去登录各种各样的网页登录后管理文件，现在你只需要在 ZFile 中使用。你只需要填写存储源相关信息，其他的令牌刷新，授权都是尽量自动化的，且有完善的文档帮助你使用。

支持对接 S3、OneDrive、SharePoint、Google Drive、多吉云、又拍云、本地存储、FTP、SFTP 等存储源
支持在线浏览图片、播放音视频，文本文件、Office、obj（3d）等文件类型。

# Demo
https://demo.zfile.vip/local-demo

# docker安装脚本
```SHELL
bash <(curl -sSL https://cdn.jsdelivr.net/gh/SuperManito/LinuxMirrors@main/DockerInstallation.sh)
```
# docker-compose安装脚本
```SHELL
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose
```
> 如果docker无法使用参考这篇文章
https://www.ywsj365.com/archives/guo-nei-fu-wu-qi-ru-he-jie-jue-docker-wu-fa-la-qu-jing-xiang-de-wen-ti

一、登录VPS创建docker-compose.yml文件
```SHELL
mkdir zfile_wangpan;cd zfile_wangpan  #创建一个目录，并进入此目录
```
```SHELL
vim docker-compose.yml
```
```SHELL
version: '3.9'
services:
    zfile:
        image: zhaojun1998/zfile
        volumes:
            - './zfile/file:/data/file'   #这里是文件目录映射后面会用到
            - './zfile/logs:/root/.zfile-v4/logs'
            - './zfile/db:/root/.zfile-v4/db'
        ports:
            - '8080:8080'   #左侧的端口可以自定义
        restart: always
        container_name: zfile
```
# 二、执行容器运行命令
```SHELL
docker-compose up -d #运行容器
```
```SHELL
docker-compose ps  #查看是否开启成功
```
```SHELL
docker-compose ps 
WARN[0000] /root/zfile_wangpan/docker-compose.yml: `version` is obsolete 
NAME      IMAGE               COMMAND                  SERVICE   CREATED          STATUS          PORTS
zfile     zhaojun1998/zfile   "/bin/sh -c 'java $J…"   zfile     44 seconds ago   Up 42 seconds   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp
```
# 打开web页面使用
成功以后需要打开自己相应的端口(8080)防火墙就可以web端访问了
```SHELL
http://ip:8080  #打开自己VPS的端口加ip进入web页面
```
![ZF_2024-12-22_22-14-40.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMdZ2gfGUWZLyWGeRgBZ1zP7AXKGFAAApHBMRugkEFXqJ3hoOVMiKABAAMCAAN4AAM2BA)

初始化以后就可以使用了
注意本地存储填写/data/file
![ZF_2024-12-22_22-15-02.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMeZ2gfQadTP-wMQ6kSIjOMcyCWlO8AApLBMRugkEFXJw6RzhGkAAFEAQADAgADeAADNgQ)



> 参考连接
https://www.ywsj365.com/archives/zfile-wang-pan-da-jian-jiao-cheng

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
