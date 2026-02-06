import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // If credentials are missing, return fallback reviews
    if (!placeId || !apiKey) {
      const fallbackReviews = [
         {
        id: "1",
        author_name: "Rahul Suri",
        profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjWwD7taPjKw3WFAwRcoPh2pfczccm3TPUF-VyfNUuuwTdCV3uF8=w113-h113-p-rp-mo-ba4-br100",
        rating: 5,
        text: "I really appreciate the Perfect Pixel Team for all the hard work that they put in while working on my label designs. Not only were the designs creative and based on my requirements, but they did so while keeping in mind all confusing and complicated guidelines stated by the departments of FSSAI & Legal Metrology.hank You Team Perfect Pixel for all the time & energy that you dedicated to my project!PositiveResponsiveness, Quality, Professionalism, Value",
        relative_time_description: "4 years ago"
      },
      {
        id: "2",
        author_name: "Aalok Dubey",
        profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjUvCHtY8bZFuKlpgRHNMJAA5avVSl5GlAReuHMIrnYIGyvXOxQk=w113-h113-p-rp-mo-br100",
        rating: 5,
        text: "There design actually works, genuine service.\nHighly recommended.",
        relative_time_description: "4 years ago"
      },
      {
        id: "3",
        author_name: "ADITYA KUMAR",
        profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXTyXwUvON1j8jVkbLVX41Qp00aiMSRf0JH2kItRfxmW5Kl__E=w113-h113-p-rp-mo-br100",
        rating: 5,
        text: "It was great to journey with Perfect Pixel whlie getting our website developed & further work on SEO etc\nPositive\nResponsiveness, Quality, Professionalism, Value",
        relative_time_description: "4 years ago"
      },{
        id: "4",
        author_name: "Manav Bhanushali",
        profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocLGMc5ijnkSy0Ht_UNUXZwKKX1s330tr-I7J7-v0rt8mGJU4aAW=w113-h113-p-rp-mo-br100",
        rating: 5,
        text: "To Nice",
        relative_time_description: "4 years ago"
      },
      ];
      return NextResponse.json({ reviews: fallbackReviews });
    }

    // Fetch real reviews from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Google API error');
    }

    const data = await response.json();
    const reviews = data.result?.reviews || [];

    // Transform Google reviews
    const transformedReviews = reviews.slice(0, 6).map((review: any) => ({
      id: review.time,
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      relative_time_description: review.relative_time_description,
    }));

    return NextResponse.json({ reviews: transformedReviews });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);

  }
}
