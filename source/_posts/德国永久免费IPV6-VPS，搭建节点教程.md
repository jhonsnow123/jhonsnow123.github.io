---
title: 德国永久免费IPV6-VPS，搭建节点教程
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOFaApXS2WABergPiwh5cAG1biXItYAAlPDMRsBbFhUvBiZGF_r0LkBAAMCAAN4AAM2BA
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-04-24 00:19:27
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
# 介绍
Euserv提供永久免费的纯IPv6 VPS，只需一个邮箱即可申请。算是唯一一个没有任何门槛就能够使用的永久免费服务器了。缺点就是配置比较低，然后申请需要过审核。
一个账号可以开三个免费VPS。每个月需要续期一次，可以配置自动续期。
续期如图：

![image](https://pic.shenxing.win/i/55e1a840-2929-488d-b98e-edadd582895b.jpg)
![image](https://pic.shenxing.win/i/0d160c98-00d3-4710-b602-35e81848e066.jpg)
![image](https://pic.shenxing.win/i/5d7f0fb1-e5e8-4f00-94d2-38af12b4741c.jpg)


# 准备工作
1. 测试本地是否有IPV6 ： http://test-ipv6.com/  或者用这个网址：https://ip.zxinc.org/ipquery/
2. 本地无IPV6时候，通过网页SSH进行连接：https://ssh.090227.xyz/
> 备注：不建议安装x-ui面板，x-ui目前不维护，在euserv上安装很不稳定，我测试过节点不好用，且经常cpu占用100%。建议ArgoX脚本
# 一、安装warp
用SSH登录后

第一步输入
```shell
echo -e "nameserver 2001:67c:2b0::4\nnameserver 2001:67c:2b0::6" > /etc/resolv.conf
```
第二步安装wget、curl
```shell
#Centos

yum update && yum install -y wget curl

#Debian

apt update && apt install wget curl -y

#Ubuntu

apt-get update && apt-get install wget -y
```
第三步安装WARP
能够让IPV6机子能访问IPV4的网络
cloudflare warp项目地址：https://gitlab.com/fscarmen/warp
一键安装命令：
```shell
wget -N https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh && bash menu.sh [option] [lisence/url/token]
```
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN9aAkmwvkzST34rSvtAAG8K7OptlCYAAILwjEbwHxIVMmEkt8dhUkjAQADAgADdwADNgQ)

# 二、安装Argox脚本
项目地址：https://github.com/fscarmen/ArgoX

一键安装脚本：
```shell
bash <(wget -qO- https://raw.githubusercontent.com/fscarmen/argox/main/argox.sh)
```
基本选择模块如图：
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOBaAm1RqJjkocxHIu5-9c4KCxukWEAAp7BMRsBbFBUI5cdqJk-clYBAAMCAAN4AAM2BA)

Argo 开启 成功

成功则出现如下界面：
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN_aAkuDL2HhsYea_CNMMld3WaV2K0AAhHCMRvAfEhUkt30HF79xAgBAAMCAAN4AAM2BA)

配置tunnel
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOCaAm4nJVvTgama8IDfQJy7-MMpPQAAqnBMRsBbFBUWhYDoJp6QJgBAAMCAAN5AAM2BA)

最后v2rayN可以跳转为自己的优选域名
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOAaAkuV4KfnAmRuWwDp2ReUhb4l3UAAhLCMRvAfEhUnnoTjjYH6zQBAAMCAAN5AAM2BA)

参考文献：
https://tweek.top/archives/1702376580184
视频教程：https://youtu.be/5iWN5L8LpLo

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
