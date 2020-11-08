/**
 * Created by Zhangzhihao on 11/09/20.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0