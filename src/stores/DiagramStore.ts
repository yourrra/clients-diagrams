import { makeAutoObservable } from 'mobx'
import {
  Connection,
  NodeChange,
  EdgeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow'
import { Edges, Nodes, TDiagram } from '../type/TDiagram'

class DiagramStore {
  diagrams: TDiagram[] = []

  constructor() {
    makeAutoObservable(this)
    this.diagrams = []
    this.loadDiagrams()
  }

  loadDiagrams = () => {
    try {
      const savedDiagrams = localStorage.getItem('diagrams')
      if (savedDiagrams) {
        this.diagrams = JSON.parse(savedDiagrams)
      }
    } catch (error) {
      console.error('Не удалось загрузить диаграммы:', error)
    }
  }

  saveDiagrams = () => {
    try {
      localStorage.setItem('diagrams', JSON.stringify(this.diagrams))
    } catch (error) {
      console.error('Не удалось сохранить диаграммы:', error)
    }
  }

  addDiagram = (diagram: TDiagram) => {
    this.diagrams.push(diagram)
    this.saveDiagrams()
  }

  removeDiagram = (ids: React.Key[]) => {
    this.diagrams = this.diagrams.filter(diagram => !ids.includes(diagram.id))
    this.saveDiagrams()
  }

  addNode = (diagramId: string, newNode: Nodes) => {
    const diagramIndex = this.diagrams.findIndex(
      diagram => diagram.id === diagramId,
    )
    if (diagramIndex !== -1) {
      this.diagrams[diagramIndex].nodes.push(newNode)
      this.saveDiagrams()
    }
  }

  addEdge = (diagramId: string, newEdge: Edges) => {
    const diagramIndex = this.diagrams.findIndex(
      diagram => diagram.id === diagramId,
    )
    if (diagramIndex !== -1) {
      this.diagrams[diagramIndex].edges.push(newEdge)
      this.saveDiagrams()
    }
  }

  editNode = (diagramId: string, nodeId: string, newName: string) => {
    const diagramIndex = this.diagrams.findIndex(
      diagram => diagram.id === diagramId,
    )
    if (diagramIndex !== -1) {
      const nodeIndex = this.diagrams[diagramIndex].nodes.findIndex(
        node => node.id === nodeId,
      )
      if (nodeIndex !== -1) {
        this.diagrams[diagramIndex].nodes[nodeIndex].data.label = newName
        this.saveDiagrams()
      }
    }
  }

  deleteNode = (diagramId: string, nodeId: string) => {
    const diagramIndex = this.diagrams.findIndex(
      diagram => diagram.id === diagramId,
    )

    if (diagramIndex !== -1) {
      const diagram = this.diagrams[diagramIndex]
      const nodeIndex = diagram.nodes.findIndex(node => node.id === nodeId)
      const edgeIndex = diagram.edges.findIndex(edge => edge.id === nodeId)

      if (nodeIndex !== -1) {
        diagram.nodes = diagram.nodes.slice(0, nodeIndex)
        diagram.edges = diagram.edges.slice(0, edgeIndex)

        this.saveDiagrams()
      }
    }
  }

  getDiagramById = (id: string): TDiagram | undefined => {
    return this.diagrams.find(diagram => diagram.id === id)
  }

  onNodesChange = (changes: NodeChange[]) => {
    this.diagrams = this.diagrams.map(diagram => {
      return {
        ...diagram,
        nodes: applyNodeChanges(changes, diagram.nodes),
      }
    })
    this.saveDiagrams()
  }

  onEdgesChange = (changes: EdgeChange[]) => {
    this.diagrams = this.diagrams.map(diagram => {
      return {
        ...diagram,
        edges: applyEdgeChanges(changes, diagram.edges),
      }
    })
    this.saveDiagrams()
  }

  onConnect = (connection: Connection) => {
    if (connection.source !== null) {
      const diagram = this.getDiagramById(connection.source)
      if (diagram) {
        diagram.edges = addEdge(connection, diagram.edges || [])
        this.saveDiagrams()
      }
    } else {
      console.log('Не удалось соединить ноды')
    }
  }
}

export default new DiagramStore()
