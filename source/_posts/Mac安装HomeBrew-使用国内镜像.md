---
title: Mac安装HomeBrew-使用国内镜像
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMWZzrlfhvaSQIzzBTo1WMI3TwttmoAAn6-MRtw59hVtd4IBtJGnIQBAAMCAAN4AAM2BA
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-11-18 14:25:28
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
# 步骤一
> Mac电脑如何打开终端：command+空格 在聚焦搜索中输入terminal回车。
# 步骤二
终端中粘贴下方命令回车：
```SHELL
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```
此处如果提示安装xcode，提示安装完成后，copy上面命令再次安装，选择 gitee镜像。

# 步骤三
安装成功后，再terminal窗口输入 brew 命令进行验证。
> 记得保存使用推荐的alibaba镜像

# 卸载homeBrew
```SHELL
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

# Homebrew 官方地址
https://brew.sh/zh-cn/
官方地址使用github的源，国内访问速度很慢，*很容易出错*，所以我们需要使用国内的源。


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
