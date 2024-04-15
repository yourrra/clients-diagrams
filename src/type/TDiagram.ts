export type Data = {
  id: string
  label: string
}

export type Nodes = {
  id: string
  type: string
  data: Data
  position: { x: number; y: number }
}

export type Edges = {
  id: string
  source: string
  target: string
}

export type TDiagram = {
  id: string
  name: string
  nodes: Nodes[]
  edges: Edges[]
}
