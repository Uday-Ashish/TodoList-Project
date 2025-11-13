const testingController = (req,res) => {
    res.status(200).send("<h2>sent in mvc pattern</h2>");
};

module.exports = {testingController};