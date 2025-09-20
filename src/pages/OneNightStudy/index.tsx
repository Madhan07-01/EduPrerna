import { Routes, Route } from 'react-router-dom'
import TopicsListing from './TopicsListing'
import IntegersModule from './IntegersModule'
import PowerpointModule from './PowerpointModule'
import MotionTimeModule from './MotionTimeModule'
import RespirationCirculationModule from './RespirationCirculationModule'
import HeatModule from './HeatModule'
import LifeProcessesModule from './LifeProcessesModule'

export default function OneNightStudyPage() {
  return (
    <Routes>
      <Route index element={<TopicsListing />} />
      <Route path="integers" element={<IntegersModule />} />
      <Route path="powerpoint" element={<PowerpointModule />} />
      <Route path="motion-time" element={<MotionTimeModule />} />
      <Route path="respiration-circulation" element={<RespirationCirculationModule />} />
      <Route path="heat" element={<HeatModule />} />
      <Route path="life-processes" element={<LifeProcessesModule />} />
      {/* Add more routes as you create more modules */}
    </Routes>
  )
}