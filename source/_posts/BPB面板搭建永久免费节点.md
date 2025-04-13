---
title: BPB面板搭建永久免费节点
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN7Z_vRpMpGC6NvZJT2FGJX57WtNfkAAvjNMRuAO-FXL1_eBePjJEkBAAMCAAN4AAM2BA
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-04-05 17:23:33
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
BPB Panel 是一个结合 Cloudflare Workers 和 Pages 的代理面板项目，可以帮助用户轻松搭建免费 VPN，实现永久免费节点订阅，为使用 singbox-core 和 xray-core 的跨平台客户端提供配置。
Cloudflare Worker上可以运行Javascript，作为一个serverless function，每天有十万个10ms cpu time的request可以免费用，Z大的edgetunnel代码 可以部署到Cloudflare Worker上，为数据包添加vlessheader信息，达到vless代理转发的目的。
![image](https://pic.shenxing.win/i/e27001c6-53d1-41c4-9092-3f61f751eea7.jpg)
由于Cloudflare在GFW国内某个程度能访问，而CF Worker又能访问GFW意外的信息，所以透过CF Worker来转发数据达到了翻墙的效果。
  目前Cloudflare 官方收紧对 BPB 等项目的审查，如果直接使用源码或者原作者提供的混淆代码，很容易出现 1101 的报错（可能代码中包含敏感关键词、或者使用了与他人相同的混淆代码）。

解决办法是利用未混淆的源码进行自定义加密混淆，从而生成独一无二的混淆代码，成功绕过 Cloudflare 的限制。
# 一、准备工作
1. GitHub 账号：通过 Github Action 自动同步最新 BPB 源代码，并执行代码混淆。
2. Cloudflare 账号：用于部署 BPB Panel 项目。
3. 域名：建议使用域名（解决 Cloudflare Pages 自带域名被墙的问题）。

新建一个私人仓库，项目可随意命名，但要避开 BPB 敏感词。
在该项目创建.github/workflows/Obfuscate.yml。
复制创建仓库源码.js的代码，粘贴到项目，保存。
点击Obfuscate.yml旁边的小黄点同步到 BPB 代码，同步完成生成_worker.js与origin.js，前者是混淆代码，后者是明文代码。如果找不到小黄点，请前往：你的项目→Actions→左边的Build Obfuscate BPB Panel→中间的Build Obfuscate BPB Panel的工作流文件是否有效。
到Cloudflare里创建Pages+github，找到刚刚的 github 项目，用其创建 Pages 项目，并修改下面的变量及绑定 kv 空间。
引用请注明出处：SO启程Github。
变量的使用
UUID，在线生成。
PROXYIP，来源于网络分享：proxy.xxxxxxxx.tk、edgetunnel.anycast.eu.org、ts.hpc.tw、cdn.xn--b6gac.eu.org、cdn-all.xn--b6gac.eu.org、bestproxy.onecf.eu.org。
TR_PASS，默认要修改的密码。
kv，绑定KV命名空间。
/panel，部署成功后，在 url 后面增加/panel来进行访问面板，访问面板修改的密码将会保存在kv对里。
IP优选工具的使用
win 电脑下载 IP优选工具/CF优选官方IP[win电脑版].7z，解压后，退出VPN，运行本软件。
下载CloudflareScanner，解压后，退出VPN，运行本软件。
特别感谢

# 1. github账号创建库

![image](https://pic.shenxing.win/i/cb9e3760-ec30-4fff-840b-41c703d3c4ea.jpg)



https://hansvlss.top/post/bpb/
https://www.youtube.com/watch?v=cPI5cJo8R1A


bpb面板： https://github.com/Setout8/Book-Pen-Book/tree/main
https://www.nslookup.io/domains/cdn.xn--b6gac.eu.org/dns-records/

SO启程： https://set-out8.blogspot.com/2025/03/bpb.html
https://upsangel.com/security/vpn/cloudflare-worker-vless%E7%BF%BB%E7%89%86%E4%BB%A3%E7%90%86%E5%8E%9F%E7%90%86-proxyip%E7%B4%B0%E7%AF%80%E7%A0%94%E7%A9%B6/


Cloudflare系列教程之SAAS，优选域名实现网站加速！
https://www.youtube.com/watch?v=Mbxq00JVmMQ

爬爬虾：https://www.youtube.com/watch?v=XiseBoIrOPc
科技自习室：https://www.youtube.com/watch?v=Mbxq00JVmMQ
一个小站：https://www.ygxz.in/dairy/3114/
优选域名：russia.com:443

ns1.huaweicloud-dns.com.
ns1.huaweicloud-dns.cn.
ns1.huaweicloud-dns.net.
ns1.huaweicloud-dns.org.


ns1.huaweicloud-dns.com.
ns1.huaweicloud-dns.cn.
ns1.huaweicloud-dns.net.
ns1.huaweicloud-dns.org.


前后比对
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN1Z_KEkgKs-wcWy_4IrCkEU_jTMHIAA8AxG4KKmFeYDfjb7TTDdQEAAwIAA3kAAzYE)
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN2Z_KGTYh0lFqnu6bBdYfEcPxzOUwAAgHAMRuCiphXaRpC5s2B_ZMBAAMCAAN5AAM2BA)

优化后：
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN3Z_KNGWaJIQVzFNXnOXaf6xBJli0AAg3AMRuCiphX8-h1wfwGgWYBAAMCAAN5AAM2BA)

![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN4Z_KTwkqXkMzsB2yx27ubPQxxCsIAAh7AMRuCiphXM2iPaSZRHt4BAAMCAAN5AAM2BA)
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
