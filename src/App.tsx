import './index.css'
import './i18n'
import './i18n.lessons'
import { SWUpdatePrompt } from './sw-update'
import Sidebar, { type NavKey } from './components/Sidebar'
import TeacherSidebar from './components/TeacherSidebar'
import { useMemo } from 'react'
import DashboardPage from './pages/DashboardPage'
import CoursesPage from './pages/CoursesPage'
import AchievementsPage from './pages/AchievementsPage'
import ProfilePage from './pages/ProfilePage'
import TeacherPage from './pages/TeacherPage'
import LessonsPage from './pages/LessonsPage'
import LessonDetailPage from './pages/LessonDetailPage'
import SettingsPage from './pages/SettingsPage'
import DailyStemChallenge from './pages/DailyStemChallenge'
import DailyChallengePage from './pages/DailyChallengePage'
import ModulePage from './pages/ModulePage'
import MCQPage from './pages/MCQPage'
import MaterialsPage from './pages/MaterialsPage'
import MathG6NumberSystem from './pages/lessons/MathG6NumberSystem'
import SupabaseSignIn from './pages/SupabaseSignIn'
import MathG6OperationsWholeNumbers from './pages/lessons/MathG6OperationsWholeNumbers'
import MathG6Integers from './pages/lessons/MathG6Integers'
import CSG6CategoriesComputersLanguages from './pages/lessons/CSG6CategoriesComputersLanguages'
import CSG6FileManagement from './pages/lessons/CSG6FileManagement'
import CSG6WordProcessorTables from './pages/lessons/CSG6WordProcessorTables'
import PhyG6MeasurementMotion from './pages/lessons/PhyG6MeasurementMotion'
import PhyG6LightShadowsReflections from './pages/lessons/PhyG6LightShadowsReflections'
import PhyG6ElectricityCircuits from './pages/lessons/PhyG6ElectricityCircuits'
import ChemG6IntroChemistry from './pages/lessons/ChemG6IntroChemistry'
import ChemG6MatterProperties from './pages/lessons/ChemG6MatterProperties'
import ChemG6AtomsMolecules from './pages/lessons/ChemG6AtomsMolecules'
import MathG7Integers from './pages/lessons/MathG7Integers'
import MathG7FractionsDecimals from './pages/lessons/MathG7FractionsDecimals'
import MathG7DataHandling from './pages/lessons/MathG7DataHandling'
import CSG7ProgrammingLanguages from './pages/lessons/CSG7ProgrammingLanguages'
import CSG7WordEditing from './pages/lessons/CSG7WordEditing'
import CSG7PowerPoint from './pages/lessons/CSG7PowerPoint'
import PhyG7MotionTime from './pages/lessons/PhyG7MotionTime'
import PhyG7ElectricCurrentCircuits from './pages/lessons/PhyG7ElectricCurrentCircuits'
import PhyG7Heat from './pages/lessons/PhyG7Heat'
import BioG7LifeProcesses from './pages/lessons/BioG7LifeProcesses'
import BioG7NutritionAnimalsPlants from './pages/lessons/BioG7NutritionAnimalsPlants'
import BioG7RespirationCirculation from './pages/lessons/BioG7RespirationCirculation'
import BioG6LivingNonLiving from './pages/lessons/BioG6LivingNonLiving'
import BioG6PlantsAnimals from './pages/lessons/BioG6PlantsAnimals'
import BioG6OurBodyHealth from './pages/lessons/BioG6OurBodyHealth'
import MathG8RationalNumbers from './pages/lessons/MathG8RationalNumbers'
import MathG8LinearEquations from './pages/lessons/MathG8LinearEquations'
import MathG8UnderstandingQuadrilaterals from './pages/lessons/MathG8UnderstandingQuadrilaterals'
import CSG8IntroComputerLanguage from './pages/lessons/CSG8IntroComputerLanguage'
import CSG8IntroDatabase from './pages/lessons/CSG8IntroDatabase'
import CSG8MSAccessDBMS from './pages/lessons/CSG8MSAccessDBMS'
import PhyG8ForcePressure from './pages/lessons/PhyG8ForcePressure'
import PhyG8Friction from './pages/lessons/PhyG8Friction'
import PhyG8Sound from './pages/lessons/PhyG8Sound'
import BioG8CellStructureFunction from './pages/lessons/BioG8CellStructureFunction'
import BioG8Tissues from './pages/lessons/BioG8Tissues'
import BioG8MovementLocomotion from './pages/lessons/BioG8MovementLocomotion'
import MathG9NumberSystems from './pages/lessons/MathG9NumberSystems'
import MathG9Polynomials from './pages/lessons/MathG9Polynomials'
import MathG9CoordinateGeometry from './pages/lessons/MathG9CoordinateGeometry'
import CSG9BasicsIT from './pages/lessons/CSG9BasicsIT'
import CSG9CyberSafety from './pages/lessons/CSG9CyberSafety'
import CSG9OfficeTools from './pages/lessons/CSG9OfficeTools'
import BioG9CellTheory from './pages/lessons/BioG9CellTheory'
import BioG9PlantAnimalCells from './pages/lessons/BioG9PlantAnimalCells'
import BioG9DiversityOrganisms from './pages/lessons/BioG9DiversityOrganisms'
import PhyG9Motion from './pages/lessons/PhyG9Motion'
import PhyG9ForceLaws from './pages/lessons/PhyG9ForceLaws'
import PhyG9Gravitation from './pages/lessons/PhyG9Gravitation'
import MathG10RealNumbers from './pages/lessons/MathG10RealNumbers'
import MathG10Polynomials from './pages/lessons/MathG10Polynomials'
import MathG10PairLinearEquations from './pages/lessons/MathG10PairLinearEquations'
import CSG10IntroProgramming from './pages/lessons/CSG10IntroProgramming'
import CSG10OfficeAutomation from './pages/lessons/CSG10OfficeAutomation'
import CSG10InternetNetworkBasics from './pages/lessons/CSG10InternetNetworkBasics'
import PhyG10LightReflectionRefraction from './pages/lessons/PhyG10LightReflectionRefraction'
import PhyG10HumanEyeColourfulWorld from './pages/lessons/PhyG10HumanEyeColourfulWorld'
import PhyG10Electricity from './pages/lessons/PhyG10Electricity'
import BioG10LifeProcesses from './pages/lessons/BioG10LifeProcesses'
import BioG10ControlCoordination from './pages/lessons/BioG10ControlCoordination'
import BioG10HeredityEvolution from './pages/lessons/BioG10HeredityEvolution'
import MathG11Sets from './pages/lessons/MathG11Sets'
import MathG11RelationsFunctions from './pages/lessons/MathG11RelationsFunctions'
import MathG11TrigonometricFunctions from './pages/lessons/MathG11TrigonometricFunctions'
import PhyG11PhysicalWorldMeasurement from './pages/lessons/PhyG11PhysicalWorldMeasurement'
import PhyG11Kinematics from './pages/lessons/PhyG11Kinematics'
import PhyG11LawsOfMotion from './pages/lessons/PhyG11LawsOfMotion'
import CSG11ComputerFundamentals from './pages/lessons/CSG11ComputerFundamentals'
import CSG11ProgrammingMethodologyPython from './pages/lessons/CSG11ProgrammingMethodologyPython'
import CSG11IntroCPP from './pages/lessons/CSG11IntroCPP'
import ChemG11SomeBasicConcepts from './pages/lessons/ChemG11SomeBasicConcepts'
import ChemG11StructureOfAtom from './pages/lessons/ChemG11StructureOfAtom'
import ChemG11ClassificationPeriodicity from './pages/lessons/ChemG11ClassificationPeriodicity'
import BioG11DiversityLivingOrganisms from './pages/lessons/BioG11DiversityLivingOrganisms'
import BioG11StructuralOrganization from './pages/lessons/BioG11StructuralOrganization'
import BioG11CellStructureFunction from './pages/lessons/BioG11CellStructureFunction'
import MathG12RelationsFunctions from './pages/lessons/MathG12RelationsFunctions'
import MathG12InverseTrig from './pages/lessons/MathG12InverseTrig'
import MathG12Matrices from './pages/lessons/MathG12Matrices'
import CSG12AdvancedProgramming from './pages/lessons/CSG12AdvancedProgramming'
import CSG12DataStructuresAlgorithms from './pages/lessons/CSG12DataStructuresAlgorithms'
import CSG12DBMSSQL from './pages/lessons/CSG12DBMSSQL'
import PhyG12Electrostatics from './pages/lessons/PhyG12Electrostatics'
import PhyG12CurrentElectricity from './pages/lessons/PhyG12CurrentElectricity'
import PhyG12MagneticEffects from './pages/lessons/PhyG12MagneticEffects'
import ChemG12SolidState from './pages/lessons/ChemG12SolidState'
import ChemG12Solutions from './pages/lessons/ChemG12Solutions'
import ChemG12Electrochemistry from './pages/lessons/ChemG12Electrochemistry'
import BioG12Reproduction from './pages/lessons/BioG12Reproduction'
import BioG12GeneticsEvolution from './pages/lessons/BioG12GeneticsEvolution'
import BioG12BiologyHumanWelfare from './pages/lessons/BioG12BiologyHumanWelfare'
import { QuickQuizPage, MiniGamesPage, DownloadGradePage } from './pages/AdditionalPages'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import { useLanguage } from './contexts/LanguageContext'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RoleSelector from './pages/RoleSelector'
import TeacherLogin from './pages/TeacherLogin'
import TeacherSignUp from './pages/TeacherSignUp'
import StemHub from './pages/StemHub'
import StemLeaderboard from './pages/StemLeaderboard'
import MyProgress from './pages/MyProgress'

function AppContent() {
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()
  const active: NavKey = useMemo(() => {
    const pathname = location.pathname
    if (pathname.startsWith('/courses') || pathname.startsWith('/lessons') || pathname.startsWith('/lesson/')) {
      return 'courses'
    }
    if (pathname.startsWith('/module/') || pathname.startsWith('/mcq/') || pathname.startsWith('/materials/')) {
      return 'courses'
    }
    const seg = pathname.split('/')[1] || 'dashboard'
    const known: Array<NavKey> = ['dashboard','courses','achievements','profile','teacher','quiz','challenge','games','download','settings']
    return (known.includes(seg as NavKey) ? (seg as NavKey) : 'dashboard')
  }, [location.pathname])

  const isTeacherPage = location.pathname.startsWith('/teacher')
  const showStudentSidebar = currentUser && !isTeacherPage
  const showTeacherSidebar = currentUser && isTeacherPage

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100">
      <div className="flex">
        {showStudentSidebar && <Sidebar active={active} onNavigate={() => {}} />}
        {showTeacherSidebar && <TeacherSidebar />}
        <div className="flex-1 min-h-screen">
          <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 dark:bg-slate-950/70 bg-white/70 border-b border-gray-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="font-semibold text-gray-900 dark:text-white">{t(`nav.${active}`) || active.charAt(0).toUpperCase() + active.slice(1)}</div>
              {!currentUser && <span className="text-xs text-gray-600 dark:text-slate-400">Offline-first • PWA</span>}
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/teacher-login" element={<TeacherLogin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/teacher-signup" element={<TeacherSignUp />} />
              <Route path="/" element={<RoleSelector />} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/courses" element={<PrivateRoute><CoursesPage /></PrivateRoute>} />
              <Route path="/achievements" element={<PrivateRoute><AchievementsPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/teacher" element={<PrivateRoute><TeacherPage /></PrivateRoute>} />
              <Route path="/teacher/*" element={<PrivateRoute><TeacherPage /></PrivateRoute>} />
              <Route path="/lessons/:subject/:grade" element={<PrivateRoute><LessonsPage /></PrivateRoute>} />
              <Route path="/lesson/:subject/:grade/:lesson" element={<PrivateRoute><LessonDetailPage /></PrivateRoute>} />
              <Route path="/module/:lessonId" element={<PrivateRoute><ModulePage /></PrivateRoute>} />
              <Route path="/module/math-g6-number-system" element={<MathG6NumberSystem />} />
              <Route path="/module/math-g6-operations-whole-numbers" element={<MathG6OperationsWholeNumbers />} />
              <Route path="/module/math-g6-integers" element={<MathG6Integers />} />
              <Route path="/module/cs-g6-categories-computers-languages" element={<CSG6CategoriesComputersLanguages />} />
              <Route path="/module/cs-g6-file-management" element={<CSG6FileManagement />} />
              <Route path="/module/cs-g6-word-processor-tables" element={<CSG6WordProcessorTables />} />
              <Route path="/module/phy-g6-measurement-motion" element={<PhyG6MeasurementMotion />} />
              <Route path="/module/phy-g6-light-shadows-reflections" element={<PhyG6LightShadowsReflections />} />
              <Route path="/module/phy-g6-electricity-circuits" element={<PhyG6ElectricityCircuits />} />
              <Route path="/module/chem-g6-intro-chemistry" element={<ChemG6IntroChemistry />} />
              <Route path="/module/chem-g6-matter-properties" element={<ChemG6MatterProperties />} />
              <Route path="/module/chem-g6-atoms-molecules" element={<ChemG6AtomsMolecules />} />
              <Route path="/module/bio-g6-living-nonliving" element={<BioG6LivingNonLiving />} />
              <Route path="/module/bio-g6-plants-animals" element={<BioG6PlantsAnimals />} />
              <Route path="/module/bio-g6-our-body-health" element={<BioG6OurBodyHealth />} />
              <Route path="/module/math-g7-integers" element={<MathG7Integers />} />
              <Route path="/module/math-g7-fractions-decimals" element={<MathG7FractionsDecimals />} />
              <Route path="/module/math-g7-data-handling" element={<MathG7DataHandling />} />
              <Route path="/module/cs-g7-programming-languages" element={<CSG7ProgrammingLanguages />} />
              <Route path="/module/cs-g7-word-editing" element={<CSG7WordEditing />} />
              <Route path="/module/cs-g7-powerpoint" element={<CSG7PowerPoint />} />
              <Route path="/module/phy-g7-motion-time" element={<PhyG7MotionTime />} />
              <Route path="/module/phy-g7-electric-current-circuits" element={<PhyG7ElectricCurrentCircuits />} />
              <Route path="/module/phy-g7-heat" element={<PhyG7Heat />} />
              <Route path="/module/bio-g7-life-processes" element={<BioG7LifeProcesses />} />
              <Route path="/module/bio-g7-nutrition-animals-plants" element={<BioG7NutritionAnimalsPlants />} />
              <Route path="/module/bio-g7-respiration-circulation" element={<BioG7RespirationCirculation />} />
              <Route path="/module/math-g8-rational-numbers" element={<MathG8RationalNumbers />} />
              <Route path="/module/math-g8-linear-equations" element={<MathG8LinearEquations />} />
              <Route path="/module/math-g8-understanding-quadrilaterals" element={<MathG8UnderstandingQuadrilaterals />} />
              <Route path="/module/cs-g8-intro-computer-language" element={<CSG8IntroComputerLanguage />} />
              <Route path="/module/cs-g8-intro-database" element={<CSG8IntroDatabase />} />
              <Route path="/module/cs-g8-ms-access-dbms" element={<CSG8MSAccessDBMS />} />
              <Route path="/module/phy-g8-force-pressure" element={<PhyG8ForcePressure />} />
              <Route path="/module/phy-g8-friction" element={<PhyG8Friction />} />
              <Route path="/module/phy-g8-sound" element={<PhyG8Sound />} />
              <Route path="/module/bio-g8-cell-structure-function" element={<BioG8CellStructureFunction />} />
              <Route path="/module/bio-g8-tissues" element={<BioG8Tissues />} />
              <Route path="/module/bio-g8-movement-locomotion" element={<BioG8MovementLocomotion />} />
              <Route path="/module/math-g9-number-systems" element={<MathG9NumberSystems />} />
              <Route path="/module/math-g9-polynomials" element={<MathG9Polynomials />} />
              <Route path="/module/math-g9-coordinate-geometry" element={<MathG9CoordinateGeometry />} />
              <Route path="/module/cs-g9-basics-it" element={<CSG9BasicsIT />} />
              <Route path="/module/cs-g9-cyber-safety" element={<CSG9CyberSafety />} />
              <Route path="/module/cs-g9-office-tools" element={<CSG9OfficeTools />} />
              <Route path="/module/bio-g9-cell-theory" element={<BioG9CellTheory />} />
              <Route path="/module/bio-g9-plant-animal-cells" element={<BioG9PlantAnimalCells />} />
              <Route path="/module/bio-g9-diversity-organisms" element={<BioG9DiversityOrganisms />} />
              <Route path="/module/phy-g9-motion" element={<PhyG9Motion />} />
              <Route path="/module/phy-g9-force-laws" element={<PhyG9ForceLaws />} />
              <Route path="/module/phy-g9-gravitation" element={<PhyG9Gravitation />} />
              <Route path="/module/math-g10-real-numbers" element={<MathG10RealNumbers />} />
              <Route path="/module/math-g10-polynomials" element={<MathG10Polynomials />} />
              <Route path="/module/math-g10-pair-linear-equations" element={<MathG10PairLinearEquations />} />
              <Route path="/module/cs-g10-intro-programming" element={<CSG10IntroProgramming />} />
              <Route path="/module/cs-g10-office-automation" element={<CSG10OfficeAutomation />} />
              <Route path="/module/cs-g10-internet-network-basics" element={<CSG10InternetNetworkBasics />} />
              <Route path="/module/phy-g10-light-reflection-refraction" element={<PhyG10LightReflectionRefraction />} />
              <Route path="/module/phy-g10-human-eye-colourful-world" element={<PhyG10HumanEyeColourfulWorld />} />
              <Route path="/module/phy-g10-electricity" element={<PhyG10Electricity />} />
              <Route path="/module/bio-g10-life-processes" element={<BioG10LifeProcesses />} />
              <Route path="/module/bio-g10-control-coordination" element={<BioG10ControlCoordination />} />
              <Route path="/module/bio-g10-heredity-evolution" element={<BioG10HeredityEvolution />} />
              <Route path="/module/math-g11-sets" element={<MathG11Sets />} />
              <Route path="/module/math-g11-relations-functions" element={<MathG11RelationsFunctions />} />
              <Route path="/module/math-g11-trigonometric-functions" element={<MathG11TrigonometricFunctions />} />
              <Route path="/module/phy-g11-physical-world-measurement" element={<PhyG11PhysicalWorldMeasurement />} />
              <Route path="/module/phy-g11-kinematics" element={<PhyG11Kinematics />} />
              <Route path="/module/phy-g11-laws-of-motion" element={<PhyG11LawsOfMotion />} />
              <Route path="/module/chem-g11-some-basic-concepts" element={<ChemG11SomeBasicConcepts />} />
              <Route path="/module/chem-g11-structure-of-atom" element={<ChemG11StructureOfAtom />} />
              <Route path="/module/chem-g11-classification-periodicity" element={<ChemG11ClassificationPeriodicity />} />
              <Route path="/module/bio-g11-diversity-living-organisms" element={<BioG11DiversityLivingOrganisms />} />
              <Route path="/module/bio-g11-structural-organization" element={<BioG11StructuralOrganization />} />
              <Route path="/module/bio-g11-cell-structure-function" element={<BioG11CellStructureFunction />} />
              <Route path="/module/math-g12-relations-functions" element={<MathG12RelationsFunctions />} />
              <Route path="/module/math-g12-inverse-trigonometric-functions" element={<MathG12InverseTrig />} />
              <Route path="/module/math-g12-matrices" element={<MathG12Matrices />} />
              <Route path="/module/cs-g12-advanced-programming" element={<CSG12AdvancedProgramming />} />
              <Route path="/module/cs-g12-data-structures-algorithms" element={<CSG12DataStructuresAlgorithms />} />
              <Route path="/module/cs-g12-dbms-sql" element={<CSG12DBMSSQL />} />
              <Route path="/module/phy-g12-electrostatics" element={<PhyG12Electrostatics />} />
              <Route path="/module/phy-g12-current-electricity" element={<PhyG12CurrentElectricity />} />
              <Route path="/module/phy-g12-magnetic-effects" element={<PhyG12MagneticEffects />} />
              <Route path="/module/chem-g12-solid-state" element={<ChemG12SolidState />} />
              <Route path="/module/chem-g12-solutions" element={<ChemG12Solutions />} />
              <Route path="/module/chem-g12-electrochemistry" element={<ChemG12Electrochemistry />} />
              <Route path="/module/bio-g12-reproduction" element={<BioG12Reproduction />} />
              <Route path="/module/bio-g12-genetics-evolution" element={<BioG12GeneticsEvolution />} />
              <Route path="/module/bio-g12-biology-human-welfare" element={<BioG12BiologyHumanWelfare />} />
              <Route path="/module/cs-g11-computer-fundamentals" element={<CSG11ComputerFundamentals />} />
              <Route path="/module/cs-g11-programming-methodology-python" element={<CSG11ProgrammingMethodologyPython />} />
              <Route path="/module/cs-g11-intro-cpp" element={<CSG11IntroCPP />} />
              <Route path="/mcq/:lessonId" element={<PrivateRoute><MCQPage /></PrivateRoute>} />
              <Route path="/materials/:lessonId" element={<PrivateRoute><MaterialsPage /></PrivateRoute>} />
              <Route path="/supabase-signin" element={<SupabaseSignIn />} />
              <Route path="/quiz" element={<PrivateRoute><QuickQuizPage /></PrivateRoute>} />
              <Route path="/challenge" element={<PrivateRoute><DailyChallengePage /></PrivateRoute>} />
              <Route path="/games" element={<PrivateRoute><MiniGamesPage /></PrivateRoute>} />
              <Route path="/stem-hub" element={<PrivateRoute><StemHub /></PrivateRoute>} />
              <Route path="/stem-leaderboard" element={<PrivateRoute><StemLeaderboard /></PrivateRoute>} />
              <Route path="/my-progress" element={<PrivateRoute><MyProgress /></PrivateRoute>} />
              {/* STEM daily challenge route (Supabase-backed, Firebase auth intact) */}
              <Route path="/stem/:subject/:grade" element={<PrivateRoute><DailyStemChallenge /></PrivateRoute>} />
              <Route path="/daily-challenge/:subject/:grade" element={<PrivateRoute><DailyStemChallenge /></PrivateRoute>} />
              <Route path="/download" element={<PrivateRoute><DownloadGradePage /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </div>
      <SWUpdatePrompt />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
