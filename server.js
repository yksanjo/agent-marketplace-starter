/**
 * Agent Marketplace - Starter Server
 * Minimal Express server with mock data
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample agents
const agents = [
  {
    id: 'agent-001',
    name: 'CodeMaster Pro',
    vendor: 'DevTools Inc.',
    category: 'Development',
    description: 'Advanced code generation assistant',
    price: 49.99,
    rating: 4.8,
    reviews: 342,
    icon: '⚡',
    tags: ['code-generation'],
    stats: { deployments: 12500, uptime: 99.9 }
  },
  {
    id: 'agent-002',
    name: 'DataFlow Analytics',
    vendor: 'DataScience Pro',
    category: 'Data',
    description: 'Real-time data processing and visualization',
    price: 79.99,
    rating: 4.9,
    reviews: 256,
    icon: '📊',
    tags: ['analytics'],
    stats: { deployments: 8900, uptime: 99.8 }
  }
];

let deployedAgents = [];

// Routes
app.get('/api/agents', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...agents];
  
  if (category && category !== 'All') {
    filtered = filtered.filter(a => a.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(searchLower) ||
      a.description.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(filtered);
});

app.get('/api/agents/:id', (req, res) => {
  const agent = agents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
});

app.get('/api/deployed', (req, res) => {
  res.json(deployedAgents);
});

app.post('/api/deploy', (req, res) => {
  const { agentId } = req.body;
  const agent = agents.find(a => a.id === agentId);
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  const deployed = {
    id: `deployed-${Date.now()}`,
    agentId,
    agent,
    status: 'running',
    deployedAt: new Date().toISOString()
  };
  
  deployedAgents.push(deployed);
  res.json(deployed);
});

app.delete('/api/deployed/:id', (req, res) => {
  const index = deployedAgents.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Deployed agent not found' });
  }
  deployedAgents.splice(index, 1);
  res.json({ success: true });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalDeployed: deployedAgents.length,
    activeWorkflows: 0,
    totalApiCalls: 0,
    uptime: 100
  });
});

app.listen(PORT, () => {
  console.log(`🤖 Agent Marketplace Starter running on http://localhost:${PORT}`);
});
