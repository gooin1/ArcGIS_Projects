/***
 *  从 百度/高德 API 获取车站的经纬度
 * @type {{info: string, stations: [string,string,string,string,string]}}
 */

var lanXinRailWay = {
    name: "兰新高铁",
    id: "1500",
    level: "250",
    info: "兰新铁路第二双线，简称兰新二双，又称兰新高铁、兰新客运专线，是中国一条连接甘肃省兰州市与新疆维吾尔自治区乌鲁木齐市的快速铁路。原兰新高铁是铁道部《中长期铁路网规划（2008年调整）》的重点项目。但自723温州动车事故后，铁道部重新审视铁道建设计划。2012年，兰新第二双线在《十二五综合交通运输体系规划》中被列为快速铁路。全线按国铁I级规格建造，设计最高时速为250公里，全长1776公里（运价里程为1787公里）。",
    stations: [
        // "兰州西站",
        "兰州西高铁站",
        "民和南站",
        "乐都南站",
        // "海东西站",
        "海东平安站",
        "西宁站",
        "大通西站",
        "门源站",
        "民乐站",
        "张掖西站",
        "临泽南站",
        "高台南站",
        "酒泉清水北站",
        "酒泉南站",
        "嘉峪关南站",
        "玉门火车站",
        "柳园南站",
        "哈密站",
        "吐哈站",
        "鄯善北站",
        "吐鲁番北站",
        "乌鲁木齐南站",
        "乌鲁木齐站"
    ]
};
var jingHuRailway = {
    name: "京沪高铁",
    id: "1000",
    level: "350",
    info: "京沪高速铁路简称京沪高铁，是中国一条连接北京市与上海市的高速铁路。线路由北京南站至上海虹桥站，全长1318公里，设24个车站。设计的最高速度为380km/h，近期最高运营时速350km/h（2017年9月21日起[1]）。",
    stations: [
        "北京南站",
        "廊坊站",
        "天津西站",
        "天津南站",
        "沧州西站",
        "德州东站",
        "济南西站",
        "泰安站",
        "曲阜东站",
        "滕州东站",
        "枣庄站",
        "徐州东站",
        "宿州东站",
        "蚌埠南站",
        "定远站",
        "滁州站",
        "南京南站",
        "镇江南站",
        "丹阳北站",
        "常州北站",
        "无锡东站",
        "苏州北站",
        "昆山南站",
        "上海虹桥站"
    ]
};
var jingGuangRailway = {
    name: "京广高铁",
    id: "2000",
    level: "300",
    info: "京广高速铁路是中国一条营运中的高速铁路。该线始于北京西站，途经石家庄、郑州、武汉、长沙等地，到达广州南站，全长2,118公里[1]，为目前中国线路里程最长、经过省份最多的南北向高速铁路，也是当今世界上营运里程最长的高速铁路[3]，行车时间最快约为8小时03分钟（北京西-广州南）、3小时43分钟（武汉-广州南）。",
    stations: [
        "北京西站",
        "涿州东站",
        "高碑店东站",
        "保定东站",
        "定州东站",
        "正定机场站",
        "石家庄站",
        "高邑西站",
        "邢台东站",
        "邯郸东站",
        "安阳东站",
        "鹤壁东站",
        "新乡东站",
        "郑州东站",
        "许昌东站",
        "漯河西站",
        "驻马店西站",
        "明港东站",
        "信阳东站",
        "孝感北站",
        "武汉站",
        "咸宁北站",
        "赤壁北站",
        "岳阳东站",
        "汨罗东站",
        "长沙南站",
        "株洲西站",
        "衡山西站",
        "衡阳东站",
        "耒阳西站",
        "郴州西站",
        "乐昌东站",
        "韶关站",
        "英德西站",
        "清远站",
        "广州北站",
        "广州南站"
    ]
};
var huKunRailway = {
    name: "沪昆高铁",
    id: "2500",
    level: "300",
    info: "沪昆高速铁路，又名沪昆客运专线，简称沪昆客专、沪昆高铁，是中国一条东西方向的高速铁路，于2016年12月28日全线通车。全线东起上海市，途径浙江省杭州市、江西省南昌市、湖南省长沙市、贵州省贵阳市等省会城市，西到云南省昆明市，全长2266公里，设计时速为350km/h。该线是客运专线，作为“沪昆通道”也是中国2008年调整《中长期铁路网规划》中“四纵四横”铁路快速客运通道之一，以及2016年修订的《中长期铁路网规划》中“八纵八横”高速铁路主通道之一，服务华东沿海地区、华中地区、西南地区。为目前中国线路里程最长、经过省份最多的东西向高速铁路。",
    stations: [
        "上海虹桥站",
        "松江南站",
        "金山北站",
        "嘉善南站",
        "嘉兴南站",
        "桐乡站",
        "海宁西站",
        "余杭站",
        "杭州东站",
        "杭州南站",
        "诸暨站",
        "义乌站",
        "金华站",
        "龙游站",
        "衢州站",
        "江山站",
        "玉山南站",
        "上饶站",
        "戈阳站",
        "鹰潭北站",
        "抚州东站",
        "进贤南站",
        "南昌西站",
        "高安站",
        "新余北站",
        "宜春站",
        "萍乡北站",
        "醴陵东站",
        "长沙南站",
        "湘潭北站",
        "韶山南站",
        "娄底南站",
        "邵阳北站",
        "新化南站",
        "溆浦南站",
        "怀化南站",
        "芷江站",
        "新晃西站",
        "铜仁南站",
        "三穗站",
        "凯里南站",
        "贵定北站",
        "贵阳东站",
        "贵安站",
        '平坝南站',
        "安顺西站",
        "关岭站",
        "普安县站",
        "盘州站",
        "富源北站",
        "曲靖北站",
        "嵩明站",
        "昆明南站"
    ]
}

// 百度API返回数据
// {
//     "status": 0,
//     "message": "ok",
//     "result": [
//     {
//         "source": "baidu",
//         "location": {
//             "lat": 36.07007110916156,
//             "lng": 103.77713078043077
//         },
//         "bound": "36.069339,103.773922;36.071089,103.781108",
//         "formatted_address": "甘肃省兰州市七里河区",
//         "address_components": {
//             "province": "甘肃省",
//             "city": "兰州市",
//             "district": "七里河区",
//             "street": "",
//             "level": "火车站"
//         },
//         "precise": 0.6
//     }
// ]
// }

// 高德API返回数据
// {
//     "status": "1",
//     "info": "OK",
//     "infocode": "10000",
//     "count": "1",
//     "geocodes": [
//     {
//         "formatted_address": "甘肃省兰州市七里河区兰州西站",
//         "province": "甘肃省",
//         "citycode": "0931",
//         "city": "兰州市",
//         "district": "七里河区",
//         "township": [],
//         "neighborhood": {
//             "name": [],
//             "type": []
//         },
//         "building": {
//             "name": [],
//             "type": []
//         },
//         "adcode": "620103",
//         "street": [],
//         "number": [],
//         "location": "103.752739,36.068391",
//         "level": "兴趣点"
//     }
// ]
// }

var gaodeQueryURL = "https://restapi.amap.com/v3/geocode/geo?key=" + gaodeAPIKey + "&address=";
// var baiduQueryURL = "https://api.map.baidu.com/geocoder/v2/?output=json&ak=" + baiduAPIKey + "&address=";
var baiduQueryURL = "https://api.map.baidu.com/cloudgc/v1?ak=" + baiduAPIKey + "&address=";

/***
 * 从高德,百度地理编码API获取数据
 * @param queryURL 地理编码API的URL
 * @returns {{info: string, stations: Array}|*}
 */
function getDatafromAPI(railwayObject, queryURL) {
    var tempData = [];
    var urlArray = queryURL.split(".")
    // 从传入的URL判断是否为高德API及百度API
    var isGaodeURL = urlArray.includes('amap');
    var isBaiduURL = urlArray.includes('baidu');
    $.each(railwayObject.stations, function (index, value) {
        // API获取查询结果
        $.ajax({
            dataType: "jsonp",
            type: "GET",
            async: true,
            url: queryURL + value,
        }).done(function (data) {
            // 解析高德API返回的json
            if (isGaodeURL) {
                var location = data.geocodes[0].location;
                var locationArray = location.split(",");
                var lng = locationArray[0];
                var lat = locationArray[1];
                // var wgs84 = gcj02towgs84(lng,lat);
                // 将高德返回的GCJ02坐标转换为WGS84
                var wgs84 = coordtransform.gcj02towgs84(lng, lat);
                var object = {
                    "name": value,
                    "info": data.geocodes[0].formatted_address,
                    "location": {
                        "lng": wgs84[0],
                        "lat": wgs84[1],
                    }
                };
            }
            // 解析百度API返回的json
            if (isBaiduURL) {
                var lng = data.result[0].location.lng;
                var lat = data.result[0].location.lat;
                var gcj02 = coordtransform.bd09togcj02(lng, lat)
                var wgs84 = coordtransform.gcj02towgs84(gcj02[0], gcj02[1])
                var object = {
                    "name": value,
                    "info": data.result[0].formatted_address,
                    "location": {
                        "lng": wgs84[0],
                        "lat": wgs84[1],
                    }
                }

            }
            tempData.push(object);
        });
    });
    // 组装带有经纬度的数据
    queryResult = {
        name: railwayObject.name,
        id: railwayObject.id,
        level: railwayObject.level,
        info: railwayObject.info,
        stations: tempData
    };
    console.log(queryResult);
    return queryResult;

}

// getDatafromAPI(gaodeQueryURL);
getDatafromAPI(huKunRailway, baiduQueryURL);




