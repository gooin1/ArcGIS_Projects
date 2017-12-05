### ArcGIS api for javascript 4.5 添加天地图 (WebTilesLayer)

```javascript
            // 允许跨域访问天地图域名
            esriConfig.request.corsEnabledServers
                .push(
                    "t0.tianditu.com",
                    "t1.tianditu.com",
                    "t2.tianditu.com",
                    "t3.tianditu.com",
                    "t4.tianditu.com",
                    "t5.tianditu.com",
                    "t6.tianditu.com",
                    "t7.tianditu.com"
                );
            var map = new Map({
                ground: "world-elevation"
            });


            // TODO: 修正不同坐标系统空间参考
            var view = new SceneView({
                container: "viewDiv",
                map: map,
                scale: 5000,
                //  Center in Google Map
//                center: [114.390395, 30.461266]
                // Center in GaoDe Map
//                center: [114.396963, 30.467265]
                // Center in Tianditu
                center: [114.38484, 30.46359]
            });


            /**
             * 天地图URL参数
             *
             *  // 影像图层
             *  http://{subDomain}.tianditu.com/DataServer?T=img_w&x={col}&y={row}&l={level}
             *  // 影像注记
             *  http://{subDomain}.tianditu.com/DataServer?T=cia_w&x={col}&y={row}&l={level}
             *
             *  // 矢量注记
             *  http://{subDomain}.tianditu.com/DataServer?T=cva_w&x={col}&y={row}&l={level}
             *  // 矢量图层
             *  http://{subDomain}.tianditu.com/DataServer?T=vec_w&x={col}&y={row}&l={level}
             */

                //添加天地图矢量图层
            var tiandiVecLayer = new WebTileLayer({
                    urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=vec_w&x={col}&y={row}&l={level}",
                    subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                    copyright: "天地图"
                });
//
//            console.log("SceneView空间参考:");
//            console.log(map.spatialReference);
//            console.log("天地图空间参考: ");
//            console.log(tiandiVecLayer.spatialReference);
            //添加天地图矢量注记图层
            var tiandiVecLabelLayer = new WebTileLayer({
//                tileInfo: tileInfo,
                urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=cva_w&x={col}&y={row}&l={level}",
                subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],


            });
            // 将两个图层添加到地图中
            map.addMany([tiandiVecLayer, tiandiVecLabelLayer]);
            //添加点击事件
            view.on("click", function (event) {
                event.stopPropagation();
//              获取点击点的经纬度
                var lat = event.mapPoint.latitude;
                var lon = event.mapPoint.longitude;
                // 弹出提醒
                view.popup.open({
                    title: "经纬度: ",
                    location: event.mapPoint,
                    content: "[" + lon + "," + lat + "]"
                });
            });


        });
```



```
            /**
             * 天地图URL参数
             *
             *  // 影像图层
             *  http://{subDomain}.tianditu.com/DataServer?T=img_w&x={col}&y={row}&l={level}
             *  // 影像注记
             *  http://{subDomain}.tianditu.com/DataServer?T=cia_w&x={col}&y={row}&l={level}
             *
             *  // 矢量注记
             *  http://{subDomain}.tianditu.com/DataServer?T=cva_w&x={col}&y={row}&l={level}
             *  // 矢量图层
             *  http://{subDomain}.tianditu.com/DataServer?T=vec_w&x={col}&y={row}&l={level}
             */
```
演示地址
https://arcgis.happygis.com/demos/4.5/layers/WebTiles/WebTiles_Layer.html


![天地图](https://i.loli.net/2017/12/05/5a2679a3708a3.png)