const express = require('express');
const OnlyAuthenticated = require('../middlewares/OnlyAuthenticated');
const Board = require('../schema/Board');
const Comment = require('../schema/Comment');
const router = express.Router();



// 댓글 생성
router.post('/:boardId/comments', OnlyAuthenticated, async (req, res) => {
    const board = await Board.findById(req.params.boardId);
    const data = req.body;
    data.writer = req.user;
    data.board = board;
    const comment = new Comment(data);
    await comment.save();
    res.statusCode = 200;
    res.send(comment);
});

// 댓글 목록 호출
router.get('/:boardId/comments', async (req, res) => {
    const comments = await Comment.find({ board: req.params.boardId }).populate('writer');
    res.statusCode = 200;
    res.send(comments);
});

router.patch('/:boardId/comments/:commentId', OnlyAuthenticated, async (req, res) => {
    const comment = await Comment.findById(req.params.commentId).populate('writer');
    if (String(comment.writer._id) !== String(req.user._id)) {
        res.statusCode = 403;
        res.send('권한이 없습니다.');
        return;
    }
    comment.content = req.body.content;
    await comment.save();
    res.statusCode = 200;
    res.send();
});

router.delete('/:boardId/comments/:commentId', OnlyAuthenticated, async (req, res) => {
    const comment = await Comment.findById(req.params.commentId).populate('writer');
    if (String(comment.writer._id) !== String(req.user._id)) {
        res.statusCode = 403;
        res.send('권한이 없습니다.');
        return;
    }
    await comment.delete();
    res.statusCode = 200;
    res.send();
});


module.exports = router;
