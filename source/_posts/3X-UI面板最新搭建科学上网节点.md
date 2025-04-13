---
title: 3X-UI面板最新搭建科学上网节点
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANBZ9LY8I2laOjNR3R_NWkAAYX-rsheAAK0yTEb_oOZVjvmDAAB4zUu3wEAAwIAA3gAAzYE
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-03-13 21:05:38
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
# 一、什么是3x-ui
  3x-ui是一个支持多协议、多用户的Xray面板，具有过期日期、流量和IP限制功能。它能够同时支持Vmess、Vless、Trojan、
ShadowSocks和Wireguard等多种协议，为用户提供更灵活的选择。通过该面板，用户可以轻松管理多个用户账户，设置过期日期和流量限制，同时对IP进行限制，确保服务器资源的合理利用和安全性。
Xray面板的这些功能使得它成为搭建和管理代理服务器的理想选择，特别适用于需要高效管理和安全控制的场景。

3X-UI开源项目地址:https://github.com/MHSanaei/3x-ui

# 二、3X-ui 面板特点
- 系统状态监控
- 支持多用户、多协议，网页可视化操作
- 支持协议，包括 VMESS、VLESS、Trojan、Shadowsocks、Dokodemo-door、Socks、HTTP、wireguard
- 支持 XTLS 原生协议，包括 RPRX-Direct、Vision、REALITY
- 流量统计、流量限制、过期时间限制
- 可定制的Xray配置模板
- 支持HTTPS访问面板（自备域名+SSL证书）
- 支持一键SSL证书申请及自动续订
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANCZ9LbG59CNlLBS7FBY9y8s1XD3O8AArjJMRv-g5lWVGPxJqJUzyABAAMCAAN3AAM2BA)

# 三、 开始安装使用3x-ui
> 准备vps，xshell

1. 更新及安装组件。下面环境的安装方式，大家根据自己的系统选择命令安装就好了。
 Debian/Ubuntu系统：
```shell
sudo apt install git -y
```
 CentOS系统：
```shell
sudo yum install git -y
```
 如果执行后出错，请先更新系统
（Debian/Ubuntu系统）
```shell
sudo apt update -y
```
（CentOS系统）
```shell
sudo yum update -y
```
2. 一键安装脚本
```shell
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```
在运行脚本以后，会提示你Would you like to customize the Panel Port settings? (If not, a random port will be applied) [y/n]:
这里的意思是：您是否要自定义面板端口设置？（如果不想，将应用随机端口），建议输入y进行自定义配置。

Please set up the panel port: 后面输入你要设置的面板端口
然后就安装完成了，下面会出现3x-ui面板URL地址、设置的端口、随机生成的用户登录信息。建议将信息保存下来，后面登录用。
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANDZ9Ler2zikmo7c2s8jnc524wFfeQAAr_JMRv-g5lWX4HmmAwPMngBAAMCAAN5AAM2BA)
3. 申请SSL证书
- 在cloudflare里，建立自己的域名，并指定到对应vps ip
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANGZ9LlI7UM269OX2wSFNj6mD7VQcUAAsnJMRv-g5lWSGIwV3w2AmABAAMCAAN5AAM2BA)

以后想要在ssh连接里面进行3x-ui的设置，只需要输入 x-ui 然后回车就会出现3x-ui的管理面板，如下：
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANEZ9LiXpyNVYWqZ9418CqfHD8Dh0MAAsXJMRv-g5lWNRzBHSevvCoBAAMCAAN4AAM2BA)

输入数字 “18” SSL 证书管理，，接下来输入“1” Get SSL，开始申请证书，注意：这里需要放行80端口。
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANFZ9Liy7AJ_HvP_umynboiQ29zJpAAAsbJMRv-g5lWgnqTKTIzYtYBAAMCAAN4AAM2BA)
按照提示输入解析好的域名并确保域名能ping通，在运行脚本以后，会提示你“Would you like to set this certificate for the panel? (y/n): ”这句话意思是问你：您想为面板设置此证书吗？这里我们输入“y”为面板设置刚申请的证书。
4. BBR 加速
SSH 里面可以输入x-ui操作命令，输入“23” 启用 BBR ，根据提示再输入1，BBR就启用了
验证 BBR 是否成功启用：
执行以下命令，确认 BBR 已被启用：
```shell
sysctl net.ipv4.tcp_available_congestion_control
```
输出结果应包含 bbr，表示 BBR 已成功启用。

# 四、配置节点使用
1. 节点配置
注意：搭建节点如果不能上网，记得要放行节点端口。
- 配置方案A：vless+tcp+reality
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANHZ9LnUbbIg1KQVpkQfMMzHMSjNSoAAtDJMRv-g5lWliTRm_7B7McBAAMCAAN5AAM2BA)

- 配置方案B：vless+ws+tls
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANIZ9LqcyH5jS7tVzyC6o4ctGfZ6JYAAuzJMRv-g5lWVtWFHvR98hIBAAMCAAN3AAM2BA)

- 后续点击二维码使用
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAANJZ9Lq11XoUXP_G5hla8H7_Hj9KyEAAu7JMRv-g5lWooT5kCmTbAgBAAMCAAN4AAM2BA)

参考链接: https://www.kejixiaolu.com/djvps/dj06.html
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
