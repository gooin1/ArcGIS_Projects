
### CSV Layer 效果
```javascript
// CSV 资源的 URL
            var url = "https://arcgis.happygis.com/demos/4.5/layers/resources/ingress.csv";
            //
            esriConfig.request.corsEnabledServers.push(url);
            // 弹出内容模板            var template = {
                title: "Link Info",
                // {} 内的属性与 csv 文件相同, 读取csv文件的属性
                content: " <p><b style='color: dodgerblue'>{owner_name}</b> [{faction}] captured <b>{portal_name}</b> at {time}.</p>" +
                "Portal link: <a href='https://www.ingress.com/intel?ll={latitude},{longitude}&z=12'>{portal_name}</a> "
            };
            // 创建csvLayer
            var csvLayer = new CSVLayer({
                url: url,
                // 版权信息, 左下方显示
                copyright: "Agent gooin",
                popupTemplate: template,
                elevationInfo: {
                    // drapes icons on the surface of the globe
                    mode: "on-the-ground"
                }
            });
            // CSV 图层符号的渲染样式
            csvLayer.renderer = new SimpleRenderer({
                symbol: new PointSymbol3D({
                    symbolLayers: [
                        new IconSymbol3DLayer({
                            material: {
                                color: [238, 69, 0, 0.75]
                            },
                            outline: {
                                width: 0.5,
                                color: "white"
                            },
                            size: "25px"
                        })
                    ]
                })
            });

            var map = new Map({
                basemap: "streets-night-vector",
                // 将csvlayer加入map图层
                layers: [csvLayer]
            });

            var view = new SceneView({
                container: "viewDiv",
                center: [103, 35],
                zoom: 4,
                map: map
            });
```
ingress.csv 文件内容
```
time,latitude,longitude,faction,owner_name,portal_name
2017/9/7 21:13,35.591436,104.692154,blue,gooin,正立广场
2017/9/5 18:20,20,60,blue,xxx,test1
2017/4/7 21:20,-20,30,green,adasd,fafa
2017/9/7 21:13,26,12.692154,blue,gooin,一个狮子
2017/9/7 21:13,103,35,blue,gooin,一个po名
2017/9/7 21:13,104,25,blue,sb,哇啦哇啦哇累
```
演示地址
https://arcgis.happygis.com/demos/4.5/layers/CSV_Layer.html

![CSV Layer](https://i.loli.net/2017/12/05/5a26168a802b9.png)