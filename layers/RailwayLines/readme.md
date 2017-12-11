### 高铁线路图
通过百度/高德API获取火车站的经纬度, 标记在地图上



### 误差修正
高德API返回的坐标为国测局坐标系统(火星坐标 GCJ02),百度API获得的坐标为百度坐标(BD09, 基于GCJ02再次加密)

使用这个
[coordtransform 坐标转换](https://github.com/wandergis/coordtransform) 进行转换
转换后的坐标都为 `WGS84` 坐标, 实测和地图天地图底图完美吻合
- 百度

百度地图吻合的非常好,可以说是相当完美了

![](https://wx4.sinaimg.cn/large/6d4d992ely1fm9dwtbo80j20jw0fxac6.jpg)

 但是稍微有点不足:
1. 有一个小站API返回的位置错误
推测应该是没有更新数据

![](https://wx4.sinaimg.cn/large/6d4d992ely1fm9dvgr4kgj20qt0haq9q.jpg)

2. 兰州西站返回的位置错误
老毛病了, 想起来当年兰州西高铁站刚建好, 兴冲冲的去做高铁, 跟着百度地图导航走到了废弃的老兰州西站,那里都TM成啤酒摊了,如今现在API返回的地址还是那里, 摊手

![](https://wx4.sinaimg.cn/large/6d4d992ely1fm9dt5z9qwj213r0jnqos.jpg)

- 高德

![](https://wx4.sinaimg.cn/large/6d4d992ely1fm9fdtgy9zj20t00k5496.jpg)

整体很好,但是不如百度,稍微有一点点偏移:
猜测是高德地图的标注和天地图的标注位置有一点点错位

![](https://wx4.sinaimg.cn/large/6d4d992ely1fm9fp1r6uhj20jy0fidhk.jpg)

同样存在几个火车站位置错误问题
1. `玉门站` 到 酒泉市区了

![](https://wx4.sinaimg.cn/large/6d4d992ely1fm9fftb9ihj20n50e0dip.jpg)

把关键词改为`玉门火车站`就好了

### API 检索信息错误解决方案

把检索关键词修改具体一点就ok了

`兰州西站` -> `兰州西高铁站`;

`玉门站` -> `玉门火车站`;

`清水北站` -> `酒泉清水北站`;

![](https://wx1.sinaimg.cn/large/6d4d992ely1fm9h00sma8j21h40tzkc1.jpg)

### 设置点符号样式
现在的点样式为一个圆圈, 没有样式, 不能一眼认出这就是火车站, 就需要设置点符号为火车站的样式.
查阅API, 发现 `PictureMarkerSymbol` 可以完成需求.

原来的点渲染代码
```js
// 对点符号进行渲染
             var pointRenderer = new SimpleRenderer({
             symbol: new SimpleMarkerSymbol({
                    style: "circle",
                    size: 15,
                    color: "#24d6d7",
                    outline: {
                        width: 2,
                        color: "#7f99ff",
                        style: "solid"
                    }
               })
             });
```
将 `symbol`修改为 `PictureMarkerSymbol` 即可

> 需要注意的是, 在 `ArcGIS API For JS 4.5` 版本中, `autocasting` 方法支持所有 `Renders`, `symbols` 以及 `symbol layers`.
这样就不用在 `require` 和 `define` 中去写用到的方法了, 省事很多.

```js
// 设置点符号样式
            var picture_symbol = {
                type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                url: "https://api.happygis.com/demos/layers/resources/images/railway_station1.png",
                width: "30px",
                height: "30px"
            };
            // 对点符号进行渲染
            var pointRenderer = {
                type: "simple", // 使用 autocast 方法作为 new SimpleRender()
                symbol: picture_symbol
            };
```
效果:

![image](https://wx3.sinaimg.cn/large/6d4d992ely1fmclknzpo2j20hs0ejgq4.jpg)