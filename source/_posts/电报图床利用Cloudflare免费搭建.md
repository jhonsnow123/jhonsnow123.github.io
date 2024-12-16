---
title: 电报图床利用Cloudflare免费搭建
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMLZwpFJsQjaUDjY5UNnal3K9QE4rkAAuu8MRvYUFFUg8OsvdCGwPYBAAMCAAN5AAM2BA
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-10-12 17:42:26
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
# Fork代码到自己个gitHub库。telegraph-Image
代码地址：(https://github.com/x-dr/telegraph-Image/tree/static)

## 优点
1. 无限图片储存数量，你可以上传不限数量的图片

2. 无需购买服务器，托管于Cloudflare的网络上，当使用量不超过Cloudflare的免费额度时，完全免费

3. 无需购买域名，可以使用Cloudflare Pages提供的*.pages.dev的免费二级域名，同时也支持绑定自定义域名

4. 支持图片审查API，可根据需要开启，开启后不良图片将自动屏蔽，不再加载

5. 支持后台图片管理，日志管理，查看访问前20的Referer、IP、img,可以对上传的图片进行在线预览，添加白名单，黑名单等操作

## 利用Cloudflare pages部署
1. Pages 部署 telegraph-Image 项目
 + 打开telegraph-Image仓库项目，先给作者点击Star后再点击Fork！可以增加成功率！
 + 回到 Workers 和 Pages > 概述 > 创建 > Pages > 连接到Git > 选择telegraph-Image项目 > 保存并部署即可
2. 绑定自定义域
 + 这里推荐优先使用已经转入CF的域名，并开启小黄云。如果你没有域名，也可以退而求其次使用CNAME方式使用免费域名接入自定义域。
 + 回到 Workers 和 Pages /telegraph-Image项目 > 设置 > 函数 > 放置 > 制作 > 智能 > 保存

3. 创建管理后台
 + 3.1 回到 Workers 和 Pages > D1 > 创建数据库 > 仪表盘 > 数据库名称img(名称可取任意值) > 创建
 + 3.2 进入img数据库 > 控制台 > 粘贴以下代码后 > 点击执行 > 等待提示此查询已成功执行。
```sql
    DROP TABLE IF EXISTS tgimglog;
    CREATE TABLE IF NOT EXISTS tgimglog (
        `id` integer PRIMARY KEY NOT NULL,
        `url` text,
        `referer` text,
        `ip` varchar(255),
        `time` DATE
    );
    DROP TABLE IF EXISTS imginfo;
    CREATE TABLE IF NOT EXISTS imginfo (
        `id` integer PRIMARY KEY NOT NULL,
        `url` text,
        `referer` text,
        `ip` varchar(255),
        `rating` text,
        `total` integer,
        `time` DATE
    );
```
 + 3.3 回到 Workers 和 Pages /telegraph-Image项目 > 设置 > 函数 > D1 数据库绑定 > 变量名IMG > img数据库 > 点击保存
 + 3.4 回到 Workers 和 Pages /telegraph-Image项目 > 设置 > 环境变量 > 为生产环境定义变量 > 变量内容如下:
  + 变量名BASIC_USER，值为你的后台管理员用户名
  + 变量名BASIC_PASS，值为你的后台管理员密码
  + 无需审查涩涩内容可跳过这一步
   + 打开ModerateContent API申请页面，输入你的邮箱后点击SUBMIT
   + 前往你的邮箱将 ModerateContent.com Sup 邮件内的 API Key 复制出来
   + 变量名ModerateContentApiKey，值为你的 API Key
  + 点击`保存`
 + 3.5 回到 Workers 和 Pages /telegraph-Image项目 >  部署 > 右下角三个点 > 重试部署即可

4. 如何使用
 + 例如：你的 Pages自定义域 为img.131213.xyz
 + https://img.131213.xyz 为 图床上传使用地址
 + https://img.131213.xyz/admin 为 图床后台管理地址
 + https://img.131213.xyz/list 为 图床访问日志

## 变量说明
> `ModerateContentApiKey` 请前往 [https://moderatecontent.com/] (https://moderatecontent.com/)注册免费获取API key

| 变量名称      | 值 |
| ----------- | ----------- |
|BASIC_USER   | <后台管理页面登录用户名称>|
|BASIC_PASS   | <后台管理页面登录用户密码>|
|ModerateContentApiKey   | <审查图像内容的API key>|
|RATINGAPI   | <[自建的鉴黄api](https://github.com/x-dr/nsfwjs-api) >|
|TG_BOT_TOKEN   | 刚才获得的机器人Token|
|TG_CHAT_ID   | 刚才获得的频道ID|

> 优先级 `RATINGAPI` > `ModerateContentApiKey`

> `RATINGAPI`的格式 `https://xxx.xxx/rating`
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
