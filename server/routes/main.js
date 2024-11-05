const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// GET home page.
router.get('/', async (req, res) => {   

    try {

        const locals = {
            title: "NodeJS Blog",
            description: "Blog created with NodeJS, Express, and MongoDB."
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error);
    }

});

// GET Post :id
router.get('/post/:id', async (req, res) => {  

    try {
        const locals = {
            title: "NodeJS Blog",
            description: "Blog created with NodeJS, Express, and MongoDB."
        }

        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });
        res.render('index', {locals, data});
    } catch (error) {
        locals.errorMessage = "An error occurred while fetching data.";
        res.render('index', { locals });
    }

});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;

















// router.get('/', async (req, res) => {
    
//     const locals = {
//         title: "NodeJS Blog",
//         description: "Blog created with NodeJS, Express, and MongoDB."
//     }

//     try {
//         const data = await Post.find();
//         res.render('index', {locals, data});
//     } catch (error) {
//         locals.errorMessage = "An error occurred while fetching data.";
//         res.render('index', { locals });
//     }

// });


// function insertPostData(){
//     Post.insertMany([
//         {
//             title: "Benefits of a Morning Walk",
//             body: "Starting the day with a morning walk can improve your mood, boost your energy levels, and keep you fit. This article discusses how a daily walk can impact both physical and mental health"
//         },
//         {
//             title: "Tips for a Productive Home Office",
//             body: "Working from home can be challenging, but creating a productive workspace makes a difference. Here are some tips on organizing your home office for maximum efficiency and comfort."
//         },
//         {
//             title: "Simple Recipes for Busy Weeknights",
//             body: "Cooking after a long day can be tough. This post offers a collection of easy and delicious recipes that are perfect for busy weeknights and require minimal prep time."
//         },
//         {
//             title: "How to Cultivate a Reading Habit",
//             body: "Reading can open up new worlds and ideas. If you've always wanted to read more but find it hard to start, this guide provides practical tips to make reading a daily habit."
//         },
//         {
//             title: "Essential Tips for Beginner Gardeners",
//             body: "Gardening is a rewarding hobby that doesn’t require much experience to get started. Here are some essential tips for beginner gardeners, from choosing plants to nurturing your garden."
//         },
//     ]);
// }
// insertPostData();