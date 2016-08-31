var express = require('express');
var wechat = require('wechat');
var config = require('../config/config');

/* GET wechat. */
module.exports = wechat(config.wechat).text(function (message, req, res, next) {
    // message为文本内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125035',
    // MsgType: 'text',
    // Content: 'http',
    // MsgId: '5837397576500011341' }
    if (message.Content === 'hello world') {
        res.reply('Hello world! This is wechat replay from Node.js server.');
        return;
    }
    if (message.Content === 'nodejs') {
        res.reply('Node.js');
        return;
    }

    if (message.Content === 'user') {
        var user = require('../services/user');
        var id = user.getUserId(message.FromUserName);
        console.log('return:' + id);
        if (id) {
            res.reply('Your user id is' + id);
        } else {
            if (user.createUser(message.FromUserName)) {
                res.reply('Register new user.');
            } else {
                res.reply('Register user failed, try later');
            }
        }
        return;
    }

    res.reply([{
        title: '功能正在开发中',
        description: '功能加紧开发中,耐心等待',
        picurl: config.domain + 'images/bg.jpg',
        url: config.domain
    }]);

    console.log("textMsg received");
    console.log(JSON.stringify(message));
}).image(function (message, req, res, next) {
    // message为图片内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359124971',
    // MsgType: 'image',
    // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
    // MediaId: 'media_id',
    // MsgId: '5837397301622104395' }
    res.reply('你发图片干嘛,我又看不懂。');

    console.log("imageMsg received");
    console.log(JSON.stringify(message));
}).voice(function (message, req, res, next) {
    // message为音频内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'voice',
    // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
    // Format: 'amr',
    // MsgId: '5837397520665436492' }
    res.reply('语音也不行的啦。你就别费心了。');
}).video(function (message, req, res, next) {
    // message为视频内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'video',
    // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
    // ThumbMediaId: 'media_id',
    // MsgId: '5837397520665436492' }
    res.reply('视频不错,但是有啥用?');
}).shortvideo(function (message, req, res, next) {
    // message为短视频内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'shortvideo',
    // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
    // ThumbMediaId: 'media_id',
    // MsgId: '5837397520665436492' }
    res.reply('视频不错,但是有啥用?');
}).location(function (message, req, res, next) {
    // message为位置内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125311',
    // MsgType: 'location',
    // Location_X: '30.283950',
    // Location_Y: '120.063139',
    // Scale: '15',
    // Label: {},
    // MsgId: '5837398761910985062' }
    res.reply('啊哈哈哈,你住这里啊。');
    console.log("locationMsg received");
    console.log(JSON.stringify(message));
}).link(function (message, req, res, next) {
    // message为链接内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'link',
    // Title: '公众平台官网链接',
    // Description: '公众平台官网链接',
    // Url: 'http://1024.com/',
    // MsgId: '5837397520665436492' }
    res.reply('这是什么连接,有病毒吗?');
    console.log("urlMsg received");
    console.log(JSON.stringify(message));
}).event(function (message, req, res, next) {
    // message为事件内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'event',
    // Event: 'LOCATION',
    // Latitude: '23.137466',
    // Longitude: '113.352425',
    // Precision: '119.385040',
    // MsgId: '5837397520665436492' }
}).device_text(function (message, req, res, next) {
    // message为设备文本消息内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'device_text',
    // DeviceType: 'gh_d3e07d51b513'
    // DeviceID: 'dev1234abcd',
    // Content: 'd2hvc3lvdXJkYWRkeQ==',
    // SessionID: '9394',
    // MsgId: '5837397520665436492',
    // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
}).device_event(function (message, req, res, next) {
    // message为设备事件内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'device_event',
    // Event: 'bind'
    // DeviceType: 'gh_d3e07d51b513'
    // DeviceID: 'dev1234abcd',
    // OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
    // Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
    // SessionID: '9394',
    // MsgId: '5837397520665436492',
    // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
}).middlewarify();
// function(req, res, next) {
//     var message = req.weixin;
//     if (message.FromUserName === 'diaosi') {
//         // 回复屌丝(普通回复)
//         res.reply('hehe');
//     } else if (message.FromUserName === 'text') {
//         //你也可以这样回复text类型的信息
//         res.reply({
//             content: 'text object',
//             type: 'text'
//         });
//     } else if (message.FromUserName === 'hehe') {
//         // 回复一段音乐
//         res.reply({
//             type: "music",
//             content: {
//                 title: "来段音乐吧",
//                 description: "一无所有",
//                 musicUrl: "http://mp3.com/xx.mp3",
//                 hqMusicUrl: "http://mp3.com/xx.mp3",
//                 thumbMediaId: "thisThumbMediaId"
//             }
//         });
//     } else {
//         // 回复高富帅(图文回复)
//         res.reply([
//             {
//                 title: '你来我家接我吧',
//                 description: '这是女神与高富帅之间的对话',
//                 picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
//                 url: 'http://nodeapi.cloudfoundry.com/'
//             }
//         ]);
//     }
// });