import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyABCinVXtQlRcLBZyAWTHSv_xH8Hy6OCRY',
  authDomain: 'anand-project-3de15.firebaseapp.com',
  databaseURL: 'https://anand-project-3de15-default-rtdb.firebaseio.com',
  projectId: 'anand-project-3de15',
  storageBucket: 'anand-project-3de15.appspot.com',
  messagingSenderId: '627836088886',
  appId: '1:627836088886:web:e90e6e2d2b2b2b2b2b2b2b',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const realtimeDb = getDatabase(app)
export const firestoreDb = getFirestore(app)
