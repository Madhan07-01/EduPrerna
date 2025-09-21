import PhaserLogicGateMatch from '../../components/games/PhaserLogicGateMatch'

export default function LogicGateMatchPage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Logic Gate Match</div>
      <PhaserLogicGateMatch onFinish={(score)=> alert(`Your score: ${score}`)} />
    </div>
  )
}
