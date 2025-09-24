import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { aj } from "../arcjet/route";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// 6. Travel interests(e.g., advanture, sightseeing, cultural, food, nightlife, relaxiation)
const PROMPT = `You are an AI Trip Planner Agent, your goal is to help the user plan a trip by asking one relevant trip related question at a time. Only ask questions about the following details in order, and wait for the user's answer before asking the next one:
1. Starting city (source)
2. Destination city
3. Group size (Single, Couple, Family, Friends)
4. Budget(Low, Medium, High)
5. Trip duration (number of days)
6. Special requirements or preferences(if any duration the trip like vage food only or no beef etc.)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, ask the user to clarify before processing. 
Always maintain a conversational, interactive style while asking questions.
Along with response also send which ui component to display for generative UI, for example 'groupSize/budget/tripDuration/special/final', where Final means AI generating complete final output. But don't show any ui component if is asking starting city and destination city.
Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:
{
  resp: 'Text Resp',
  ui: 'groupSize/budget/tripDuration/special/final'
}`;

const FINAL_PROMPT = `Generate Travel Plan with given details, give me Hotels options list with hotel name, hotel address, price per night, hotel image url, geo coordinates, rating, descriptions of hotel and suggest itinerary with place name, place details, place image url, place geo coordinates, geo coordinates, place address, ticket price, time travel each of the location, with each day plan with best time to visit in JSON format.
Output schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [{
      "hotel_name": "string",
      "hotel_address": "string",
      "price_per_night": "string",
      "hotel_image_url": "string",
      "geo_coordinates":{ "latitude": "number", "longitude": "number" },
      "rating": "number",
      "description": "string",
    }],
    "itinerary": [{
      "day": "number",
      "day_plan": "string",
      "best_time_to_visit_day": "string",
      "activities":[{
        "place_name": "string",
        "place_details": "string",
        "place_image_url": "string",
        "geo_coordinates":{ "latitude": "number", "longitude": "number" },
        "place_address": "string",
        "ticket_price": "string",
        "time_travel_each_location": "string",
        "best_time_to_visit": "string",
      }]
    }]
  }
}
`

export async function POST(req: NextRequest) {

  const { messages, isFinal } = await req.json();
  const user = await currentUser()
  
  const { has } = await auth()
  const hasPremiumAccess = has({ plan: 'monthly' })

  const decision = await aj.protect(req, { userId: user?.primaryEmailAddress?.emailAddress ?? '', requested: isFinal ? 5 : 0 });


  if (decision?.reason?.remaining === 0 && !hasPremiumAccess) {
    return NextResponse.json({
      resp: 'No Free Credit Remaining',
      ui: 'limit'
    });
  }



  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: isFinal? FINAL_PROMPT : PROMPT },
        ...messages,
      ],
    });

    const message = completion.choices[0].message;
    console.log("aimodel raw response:", message.content);

    // Try to parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(message.content ?? "{}");
    } catch (err) {
      console.error("❌ JSON parse error:", err, "content:", message.content);
      return NextResponse.json(
        {
          error: "Invalid JSON from model",
          raw: message.content,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("❌ AI api/route error:", error);
    return NextResponse.json(
      { error: (error as Error).message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
