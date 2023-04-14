import { useEffect, useState } from "react"
import CheckModerateur from "@/components/CheckModerateur"
import { Text, Title } from "@tremor/react"

const DofusTouch = [
  { name: "dodge" },
  { name: "grandapan" },
  { name: "oshimo" },
  { name: "herdegrize" },
  { name: "terracogita" },
  { name: "brutas" }
]

const Dofus2 = [
  { name: "imagiro" },
  { name: "orukam" },
  { name: "hellmina" },
  { name: "tylezia" },
  { name: "talkasha" },
  { name: "draconiros" }
]

const DofusRetro = [
  { name: "boune" },
  { name: "crail" },
  { name: "galgarion" }
]

export default function Moderateur() {
  const [dofusTouchData, setDofusTouchData] = useState([])
  const [dofus2Data, setDofus2Data] = useState([])
  const [dofusRetroData, setDofusRetroData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const dofusTouchPromises = DofusTouch.map(async (item) => {
        return await CheckModerateur(item.name)
      })
      const dofus2Promises = Dofus2.map(async (item) => {
        return await CheckModerateur(item.name)
      })
      const dofusRetroPromises = DofusRetro.map(async (item) => {
        return await CheckModerateur(item.name)
      })
  
      const dofusTouchResults = await Promise.all(dofusTouchPromises)
      const dofus2Results = await Promise.all(dofus2Promises)
      const dofusRetroResults = await Promise.all(dofusRetroPromises)
  
      setDofusTouchData(dofusTouchResults)
      setDofus2Data(dofus2Results)
      setDofusRetroData(dofusRetroResults)
    }
  
    fetchData()
  
    const intervalId = setInterval(fetchData, 10 * 1000)
  
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="pb-10 p-6 sm:p-10">
      <Title className="text-left font-bold text-3xl pt-5">Modérateur</Title>
      <Text>Liste de tous les modérateurs connectés en direct</Text>

      <Title className="text-center font-bold text-3xl pt-5">Dofus Touch</Title>
      <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-hidden p-4">
        {dofusTouchData.map((serverData, index) => {
          const currentServer = DofusTouch[index]
          const currentModerator = serverData[0]
          const moderatorName = currentModerator ? currentModerator.name : null
          return (
            <div key={currentServer.name} className="w-1/3 flex flex-col justify-center mockup-code">
              <pre data-prefix="$"><code>Serveur: {currentServer.name}</code></pre> 
              <pre data-prefix=">" className="text-warning"><code>Initialisation en cours ...</code></pre>
              {moderatorName !== null ? (
                <pre data-prefix="x" className="text-accent-focus whitespace-normal break-words"><code>Il y a {moderatorName} de connecter!</code></pre>
              ) : (
                <pre data-prefix=">" className="text-success whitespace-normal break-words"><code>Il n&#39;y a aucun modérateur sur {currentServer.name}!</code></pre>
              )}
            </div>
          )
        })}
      </div>
      <Title className="text-center font-bold text-3xl pt-5">Dofus 2</Title>
      <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-hidden p-4">
        {dofus2Data.map((serverData, index) => {
          const currentServer = Dofus2[index]
          const currentModerator = serverData[0]
          const moderatorName = currentModerator ? currentModerator.name : null
          return (
            <div key={currentServer.name} className="w-1/3 flex flex-col justify-center mockup-code">
              <pre data-prefix="$"><code>Serveur: {currentServer.name}</code></pre> 
              <pre data-prefix=">" className="text-warning"><code>Initialisation en cours ...</code></pre> 
              {moderatorName !== null ? (
                <pre data-prefix="x" className="text-accent-focus whitespace-normal break-words"><code>Il y a {moderatorName} de connecter!</code></pre>
              ) : (
                <pre data-prefix=">" className="text-success whitespace-normal break-words"><code>Il n&#39;y a aucun modérateur sur {currentServer.name}!</code></pre>
              )}
            </div>
          )
        })}
      </div>
      <Title className="text-center font-bold text-3xl pt-5">Dofus Retro</Title>
      <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-hidden p-4">
        {dofusRetroData.map((serverData, index) => {
          const currentServer = DofusRetro[index]
          const currentModerator = serverData[0]
          const moderatorName = currentModerator ? currentModerator.name : null
          return (
            <div key={currentServer.name} className="w-1/3 flex flex-col justify-center mockup-code">
              <pre data-prefix="$"><code>Serveur: {currentServer.name}</code></pre> 
              <pre data-prefix=">" className="text-warning"><code>Initialisation en cours ...</code></pre> 
              {moderatorName !== null ? (
                <pre data-prefix="x" className="text-accent-focus whitespace-normal break-words"><code>Il y a {moderatorName} de connecter!</code></pre>
              ) : (
                <pre data-prefix=">" className="text-success whitespace-normal break-words"><code>Il n&#39;y a aucun modérateur sur {currentServer.name}!</code></pre>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
