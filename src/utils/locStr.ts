/**
 * @copyright zhangzhihao 1159320410@qq.com
 */

import settings from "@/config/settings";
const { storage, tokenName } = settings;
import cookie from "js-cookie";
/**
 * @description 获取本地存储
 * @param key
 * @returns {string | null}
 */
const getLocStr = (key: string) => {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.getItem(key);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.getItem(key);
    } else if ("cookie" === storage) {
      return cookie.get(key);
    } else {
      return localStorage.getItem(key);
    }
  } else {
    return localStorage.getItem(key);
  }
}
/**
 * @description 清楚本地存储
 * @returns {void|*}
 */
export function removeLocStr(key: string) {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem(key);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove(key);
    } else {
      return localStorage.removeItem(key);
    }
  } else {
    return localStorage.removeItem(key);
  }
}
/**
 * @description 本地存储缓存
 * @param key, value
 * @returns {void|*}
 */
const setLocStr = (key: string, value: string) => {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.setItem(key, value);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.setItem(key, value);
    } else if ("cookie" === storage) {
      return cookie.set(key, value);
    } else {
      return localStorage.setItem(key, value);
    }
  } else {
    return localStorage.setItem(key, value);
  }
}
/**
 * @description 存储token
 * @param token
 * @returns {void|*}
 */
export const setAccessToken = (token: string) => {
  return setLocStr(tokenName, token)
}
/**
 * @description 获取token
 * @param token
 * @returns {string | null}
 */
export const getAccessToken = () => {
  return getLocStr(tokenName)
}
/**
 * @description 清除token
 * @param token
 * @returns {string | null}
 */
export const removeToken = () => {
  return removeLocStr(tokenName)
}
/**
 * @description 获取语言
 * @returns {string | null}
 */
const languageKey = 'language'
export const getLanguage = () => {
	return getLocStr(languageKey);
}
export const setLanguage = (language: string) => {
  return setLocStr(languageKey, language)
}
/**
 * @description 获取侧边栏状态
 * @returns {string | null}
 */
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => {
  return getLocStr(sidebarStatusKey);
}
/**
 * @description 缓存侧边栏状态
 * @returns {void|*}
 */
export const setSidebarStatus = (sidebarStatus: string) => {
  return setLocStr(sidebarStatusKey, sidebarStatus)
}
/**
 * @description 获取size
 * @returns {string | null}
 */
const sizeKey = 'size'
export const getSize = () => {
  return getLocStr(sizeKey);
}
/**
 * @description 保存size
 * @returns {void|*}
 */
export const setSize = (size: string) => {
  return setLocStr(sizeKey, size)
}