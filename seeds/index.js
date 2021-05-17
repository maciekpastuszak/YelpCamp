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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '609a90a26ce9ed25ab184ad3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
           
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic porro culpa modi iste eaque, deleniti provident odio dicta at eligendi eveniet ipsum ipsa iusto saepe tempora obcaecati, libero sed velit?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dqcadja0y/image/upload/v1621261716/YelpCamp/iejeldwt0q7fhdskjpht.jpg',
                    filename: 'YelpCamp/iejeldwt0q7fhdskjpht'
                  },
                  {
                    url: 'https://res.cloudinary.com/dqcadja0y/image/upload/v1621261716/YelpCamp/vhwz84nnob46bjp6qnvm.jpg',
                    filename: 'YelpCamp/vhwz84nnob46bjp6qnvm'
                  }
              
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})