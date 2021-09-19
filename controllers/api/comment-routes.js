const router = require('express').Router();
const {Comment} = require("../../models");
const withAuthorize = require("../../utils/authentication");




router.get('/',(req,res) => {
Comment.findAll({})
.then((dbCommentData) => res.json(dbCommentData))
.catch((err) => {
console.log(err);
res.status(500).json(err);
});
});


router.get("/:id", (req,res) => {
    Comment.findAll({
        where:{
            id:req.params.id,
        },
    })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuthorize, (req,res) => {
if(req.session) {
    Comment.creare({
        comment: req.body.comment,
        postId: req.body.postId,
        userId:req.body.userId,
    })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
    console.log(err);
    res.status(400).json(err);
    });
}
});


router.put('/:id', withAuthorize, (req,res) => {
    Comment.update({comment:req.body.comment},
        {where: {
            id:req.params.id,
        }})
        .then((dbCommentData) => {
            if(!dbCommentData) {
            res.status(404).json({message:"No comment found with this id"});
            return;
            }
            res.json(dbCommentData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
});


router.delete('/:id', withAuthorize,(req,res) => {
    comment.destroy({ where:{id: req.params.id}})
    .then((dbCommentData) => {
    if(!dbCommentData) {
        res.status(404).json({message:"No comment found with this id"});
        return;
    }
    res.json(dbCommentData);
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err);
    });
});

module.exports = router;
