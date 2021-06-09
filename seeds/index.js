const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp1', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '609a305d0252dd1539a4647f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic porro culpa modi iste eaque, deleniti provident odio dicta at eligendi eveniet ipsum ipsa iusto saepe tempora obcaecati, libero sed velit?',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqcadja0y/image/upload/v1621264683/YelpCamp/teroxuczbwr14vtoysjg.jpg',
                    filename: 'YelpCamp/teroxuczbwr14vtoysjg'
                  },
                  {
                    url: 'https://res.cloudinary.com/dqcadja0y/image/upload/v1621264601/YelpCamp/xecl9329zkh5p7z9qm20.jpg',
                    filename: 'YelpCamp/xecl9329zkh5p7z9qm20'
                  }
              
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})