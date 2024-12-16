---
title: 以注解的方式实现Redis会话token同步
cover: https://pic.51santi.uk/api/cfile/AgACAgUAAyEGAASQGKXDAAMVZy3y78hc6i02xzcMiphnozG0Yu0AAozCMRsQdXBVam81tr0CeRkBAAMCAAN4AAM2BA
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2024-11-08 18:12:33
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
# 场景
 公司内部支付管理系统A和第三支付的管理系统B。大部分功能有雷同。现在需要开发一个A / B系统的公共需求。A开发完成之后，B调用A的feign接口。减少开发成本。但是A系统的用户token redis和B系统的用户token redis是分开的。
 现在需要在B系统调用A系统的feign接口同时将用户token同步到A的redis。

 # 解决方案
 ```JAVA
public class ThreadLocalUtils {

    private static final ThreadLocal<Map<String, Object>> threadLocal = new ThreadLocal<>();

    public static void set(String key, Object value) {
        Map<String, Object> map = threadLocal.get();
        if (map == null) {
            map = new HashMap<>();
            threadLocal.set(map);
        }
        map.put(key, value);
    }

    public static Object get(String key) {
        Map<String, Object> map = threadLocal.get();
        if (map != null) {
            return map.get(key);
        }
        return null;
    }

    public static void remove(String key) {
        Map<String, Object> map = threadLocal.get();
        if (map != null) {
            map.remove(key);
        }
    }

    public static void clear() {
        threadLocal.remove();
    }
}
 ```

 ```JAVA
@Slf4j
@Component
public class TokenCachedInterceptor implements HandlerInterceptor {
    @Autowired
    private UserContext userContext;
    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod method = (HandlerMethod) handler;
            TokenCached annotation = method.getMethodAnnotation(TokenCached.class);
            if (annotation != null) {
//                UUID uuid = UUID.randomUUID();
//                UUIDRequestContext.setUUID(request, uuid);
                String token = request.getHeader("Tb-Token");
                log.info("tb-token:{},sessionUser:{}",token, JSON.toJSONString(userContext.getUser()));
                if (StringUtils.isNotEmpty(token)) {
                    String redisKey = annotation.prefix() + token;
                    log.info("cacheSessionUser redisKey:{}",redisKey);
                    redisTemplate.opsForValue().set(redisKey, JSON.toJSONString(userContext.getUser()), 30, TimeUnit.SECONDS);
                }
            }
        }
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod method = (HandlerMethod) handler;
            TokenCached annotation = method.getMethodAnnotation(TokenCached.class);
            if (annotation != null) {
                String token = request.getHeader("Tb-Token");
                if (StringUtils.isNotEmpty(token)) {
                    //UUID uuid = UUIDRequestContext.getUUID();
                    String redisKey = annotation.prefix() + token;
                    log.info("reset expire cacheSessionUser redisKey:{}",redisKey);
                    extendExpiration(redisKey,30, TimeUnit.SECONDS);
                    log.info("重置缓存过期时间:{}",redisKey);
                }
            }
        }
    }
    public void extendExpiration(String key, long timeout, TimeUnit timeUnit) {
        Boolean hasKey = redisTemplate.hasKey(key);
        if (hasKey != null && hasKey) {
            redisTemplate.expire(key, timeout, timeUnit);
        }
    }

}
 ```
```JAVA
@Configuration
public class MyWebMvcConfigurer implements WebMvcConfigurer {

    @Autowired
    private TokenCachedInterceptor tokenCachedInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenCachedInterceptor);
    }

}
```

```JAVA
@Component
@Slf4j
public class FeignRequestInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        //判断是否是主线程
        if (ObjectUtil.isNotEmpty(RequestContextHolder.getRequestAttributes())){
            return;
        }
		//将当前线程的请求头注入到request中
        HttpHeaders headers = (HttpHeaders) ThreadLocalUtils.get("headers");
        template.header("Tb-Token", headers.get("Tb-Token"));
        log.info("异步线程封装Tb-Token:{}",headers.get("Tb-Token"));
    }
}
```

```JAVA
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface TokenCached {
    String prefix() default "mjs:sso:login:token:admin_v1:"; // Redis Key 前缀
}
```
## 对应controller代码实现
```JAVA
@RestController
@RequestMapping("/sendApply")
@Slf4j
public class SendApplyController {
    @Resource
    private SendApplyApi sendApplyApi;

    
    @PostMapping(value = "/v1/add")
    @TokenCached
    public ResponseVO add(@RequestBody SendApplyPermissionDto dto) {
        return sendApplyApi.add(dto);
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
