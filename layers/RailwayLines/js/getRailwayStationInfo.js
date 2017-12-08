/***
 *  从 百度/高德 API 获取车站的经纬度
 * @type {{info: string, stations: [string,string,string,string,string]}}
 */

var lanXinRailWay = {
    info: "兰新铁路第二双线，简称兰新二双，又称兰新高铁、兰新客运专线，是中国一条连接甘肃省兰州市与新疆维吾尔自治区乌鲁木齐市的快速铁路。原兰新高铁是铁道部《中长期铁路网规划（2008年调整）》的重点项目。但自723温州动车事故后，铁道部重新审视铁道建设计划。2012年，兰新第二双线在《十二五综合交通运输体系规划》中被列为快速铁路。全线按国铁I级规格建造，设计最高时速为250公里，全长1776公里（运价里程为1787公里）。",
    stations: [
        "兰州西站",
        "民和南站",
        "乐都南站",
        "海东西站",
        "西宁站",
    ]
};

// 百度API返回数据
// {
//     "status": 0,
//     "result": {
//     "location": {
//         "lng": 103.77713078043077,
//         "lat": 36.07007110916156
//     },
//     "precise": 0,
//         "confidence": 60,
//         "level": "火车站"
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
var baiduQueryURL = "https://api.map.baidu.com/geocoder/v2/?output=json&ak=" + baiduAPIKey + "&address=";

/***
 * 从高德,百度地理编码API获取数据
 * @param queryURL 地理编码API的URL
 * @returns {{info: string, stations: Array}|*}
 */
function getDatafromAPI(queryURL) {
    var tempData = [];
    var urlArray = queryURL.split(".")
    // 从传入的URL判断是否为高德API及百度API
    var isGaodeURL = urlArray.includes('amap');
    var isBaiduURL = urlArray.includes('baidu');
    $.each(lanXinRailWay.stations, function (index, value) {
        // API获取查询结果
        $.ajax({
            dataType: "jsonp",
            type: "GET",
            async: false,
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
                var wgs84 = coordtransform.gcj02towgs84(lng,lat);
                console.log(lng);
                console.log(lat);
                console.log(wgs84);
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
                var lng = data.result.location.lng;
                var lat = data.result.location.lat;
                var gcj02 = coordtransform.bd09togcj02(lng,lat)
                var wgs84 = coordtransform.gcj02towgs84(gcj02[0],gcj02[1])
                var object = {
                    "name": value,
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
        info: lanXinRailWay.info,
        stations: tempData
    };
    console.log(queryResult);
    return queryResult;

}
// getDatafromAPI(gaodeQueryURL);
getDatafromAPI(baiduQueryURL);



