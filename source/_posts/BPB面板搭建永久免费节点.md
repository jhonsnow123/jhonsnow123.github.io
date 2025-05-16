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
Cloudflare Worker上可以运行Javascript，作为一个serverless function，每天有十万个10ms cpu time的request可以免费用，Z大的edgetunnel代码 可以部署到Cloudflare Worker上，为数据包添加vlessheader信息，达到vless代理转发的目的。最新代码作者已经做了优化升级。
![image](https://pic.shenxing.win/i/e27001c6-53d1-41c4-9092-3f61f751eea7.jpg)
由于Cloudflare在GFW国内某个程度能访问，而CF Worker又能访问GFW意外的信息，所以透过CF Worker来转发数据达到了翻墙的效果。
  目前Cloudflare 官方收紧对 BPB 等项目的审查，如果直接使用源码或者原作者提供的混淆代码，很容易出现 1101 的报错（可能代码中包含敏感关键词、或者使用了与他人相同的混淆代码）。

解决办法是利用未混淆的源码进行自定义加密混淆，从而生成独一无二的混淆代码，成功绕过 Cloudflare 的限制。
# 一、准备工作
1. GitHub 账号：通过 Github Action 自动同步最新 BPB 源代码，并执行代码混淆。
2. Cloudflare 账号：用于部署 BPB Panel 项目。
3. 域名：建议使用域名（解决 Cloudflare Pages 自带域名被墙的问题）。
# 二、Github 部署
1. 新建一个私人仓库，项目可随意命名，但要避开 BPB 敏感词。
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAONaA476b-7EBV3cVLcZlEwteHQklwAAjvKMRsEl3BUPmgo5VZLsh4BAAMCAAN4AAM2BA)

2. 在该项目创建Action文件 
.github/workflows/update-worker.yml
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOSaA5Ctc_HdzMM8nv-NfLr0NT21pcAAlLKMRsEl3BUugS2Bjzc22wBAAMCAAN5AAM2BA)
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOOaA49CON76OKayz9E5A_crwfGTY4AAkvKMRsEl3BU73Hl23OUkL0BAAMCAAN4AAM2BA)
> 开源作者仓库：https://github.com/bia-pain-bache/BPB-Worker-Panel
参考文件：
```PLAINTEXT
.github/workflows/update-worker.yml
```
将以下代码粘贴进去
```YML
name: Auto Update Worker

on:
  push:
    branches:
      - main
  schedule:
    - cron: "0 2 * * *" # 每天凌晨2点自动运行
  workflow_dispatch:     # 支持手动运行

permissions:
  contents: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: 初始化仓库
        uses: actions/checkout@v4

      - name: 获取当前本地版本
        id: get_local_version
        run: |
          echo -e "\033[34m[获取本地版本]\033[0m"
          if [ -f version.txt ]; then
            LOCAL_VERSION=$(cat version.txt)
            echo "当前本地版本: $LOCAL_VERSION"
          else
            echo "首次同步，没有本地版本。"
            LOCAL_VERSION=""
          fi
          echo "LOCAL_VERSION=$LOCAL_VERSION" >> $GITHUB_ENV

      - name: 获取最新 Release 信息
        id: get_release
        run: |
          echo -e "\033[34m[获取最新 Release]\033[0m"
          API_URL="https://api.github.com/repos/bia-pain-bache/BPB-Worker-Panel/releases"
          RESPONSE=$(curl -s "$API_URL")
          LATEST_RELEASE=$(echo "$RESPONSE" | jq -r '.[0]')
          TAG_NAME=$(echo "$LATEST_RELEASE" | jq -r '.tag_name')
          DOWNLOAD_URL=$(echo "$LATEST_RELEASE" | jq -r '.assets[] | select(.name == "worker.zip") | .browser_download_url')

          if [ -z "$DOWNLOAD_URL" ] || [ "$DOWNLOAD_URL" == "null" ]; then
            echo -e "\033[31m未找到 worker.zip，退出！\033[0m"
            exit 1
          fi

          echo "最新版本号: $TAG_NAME"
          echo "DOWNLOAD_URL=$DOWNLOAD_URL" >> $GITHUB_ENV
          echo "TAG_NAME=$TAG_NAME" >> $GITHUB_ENV

      - name: 判断是否需要更新
        id: check_update
        run: |
          echo -e "\033[34m[判断是否需要更新]\033[0m"
          if [ "$LOCAL_VERSION" = "$TAG_NAME" ]; then
            echo -e "\033[32m已经是最新版本，无需更新。\033[0m"
            echo "UPDATE_NEEDED=false" >> $GITHUB_ENV
          else
            echo -e "\033[33m发现新版本，需要更新！\033[0m"
            echo "UPDATE_NEEDED=true" >> $GITHUB_ENV
          fi

      - name: 如果需要，清理旧文件并下载新版本
        if: env.UPDATE_NEEDED == 'true'
        run: |
          echo -e "\033[34m[清理旧文件]\033[0m"
          rm -rf ./*
          echo -e "\033[34m[下载最新 worker.zip]\033[0m"
          wget -O worker.zip "$DOWNLOAD_URL"
          echo -e "\033[34m[解压 worker.zip]\033[0m"
          unzip worker.zip
          echo -e "\033[34m[删除 worker.zip]\033[0m"
          rm worker.zip
          echo -e "\033[34m[记录新版本号]\033[0m"
          echo "$TAG_NAME" > version.txt

      - name: 提交更改
        if: env.UPDATE_NEEDED == 'true'
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "🔄 自动同步最新 Worker 版本：${{ env.TAG_NAME }}"
          commit_author: "github-actions[bot] <github-actions[bot]@users.noreply.github.com>"
          push_options: --force
```
效果如图：
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOQaA4_8thXni4ql6rvywP4jxXpmPgAAk7KMRsEl3BUtPKdYEuC3rgBAAMCAAN4AAM2BA)

3. GitHub 仓库通过update-worker.yml 会自动下载最新的 BPB 源代码
.last_version：记录更新版本信息
_worker.js：最新BPB 代码
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAORaA5BsDuARfAwLeOg9xJuSu5C3mcAAlHKMRsEl3BU2akci3RBlBkBAAMCAAN5AAM2BA)

# 三、 Cloudflare部署
1. 登录 Cloudflare，创建 Pages 部署
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOTaA5DHLKstBzu_nEsqxcyIK6u9vAAAlXKMRsEl3BUSnbIx-HvlvwBAAMCAAN3AAM2BA)

2. 在 Cloudflare 控制台中进入 Workers 和 Pages，选择 Pages 部署。
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOUaA5EJSQJRRXcMUts370miLnSJO4AAljKMRsEl3BUb9Y2l4WlRgYBAAMCAAN5AAM2BA)

3. 绑定自定义域名（可选）
在 Pages 项目的 自定义域选项卡，点击设置自定义域。
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOVaA5FRLhX4deeiW506AMdRbgXCjsAAlnKMRsEl3BU8ogpCqFfaxQBAAMCAAN4AAM2BA)
在域名里创建CNAME指向jam-kexue.pages.dev
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOXaA5GSMqohuIllUuU1ivp2ed0d6EAAlvKMRsEl3BUvFsNnb4PDdkBAAMCAAN5AAM2BA)
设置完成后提示：域已激活。您的 DNS 设置已完成。
4. 设置变量
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOYaA5HlzY8r81A4bObKaFIh9csg0IAAlzKMRsEl3BUJncu7FqsbvYBAAMCAAN5AAM2BA)
部署成功后，在 Pages 项目界面点击 设置 -> 变量和机密，添加以下变量：

UUID：使用 UUID 生成器 随机生成一个新的 UUID。
PROXY_IP：填写代理 IP 地址，可从 随机代理 IP 站点[https://www.nslookup.io/domains/cdn.xn--b6gac.eu.org/dns-records/] 获取，或使用优选域名（例如 **cdn-b100.xn--b6gac.eu.org**）。
TR_PASS：填写一个复杂字符串，作为密码。
> 注：PROXYIP，来源于网络分享：proxy.xxxxxxxx.tk、edgetunnel.anycast.eu.org、ts.hpc.tw、cdn.xn--b6gac.eu.org、cdn-all.xn--b6gac.eu.org、bestproxy.onecf.eu.org。


![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOZaA5JHowuR_xHrMNzFyNgYm5wHTcAAl3KMRsEl3BUS8GOb4AemaEBAAMCAAN5AAM2BA)

5. 创建 KV:点击左侧存储和数据库，再选择 KV,然后创建一个新的 KV 命名空间

 注:名称自定义但不能包含“bpb”
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOaaA5KAu2aMqQKU35ZSg10RPIXt80AAmDKMRsEl3BUN_Gg05KfbGMBAAMCAAN5AAM2BA)

绑定 KV:回到创建的 Pages 界面。点击 设置 -> 【绑定】，点击添加，选择添加 KV 命名空间
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAObaA5K3UnRNwl5wDEh4Y0UHEW4c9QAAmPKMRsEl3BUtiUFYleuQzsBAAMCAAN5AAM2BA)
注:变量名称只能填写“kv”(小写)
6. 重试部署 Pages
返回 Pages 项目,找到右侧“…”,点击重试部署
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOcaA5Li6g7FkP0FhySqx_MuKOSda4AAmXKMRsEl3BUmSLY6UR4DkMBAAMCAAN5AAM2BA)

# 四、BPB 面板设置
1. 验证部署是否成功
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOdaA5PhBUAAUHB_z35EB9fRb0PNoZcAAJryjEbBJdwVCdrpTbN1aDMAQADAgADeQADNgQ)
打开浏览器输入:https://[自定义域名]或者你的项目地址,后面加上/panel,检查是否能正常访问BPB面板
2. 修改 BPB 面板密码
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOeaA5PuQ9plMF9yVwZHCTCap-83GAAAmzKMRsEl3BULurs9I_yR_sBAAMCAAN4AAM2BA)
第一次打开 BPB 面板会提示修改密码,请设置一个复杂密码,避免被盗用
3. 配置 BPB 面板参数
下面是BPB面板的参数解析，给大家做参考，请自行测试其效果。
🌐 VLESS - Trojan基础设置

![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOjaA5VQ-vslERzPGCVwCC3xTa4v0wAAn7KMRsEl3BUch8RJL9_hu0BAAMCAAN5AAM2BA)
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOiaA5UxWYkSrhERL55pSEwwZH4osoAAnPKMRsEl3BUNvzOvp1pcigBAAMCAAN5AAM2BA)
全部设置好，点击 APPLY SETTINGS 保存 BPB 面板配置

优选IP：
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAOfaA5Ss7SG5BabHyjjEC2oQGxfDzwAAnDKMRsEl3BU_q4IbuYodPUBAAMCAAN4AAM2BA)

五、VPN 节点部署完成
1. 导出Normal节点订阅链接
根据你所使用的代理软件，点击对应的 COPY SUB 按钮，复制 BPB 面板生成的订阅链接。

2. V2rayN 客户端导入节点订阅链接并使用
打开 V2rayN，进入【订阅分组】->【订阅分组设置】->【添加】,将订阅链接粘贴进去

点击【订阅分组】->【更新全部订阅(不通过代理)】，获取最新节点信息

测试节点延迟,确认节点有效后,开启系统代理,即可使用 VPN

现在 BPB 面板 VPN 部署全部结束,通过以上步骤,你可以利用 Cloudflare 和 BPB Panel 搭建一个永久免费 VPN,同时通过对 BPB 源代码进行加密混淆生成专属混淆代码,成功绕过 Cloudflare 的审查,解决 1101 报错问题,本期教程不仅支持 singbox-core 和 xray-core 等跨平台客户端等配置,还实现了永久免费节点订阅,满足大多数用户的使用需求,大家可以一起部署折腾

特别感谢


https://hansvlss.top/post/bpb/
https://www.youtube.com/watch?v=cPI5cJo8R1A
https://www.youtube.com/watch?v=Ss9tAZagN7o


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
