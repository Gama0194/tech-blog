import { Router } from 'express';
import { User, Post } from '../models';

const router = Router();

// Define your routes here

// Example route for the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts, user: req.user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Example route for the dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { posts, user: req.user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Other routes, such as authentication, post creation, deletion, etc., can be added here

module.exports = router;
