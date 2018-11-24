"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @fileoverview 实现index数据模型
 * @author i@huimingwu.com
 */

/**
 * indexModle类 生成一段一步数据
 * @class
 */
class indexModel {
  /**
   * @construcotr
   * @param {String} app koa2上下文
   */
  constructor(app) {}
  /**
       * 获取具体数据的api接口
       * @returns {Promise} 返回异步数据
       * @example
       * return new Promise
       * getData()
       */


  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve('index异步数据');
      }, 1000);
    });
  }

}

exports.default = indexModel;