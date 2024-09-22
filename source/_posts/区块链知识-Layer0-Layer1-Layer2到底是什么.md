---
title: 区块链知识-Layer0/Layer1/Layer2到底是什么
cover: https://img.51santi.uk/file/fc891e9c2ec4c94c2f2c8.jpg
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-07-30 15:47:57
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

举个简单的例子，一个公司业务量庞大，于是他开了一个子公司，把一些业务交由子公司处理。母公司就是Layer 1，子公司就是Layer 2。这样，母公司的负担就减轻了。首先，我们需要定义第 1 层是什么：第 1 层网络是基础层，或者说是区块链的底层基础设施。也称为主网络或“主网”，它不仅定义了生态系统的核心规则，还可以验证和完成交易，如以太坊、比特币和 Solana 等示例。第 1 层区块链通常从强调去中心化和安全性开始 — — 这两者都是任何健全网络的核心原则，并且（除了一些例外）由多元化的全球开发人员和参与者（如验证者）网络维护。由于缺乏任何中央权威或监督，这些平台要求技术本身具有与生俱来的安全性，以保护用户免受诈骗和攻击。由于设计中的这种优先级，更不用说维持功能齐全的生态系统所需的大量资源，它们通常缺乏可扩展性。虽然一些开发人员认为无法在安全性、去中心化和可扩展性之间实现平衡是该技术的一个不可阻挡的缺陷（被称为区块链三难困境），但第 2 层解决方案，例如以太坊上的rollups和比特币上的闪电网络是用于解决这些问题的一种解决方案。

# Layer 1
Layer 1包含大家最熟悉的比特币、以太坊之类的链。Layer 1定义可以说是区块链的底层架构和协议，他的另外一个名字是公链。
![56fb32e9a0dcd59b3fbc8.jpg](https://telegra.ph/file/56fb32e9a0dcd59b3fbc8.jpg)

## Layer 1 链的特点

- 自己独立的链，不依赖于其他链，就可以独立运作
- 支持独立运作，有配套的架构和参与机制，比如他们有自己的共识机制，有自己的Ledger(账本)，有自己的节点网络（node），有自己的加密算法，也有自己的原始代币
- 他们通常都支持更上层的协议和应用从而打造他们自己的生态，但也有特殊情况，比如比特币的链，由于过于原始，在向上支持这一块做的比较少
所以当我们看到一条链，如果符合上述绝大部分特点，不用看细节，基本上可以明白，他是一条Layer公链。以大家熟悉的以太坊的链做参考，以太坊支持各种上层的应用。
![447dc2f5081fd4c902c66.jpg](https://img.51santi.uk/file/447dc2f5081fd4c902c66.jpg)

# Layer 2
Layer 2是指以Layer 1为基础，建立在Layer 1之上的协议，他们并不是刚才我们提到的建立在Layer 1之上的应用，Layer 2的开发，其实目的也是为了解决很多Layer 1的问题，比如扩容和提速等等。

其中比较通常的一个做法是，对于很多需要处理的复杂的交易，不是都在Layer 1的链上做处理和记录，而是拿下来在Layer 2的链处理，处理完之后，只是把处理结果的少量信息发回到Layer 1，目前主要的Layer 2还是围绕以太坊链来做的。

因为以太坊的生态是最大的，服务这个生态是最有利可图的，以太坊链有以下几个不同的扩容方案：

- Optimistic rollups 乐观汇总
- Zero-knowledge rollups 零知识汇总
- State channels 状态通道
- Sidechains 侧链
- Plasma 子链
- Validiums 有效性证明
想更多的了解以上扩展方案，请登录以太坊官网查询
https://ethereum.org/en/developers/docs/scaling/#validium
![147bb7ee924591ddc6951.jpg](https://img.51santi.uk/file/147bb7ee924591ddc6951.jpg)

## Layer 2和Layer 1 的主要区别
- 他对节点的要求是很随意
- 不像Layer 1通常采用比较分布式的共识机制
- Layer 2的Node可能是一个或者一些server的cluster
- 参与的可能是一大群个体，也可能是一个公司或者商业组织，甚至是少数的个人节点，除了Node之外，根据方向的不同，也可能被成为Operator、sequencer之类的。
- Layer 2的安全性还是主要依托于他对应的Layer 1的链
- Layer 1和Layer 2是有最广泛共识的

# Layer 0
不是那么流行的概念，通常Layer 0是指传输数据的基础架构和协议层，一般承担的任务是区块链和传统互联网的结合，Layer 0当时也要负责和Layer 1 甚至和Layer 2的兼容，Layer 0作为基础，也经常会有扩容之类的需求，

Polkadot是相对比较公认的一个提供了Layer 0的例子
![0d33878db1f17398ef1c5.jpg](https://telegra.ph/file/0d33878db1f17398ef1c5.jpg)
Polkadot项目主要是提供了一个叫中继链（Relay Chain）底层架构。

这个中继链承担着保证在它之上的Layer 1的公链之间的沟通和安全的任务，换句话说，这个中继链是Layer 1的链互相高效沟通的信息桥梁，这也是为什么Polkadot经常被人称为是一个跨链的项目，这些在Polkadot中继链之上的，由开发者搭建起来的Layer 1的链，被称作Parachain，其中两个相对比较有名气的项目时Moonriver和Karura。

因为他们在中继链的眼中，是平行的，是同一级别的。这种跨链的沟通，是非常有用的，因为良好的共通性，可以解决之前我们提到的目前比较不便的低效的信息共享问题。

# 总结
- Layer 0是最底层的架构，用于帮助Layer 1的链之间的跨链沟通，同时有些也承担和传统网络沟通的任务
- Layer 1是我们最常见的链，也是比较底层的架构，通常知名的Layer 1的链都有自己的庞大生态，Layer 1主要用来支持基于它的协议，在他上面开发的区块链应用。
- Layer 2的链通常是为了实现Layer 1的扩容而存在的。
![acd6c7abe2225360b46ef.jpg](https://telegra.ph/file/acd6c7abe2225360b46ef.jpg)

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
