const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name'], through: ProductTag, as: "products" }],
    })
    .then (tagData => {
      if(!tagData) {
        res.status(404).json({ message: 'No tag data'});
        return;
      }
      res.status(200).json( { message: 'Tag retrieval successful', tagData });
    })
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
   Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products'}],
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: "No tag data found with this id!" });
        return;
      } 
      res.status(200).json({message: 'Tag found!', tagData})
    } )
    
  });
    // res.status(500).json(err);d

router.post("/", (req, res) => {
  // create a new tag
   Tag.create(req.body);
  res.status(200).json(req.body);
  });
    // res.status(400).json(err);

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value\
  Tag.update(req.body, {where: {id: req.params.id}});
  res.status(200).json(req.body)
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
   Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(req.body)
  });
  

module.exports = router;
