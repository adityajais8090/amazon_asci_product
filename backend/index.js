import express from 'express';
import cors from 'cors';
import { extractpro } from './extractpro.js';
import { scrapperextract } from './scrapperapiextract.js';
import { geminipro } from './geminipro.js';
import { saveProduct, getproduct } from "./database.js";


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

        //initial ftech data using web scraping
        //const jsonData = await extractpro(code);     
        //const data = JSON.parse(jsonData);
        
        //use scrapperapi tofetch data
        const data = await scrapperextract(code);           
        const enhancedata = await geminipro(data);
    

       const product = {
                // Basic
                asin: data.asin,
                url: data.url,
                title: data.title,
                brand: data.brand || null,
                category: data.category || null,

                price: data.price || {}, 
                images: {
                    main: data.main || null,
                    all: data.all || []
                },

                rating: data.rating || {},                // JSON
                product_information: data.product_information || {},  // JSON
                technical_details: data.technical_details || {},       // JSON
                detail_bullets: data.detail_bullets || {},             // JSON
                feature_bullets: data.feature_bullets || [],                  // JSON ARRAY
                description: data.description || null,

                // ----------- AI Enhanced Data (MUST MATCH SCHEMA NAMES) -----------
                ai_title: enhancedata.ai_title || null,
                ai_product_information: enhancedata.ai_product_information || null,
                ai_detail_bullets: enhancedata.ai_detail_bullets || null,
                ai_feature_bullets: enhancedata.ai_feature_bullets || null,
                ai_description: enhancedata.ai_description || null
            };


               await saveProduct(product);
       

        return res.status(200).json({ success: true, product: data , enhancedata});

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/product", async (req, res) => {
    try {
        const response = await getproduct();   

        return res.status(200).json({
            success: true,
            product: response
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});



app.listen(8000, () => {
    console.log("Server is listening at 8000");
});
