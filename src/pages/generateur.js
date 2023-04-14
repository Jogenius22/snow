import { useState } from "react"
import { Card, Grid, Tab, TabList, Text, Title, Flex, Metric, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react"

const categories = [
  {
    title: "Sales",
    metric: "12,699 €",
    metricPrev: "9,456 €"
  },
  {
    title: "Profit",
    metric: "40,598 €",
    metricPrev: "45,564 €"
  },
  {
    title: "Customers",
    metric: "1,072 €",
    metricPrev: "856 €"
  }
]

const data = [
  {
    name: "toto@outlook.com:FederalCouncillor293.",
    password: "Mardi 11 Avril 2023",
    game: "Dofus2",
    status: "active",
  },
  {
    name: "toto1@outlook.com:FederalCouncillor293.",
    password: "Mardi 11 Avril 2023",
    game: "Dofus Touch",
    status: "Banni",
  },
  {
    name: "toto2@outlook.com:FederalCouncillor293.",
    password: "Mardi 11 Avril 2023",
    game: "Dofus Retro",
    status: "active",
  },
  {
    name: "toto3@outlook.com:FederalCouncillor293.",
    password: "Mardi 11 Avril 2023",
    game: "Dofus2",
    status: "Banni",
  },
  {
    name: "toto4@outlook.com:FederalCouncillor293.",
    password: "Mardi 11 Avril 2023",
    game: "Dofus Touch",
    status: "active",
  },
  {
    name: "toto5@outlook.com:FederalCouncillor293.",
    password: "Mardi 11 Avril 2023",
    game: "Dofus Retro",
    status: "Banni",
  },
  {
    name: "toto6@outlook.com:FederalCouncillor293.",
    password: "Mardi 11 Avril 2023",
    game: "Dofus2",
    status: "Banni",
  },
]

export default function Generateur() {
  const [selectedView, setSelectedView] = useState("1")

  return (
    <main className="p-6 sm:p-10">
      <Title className="text-left font-bold text-3xl pt-5">Générateur</Title>
      <Text>Générateur de compte Dofus2, Dofus Touch, Dofus Retro</Text>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="Infos" />
        <Tab value="2" text="Paramètre" />
        <Tab value="3" text="Mes comptes" />
      </TabList>

      {selectedView === "1" ? (
        <>
          <Grid numColsLg={3} className="mt-6 gap-6">
            {categories.map((item) => (
              <Card key={item.title}>
                <Flex alignItems="start">
                  <Text>{item.title}</Text>
                </Flex>
                <Flex
                  className="space-x-3 truncate"
                  justifyContent="start"
                  alignItems="baseline"
                >
                  <Metric>{item.metric}</Metric>
                  <Text className="truncate">from {item.metricPrev}</Text>
                </Flex>
                <div className="h-18" />
              </Card>
            ))}
          </Grid>

          <div className="mt-6">
              <div className="mockup-code">
                <pre data-prefix="$"><code>Démarrage du générateur</code></pre> 
                <pre data-prefix=">" className="text-warning"><code>Récupération du paramétrage utilisateur ...</code></pre> 
                <pre data-prefix=">" className="text-success"><code>Fini! Repérez votre compte dans &#34;mes comptes&#34;</code></pre>
              </div>
              <div className="h-80" />
          </div>
        </>
      ) : selectedView === "2" ? (
        <Card className="mt-6">
          <div className="h-96" />
        </Card>
      ) : (
        <Card className="mt-6">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Comptes</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Jeu</TableHeaderCell>
                <TableHeaderCell>Statut</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Text>{item.password}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.game}</Text>
                  </TableCell>
                  <TableCell>
                    {item.status === "Banni" ? (
                      <Badge color="red">
                        {item.status}
                      </Badge>
                      ) : (
                      <Badge color="emerald">
                        {item.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <button 
                      className="btn btn-square bg-green-600 hover:bg-green-700 border-green-600"
                      onClick={() => console.log("clicked")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-files"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"></path><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"></path><path d="M15 2v5h5"></path></svg>
                    </button>
                    <button 
                      className="btn btn-square bg-yellow-600 hover:bg-yellow-700 border-yellow-600"
                      onClick={() => console.log("clicked")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eraser"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path><path d="M22 21H7"></path><path d="m5 11 9 9"></path></svg>
                    </button>
                    <button 
                      className="btn btn-square bg-red-600 hover:bg-red-700 border-red-600"
                      onClick={() => console.log("clicked")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </main>
  )
}
