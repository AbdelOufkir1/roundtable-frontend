import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDcpSL8kdkmcsndNBz-F4BVSBDIgMoA3ZU",
    authDomain: "roundtable-5b0dc.firebaseapp.com",
    databaseURL: "https://roundtable-5b0dc.firebaseio.com",
    projectId: "roundtable-5b0dc",
    storageBucket: "roundtable-5b0dc.appspot.com",
    messagingSenderId: "610333638474"
  };

app.initializeApp(config);
export default app;
