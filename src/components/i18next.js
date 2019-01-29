/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { default as originalI18next } from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'
// import Backend from 'i18next-xhr-backend/dist/es/index.js'

import en_US from '../../locales/en-US.json'
import ko_KR from '../../locales/ko-KR.json'
import zh_CN from '../../locales/zh-CN.json'

export const i18next = originalI18next.use(LngDetector)

i18next.init({
  fallbackLng: 'en-US',
  debug: true,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    prefix: '{',
    suffix: '}'
  }
  // backend: {
  //   loadPath: 'locales/{{ns}}/{{lng}}.json'
  // }
})

i18next.addResourceBundle(
  'en-US',
  'translations',
  {
    'env-mention': 'v{version} - ENV {env}.',
    keyword: 'keyword',
    'label.click-to-add-new-board': 'Click to add new board',
    'label.click-to-add-new-group': 'Click to add new group',
    'label.pls-name-group': 'Please, give a name for the new group.',
    'label.pls-name-board': 'Please, give a name for the new board.',
    'label.new-group': 'New Group'
  },
  true,
  false
)

i18next.addResourceBundle(
  'ko-KR',
  'translations',
  {
    'env-mention': '버전 {version} - {env} 환경',
    keyword: '키워드',
    'label.click-to-add-new-board': '새로운 보드를 만드려면 클릭하세요.',
    'label.click-to-add-new-group': '새로운 그룹을 만드려면 클릭하세요.',
    'label.pls-name-group': '새로 만들 그룹의 이름을 지어주세요',
    'label.pls-name-board': '새로 만들어진 보드입니다. 보드의 이름을 지어주세요.',
    'label.new-group': '새 그룹'
  },
  true,
  false
)

i18next.addResourceBundle(
  'zh-CN',
  'translations',
  {
    'env-mention': '版{version} - {env}环境',
    keyword: 'keyword',
    'label.click-to-add-new-board': 'Click to add new board',
    'label.click-to-add-new-group': 'Click to add new group',
    'label.pls-name-group': 'Please, give a name for the new group.',
    'label.pls-name-board': 'Please, give a name for the new board.',
    'label.new-group': 'New Group'
  },
  true,
  false
)

i18next.addResourceBundle('en-US', 'translations', en_US['en-US'], true, true)
i18next.addResourceBundle('ko-KR', 'translations', ko_KR['ko-KR'], true, true)
i18next.addResourceBundle('zh-CN', 'translations', zh_CN['zh-CN'], true, true)
