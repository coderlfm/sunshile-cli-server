import { MongoClient } from 'mongodb';

interface IMongo {
  url: string;
  dbName: string;
  connect: () => any;
  connectAction: (docName: string, action: any) => any;
  query: (docName: string) => any;
  insert: (docName: string, data: any) => any;
  remove: (docName: string, data: any) => any;
  close: (client: any) => any;
}

export default class Mongo implements IMongo {
  url: string;
  dbName: string;

  constructor(url: string, dbName: string) {
    this.url = url;
    this.dbName = dbName;
  }

  connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      MongoClient.connect(
        this.url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err, client) => {
          if (err) {
            reject(err);
          } else {
            const db = client.db(this.dbName);
            resolve({ db, client });
          }
        },
      );
    });
  }

  connectAction(docName, action) {
    return new Promise(async (resolve, reject) => {
      const { db, client } = await this.connect();
      try {
        const collection = db.collection(docName);
        action(
          collection,
          (result: any) => {
            this.close(client);
            // logger.verbose('result', result)
            resolve(result);
          },
          (err: any) => {
            this.close(client);
            // logger.error(err.toString())
            reject(err);
          },
        );
      } catch (err) {
        this.close(client);
        // logger.error(err.toString())
        reject(err);
      }
    });
  }

  query(docName) {
    return this.connectAction(docName, (collection, onSuccess, onError) => {
      collection.find({}, { projection: { _id: 0 } }).toArray((err, docs) => {
        if (err) {
          onError(err);
        } else {
          onSuccess(docs);
        }
      });
    });
  }

  insert(docName, data) {
    return this.connectAction(docName, (collection, onSuccess, onError) => {
      collection.insertMany(data, (err, result) => {
        if (err) {
          onError(err);
        } else {
          onSuccess(result);
        }
      });
    });
  }

  remove(docName, data) {
    return this.connectAction(docName, (collection, onSuccess, onError) => {
      collection.deleteOne(data, (err, result) => {
        if (err) {
          onError(err);
        } else {
          onSuccess(result);
        }
      });
    });
  }

  // update(collection, data) {}

  close(client) {
    client && client.close();
  }
}
