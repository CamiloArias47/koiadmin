import { initializeApp } from 'firebase/app'

const isProduction = import.meta.env.PROD

let firebaseConfig

if (isProduction) {
  firebaseConfig = {
    apiKey: 'AIzaSyBn-I-KH8IlbrGeE8KmwMeSAs2A-IiWGqo',
    authDomain: 'koishop-45ca8.firebaseapp.com',
    projectId: 'koishop-45ca8',
    storageBucket: 'koishop-45ca8.appspot.com',
    messagingSenderId: '674591095011',
    appId: '1:674591095011:web:1e90efb0c17014596a6dd6',
    measurementId: 'G-2XQFEHYTHY'
  }
} else {
  firebaseConfig = {
    apiKey: 'AIzaSyBMl8zmQUWfDFxqZ906vpLua1oYK24fJKk',
    authDomain: 'koishop-dev.firebaseapp.com',
    projectId: 'koishop-dev',
    storageBucket: 'koishop-dev.appspot.com',
    messagingSenderId: '484415257007',
    appId: '1:484415257007:web:1b93693dd488f41cf0975a'
  }
}

export const firebaseApp = initializeApp(firebaseConfig)
