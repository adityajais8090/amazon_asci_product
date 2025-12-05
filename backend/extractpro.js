import {load} from "cheerio";
import fetch from "node-fetch";



const extractpro = async (ascicode) => {
    try {
        if (!ascicode) return JSON.stringify({ error: "ASIN required" });

        const url = `https://www.amazon.in/dp/${ascicode}`;

        // console.log(url);

        const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Referer": "https://www.amazon.in/",
            "Connection": "keep-alive"
        }
        });

        const html = await response.text();
        const $ = load(html);

         // Main Image
        const mainImage = $("#landingImage").attr("src") ||
                          $("img[data-old-hires]").attr("data-old-hires") || null;

        // All images
        const allImages = [];
        $("#altImages img").each((_, el) => {
            const img = $(el).attr("src") || $(el).attr("data-old-hires");
            if (img) allImages.push(img.replace("_SS40_", "_SL1000_"));
        });

        // Bullet points
        const bullets = [];
        $("#feature-bullets ul li").each((_, el) => {
            const text = $(el).text().trim();
            if (text) bullets.push(text);
        });

        // Technical Details
        const technicalDetails = {};
        $("#productDetails_techSpec_section_1 tr, #productDetails_detailBullets_sections1 tr").each((_, row) => {
            const key = $(row).find("th").text().trim();
            const value = $(row).find("td").text().trim();
            if (key && value) technicalDetails[key] = value;
        });

        // Detail Bullets
        const detailBullets = {};
        $("#detailBullets_feature_div li").each((_, el) => {
            const key = $(el).find("span.a-text-bold").text().replace(":", "").trim();
            const value = $(el).find("span").last().text().trim();
            if (key && value) detailBullets[key] = value;
        });

        const productData = {
            asin: ascicode,
            url,
            title: $("#productTitle").text().trim() || null,
            price: $("#corePrice_feature_div span.a-price-whole").first().text().trim() ||
                   $("span.a-price-whole").first().text().trim() || null,
            rating: $('span[data-hook="rating-out-of-text"]').text().trim() ||
                    $("i.a-icon-star span").text().trim() || null,
            reviewsCount : $("#acrCustomerReviewText").text().trim() ||
                           $("span[data-hook='total-review-count']").text().trim() || null,
            description: $("#productDescription p").text().trim() ||
                         $("#productDescription").text().trim() || null,
            mainImage,
            allImages,
            bullets,
            technicalDetails,
            detailBullets
        };

        return JSON.stringify(productData, null, 2); // <-- return clean JSON
        
    } catch (err) {
        return JSON.stringify({
            error: "Failed to fetch product",
            details: err.message
        }, null, 2);
    }
};

export { extractpro };
