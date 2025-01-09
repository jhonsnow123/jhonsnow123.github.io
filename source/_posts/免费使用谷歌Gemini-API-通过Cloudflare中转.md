---
title: 免费使用谷歌Gemini API 通过Cloudflare中转
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMpZ3_hzIl2w028I44HeFermb880VIAAgHGMRuGcAFUmOUAAZgcXHVsAQADAgADeQADNgQ
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-01-05 22:28:16
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
# 前言：
Google Gemini 是所有一线顶级大模型当中，唯一一个 Api 可以免费白嫖的。本期视频借助互联网大善人 Cloudflare，中转一下 Gemini api，这样就可以得到一个国内免费爽用的顶级大模型。有了 api 以后，我们可以 ai 编程，可以聊天，可以音视频通话，做各种好玩的事情。 

# 前置条件
    由于国内不能直接连接AI的api，需要通过自己的域名中转。提前准备账号：cloudflare账号，Google账号，GitHub账号
# 操作步骤：
1. Gemini 转OpenAI
打开： https://github.com/PublicAffairs/openai-gemini
操作 > Deploy with Worker 在Cloudflare创建Worker，充当中转。
![gemini2025-01-09_22-25-49.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMmZ3_cqFRouwgdyWtoIJ_6L1S0OHEAAvjFMRuGcAFUMEqi_b-RmGwBAAMCAAN4AAM2BA)
需要fork到自己的仓库后绑定自定义域名。
2. Gemini API申请
科学上网后登录如下网址: https://aistudio.google.com/ 并get API key
![apikey_2025-01-09_22-29-46.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMnZ3_db5LGdzTe9fChGhYETg-20C4AAvrFMRuGcAFUkv-Omc9Isr8BAAMCAAN5AAM2BA)
3. 下载并配置chatbox
chatbox: https://github.com/Bin-Huang/chatbox
- 配置api密钥
- 配置api域名
- 配置自定义模型gemini-2.0-flash-exp
![chatbox2025-01-09_22-31-54.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMoZ3_d7oRXVyK3RFEDm68jx7ug4ysAAvvFMRuGcAFUMWM7xIPx0cEBAAMCAAN5AAM2BA)



![gemini_2025-01-05_22-37-18.jpg](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMlZ3qZe6mIrtIaVIKmzjUZws34Ai4AAjbEMRuG4tlXVx9Pp1JZOhYBAAMCAAN3AAM2BA)

https://gemini.51santi.uk/v1/models
Token 
response
```Javascript
{
    "object": "list",
    "data": [
        {
            "id": "text-bison-001",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "embedding-gecko-001",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.0-pro-latest",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.0-pro",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-pro",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.0-pro-001",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.0-pro-vision-latest",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-pro-vision",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-pro-latest",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-pro-001",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-pro-002",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-pro",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-pro-exp-0801",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-pro-exp-0827",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-latest",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-001",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-001-tuning",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-exp-0827",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-002",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-8b",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-8b-001",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-8b-latest",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-8b-exp-0827",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-1.5-flash-8b-exp-0924",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-2.0-flash-exp",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-exp-1206",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-exp-1121",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-exp-1114",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-2.0-flash-thinking-exp",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "gemini-2.0-flash-thinking-exp-1219",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "learnlm-1.5-pro-experimental",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "embedding-001",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "text-embedding-004",
            "object": "model",
            "created": 0,
            "owned_by": ""
        },
        {
            "id": "aqa",
            "object": "model",
            "created": 0,
            "owned_by": ""
        }
    ]
}
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
