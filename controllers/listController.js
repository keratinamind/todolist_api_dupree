const { List } = require("../models");

function makeid(length) {
  let result = "";
  let characters = "abcdefghijklmnopqurstuwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.getAllLists = async (req, res, next) => {
  try {
    const lists = await List.findAll({ where: { userId: req.user.id } });
    res.json({ lists });
  } catch (err) {
    next(err);
  }
};


exports.getListById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (id.length > 10) {
      const list = await List.findOne({ where: { url : id , userId: req.user.id } });
      res.json({ list });
      console.log(list);
    } else {
      const list = await List.findOne({ where: { id, userId: req.user.id } });
      res.json({ list });
      console.log(list);
    }
    
  } catch (err) {
    next(err);
  }
};

exports.createList = async (req, res, next) => {
  try {
    const { title, status } = req.body;
    const list = await List.create({
      title,
      status,
      userId: req.user.id,
      url: makeid(10) + title.slice(title.length - 1),
    });
    res.status(201).json({ list });
  } catch (err) {
    next(err);
  }
};

exports.updateList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment , status } = req.body;
    const list = await List.update(
      { comment , status },
      { where: {
          id,
          userId: req.user.id,
        },
      }
    );
    if (list == 1) {
      res.status(200).json({ comment : comment , status : status , message: "Updated list successfully"})
    }
    res.status(200).json({ list });
    console.log(list);
  } catch (err) {
    next(err);
  }
};

exports.deleteList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await List.destroy({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete list" });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
