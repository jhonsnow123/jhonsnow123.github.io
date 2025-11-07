---
title: 新手搭建S-UI教程
cover: https://pic.shenxing.win/i/8111961d-415a-4d26-9511-ab1e6e6bde08.jpg
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-08-19 11:55:02
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
# 前序
本文参考不良林大佬教程安装。
视频参考连接：https://www.youtube.com/watch?v=MgtOAVOXBWo

## 1、vps安装S-UI
VERSION=1.2.2 && bash <(curl -Ls https://raw.githubusercontent.com/alireza0/s-ui/$VERSION/install.sh) $VERSION

## 2、Reality目标域名
### 2.1 脚本执行成功后，保存地址以及登录账号和密码
![image](https://pic.shenxing.win/i/c7cfcfdd-1aea-47b3-be33-a7a1466b5994.jpg)

### 2.2、打开新的本地Windows窗口
执行如下命令：
```shell

ssh -L 2095:127.0.0.1:2095 root@8.212.168.128
  ////////////////////////root@服务器IP

```
如下提示，说明连接成功
![image](https://pic.shenxing.win/i/f5151f66-c9f2-436a-ab04-dae0154d4628.jpg)

### 2.3、打开浏览器输入http://127.0.0.1:2095/app 进行用户名密码登录
#### 2.3.1配置TLS

![image](https://pic.shenxing.win/i/46dc14c6-9b63-4f5f-a681-7c546d450845.jpg)

![image](https://pic.shenxing.win/i/463b55c4-aa2c-4ec5-8d1a-f925f976e717.jpg)
在vps执行如下其中一个脚本，找延迟低的域名
```shell
for d in downloaddispatch.itunes.apple.com www.intel.com polyfill-fastly.io res.public.onecdn.static.microsoft j.6sc.co assets.adobedtm.com api.company-target.com a0.awsstatic.com c.6sc.co is1-ssl.mzstatic.com ; do t1=$(date +%s%3N); timeout 1 openssl s_client -connect $d:443 -servername $d </dev/null &>/dev/null && t2=$(date +%s%3N) && echo "$d: $((t2 - t1)) ms" || echo "$d: timeout"; done
```
或者
```shell
for d in www.bing.com d1.awsstatic.com www.microsoft.com go.microsoft.com ts4.tc.mm.bing.net ce.mf.marsflag.com beacon.gtv-pub.com www.sony.com ipv6.6sc.co snap.licdn.com ; do t1=$(date +%s%3N); timeout 1 openssl s_client -connect $d:443 -servername $d </dev/null &>/dev/null && t2=$(date +%s%3N) && echo "$d: $((t2 - t1)) ms" || echo "$d: timeout"; done

```

sni和handshake server 填写执行检测出延迟较小的域名。
![image](https://pic.shenxing.win/i/4bd485be-3e45-4abe-81d7-82423fc9c129.jpg)

#### 2.3.2 配置入栈
![image](https://pic.shenxing.win/i/f8d1f41e-fe8e-4ee6-b57a-96ad8ddc4642.jpg)
hy2配置
![image](https://pic.shenxing.win/i/dd73410f-6957-4a5b-b33f-89e20deecc2c.jpg)

#### 2.3.3 添加用户

![image](https://pic.shenxing.win/i/bb34305d-2dfd-4406-acff-020043b2a816.jpg)

![image](https://pic.shenxing.win/i/e85972ef-102e-452d-870d-a6a66345db40.jpg)

## 3、推荐代理工具

Windows/Mac（v2rayN）：https://github.com/2dust/v2rayN/releases/tag/7.12.7
Android（NekoBox）：https://github.com/MatsuriDayo/NekoBoxForAndroid/releases/tag/1.3.9
IOS/Mac（shadowrocket）：https://apps.apple.com/app/shadowrocket/id932747118

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
