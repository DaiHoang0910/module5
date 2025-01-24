module.exports = (req, res) => {
    res.status(201).json({
        id: req.body.id,
        name: req.body.name,
        birthday: req.body.birthday
    });
};
