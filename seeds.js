var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "clouds rest",
        image: "https://images.unsplash.com/photo-1498496294664-d9372eb521f3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExODA5M30",
        description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, alias numquam officiis praesentium eaque sunt quae velit in id qui cumque commodi mollitia et quis. Vero blanditiis culpa quis ipsam! "
    },
    {
        name: "superb grounds",
        image: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExODA5M30",
        description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, alias numquam officiis praesentium eaque sunt quae velit in id qui cumque commodi mollitia et quis. Vero blanditiis culpa quis ipsam! "
        
    },
    {
        name: "awesome camp",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExODA5M30",
        description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, alias numquam officiis praesentium eaque sunt quae velit in id qui cumque commodi mollitia et quis. Vero blanditiis culpa quis ipsam! "
        
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;

