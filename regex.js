const post = /(?:http:\/\/)?(?:hosyusokuhou.jp\/archives\/)?([0-9]+)(?:\.html)?/;
const jpnDate = /[0-9]{4}年[0-9]{2}月[0-9]{2}日 [0-9]{2}:[0-9]{2}:[0-9]{2}/;
const postId = /ID:([a-zA-Z0-9]+)/;

module.exports = { post, jpnDate, postId };
