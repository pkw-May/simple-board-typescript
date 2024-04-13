const commentsService = require('../services/commentsService');
const userService = require('../services/userService');

exports.getComments = async (req, res) => {
	try {
		const postId = req.query.postId;
		if (!postId) {
			res.status(200).json([]);
		} else {
			const comments = await commentsService.getCommentsByPostId({ postId });
			const userInfo = await userService.getUserById(post[0].userId);
			post[0].date = new Date(post[0].date)
				.toLocaleDateString('ko-KR')
				.split('T')[0];
			post[0].name = userInfo[0].name;

			res.status(200).json(post);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createPost = async (req, res) => {
	try {
		const postData = req.body;
		const post = await postService.createPost(postData);
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const postId = req.params?.postId;
		if (!postId) {
			res.status(400).json({ message: 'postId is required' });
		} else {
			const post = await postService.deletePost(postId);
			res.status(200).json(post);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
