---
title: 搭建hexo博客
cover: https://img.51santi.uk/file/4f7fdc7161b3d9894bcbf.jpg
# cover: https://img.51santi.uk/file/c91e81708da7f7324f911.jpg
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-07-18 23:13:19
updated:
tags: 经验分享
categories: 技术分享
keywords:
description:
top: 2
top_img:
comments:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author: Jonsnow
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

本文详细介绍了如何使用Hexo框架搭建一个个人博客，并将其部署到 GitHub Pages和Cloudflare Pages上。主要内容包括：

* 环境准备：安装 Node.js和 Git
* 配置Git和GitHub：设置SSH密钥，创建GitHub仓库
* 初始化Hexo项目：安装Hexo，创建新博客
* 部署到 GitHub Pages：配置部署设置，推送静态文件
* 部署到Cloudflare Pages：连接GitHub仓库，自动部署
* 基本使用方法：创建新文章，本地预览，发布更新

这个教程适合那些想要快速搭建个人博客，但又不想花费太多成本的人。通过使用Hexo、 GitHub和Cloudflare的免费服务，您可以轻松创建一个高效、简洁的博客网站。

## 1.事前准备
- 域名（非必须，你也可以使用免费域名，或者GitHub.io或Pages.dev分配的域名也可以）
- GitHub（必须，你需要注册一个GitHub帐号）
- Cloudflare（非必须，你需要注册一个Cloudflare帐号，这样你就可以将博客部署在CF的CDN里加速，但是你也可以直接使用GitHub.io分配的域名）

## 2.软件支持
- Node（必须）
- Git（必须）
- VSCode（非必须，款轻量型的IDE）
### 2.1安装node
* 打开Node官网，下载和自己系统相配的Node的安装程序，否则会出现安装问题。下载地址：https://nodejs.org/en
* 下载后安装，安装的目录可以使用默认目录C:/Program Files/nodejs/
* 安装完成后，检查是否安装成功。在键盘按下win + R键，输入CMD，然后回车，打开CMD窗口，执行node -v命令，看到版本信息，则说明安装成功。
* 修改npm源。npm下载各种模块，默认是从国处服务器下载，速度较慢，建议配置成华为云镜像源。打开CMD窗口，运行如下命令:
```SHELL
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
```
### 2.2安装GIT
* 进入官网下载适合你当前系统的 Git：https://git-scm.com/downloads
* 下载后傻瓜式安装Git即可，安装的目录最好使用默认目录C:/Program Files/Git
* 点击电脑左下角开始即可看见Git Bash（建议使用。

## 3.配置 Git 密钥并连接至 Github
常用 Git 命令
```SHELL
git config -l  //查看所有配置
git config --system --list //查看系统配置
git config --global --list //查看用户（全局）配置
```
### 3.1. 配置用户名和邮箱
```SHELL
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```
通过git config -l 检查是否配置成功。
![be7347836e9e2e2f8271c.jpg](https://img.51santi.uk/file/be7347836e9e2e2f8271c.jpg)

### 3.2. 配置公钥连接Github
 1. 执行以下命令生成ssh公钥，此公钥用于你的计算机连接Github
```bash
ssh-keygen -t rsa -C "你的邮箱"
```
提示Enter file in which to save the key直接一路回车即可，新手小白不推荐设置密钥
![d9481254265c914c89649.jpg](https://img.51santi.uk/file/d9481254265c914c89649.jpg)

之后打开C盘下用户文件夹下的.ssh的文件夹，会看到以下文件
- id_rsa私钥
- id_rsa.pub公钥

![20b5d0171147ad6d5bc78.jpg](https://img.51santi.uk/file/20b5d0171147ad6d5bc78.jpg)
用记事本打开上述图片中的公钥id_rsa.pub，复制里面的内容，然后开始在github中配置ssh密钥。
![4eedc9e221a44aa536731.jpg](https://img.51santi.uk/file/4eedc9e221a44aa536731.jpg)

 2. 将 SSH KEY 配置到 GitHub
进入github，点击右上角头像 选择settings，进入设置页后选择 SSH and GPG keys，名字随便起，公钥填到Key那一栏。
![59e52fba976bf1331b7ba.jpg](https://img.51santi.uk/file/59e52fba976bf1331b7ba.jpg)
![b85b1a94530631ae2a9fb.jpg](https://img.51santi.uk/file/b85b1a94530631ae2a9fb.jpg)
![7d317076eb02afa508f33.jpg](https://img.51santi.uk/file/7d317076eb02afa508f33.jpg)
 3. 测试连接，输入以下命令
```shell
ssh -T git@github.com
```
第一次连接会提示Are you sure you want to continue connecting (yes/no/[fingerprint])?，输入yes即可
![7ebb59811f7c3e92dedf4.jpg](https://img.51santi.uk/file/7ebb59811f7c3e92dedf4.jpg)
出现连接到账户的信息，说明已经大功告成，至此完成了环境准备工作。
```shell
Hi jhonsnow123! You've successfully authenticated, but GitHub does not provide shell access.
```

### 3.3. 配置公钥连接Github
  1. 点击右上角的+按钮，选择New repository，创建一个<用户名>.github.io的仓库。
  2. 仓库名字的格式必须为：<用户名>.github.io (注意：前缀必须为用户名，此为预览博客需要，后期可修改仓库名)
  3. 可见性必须选择 Public 方便第一次部署检查问题，点击 Creat repository 进行创建即可
  ![109388de5059022cfd5a5.jpg](https://img.51santi.uk/file/109388de5059022cfd5a5.jpg)

## 4.初始化 Hexo 博客
  1. 创建一个文件夹来保存博客源码（我这里选的路径为D:/Hexo-Blog），在文件夹内右键鼠标，选择Open Git Bash here
  ![e273c710e4b9a7849da67.jpg](https://img.51santi.uk/file/e273c710e4b9a7849da67.jpg)
  2. 在Git BASH输入如下命令安装 Hexo
  ```SHELL
    npm install -g hexo-cli && hexo -v
  ```
  ![6c2c6db7615e5a8ac9fcc.jpg](https://img.51santi.uk/file/6c2c6db7615e5a8ac9fcc.jpg)
  3. 安装完后输入hexo -v验证是否安装成功。
![2e0d3a0f71726e651209c.jpg](https://img.51santi.uk/file/2e0d3a0f71726e651209c.jpg)

  4.初始化 Hexo 项目安装相关依赖。
```shell
hexo init blog-demo
cd blog-demo
npm i
```
![fe4a3d5f5c65d5ed466b9.jpg](https://img.51santi.uk/file/fe4a3d5f5c65d5ed466b9.jpg)
 5. 初始化项目后，blog-demo有如下结构：
 ![69eccf0a00005d2bacaff.png](https://img.51santi.uk/file/69eccf0a00005d2bacaff.png)
 - node_modules：依赖包
 - scaffolds：生成文章的一些模板
 - source：用来存放你的文章
 - themes：主题
 - .npmignore：发布时忽略的文件（可忽略）
 - _config.landscape.yml：主题的配置文件
 - config.yml：博客的配置文件
 - package.json：项目名称、描述、版本、运行和开发等信
 6. 输入hexo cl && hexo s启动项目
 ![360189db8aa027efce4ad.png](https://img.51santi.uk/file/360189db8aa027efce4ad.png)

  6. 打开浏览器，输入地址：http://localhost:4000/ ，看到下面的效果，说明你的博客已经构建成功了。
  ![dbee2ccb55ce155b988d4.png](https://img.51santi.uk/file/dbee2ccb55ce155b988d4.png)

## 5.将静态博客挂载到 GitHub Pages
 1. 安装 hexo-deployer-git
   ```shell
    npm install hexo-deployer-git --save
   ```
 2. 修改 _config.yml 文件
在blog-demo目录下的_config.yml，就是整个Hexo框架的配置文件了。可以在里面修改大部分的配置。详细可参考官方的配置描述。
修改最后一行的配置，将repository修改为你自己的github项目地址即可，还有分支要改为main代表主分支（注意缩进）。
 ```yaml
  deploy:
  type: git
  repository: git@github.com:jhonsnow123/jhonsnow123.github.io.git
  branch: main
 ```
 3. 修改好配置后，运行如下命令，将代码部署到 GitHub（Hexo三连）。
 ```shell
// Git BASH终端
hexo clean && hexo generate && hexo deploy  

// 或者

// VSCODE终端
hexo cl; hexo g; hexo d
 ```
 - hexo clean：删除之前生成的文件，可以用hexo cl缩写。
 - hexo generate：生成静态文章，可以用hexo g缩写
 - hexo deploy：部署文章，可以用hexo d缩写
![da69c2d2fafa56b39eeeb.png](https://img.51santi.uk/file/da69c2d2fafa56b39eeeb.png)
注意：deploy时可能要你输入 username 和 password。
如果出现Deploy done，则说明部署成功了。
![f419ab7e0cdbf6b32ab8a.png](https://img.51santi.uk/file/f419ab7e0cdbf6b32ab8a.png)
等两分钟，打开浏览器访问：https://jhonsnow123.github.io ，这时候我们就可以看到博客内容了。

## 6.将静态博客挂载到 Cloudflare Pages
 1. 在 Workers 和 Pages 中选择 Pages 的 连接到 Git
![3d24654e2243d1cc773bf.png](https://img.51santi.uk/file/3d24654e2243d1cc773bf.png)
![ca8e35be8f87cf1863395.png](https://img.51santi.uk/file/ca8e35be8f87cf1863395.png)
 2. 然后登录你Blog仓库对应的GitHub帐号
![0ab0525b0c3e0d298533d.png](https://img.51santi.uk/file/0ab0525b0c3e0d298533d.png)
![d295b4b025a9ad1259a0c.png](https://img.51santi.uk/file/d295b4b025a9ad1259a0c.png)
 3. 点击保存并部署后等待部署完成即可。
![68f8d149df486882735d8.png](https://img.51santi.uk/file/68f8d149df486882735d8.png)
 4. 提示成功！您的项目已部署到以下区域：全球后，浏览器访问：https://jhonsnow123-github-io.pages.dev ，这时候我们就可以看到博客内容了。
![f999ae4939ad77dcc39a7.png](https://img.51santi.uk/file/f999ae4939ad77dcc39a7.png)
这时你也就可以将你的<用户名>.github.io的仓库设置为Private私库了

 5. 如果你有自己的域名，你可以在这里绑定你自己的自定义域，即可
![75e79412cf72404a90f58.png](https://img.51santi.uk/file/75e79412cf72404a90f58.png)
![3f28706ab930b9d2dc6c7.png](https://img.51santi.uk/file/3f28706ab930b9d2dc6c7.png)

# 如何使用
## 1.新建一篇博文

``` shell
 hexo new "新博文"
```
然后用文本编辑器去编辑_posts/新博文文.md里的内容即可，注意要使用Markdown格式书写。
详细使用方法可以查阅 https://hexo.io/zh-cn/docs/writing

## 2.编辑完文章保存后可以使用如下命令，生成本地页面 http://localhost:4000/ ，进行预览

``` shell
// Git BASH终端
hexo cl && hexo s

// 或者

// VSCODE终端
hexo cl; hexo s
```
## 3.确认无误后使用以下命令，将本地文章推送至GitHub仓库即可

``` shell
// Git BASH终端
hexo cl && hexo g && hexo d

// 或者

// VSCODE终端
hexo cl; hexo g; hexo d
```

## 4.常见问题
 github访问超时问题。如图
 ![giterror_2025-01-18_15-44-19.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMsZ4tcE7zkY9GPqLKKIcqGht7n3LUAAgzCMRuMhVlUmdmgbxwDpRcBAAMCAAN5AAM2BA)
```SHELL
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
Error: Spawn failed
    at ChildProcess.<anonymous> (C:\software\jhonsnowBlog\jhonsnow123.github.io\node_modules\hexo-deployer-git\node_modules\hexo-util\lib\spawn.js:51:21)
    at ChildProcess.emit (node:events:519:28)
    at cp.emit (C:\software\jhonsnowBlog\jhonsnow123.github.io\node_modules\cross-spawn\lib\enoent.js:34:29)
    at ChildProcess._handle.onexit (node:internal/child_process:294:12)
 ```
```SHELL
ssh -T git@github.com
ssh: connect to host github.com port 22: Connection timed out
```
这个错误，这通常意味着有些东西阻止了你的连接。下面是一些建议的解决步骤：
端口阻塞：某些网络或ISP可能会阻塞SSH的默认端口（22）。尝试使用443端口连接到GitHub：
```SHELL
ssh -T -p 443 git@ssh.github.com
```
如果这成功了，你可以考虑永久地更改你的SSH配置以使用443端口。打开或创建文件 ~/.ssh/config
![image.png](https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMtZ4uUehxd0V-iKwaWAhtyjCQKJ2wAAm3CMRuMhVlUko1-oFLMXn8BAAMCAAN4AAM2BA)
 
 文件中添加以下内容
 ```SHELL
# Add section below to it
Host github.com
  Hostname ssh.github.com
  Port 443
 ```
再次测试连接
```SHELL
C:\software\jhonsnowBlog\jhonsnow123.github.io> ssh -T git@github.com
Hi jhonsnow123! You've successfully authenticated, but GitHub does not provide shell access.
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
