---
title: 无人值守高度自定义的纯净 Windows 11/10 系统
cover: https://img.51santi.uk/file/001417b36aa563f0ff7af.jpg
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-08-06 10:30:50
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
# 安装windows 11/10 无人值守，无需交互的方式配置/创建账号
## 1.配置系统应答文件：[【点击前往】](https://schneegans.de/windows/unattend-generator/)

参考配置文件网盘链接：https://pan.baidu.com/s/17qXzYTxhmnAZPmlmFbj2fQ?pwd=js68
提取码：js68

## 2.系统镜像编辑器：[【点击下载】](https://www.anyburn.com/)
 ### 2.1打开编辑器
 ### 2.2编辑镜像文件
 ![c8b28489e90e634fcf0e6.jpg](https://img.51santi.uk/file/c8b28489e90e634fcf0e6.jpg)
 ### 2.3添加交互配置文件（autounattend.xml）
 ![cb479ea96fdf022290485.jpg](https://img.51santi.uk/file/cb479ea96fdf022290485.jpg)

## 3.Windows 系统镜像官方下载：[【Windows 11】](https://www.microsoft.com/software-download/windows11)、[【Windows 10】](https://www.microsoft.com/en-us/software-download/windows10)

## 4.refus镜像刻录到U盘[【点击前往】](https://rufus.ie/en/)
Rufus 是一个可以帮助格式化和创建可引导USB闪存盘的工具，比如 USB 随身碟，记忆棒等等。
在如下场景中会非常有用：

- 你需要把一些可引导的ISO格式的镜像（Windows，Linux，UEFI等）创建成USB 安装盘的时候
- 你需要使用一个还没有安装操作系统的设备的时候
- 你需要从DOS系统刷写 BIOS或者其他固件的时候
- 你需要运行一个非常底层的工具的时候

## 5. 安装完系统后激活系统（如下为激活Windows 10作为参考）
以管理员方式运行powershell，逐个执行以下命令
```shell
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr /skms kms.03k.org
slmgr /ato
```

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
