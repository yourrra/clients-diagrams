import { Layout } from '../../components/layout'
import { observer } from 'mobx-react-lite'
import ReactFlow, { Controls, Background } from 'reactflow'
import DiagramStore from '../../stores/DiagramStore'
import { useParams } from 'react-router-dom'
import { CustomNode } from './components/customNode'

import 'reactflow/dist/style.css'

const nodeTypes = { custom: CustomNode }

export const EditDiagram = observer(() => {
  const { id } = useParams<{ id?: string }>()
  const diagram = id ? DiagramStore.getDiagramById(id) : null

  return (
    <Layout>
      <div style={{ width: '100%', height: '100vh' }}>
        <h2>Диаграмма: {diagram?.name}</h2>
        <ReactFlow
          nodes={diagram?.nodes}
          edges={diagram?.edges}
          onNodesChange={DiagramStore.onNodesChange}
          onEdgesChange={DiagramStore.onEdgesChange}
          nodesDraggable={false}
          onConnect={DiagramStore.onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </Layout>
  )
})
