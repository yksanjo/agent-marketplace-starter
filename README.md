# Agent Marketplace Starter

A minimal starter template for building Agent Marketplace integrations.

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The API will be available at `http://localhost:3001`.

## API Endpoints

- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get agent by ID
- `GET /api/deployed` - List deployed agents
- `POST /api/deploy` - Deploy an agent
- `DELETE /api/deployed/:id` - Remove deployed agent
- `GET /api/stats` - Get dashboard stats

## Example Usage

```javascript
// Fetch agents
const response = await fetch('http://localhost:3001/api/agents');
const agents = await response.json();

// Deploy an agent
await fetch('http://localhost:3001/api/deploy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ agentId: 'agent-001' })
});
```

## Extending

Add more agents to the `agents` array in `server.js` to customize your marketplace.
