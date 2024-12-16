---
title: pixel手机连接wifi网络受限问题
cover: https://img.090227.xyz/file/ae62475a131f3734a201c.png
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-12-08 23:00:53
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
1、什么是adb
ADB 全称为 Android Debug Bridge，起到调试桥的作用，是一个客户端-服务器端程序。其中客户端是用来操作的电脑，服务端是 Android 设备。

ADB 也是 Android SDK 中的一个工具，可以直接操作管理 Android 模拟器或者真实的 Android 设备。

2、为什么要用adb
运行设备的 shell(命令行)
管理模拟器或设备的端口映射
计算机和设备之间上传/下载文件
可以对设备的应用进行卸载安装等
在 App 遇到 ANR/Crash 等 bug 时，可以通过 ADB 来抓取日志

简而言之，ADB 就是连接 Android 手机与 PC 端的桥梁，所以ADB又称为安卓调试桥（注意：是安卓，不是iOS），可以让用户在电脑上对手机进行全面的操作！


问题产生的原因：海外机器会使用wifi向服务器发送请求，用于校验wifi状态
解决办法：修改校验服务器地址

1. 确认电脑上装了adb

2. 挨个执行以下命令

adb shell settings delete global captive_portal_mode

adb shell settings put global captive_portal_mode 0
adb shell settings get global captive_portal_mode

adb shell settings delete global captive_portal_https_url
adb shell settings delete global captive_portal_http_url

adb shell settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
adb shell settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204


3. 执行完，切为飞行模式，再切换回来就好了
————————————————

                            版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                        
原文链接：https://blog.csdn.net/qq_18525247/article/details/128086408

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
