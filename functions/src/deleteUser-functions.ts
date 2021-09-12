import * as functions from 'firebase-functions';
import { deleteCollectionByPath } from './utils/firebase-util';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const deleteUserAccount = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user, _) => {
    const uid = user.uid;

    //ユーザードキュメント削除
    db.doc(`users/${uid}`).delete();

    //ライブラリ本削除
    const deleteAllBooks = deleteCollectionByPath(`users/${uid}/list`); //パスを指定

    return Promise.all([deleteAllBooks]);
  });
