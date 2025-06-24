// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../package.json').projectConfig
const BACKEND_BASE_URL = config.backendApiBaseUrl

const API_ENDPOINTS = {
  BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  GETAUTHORS: '/get-authors',
  GETAUTHORBYID: '/get-author/',
  LOGIN: 'login',
  FORGOTPASSWORD: '/Author/forgot-password',
  RESETPASSWORD: '/Author/reset-password',
  GETBLOGS: '/blogs',
  GETBLOGBYID: '/blog/',
  CREATEBLOG: '/blogs',
  UPDATEBLOG: '/blogs/',
  DELETEBLOG: '/blogs/',
  GETCATEGORIES: '/categories',
  CREATECATEGORY: '/categories',
  DELETECATEGORY: '/categories/',
  GETBLOGBYSLUG: '/blogs/slug/',
}

const BACKEND_API = { API_ENDPOINTS }

export default BACKEND_API
