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
                url: "https://api.happygis.com/demos/layers/resources/images/railway_station.png",
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

### 将点连接成线, 组成基本的铁路线
现在有了一部分点, 所有要将这些点组合, 连接成线, 组成基本的高铁线, 真正的高铁线不会在两个站点之间是一条直线的, 所以这就是一个大坑了, 需要后期解决

创建线的思路和创建点的思路一样:

> 创建 Graphics

> 创建图层


我将通过API查询到的每个高铁站的点保存到本地的JSON中, 方便调用

`railwayStationsChina` 就是存储的全国的高铁站点信息

```javascript

var railwayStationsChina = {
    "railways": [
        {
            "name": "兰新高铁",
            "id": 1500,
            "level": 250,
            "info": "兰新铁路第二双线，简称兰新二双，又称兰新高铁、兰...",
            "stations":
            [
                 {
                     "name": "兰州西高铁站",
                     "info": "甘肃省兰州市七里河区",
                     "location": {
                         "lng": 103.75094571814675,
                         "lat": 36.070940100316214
                     }
                 },
                 {
                     "name": "民和南站",
                     "info": "青海省海东地区民和回族土族自治县",
                     "location": {
                         "lng": 102.84816685586642,
                         "lat": 36.30648357548181
                     }
                 },
                 .....

            ]
        },{
             "name": "xx高铁",
             "id": 1500,
             "level": 250,
             "info": "xxxxx高铁 xxx年 建成xxx.",
             "stations":
             [
                  {
                      "name": "xx站",
                      "info": "xxxx区",
                      "location": {
                          "lng": 103.75094571814675,
                          "lat": 36.070940100316214
                      }
                  },
                  {
                      "name": "xx站",
                      "info": "xxxx区",
                      "location": {
                          "lng": 102.84816685586642,
                          "lat": 36.30648357548181
                      }
                  },
                  .....

             ]
          },
          ....
        ]
    }
```

#### 创建Graphic

```javascript
var lineFeatures = [];
var railwayPath = [];
          function createRailwayGraphicLine() {
//                遍历 所有的中国高铁线 读取数据
                $.each(railwayStationsChina.railways, function (index, railway) {
                    var railwayPath = [];
                    arrayUtils.map(railway.stations, function (feature, i) {
                        var lineGraphics = {};
                        // 创建线对象
                        railwayPath.push([feature.location.lng, feature.location.lat]);
//                    console.log(i)
                    });
                    var railwayLine = new Polyline({
                        hasZ: false,
                        hasM: false,
                        paths: railwayPath,
                        spatialReference: {wkid: 4326}
                    });

                    var lineGraphics =
                        {
                            geometry: railwayLine,
                            attributes: {
                                ObjectID: railway.id * 10,
                                railway_name: railway.name,
                                railway_info: railway.info,
                                railway_level: railway.level,
                                railway_url: railway.url
                            }
                        };
                    lineFeatures.push(lineGraphics);
//                    console.log(lineFeatures);
                    return lineFeatures;
                });
            }
```
#### 创建属性, 渲染样式

这里加一句, `polyline` 好像是不支持 `popup` 的
也就是说, 在图上的线是无法点击之后弹出信息的,
这里是个坑, 慢慢解决

这里说一下, 我在字段里给高铁线给了一个`level`,用于记录铁路的速度,比如京沪高铁350Km/H, 兰新高铁 210Km/h
按照不同的速度等级, 渲染出来的铁路颜色不同

> 在 `render` 里面有一个  `visualVariables` 用于控制符号的大小颜色等等


```
                visualVariables: [
                    {
                        // 按颜色进行分类
                        type: "color",
                        // 选择要进行分类的字段
                        field: "railway_level",
                        // 根据字段值进行划分
                        stops: [
                            {value: 250, color: "#edcc50"},
                            {value: 300, color: "#ea6838"},
                            {value: 350, color: "#e51806"}
                        ]
                    }
                ]
```

```javascript
//            铁路线符号样式
            var railway_line_symbol = {
                type: "simple-line",
                style: "short-dash-dot",
                join: "bevel",
                miterLimit: 0,
                width: 4,
                color: [92, 92, 92, 1]
            };


//            铁路符号渲染
            var railwayRender = {
                type: "simple",
                symbol: railway_line_symbol,

                // 可视变量
                visualVariables: [
                    {
                        // 按颜色进行分类
                        type: "color",
                        // 选择要进行分类的字段
                        field: "railway_level",
                        // 根据字段值进行划分
                        stops: [
                            {value: 250, color: "#edcc50"},
                            {value: 300, color: "#ea6838"},
                            {value: 350, color: "#e51806"}
                        ]
                    }
                ]
            };

            // 铁路属性字段
            var railwayFields = [
                {
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                }, {
                    name: "railway_name",
                    alias: "railway_name",
                    type: "string"
                }, {
                    name: "railway_info",
                    alias: "railway_info",
                    type: "string"
                }, {
                    name: "railway_level",
                    alias: "railway_level",
                    type: "string"
                }
            ];
```
#### 创建铁路图层
```javascript
        // 创建铁路图层
            var railway_lyr;
            function createRailwayLayer() {
                railway_lyr = new FeatureLayer({
                    // 上个函数中的graphics
                    source: lineFeatures,
                    fields: railwayFields,
                    renderer: railwayRender,
//                    目前 polyline好像不支持 popup
//                    popupTemplate: railwayLineTemplate,
                    objectIdField: "ObjectID",
                    geometryType: "polyline"
                });
                console.log(railway_lyr);
                map.add(railway_lyr);
            }

```

#### 添加好的效果

![image](https://ws2.sinaimg.cn/large/6d4d992ely1fmdwi2ysx1j20zn0s87wh.jpg)