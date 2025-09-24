
import { PricingTable } from '@clerk/nextjs'

export default function PricingPage() {
  return (
    <div className="mt-20">
      <h2 className="font-semibold my-7 text-center text-3xl">
        <span className='text-pink-600 font-bold'>AI-Powered</span> Trip Planner, Pick Your Subscription
      </h2>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '0 1rem' }}>
        <PricingTable />
      </div>
    </div>
  )
}