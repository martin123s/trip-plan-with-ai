import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const { placeName } = await req.json()
  const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

  try {
    const result = await axios.post(`${BASE_URL}?key=${process.env.GOOGLE_PLACE_API_KEY}&fields=places.photos,places.displayName,places.id`, { textQuery: placeName }, { headers: { "Content-Type": "application/json" }, })

    const place = result?.data?.places?.[0];
    if (!place) return null;

    const details = await axios.get(`https://places.googleapis.com/v1/places/${place.id}?fields=photos&key=${process.env.GOOGLE_PLACE_API_KEY}`)
    
    // const placeRefName = result?.data?.places[0]?.photos[0]?.name
    const placeRefName = details?.data?.photos?.[0].name
    const photoUrl = placeRefName ? `https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.GOOGLE_PLACE_API_KEY}` : null

    return NextResponse.json(photoUrl)

  } catch (error) {
    return NextResponse.json({ error: error })
  }
}