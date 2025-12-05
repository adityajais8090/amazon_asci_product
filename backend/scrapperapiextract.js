import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();



const scrapperextract = async (asincode) => {
    try {
        if (!asincode) return JSON.stringify({ error: "ASIN required" });
        
        const scrapper_api = process.env.SCRAPPER_API_KEY

        const apiUrl = `https://api.scraperapi.com/structured/amazon/product?api_key=${scrapper_api}&asin=${asincode}&country=in&tld=in`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data || data.error) {
        console.error("ScraperAPI error:", data.error);
        return null;
        }
        
        const productData = {
        asin: asincode,
        url: `https://www.amazon.in/dp/${asincode}`,
        title: data.title || null,
        brand: data.brand || null,
        category: data.category || null,

        price: {
            current: data.price?.current_price || null,
            list_price: data.price?.list_price || null,
            currency: data.price?.currency || "INR",
            discount_percent: data.price?.savings_percent || null
        },

        images: {
            main: data.images?.main || null,
            all: data.images?.all || [],
            high_res: data.images?.hi_res || []
        },

        rating: {
            average_rating: data.reviews?.rating || null,
            total_ratings: data.reviews?.total_reviews || null,
            rating_percentage: {
                "5_star": data.reviews?.rating_breakdown?.five_star || null,
                "4_star": data.reviews?.rating_breakdown?.four_star || null,
                "3_star": data.reviews?.rating_breakdown?.three_star || null,
                "2_star": data.reviews?.rating_breakdown?.two_star || null,
                "1_star": data.reviews?.rating_breakdown?.one_star || null
            }
        },

       

        product_information: data.product_information || {},

        technical_details: data.technical_details || {},
        detail_bullets: data.detail_bullets || {},
        feature_bullets: data.feature_bullets || [],
        description: data.product_description || ""
    };
        

        return productData; // <-- return clean JSON
        
    } catch (err) {
        return JSON.stringify({
            error: "Failed to fetch product",
            details: err.message
        }, null, 2);
    }
};

export { scrapperextract };
