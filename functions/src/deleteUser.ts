import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const deleteUser = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    if (context.auth?.uid) {
      return admin.auth().deleteUser(context.auth.uid);
    }
    throw new functions.https.HttpsError(
      'permission-denied',
      'ログインしていません'
    );
  });
