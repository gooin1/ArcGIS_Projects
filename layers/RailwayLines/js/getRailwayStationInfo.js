/***
 *  从百度API获取车站的经纬度
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

var baiduQueryURL = "https://api.map.baidu.com/geocoder/v2/?output=json&ak=" + baiduAPI + "&address=";
var tempData = [];

$.each(lanXinRailWay.stations, function (index, value) {
    // console.log(value);
    // var baiduQueryURL = "https://api.map.baidu.com/geocoder/v2/?address=" + lanXinRailWay.stations[0] + "&output=json&ak=" + baiduAPI;
    // var tempData = [];
    $.ajax({
        dataType: "jsonp",
        type: "GET",
        async: false,
        url: baiduQueryURL + value,
    }).done(function (data) {
        var lng = data.result.location.lng;
        var lat = data.result.location.lat;
        var object = {
            "name": value,
            "location":{
                "lng": lng,
                "lat": lat,
            }
        }
        tempData.push(object);
        // console.log(object);
    });
});

// 组装带有经纬度的数据
var queryResult = {
    info: lanXinRailWay.info,
    stations:tempData
};
console.log(queryResult);


