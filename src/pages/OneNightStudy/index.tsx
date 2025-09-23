import { Routes, Route } from 'react-router-dom'
import TopicsListing from './TopicsListing'
import IntegersModule from './IntegersModule'
import PowerpointModule from './PowerpointModule'
import WordProcessorTabularModule from './WordProcessorTabularModule'
import FractionsDecimalsModule from './FractionsDecimalsModule'
import FractionsDecimalsGrade7Module from './FractionsDecimalsGrade7Module'
import ElectricityCircuitsModule from './ElectricityCircuitsModule'
import ElectricCurrentCircuitsModule from './ElectricCurrentCircuitsModule'
import OurBodyHealthModule from './OurBodyHealthModule'
import MotionTimeModule from './MotionTimeModule'
import RespirationCirculationModule from './RespirationCirculationModule'
import HeatModule from './HeatModule'
import LifeProcessesModule from './LifeProcessesModule'
import NutritionAnimalsplantsModule from './NutritionAnimalsplantsModule'
import RationalNumbersModule from './RationalNumbersModule'
import LinearEquationsModule from './LinearEquationsModule'
import UnderstandingQuadrilateralsModule from './UnderstandingQuadrilateralsModule'
import IntroComputerLanguagesModule from './IntroComputerLanguagesModule'
import IntroDatabaseModule from './IntroDatabaseModule'
import MsAccessDBMSModule from './MsAccessDBMSModule'
import ForcePressureModule from './ForcePressureModule'
import FrictionModule from './FrictionModule'
import SoundModule from './SoundModule'
import CellStructureFunctionModule from './CellStructureFunctionModule'
import TissuesModule from './TissuesModule'
import NumberSystemsModule from './NumberSystemsModule'
import PolynomialsModule from './PolynomialsModule'
import CoordinateGeometryModule from './CoordinateGeometryModule'
import BasicsITModule from './BasicsITModule'
import CyberSafetyModule from './CyberSafetyModule'
import MotionModule from './MotionModule'
import ForceAndLawsOfMotionModule from './ForceAndLawsOfMotionModule'
import GravitationModule from './GravitationModule'
import CellTheoryModule from './CellTheoryModule'
import RealNumbersModule from './RealNumbersModule'
import PairLinearEquationsModule from './PairLinearEquationsModule'
import PolynomialsGrade10Module from './PolynomialsGrade10Module'
import IntroProgrammingModule from './IntroProgrammingModule'
import OfficeAutomationModule from './OfficeAutomationModule'
import InternetNetworkBasicsModule from './InternetNetworkBasicsModule'
import LightReflectionRefractionModule from './LightReflectionRefractionModule'
import HumanEyeColourfulWorldModule from './HumanEyeColourfulWorldModule'
import ElectricityModule from './ElectricityModule'
import ElectricityGrade10Module from './ElectricityGrade10Module'
import LifeProcessesGrade10Module from './LifeProcessesGrade10Module'
import ControlCoordinationModule from './ControlCoordinationModule'
import HeredityEvolutionModule from './HeredityEvolutionModule'
import SetsModule from './SetsModule'
import RelationsFunctionsModule from './RelationsFunctionsModule'
import TrigonometricFunctionsModule from './TrigonometricFunctionsModule'
import ComputerFundamentalsModule from './ComputerFundamentalsModule'
import ProgrammingMethodologyPythonModule from './ProgrammingMethodologyPythonModule'
import PhysicalWorldMeasurementModule from './PhysicalWorldMeasurementModule'

export default function OneNightStudyPage() {
  return (
    <Routes>
      <Route index element={<TopicsListing />} />
      <Route path="integers" element={<IntegersModule />} />
      <Route path="powerpoint" element={<PowerpointModule />} />
      <Route path="word-processor-tabular" element={<WordProcessorTabularModule />} />
      <Route path="fractions-decimals" element={<FractionsDecimalsModule />} />
      <Route path="fractions-decimals-grade7" element={<FractionsDecimalsGrade7Module />} />
      <Route path="electricity-circuits" element={<ElectricityCircuitsModule />} />
      <Route path="electric-current-circuits" element={<ElectricCurrentCircuitsModule />} />
      <Route path="our-body-health" element={<OurBodyHealthModule />} />
      <Route path="motion-time" element={<MotionTimeModule />} />
      <Route path="respiration-circulation" element={<RespirationCirculationModule />} />
      <Route path="heat" element={<HeatModule />} />
      <Route path="life-processes" element={<LifeProcessesModule />} />
      <Route path="nutrition-animals-plants" element={<NutritionAnimalsplantsModule />} />
      <Route path="rational-numbers" element={<RationalNumbersModule />} />
      <Route path="linear-equations" element={<LinearEquationsModule />} />
      <Route path="understanding-quadrilaterals" element={<UnderstandingQuadrilateralsModule />} />
      <Route path="intro-computer-languages" element={<IntroComputerLanguagesModule />} />
      <Route path="intro-database" element={<IntroDatabaseModule />} />
      <Route path="ms-access-dbms" element={<MsAccessDBMSModule />} />
      <Route path="force-pressure" element={<ForcePressureModule />} />
      <Route path="friction" element={<FrictionModule />} />
      <Route path="sound" element={<SoundModule />} />
      <Route path="cell-structure-function" element={<CellStructureFunctionModule />} />
      <Route path="tissues" element={<TissuesModule />} />
      <Route path="number-systems" element={<NumberSystemsModule />} />
      <Route path="polynomials" element={<PolynomialsModule />} />
      <Route path="coordinate-geometry" element={<CoordinateGeometryModule />} />
      <Route path="basics-it" element={<BasicsITModule />} />
      <Route path="cyber-safety" element={<CyberSafetyModule />} />
      <Route path="motion" element={<MotionModule />} />
      <Route path="force-laws-motion" element={<ForceAndLawsOfMotionModule />} />
      <Route path="gravitation" element={<GravitationModule />} />
      <Route path="cell-theory" element={<CellTheoryModule />} />
      <Route path="real-numbers" element={<RealNumbersModule />} />
      <Route path="pair-linear-equations" element={<PairLinearEquationsModule />} />
      <Route path="polynomials-grade10" element={<PolynomialsGrade10Module />} />
      <Route path="intro-programming" element={<IntroProgrammingModule />} />
      <Route path="office-automation" element={<OfficeAutomationModule />} />
      <Route path="internet-network-basics" element={<InternetNetworkBasicsModule />} />
      <Route path="light-reflection-refraction" element={<LightReflectionRefractionModule />} />
      <Route path="human-eye-colourful-world" element={<HumanEyeColourfulWorldModule />} />
      <Route path="electricity" element={<ElectricityModule />} />
      <Route path="electricity-grade10" element={<ElectricityGrade10Module />} />
      <Route path="life-processes-grade10" element={<LifeProcessesGrade10Module />} />
      <Route path="control-coordination" element={<ControlCoordinationModule />} />
      <Route path="heredity-evolution" element={<HeredityEvolutionModule />} />
      <Route path="sets" element={<SetsModule />} />
      <Route path="relations-functions" element={<RelationsFunctionsModule />} />
      <Route path="trigonometric-functions" element={<TrigonometricFunctionsModule />} />
      <Route path="computer-fundamentals" element={<ComputerFundamentalsModule />} />
      <Route path="programming-methodology-python" element={<ProgrammingMethodologyPythonModule />} />
      <Route path="physical-world-measurement" element={<PhysicalWorldMeasurementModule />} />
      {/* Add more routes as you create more modules */}
    </Routes>
  )
}