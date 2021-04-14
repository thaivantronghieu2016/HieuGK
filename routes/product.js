const fs = require('fs');

module.exports = {
    getAddProduct: (req, res) => {
        res.render('add-player.ejs', {
            title: 'Welcome to MadDog Web'
            ,message: ''
        });
    },

    postAddProduct: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let Name = req.body.Name;
        let Status = req.body.Status;
        let Amount = req.body.Amount;
        let Price = req.body.Price;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = Name + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `product` WHERE Name = '" + Name + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Name already exists';
                res.render('add-player.ejs', {
                    message,
                    title: 'Welcome to MadDog Web'
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `product` (Name, Image, Status, Amount, Price) VALUES ('" +
                            Name + "', '" + image_name + "', '" + Status + "', '" + Amount + "', '" + Price + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: 'Welcome to MadDog Web'
                    });
                }
            }
        });
    },

    getEditProduct: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `product` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: 'Edit  Player'
                ,player: result[0]
                ,message: ''
            });
        });
    },

    postEditProduct: (req, res) => {
        let playerId = req.params.id;
        let Name = req.body.Name;
        let Status = req.body.Status;
        let Amount = req.body.Amount;
        let Price = req.body.Price;

        let query = "UPDATE `product` SET `Name` = '" + Name + "', `Status` = '" + Status + "', `Amount` = '" + Amount + "', `Price` = '" + Price + "' WHERE `product`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    
    getDeleteProduct: (req, res) => {
        let playerId = req.params.id;
        let getImageQuery = 'SELECT Image from `product` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM product WHERE id = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let Image = result[0].Image;

            fs.unlink(`public/assets/img/${Image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};
