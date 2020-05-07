const express = require("express");
const router = express.Router();

const nanoid = require("nanoid");
const multer = require("multer");

const fs = require("fs");
const path = require("path");

const FileModel = require("./../models/files.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${nanoid.nanoid()}.${file.originalname.split(".").splice(-1)[0]}`
    );
  },
});

const upload = multer({
  storage: storage,
});

function map_file(file, details) {
  if (details.filename) {
    file.filename = details.filename;
  }

  if (details.originalname) {
    file.originalname = details.originalname;
    file.extension = details.originalname.split(".").slice(-1)[0];
  }

  if (details.mimetype) {
    file.mimetype = details.mimetype;
  }

  if (details.size) {
    file.size = details.size;
  }

  return file;
}

module.exports = function () {
  router
    .route("/")
    .post(upload.single("file"), function (req, res, next) {
      let newFile = new FileModel({});
      let mappedFile = map_file(newFile, req.file);
      mappedFile.save(function (err, data) {
        if (err) {
          return next(err);
        }
        res.status(200).json(data);
      });
    })
    .get(function (req, res, next) {
      FileModel.find({}).exec(function (err, data) {
        if (err) {
          return next(err);
        }
        res.status(200).json(data);
      });
    });

  router
    .route("/:id")
    .get(function (req, res, next) {
      FileModel.findById(req.params.id).exec(function (err, file) {
        if (err) {
          return next(err);
        }
        res.status(200).json(file);
      });
    })
    .delete(function (req, res, next) {
      FileModel.findById(req.params.id).exec(function (err, file) {
        if (err) {
          return next(err);
        }
        if (file) {
          file.remove(function (err, removed) {
            if (err) {
              return next(err);
            }
            let filetodelete = `${__dirname}./../uploads/${file.filename}`;
            fs.unlink(filetodelete, function (err) {
              if (err) throw err;
            });
            res.status(200).json(removed);
          });
        }
      });
    });

  router.route("/download/:id").get(function (req, res, next) {
    FileModel.findById(req.params.id).exec((err, file) => {
      if (err) {
        return next(err);
      }
      if (file) {
        const fileLink = path.join(__dirname, "../uploads", file.filename);
        console.log("file link", fileLink);

        const src = fs.createReadStream(fileLink);

        res.setHeader(
          "Content-disposition",
          "attachment; filename=" + file.originalname
        );
        src.pipe(res);
        // res.on('data', (chunk) => {
        //     console.log('writing data');

        //     res.write(chunk);
        // })
        // res.on('end', () => {
        //     res.end();
        // })
      } else {
        res.status(404).json({
          message: "file not found",
        });
      }
    });
  });

  return router;
};
