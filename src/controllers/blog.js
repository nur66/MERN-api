exports.creteBlog = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;

    const result = {
        message: "Create blog successfully",
        data: {
            post_id: 1,
            title: "Title Blog",
            // image: "image.jpg",
            body: "Lorem ipsum is simply dummy text of the printing",
            created_at: "20/10/2022",
            author : {
                uuid: 1,
                name: "Testing"
            }
        }
    }

    res.status(201).json(result);
}