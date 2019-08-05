// 写了个共用的chunk，没有办法实现代码分离。
// 搞了一个多小时，最后发现官方文档的这句话，吐血了！
//     New chunk can be shared OR modules are from the node_modules folder
// New chunk would be bigger than 30kb (before min+gz)
// Maximum number of parallel requests when loading chunks on demand would be lower or equal to 5
// Maximum number of parallel requests at initial page load would be lower or equal to 3
// 1
// 2
// 3
// 4
// 5
// 6
// New chunk would be bigger than 30kb (before min+gz)！
// New chunk would be bigger than 30kb (before min+gz)！
// New chunk would be bigger than 30kb (before min+gz)！
//
// 重要的事说三遍。
//
// 在chunk里故意写了一些无效代码，扩充到30Kb以后，终于分离成功。


import _ from 'lodash'
const chunkFun = function () {
    console.log(
        _.join(['Another', 'module', 'loaded!'], ' ')
    );
}
console.log('我是chunk')
export {
    chunkFun
}