import express from 'express';
import cors from 'cors';
import { extractpro } from './extractpro.js';
import { geminipro } from './geminipro.js';
import { saveProduct } from "./database.js";


const app = express();

app.use(cors());
app.use(express.json());           
app.use(express.urlencoded({extended:true})); 

app.get("/",(req, res) => {
    res.send("Welcome Aditya Jaiswal!")
});

app.post("/asin", async (req, res) => {
    const { code } = req.body;
    console.log("The code",code);
    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    try {
        const jsonData = await extractpro(code);     
        const data = JSON.parse(jsonData);           
        const enhancedata = await geminipro(data);
        console.log("Basic Fetched Data", data);
        console.log("Here is the generated data :", enhancedata);

        //insert into sql database
        const product = {
        // Basic Fetched Data
                asin: data.asin, // 'B0FZL6PWDK'
                url: data.url,   // 'https://www.amazon.in/dp/B0FZL6PWDK'
                title: data.title, // 'Decorative Vase for Living Room (Beige, 15)'
                price: data.price, // '799.'
                rating: data.rating, // '5 out of 5'
                reviewsCount: data.reviewsCount, // '(1)'
                description: data.description, // Original description
                mainImage: data.mainImage, // Original main image
                allImages: data.allImages, // Array of all images
                bullets: data.bullets,     // Array of original bullet points
                technicalDetails: data.technicalDetails, // Original technical details
                detailBullets: data.detailBullets || {},

                // AI-Enhanced Data
                ai_title: enhancedata.title, // AI-enhanced title
                ai_description: enhancedata.description, // AI-enhanced description
                ai_bullets: enhancedata.bullets,         // AI-enhanced bullet points
                ai_technicalDetails: enhancedata.technicalDetails, // AI-enhanced technical details
                ai_detailBullets: enhancedata.detailBullets || {}  // AI-enhanced detail bullets
                };

                await saveProduct(product);
       

        return res.status(200).json({ success: true, product: data, enhancedata });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


app.listen(8000, () => {
    console.log("Server is listening at 8000");
});
