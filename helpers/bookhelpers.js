var db = require("../config/connection");
var collection = require("../config/collection");
var objectId = require("mongodb").ObjectId;
var bcrypt = require("bcrypt");
module.exports = {
    AddBook: (ReqData) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOK_COLLECTION).insertOne(ReqData).then(() => {
                resolve()
            })
        })
    },
    GetAllBook: () => {
        return new Promise(async(resolve, reject) => {
         let Allbook=await db.get().collection(collection.BOOK_COLLECTION).find().toArray()
            resolve(Allbook)
        })
    },
    UpdateBook: (ReqData) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOK_COLLECTION).updateOne({ _id: objectId(ReqData.Matchid) },
                {
                    $set: {
                        bookName: ReqData.BookName,
                        imageUrl: ReqData.ImageUrl,
                        bookAuthor: ReqData.BookAuthor,
                        bookPages: ReqData.BookPage,
                        bookPrice:ReqData.BookPrice
                }
                }).then(() => {
                resolve()
            })
        })
    },
    DeleteBook: (ReqData) => {
        console.log(ReqData);
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BOOK_COLLECTION).deleteOne({ _id: objectId(ReqData) }).then(() => {
                resolve()
            })
        })
    }
}