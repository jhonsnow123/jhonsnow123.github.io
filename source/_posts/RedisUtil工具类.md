---
title: RedisUtil工具类
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMOZxjhl91f79u1UKCA4V09t_xIAAFUAAJEwjEbjA_JVJmyLTaJCrJ2AQADAgADeQADNgQ
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-10-23 18:01:28
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

# Redis工具组件
```java
//redis工具类
@UtilityClass
@Slf4j
public class RedisUtils {
    private  RedisService redisService;

    private  RedisTemplate<String, String> stringRedisTemplate;

    public RedisService getRedisService() {
        if(redisService==null){
            redisService=SpringContextHolder.getBean(RedisService.class);
        }
        return redisService;
    }

    public RedisTemplate<String, Object> getRedisTemplate() {
        return SpringContextHolder.getBean("redisTemplate");
    }

    public RedisTemplate<String, String> getStringRedisTemplate() {
        if(stringRedisTemplate==null){
            stringRedisTemplate=SpringContextHolder.getBean("stringRedisTemplate");
        }
        return stringRedisTemplate;
    }
   
    /**
     * HashGet
     * @param key  键 不能为null
     * @param item 项 不能为null
     * @return 值
     */
    public Object hGet(String key, String item) {
        HashOperations<String, Object, Object> ops = getRedisTemplate().opsForHash();
        return ops.get(key, item);
    }

    /**
     * 向一张hash表中放入数据,如果不存在将创建
     *
     * @param key   键
     * @param item  项
     * @param value 值
     * @param time  时间(秒)  注意:如果已存在的hash表有时间,这里将会替换原有的时间
     * @return true 成功 false失败
     */
    public boolean hSet(String key, String item, Object value, long time) {
        try {
            HashOperations<String, Object, Object> ops = getRedisTemplate().opsForHash();
            ops.put(key, item, value);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            log.error("hSet err{}",e.getMessage());
            return false;
        }
    }

    /**
     * 指定缓存失效时间
     *
     * @param key  键
     * @param time 时间(秒)
     * @return
     */
    public boolean expire(String key, long time) {
        try {
            if (time > 0) {
                getRedisTemplate().expire(key, time, TimeUnit.SECONDS);
            }
            return true;
        } catch (Exception e) {
            log.error("expire err{}",e.getMessage());
            return false;
        }
    }

    /**
     * redis  string类型 存储方法
     * kc:1:appName:key
     * @param key     自定义key
     * @param value   存储的字符串
     * @param timeout 超时时间
     */
    public void setStringValue(String key, String value, long timeout, TimeUnit unit) {
        ValueOperations<String, String> vo = getStringRedisTemplate().opsForValue();
        vo.set(getRedisService().getFormatKey(key), value, timeout, unit);
        vo.set(getRedisService().getFormatKey(key), value);
    }

    /**
     * redis  string类型 存储方法
     *
     * @param key     自定义key
     * @param value   存储的字符串
     */
    public void setStringValue(String key, String value) {
        ValueOperations<String, String> vo = getStringRedisTemplate().opsForValue();
        vo.set(getRedisService().getFormatKey(key), value);
    }
    /**
     * redis  string类型 存储方法
     *
     * @param key     自定义key
     * @param value   存储的字符串
     */
    public void setStringVal(String key, String value) {
        ValueOperations<String, String> vo = getStringRedisTemplate().opsForValue();
        vo.set(key, value);
    }

    /**
     * redis  string类型 存储方法
     * @param key     自定义key
     */
    public String getStringValue(String key) {
        ValueOperations<String, String> vo = getStringRedisTemplate().opsForValue();
        String s = vo.get(getRedisService().getFormatKey(key));
        log.info("获取{}={}",getFormatKey(key),s);
        return s;
    }

    /**
     * 设置key并设置过期时间
     * @param key
     * @param value
     * @param time
     * @return
     */
    public Boolean setIfAbsent(String key, String value, long time) {
        return getStringRedisTemplate().opsForValue().setIfAbsent(key, value, time, TimeUnit.SECONDS);
    }

    /**
     * redis  string类型 存储方法
     * @param key     自定义key
     */
    public String getStringVal(String key) {
        ValueOperations<String, String> vo = getStringRedisTemplate().opsForValue();
        String s = vo.get(key);
        if(log.isDebugEnabled()){
            log.debug("获取{}={}",key,s);
        }
        return s;
    }

    /**
     * 删除hash表中的值
     *
     * @param key  键 不能为null
     * @param item 项 可以使多个 不能为null
     */
    public void hDel(String key, Object... item) {
        HashOperations<String, Object, Object> ops = getStringRedisTemplate().opsForHash();
        ops.delete(key, item);
    }

    /**
     * 判断hash表中是否有该项的值
     *
     * @param key  键 不能为null
     * @param item 项 不能为null
     * @return true 存在 false不存在
     */
    public boolean hHasKey(String key, String item) {
        HashOperations<String, Object, Object> ops = getStringRedisTemplate().opsForHash();
        return ops.hasKey(key, item);
    }

    /**
     * HashSet 并设置时间
     *
     * @param key  键
     * @param map  对应多个键值
     * @param time 时间(秒)
     * @return true成功 false失败
     */
    public boolean hMSet(String key, Map<String, Object> map, long time) {
        try {
            HashOperations<String, Object, Object> ops = getStringRedisTemplate().opsForHash();
            ops.putAll(key, map);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            log.error("hMSet err{}",e.getMessage());
            return false;
        }
    }

    /**
     * hMGetStr 批量获取redis hash得值
     *
     * @param key  键 不能为null
     * @param item 项 不能为null
     * @return 值
     */
    public List<Object> hMGetStr(String key, List<Object> item) {
        HashOperations<String, Object, Object> ops = getStringRedisTemplate().opsForHash();
        List<Object> objects = ops.multiGet(key, item);
        return objects;
    }

    /**
    * 获取hashKey对应的所有键值
    * @param key 键
    * @return 对应的多个键值
    */
    public Map<Object, Object> hMGet(String key) {
        HashOperations<String, Object, Object> ops = getStringRedisTemplate().opsForHash();
        return ops.entries(key);
    }    

    /**
     * hGetStr
     *
     * @param key  键 不能为null
     * @param item 项 不能为null
     * @return 值
     */
    public Object hGetStr(String key, String item) {
        HashOperations<String, Object, Object> ops = getStringRedisTemplate().opsForHash();
        return ops.get(key, item);
    }
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
