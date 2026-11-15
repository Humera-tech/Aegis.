# AEGIS

**Contract-based verification and counterexample-guided repair of LLM-generated mission plans, before and during execution.**

AEGIS is a safety layer for autonomous systems that take instructions in natural language. A large language model (LLM) proposes a mission plan; an independent, deterministic verifier decides whether that plan is safe. When a plan breaks a rule, AEGIS repairs only the affected steps instead of throwing the whole plan away, and it keeps checking the plan while the mission runs.

> Status: in active development (final-year major project). The system is software-only and runs in a 2D grid simulation. No hardware is required.

---

## The problem

LLMs can turn an instruction like *"Inspect A, B and C, avoid zone R1, keep a 20% battery reserve and return to base"* into a mission plan. But they can be confidently wrong: a route may cross a restricted zone, the battery may run out, or a checkpoint may be skipped. Existing approaches such as *As You Wish* (Zuzuárregui and Carpin, ICRA 2026) verify the plan before execution and regenerate the whole plan when it fails.

AEGIS addresses three gaps:

1. **Whole-plan regeneration.** Regenerating can change steps that were already correct, or introduce new errors.
2. **Pre-execution only.** A verified plan can still become unsafe when the world changes mid-mission.
3. **LLM judging LLM.** The final safety decision should not depend on another LLM.

## How it works

```
Natural-language mission
   ├─► Contract extractor (LLM) ─► Operator confirms ─► DSL → LTLf compiler
   └─► LLM planner (plan with waypoints) ─► Schema check
                                │
                                ▼
            Verifier: plan → state trace → LTLf check
                 │ pass                      │ fail
                 ▼                           ▼
     2D grid simulator             Counterexample (rule, step, trace)
     + runtime monitor                       ▼
                 │                 Dependency analysis (repair region; rest locked)
   world changes │                           ▼
                 └──────────────►  Repair router: A* search  |  Repair LLM
                                             ▼
                                   Re-verify the whole plan (max 3–5 attempts)
```

- **Contracts:** mission rules (no-fly zones, obstacles, battery reserve, required checkpoints, ordering, return to base) written in a small DSL and compiled deterministically into **LTLf** (Linear Temporal Logic over finite traces).
- **Verifier:** replays the plan on the grid, labels every state (`in_restricted`, `battery_ok`, `can_return`, …) and checks every rule. No LLM is involved.
- **Counterexample:** the exact rule broken, the first violating step and the trace that leads to it.
- **Targeted repair:** dependency analysis finds which steps a fix affects and locks the rest. Route and battery errors are repaired with A* search; semantic errors (missing checkpoint, wrong order) go to a repair LLM. Locked steps are enforced in code.
- **Runtime monitor:** checks executed states and re-verifies the remaining plan when the environment changes (new obstacle, closed zone, faster battery drain).
- **Plan history:** every plan version is stored; repairs never overwrite earlier versions.

## Features

- Natural-language mission input with operator-confirmed contracts
- Formal LTLf verification with readable counterexamples
- Minimal, dependency-aware plan repair
- Live 2D simulation in the browser with mid-mission event injection
- Resume plans for missions that end early
- Evaluation against baselines: LLM-only, verify-and-reject, full regeneration

## Tech stack

| Layer | Technology |
|---|---|
| Engine | Python, Pydantic |
| Verification | Custom LTLf evaluator (optional cross-check with Spot or flloat) |
| Repair | A* search, LLM repair |
| LLMs | Local models via Ollama; one hosted model via API |
| API | FastAPI (REST + WebSocket) |
| Storage | SQLite (SQLAlchemy) |
| Frontend | React, TypeScript, Vite, react-konva, Zustand, Recharts |
| Testing | pytest |

## Repository structure

```
Aegis/
├── backend/
│   ├── aegis/          # Engine: core, contracts, planner, verifier, repair, runtime, simulation, llm, pipeline
│   ├── api/            # FastAPI routes, WebSocket, database
│   ├── evaluation/     # Experiments, metrics, analysis
│   ├── missions/       # Mission dataset (easy → adversarial, runtime events, real incidents)
│   ├── configs/        # YAML configuration
│   ├── tests/          # Unit and integration tests
│   ├── scripts/        # Dataset generation and smoke tests
│   └── docs/
└── frontend/
    └── src/            # Components (grid, mission, report, simulation, dashboard), pages, hooks, services
```

## Getting started

### Prerequisites

- Python 3.10+
- Node.js 18+
- [Ollama](https://ollama.com) for local models (optional if you use a hosted API)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # Windows: copy .env.example .env
uvicorn api.main:app --reload      # http://localhost:8000
```

Pull a local model if you use Ollama:

```bash
ollama pull llama3.1:8b
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev                        # http://localhost:5173
```

### Tests

```bash
cd backend
pytest
```

## Evaluation

| Method | Description |
|---|---|
| LLM only | Plans executed without verification |
| Verify + reject | Invalid plans are rejected |
| Verify + regenerate | Invalid plans are fully regenerated (As You Wish style) |
| AEGIS (LLM repair) | Targeted repair using the LLM only |
| AEGIS (search repair) | Targeted repair using search only |
| AEGIS (full) | Routed, dependency-aware repair + runtime monitoring |

Metrics: LLM invalid-plan rate, verification accuracy, repair success rate, repair iterations and time, preservation rate (share of original steps kept), final violation rate, and runtime detection before the violation is reached.

Results will be added once the experiments are complete.

## Limitations

- Evaluated in a 2D grid simulation, not on physical robots.
- Missions are short and finite; altitude and time-window rules are out of scope.
- The LLM still proposes plans and extracts contracts; the operator must confirm contracts before planning.
- Designed to be domain-independent, but demonstrated on a limited set of scenarios.

## References

- M. A. Zuzuárregui and S. Carpin, "As You Wish: Mission Planning with Formal Verification using LLMs in Precision Agriculture," *IEEE ICRA*, 2026. [arXiv:2606.18519](https://arxiv.org/abs/2606.18519)
- M. A. Zuzuárregui and S. Carpin, "Leveraging LLMs for Mission Planning in Precision Agriculture," *IEEE ICRA*, 2025. [arXiv:2506.10093](https://arxiv.org/abs/2506.10093)

## Team

| Role | Name |
|---|---|
| Team Lead | Humera Mahreen |
| Team Member | Fazal Unnisa |

<!-- Add project guide and institution -->

## License

<!-- Add a license, e.g. MIT -->