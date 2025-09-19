import React from 'react'
import { Timeline } from "@/components/ui/timeline";
import { TripInfo } from "@/app/create-trip/_components/ChatBox";
import Image from 'next/image';
import { Clock, ExternalLink, Star, Ticket, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCard from './HotelCard';
import DayActivityCard from './DayActivityCard';

const TRIP_DATA: TripInfo=
{
  budget: "Luxury - No limit",
  destination: "Miami",
  duration: "7 Days",
  group_size: "2 People",
  hotels: [
    {
      description:
        "A luxurious oceanfront hotel offering art deco style, exceptional service, tranquil spa, and three swimming pools amidst lush tropical surroundings.",
      geo_coordinates: {
        latitude: 25.790654,
        longitude: -80.130045,
      },
      hotel_address:
        "2001 Collins Ave, Miami Beach, FL 33139",
      hotel_image_url:
        "https://www.thesetaihotel.com/wp-content/uploads/2018/12/Setai-Miami-Beach-Hotel.jpg",
      hotel_name: "The Setai, Miami Beach",
      price_per_night: "$900",
      rating: 4.8,
    },
    {
      description:
        "An extravagant hotel known for its bold design, luxurious rooms, world-class dining, and unique art installations in Miami Beach.",
      geo_coordinates: {
        latitude: 25.797,
        longitude: -80.1295,
      },
      hotel_address:
        "3201 Collins Ave, Miami Beach, FL 33140",
      hotel_image_url:
        "https://www.faena.com/miami-beach/media/FAENA-HOTEL-EXTERIOR.jpg",
      hotel_name: "Faena Hotel Miami Beach",
      price_per_night: "$1200",
      rating: 4.7,
    },
    {
      description:
        "Upscale hotel located in Brickell with panoramic views of Biscayne Bay, superb service, fine dining, and a rooftop pool.",
      geo_coordinates: {
        latitude: 25.7606,
        longitude: -80.1908,
      },
      hotel_address: "1435 Brickell Ave, Miami, FL 33131",
      hotel_image_url:
        "https://www.fourseasons.com/content/dam/fourseasons/images/web/MIA/MIA_Exterior_Night_16x9.jpg",
      hotel_name: "Four Seasons Hotel Miami",
      price_per_night: "$950",
      rating: 4.9,
    },
  ],
  itinerary: [
    {
      activities: [
        {
          best_time_to_visit:
            "Afternoon for sunbathing and sunset views",
          geo_coordinates: {
            latitude: 25.7907,
            longitude: -80.13,
          },
          place_address: "Miami Beach, FL 33139",
          place_details:
            "Iconic Miami Beach with pristine white sand, clear blue waters, and lively atmosphere perfect for relaxation and people watching.",
          place_image_url:
            "https://www.miamiandbeaches.com/imager/s3_us-west-2_amazonaws_com/miami-beach-south-beach-3053-h_779x518_f4f664b8399b8f74796d182810d6835e.jpg",
          place_name: "South Beach",
          ticket_price: "Free",
          time_travel_each_location: "N/A",
        },
      ],
      best_time_to_visit_day: "Afternoon to Evening",
      day: 1,
      day_plan: "Arrival and Beach Relaxation",
    },
    {
      activities: [
        {
          best_time_to_visit:
            "Morning to avoid crowds and enjoy cooler temperatures",
          geo_coordinates: {
            latitude: 25.7453,
            longitude: -80.2102,
          },
          place_address:
            "3251 S Miami Ave, Miami, FL 33129",
          place_details:
            "Historic estate featuring stunning Italian Renaissance-style architecture, beautiful gardens, and impressive art collections.",
          place_image_url:
            "https://www.vizcaya.org/wp-content/uploads/2016/12/FrontView1.jpg",
          place_name: "Vizcaya Museum and Gardens",
          ticket_price: "$25 per person",
          time_travel_each_location:
            "15 minutes from hotel",
        },
        {
          best_time_to_visit: "Afternoon",
          geo_coordinates: {
            latitude: 25.7863,
            longitude: -80.1867,
          },
          place_address:
            "1103 Biscayne Blvd, Miami, FL 33132",
          place_details:
            "Contemporary art museum with collections from the Americas, stunning views of Biscayne Bay, and modern architecture.",
          place_image_url:
            "https://www.pamm.org/sites/default/files/styles/990xauto/public/images/2019-03/pamm-exterior-day_0.jpg",
          place_name: "Perez Art Museum Miami (PAMM)",
          ticket_price: "$16 per person",
          time_travel_each_location:
            "10 minutes from Vizcaya Museum",
        },
      ],
      best_time_to_visit_day: "Morning to Afternoon",
      day: 2,
      day_plan: "Art and Culture Exploration",
    },
    {
      activities: [
        {
          best_time_to_visit: "Afternoon",
          geo_coordinates: {
            latitude: 25.8859,
            longitude: -80.1267,
          },
          place_address:
            "9700 Collins Ave, Bal Harbour, FL 33154",
          place_details:
            "High-end open-air shopping center featuring luxury brands like Gucci, Chanel, and Prada.",
          place_image_url:
            "https://balharbourshops.com/uploads/2019/02/Bal-Harbour2.jpg",
          place_name: "Bal Harbour Shops",
          ticket_price: "Free entry",
          time_travel_each_location:
            "30 minutes from Miami Beach hotels",
        },
        {
          best_time_to_visit:
            "Evening for dinner reservations",
          geo_coordinates: {
            latitude: 25.7901,
            longitude: -80.1302,
          },
          place_address:
            "11 Washington Ave, Miami Beach, FL 33139",
          place_details:
            "Legendary Miami seafood restaurant famous for stone crabs, seasonal menu, and elegant dining experience.",
          place_image_url:
            "https://joesstonecrab.com/wp-content/uploads/2016/09/joes_home.jpg",
          place_name: "Joe's Stone Crab",
          ticket_price: "Varies, approx $60 per person",
          time_travel_each_location:
            "15 minutes from Bal Harbour Shops",
        },
      ],
      best_time_to_visit_day: "Afternoon to Evening",
      day: 3,
      day_plan: "Luxury Shopping and Dining",
    },
    {
      activities: [
        {
          best_time_to_visit:
            "Early morning for cooler weather and active wildlife",
          geo_coordinates: {
            latitude: 25.2866,
            longitude: -80.8987,
          },
          place_address:
            "40001 State Road 9336, Homestead, FL 33034",
          place_details:
            "A UNESCO World Heritage site featuring unique ecosystems, airboat tours, alligator sightings, and abundant wildlife.",
          place_image_url:
            "https://www.nps.gov/common/uploads/structured_data/3C7B584A-1DD8-B71B-0BFD961A3B247AA2.jpg",
          place_name: "Everglades National Park",
          ticket_price: "$30 per vehicle",
          time_travel_each_location:
            "Approx 1 hour 15 minutes from Miami hotels",
        },
      ],
      best_time_to_visit_day: "Morning",
      day: 4,
      day_plan: "Nature and Wildlife",
    },
    {
      activities: [
        {
          best_time_to_visit: "Morning",
          geo_coordinates: {
            latitude: 25.8238,
            longitude: -80.1911,
          },
          place_address: "3841 NE 2nd Ave, Miami, FL 33137",
          place_details:
            "Vibrant neighborhood with art galleries, design shops, and stunning public art.",
          place_image_url:
            "https://miamidesigndistrict.net/wp-content/uploads/2020/02/Main-Drive_District-01.jpg",
          place_name: "Miami Design District",
          ticket_price: "Free",
          time_travel_each_location:
            "15 minutes from hotels",
        },
        {
          best_time_to_visit: "Afternoon",
          geo_coordinates: {
            latitude: 25.7655,
            longitude: -80.217,
          },
          place_address: "SW 8th St, Miami, FL 33135",
          place_details:
            "Historic Cuban district famous for its vibrant street life, cigar shops, cultural festivals, and authentic Cuban cuisine.",
          place_image_url:
            "https://cdn.theculturetrip.com/wp-content/uploads/2017/02/little-havana-miami-florida.jpg",
          place_name: "Little Havana - Calle Ocho",
          ticket_price: "Free",
          time_travel_each_location:
            "10 minutes from Design District",
        },
      ],
      best_time_to_visit_day: "Morning to Afternoon",
      day: 5,
      day_plan: "Historic Miami and Little Havana",
    },
    {
      activities: [
        {
          best_time_to_visit: "Morning for calm waters",
          geo_coordinates: {
            latitude: 25.7617,
            longitude: -80.1918,
          },
          place_address: "Miami Marina, Miami, FL",
          place_details:
            "Scenic boat tours offering stunning views of Miami's skyline, Star Island, and celebrity homes.",
          place_image_url:
            "https://www.getyourguide.com/middle-keys-l-Orlando-l55443/img/75078871dd3053.jpeg",
          place_name: "Biscayne Bay Boat Tour",
          ticket_price: "$60 per person",
          time_travel_each_location:
            "Depends on starting point",
        },
        {
          best_time_to_visit:
            "Late morning to early afternoon",
          geo_coordinates: {
            latitude: 25.7906,
            longitude: -80.1301,
          },
          place_address: "Miami Beach, FL",
          place_details:
            "Experience stunning aerial views of Miami Beach and the Atlantic Ocean with a parasailing adventure.",
          place_image_url:
            "https://media-cdn.tripadvisor.com/media/photo-s/0a/84/3f/c9/parasailing.jpg",
          place_name: "Miami Beach Parasailing",
          ticket_price: "$85 per person",
          time_travel_each_location: "Beachfront activity",
        },
      ],
      best_time_to_visit_day: "Morning to Afternoon",
      day: 6,
      day_plan: "Water Activities and Boat Tour",
    },
    {
      activities: [
        {
          best_time_to_visit:
            "Morning for a peaceful start",
          geo_coordinates: {
            latitude: 25.782,
            longitude: -80.1255,
          },
          place_address:
            "40 Island Ave, Miami Beach, FL 33139",
          place_details:
            "Luxury spa offering holistic treatments, pools, and wellness amenities along the waterfront.",
          place_image_url:
            "https://www.standardhotels.com/media/property/miami/spa/t_960x540/spa-pools.jpg",
          place_name: "Spa Day at The Standard Spa",
          ticket_price: "$150+ per treatment",
          time_travel_each_location: "Within Miami Beach",
        },
      ],
      best_time_to_visit_day: "Morning",
      day: 7,
      day_plan: "Relaxation and Departure",
    },
  ],
  origin: "Seattle",
}


const Itinerary = () => {

  const data = [
    {
      title: "Hotels",
      content: (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 space-y-3'>
            {TRIP_DATA?.hotels.map((hotel, idx) => (
              <HotelCard hotel={hotel} key={idx} />
            ))}
          </div>
          <div className="mb-14"></div>
        </>
      ),
      
    },
    ...TRIP_DATA?.itinerary.map((dayData, idx) => ({
      title: `Day ${dayData?.day}`,
      content: (
        <div key={idx} className="d">
          <p className="text-xl mb-1 ">Best Time: {dayData?.best_time_to_visit_day}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayData?.activities.map((act, index) => (
              <DayActivityCard key={index} act={ act } />
            ))}
          </div>
          <div className="mb-14"></div>
        </div>
      )
    }))
  ]
  return (
    <div className="relative w-full h-[82vh] overflow-auto">
      <Timeline data={data} tripData={TRIP_DATA} />
    </div>
  );
}


export default Itinerary