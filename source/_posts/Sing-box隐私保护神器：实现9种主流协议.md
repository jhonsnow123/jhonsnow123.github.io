---
title: Sing-box隐私保护神器：实现9种主流协议
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAN6Z_vQYAby_DbpNCfSAfQ6wYUfM74AAvfNMRuAO-FXRTFVXZB8C64BAAMCAAN4AAM2BA
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-03-13 22:47:13
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
# 隐私保护一键脚本
sing box一键安装脚本，一键搭建，支持vless、vmess、hysteria2、tuic协议，功能完善、搭建简单，脚本稳定。

# 前期准备条件
1. 国外VPS
2. ssh连接工具
3. cloudflare托管的域名

# sing-box脚本安装
```shell
bash <(wget -qO- https://raw.githubusercontent.com/fscarmen/sing-box/main/sing-box.sh)
```
1. 执行上述命令后选择简体中文--> 选择1
![image](https://pic.shenxing.win/i/3ae24f72-c67b-4e40-a5f4-27c3f4debb7b.jpg)
![image](https://pic.shenxing.win/i/a56c749a-31f4-4a28-8b73-5b5787835c22.jpg)
2. 输入Argo域名 和 Token
![image](https://pic.shenxing.win/i/8a492acc-5040-4382-8fa7-9bb68d8b9287.jpg)
注意，此处的说明Token或Json两种都可以
Json方式通过此链接https://fscarmen.cloudflare.now.cc/ 提交并授权。
前提是需要登录cloudflare
![image](https://pic.shenxing.win/i/30eae85d-0132-4450-81e8-62bbec8b7f87.jpg)
> 审核完成后复制JSON字符串提交
![image](https://pic.shenxing.win/i/415e28cd-4f99-44b7-954a-72fcb0360ffd.jpg)
![image](https://pic.shenxing.win/i/a670acf8-8a3c-40e7-99ed-ebd3735f7a9f.jpg)
![image](https://pic.shenxing.win/i/6fec537b-cb11-47d5-923c-f5f26f3ff268.jpg)
最后会生成对应的节点信息
![image](https://pic.shenxing.win/i/06ddcb38-7f8b-4d3d-8024-92dd8be78439.jpg)

2-1. 以下为cloudflare生成token的方式（可选）， 和上面的的JSON都可以
![image](https://pic.shenxing.win/i/e489bd71-67d7-4b51-86c6-b3e334df4bf6.jpg)
记事本保存命令，token为ey开头的字符串
![image](https://pic.shenxing.win/i/840ce6f6-dd8c-43a8-8a6d-db754e3ebfdd.jpg)
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANMZ9L3Jda0_XxDwonFgl0gWs66SGkAAhPKMRv-g5lWxhp_nA7pfLUBAAMCAAN4AAM2BA)
类型一定要是HTTP， 端口为nginx的端口
![image](https://pic.shenxing.win/i/562c8d8a-d8bb-4ab4-b062-869438c31fdd.jpg)
> 隧道:即cloudflare channel,以前叫Argo channel. (主要针对vless,vmess协议)

# 注意：
1.  防火墙放行端口或vps后台放行端口

2. token时要用IP：端口，IP是vps的，端口必须是vps上的nginx的。

3. 主域名不必A解析，隧道用次级域名就行，建隧道时如ec.thinubx.com. 那么ec就是名称，然后隧道生成后会自动生成一个cname在解析记录。

4.  无需在ssh上执行cloudflared安装的命令，输入token就行。

5. 9个协议中，tuic，trojan若不通，需要在v2rayN上把tls设置为true，就是为了跳过证书验证。

附：
本地没有IPV6的环境下，通过webssh (http://ssh.shenxing.win/)连接访问IPV6服务器
想为 IPv4 的甲骨文添加IPV6 Warp 双栈，运行如下脚本
```shell
wget -N https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh && bash menu.sh d
```
然后通过命令 curl 看看是否能通
```shell
#显示v6地址说明已经实现warp双栈
root@ip-172-31-34-98:~/webssh# curl -6 ip.sb
2a09:bac1:3f40:90::299:11
```


参考链接： 
https://www.youtube.com/watch?v=8H4rHlFxwqw
https://www.youtube.com/watch?v=NBsPCRTr76A
https://www.kekehub.com/2025/03/singboxd.html





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
