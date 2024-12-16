---
title: Redis使用规范
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMQZxjjWra5lwLCk3lX0DUPFYEc2K8AAlfCMRuMD8lUE6oZ61iPvP0BAAMCAAN4AAM2BA
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-10-23 19:30:40
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
# 一、redis使用注意事项
---
1、key统一命名前缀： mjs_bill_3_ , 数字3为header头中SaasID的值

2、key避免过长，不超过30个字符

3、string类型控制在10KB以内，hash、list、set、zset元素个数不要超过5000

4、禁止代码中调用redis命令keys、flushall、flushdb等

5、禁止使用redis消息队列，应使用消息中间件RabbitMQ或kafka

6、value均使用string型存储，避免对象修改造成反序列化异常

7、所有缓存数据必须设置过期时间

# 二、键值设计
***
1. key名设计
(1)【建议】: 可读性和可管理性
以业务名(或数据库名)为前缀(防止key冲突)，用冒号分隔，比如业务名:表名:id

ugc:video:1
(2)【建议】：简洁性
保证语义的前提下，控制key的长度，当key较多时，内存占用也不容忽视，例如：

user:{uid}:friends:messages:{mid}简化为u:{uid}:fr:m:{mid}。
(3)【强制】：不要包含特殊字符
反例：包含空格、换行、单双引号以及其他转义字符

2. value设计
(1)【强制】：拒绝bigkey(防止网卡流量、慢查询)
string类型控制在10KB以内，hash、list、set、zset元素个数不要超过5000。

反例：一个包含200万个元素的list。

非字符串的bigkey，不要使用del删除，使用hscan、sscan、zscan方式渐进式删除

(2)【推荐】：选择适合的数据类型。
例如：实体类型(要合理控制和使用数据结构内存编码优化配置,例如ziplist，但也要注意节省内存和性能之间的平衡)

3.【推荐】：控制key的生命周期，redis不是垃圾桶。
建议使用expire设置过期时间(条件允许可以打散过期时间，防止集中过期)，不过期的数据重点关注idletime。

# 三、命令使用
---
1.【推荐】 O(N)命令关注N的数量
例如hgetall、lrange、smembers、zrange、sinter等并非不能使用，但是需要明确N的值。有遍历的需求可以使用hscan、sscan、zscan代替。

2.【推荐】：禁用命令
禁止线上使用keys、flushall、flushdb等，通过redis的rename机制禁掉命令，或者使用scan的方式渐进式处理。

3.【推荐】合理使用select
redis的多数据库较弱，使用数字进行区分，很多客户端支持较差，同时多业务用多数据库实际还是单线程处理，会有干扰。

4.【推荐】使用批量操作提高效率
原生命令：例如mget、mset。
非原生命令：可以使用pipeline提高效率。
但要注意控制一次批量操作的元素个数(例如500以内，实际也和元素字节数有关)。

# 四、Redis基础入门
---
一、redis简介

 1）redis是一个开源的、基于C语言开发的内存数据库

 2）redis是一种key-value存储系统，支持数据类型包括String、List、Set、Hash等

 3）redis是当前最热门的No-SQL系统之一

 4）redis提供了多种语言的api

 5）性能非常高，单节点TPS可达10W

 6）支持持久化

中文网: http://www.redis.cn/

二、redis安装

yum官方源里没有redis，所以采用手动源码安装

1）上传redis安装包到linux任意目录下，解压tar xvf redis-5.6.7.tar.gz
2）安装gcc（redis安装依赖C语言环境，需要先安装GCC）
       yum install -y gcc
3) 进入解压后的redis目录下，执行编译操作
      make
4）执行安装命令

     make install

三、redis配置

1）在redis目录下，新建conf文件夹，将redis.conf配置文件复制到conf目录下
mkdir conf;cp redis.conf ./conf
2）修改redis.conf配置文件，将daemonize改为yes
 将bind 127.0.0.1注释掉，protected-mode改为no

四、redis启动

1）先启动server,在conf目录下，执行redis-server ./redis.conf
2）使用客户端登录redis，默认连接的是6379端口的redis实例
  redis-cli -p 6379
3）关闭redis-server
redis-cli shutdown

五、redis数据类型

1）对String数据类型的操作

     set key value:给名称为key的String值赋值为value

     get key:返回名称为key的value值

2）对list数据类型的操作

    rpush key value  在名称为key的list尾部添加一个值为value

    lpush key value  在名称为key的list头部添加一个值为value

    llen key 返回名称为key的list的长度

    lrange key start end:返回名称为key的list中start至end之间的元素

    lset key index value 给名称为key的list中index位置的元素赋值为value 

    rpop:返回并删除名称为key的list中的尾元素

3）对Hash数据类型的操作

     hset key field value  向名称为key的hash中添加元素 field<-> value

     hget key field 返回名称为key的hash中field对应的value

     hgetall key 返回名称为key的hash中所有建（field）及其对应的value

    hlen key 返回名称为key的hash中元素个数

    hdel key field 删除名称为key中键为field的域

4）对全局value的操作

    exists key 确认一个key是否存在

    del key 删除一个key

    type key 返回值的类型
    keys pattern 返回满足给定pattern的所有key
    dbsize 返回当前数据库中key的数目
    select dbindex 切换数据库
    flushdb 删除当前选择数据库中所有的key

六、redis多实例部署

由于redis服务端是单线程实现的，因此只能占用CPU的单核，为了充分利用CPU资源，可以在一台服务器上同时启动多个redis-server实例

配置方法：
 1）每个实例创建一个conf文件
 2）修改每个conf文件中的端口号
 3）启动不同实例时指定不同的配置文件

七、redis主从

  在redis的conf文件中，配置上slaveof 127.0.0.1 6379，重启redis

八、redis其他配置

  maxclient 最大连接数

  maxmemory

  requirepass 设置密码    redis-cli -p 6379 -a lucius123

 当主redis里配置了密码，从redis是不能同步的，从redis中必须配置主redis的密码，否则数据无法完成同步，在从redis的配置文件中设置masterauth参数为主redis设置的密码。

九、项目整合redis

1）修改配置文件
2）修改redis的host、port、password
3）访问环境整合接口
系统中使用了缓存+数据库
先从缓存读数据，如果有，直接返回数据；如果没有，去数据库读，然后再插入到缓存中，再返回数据
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
