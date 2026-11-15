"""
AEGIS backend scaffold (Python: AEGIS engine, FastAPI, evaluation, tests).

Run from your project folder (the one that will hold backend/ and frontend/),
or from inside an existing backend/ folder:
    python template_backend.py

Safe to re-run: existing files are never overwritten. Software only, no hardware.
"""

from pathlib import Path

FILES = {
    'aegis/__init__.py': '',
    'aegis/core/__init__.py': '',
    'aegis/core/plan.py': 'Plan and Action models (actions carry explicit waypoints).',
    'aegis/core/state.py': 'State: position, battery, visited checkpoints, status.',
    'aegis/core/trace.py': 'ExecutionTrace: ordered list of states produced by replaying a plan.',
    'aegis/core/mission.py': 'Mission: instruction, map, contracts, status, plan versions.',
    'aegis/core/grid.py': '2D grid world: free, obstacle, restricted, checkpoint and base cells.',
    'aegis/core/errors.py': 'Custom exceptions.',
    'aegis/contracts/__init__.py': '',
    'aegis/contracts/schema.py': 'Pydantic models for the Contract DSL.',
    'aegis/contracts/templates.py': 'Contract types: NoFlyZone, ObstacleAvoidance, BatteryReserve, WaypointCoverage, Sequencing, ReturnToBase.',
    'aegis/contracts/compiler.py': 'Deterministic Contract DSL -> LTLf compiler (no LLM).',
    'aegis/contracts/extractor.py': 'LLM extraction of contracts from natural language (operator confirms).',
    'aegis/contracts/prompts/contract_extraction.txt': None,
    'aegis/planner/__init__.py': '',
    'aegis/planner/llm_planner.py': 'Natural language -> structured plan with waypoints.',
    'aegis/planner/plan_schema.py': 'Pydantic schema validation of LLM plan output.',
    'aegis/planner/prompts/plan_generation.txt': None,
    'aegis/verifier/__init__.py': '',
    'aegis/verifier/trace_builder.py': 'Replays a plan waypoint by waypoint on the grid and builds the state trace (A* is never used here).',
    'aegis/verifier/propositions.py': 'Labels each state: in_restricted, in_obstacle, battery_ok, can_return, at_base, inspected_X.',
    'aegis/verifier/ltlf.py': 'LTLf evaluator over finite traces: G, F, U, X and ordering patterns.',
    'aegis/verifier/verifier.py': 'Main verifier: plan -> trace -> propositions -> check every contract.',
    'aegis/verifier/counterexample.py': 'Builds counterexamples: rule, first violating step, state, trace prefix, blamed action.',
    'aegis/verifier/result.py': 'VerificationResult model.',
    'aegis/verifier/cross_check.py': 'Optional cross-check of the LTLf evaluator against Spot or flloat.',
    'aegis/repair/__init__.py': '',
    'aegis/repair/dependency.py': 'Dependency analysis: computes the repair region; all other steps are locked.',
    'aegis/repair/router.py': 'Chooses repair method by violation type: search for zone/obstacle/battery, LLM for semantic errors.',
    'aegis/repair/astar.py': 'A* path search used only during repair.',
    'aegis/repair/llm_repairer.py': 'LLM repair of semantic violations, given only the repair region and the counterexample.',
    'aegis/repair/splice.py': 'Replaces the repair region in the plan and rejects any change to locked steps.',
    'aegis/repair/loop.py': 'Bounded repair -> re-verify loop (3-5 attempts).',
    'aegis/repair/prompts/repair.txt': None,
    'aegis/runtime/__init__.py': '',
    'aegis/runtime/monitor.py': 'Runtime monitor: checks executed states and re-verifies the remaining plan.',
    'aegis/runtime/events.py': 'Mid-mission events: new obstacle, zone closed, faster battery drain.',
    'aegis/runtime/resume.py': 'Builds a resume plan from unfinished steps after an early return.',
    'aegis/simulation/__init__.py': '',
    'aegis/simulation/base.py': 'Simulator interface.',
    'aegis/simulation/grid_sim.py': 'Deterministic 2D grid simulator: executes a plan step by step.',
    'aegis/llm/__init__.py': '',
    'aegis/llm/client.py': 'Provider-independent LLM client.',
    'aegis/llm/providers/__init__.py': '',
    'aegis/llm/providers/ollama.py': 'Local models via Ollama.',
    'aegis/llm/providers/anthropic.py': 'Hosted model via the Anthropic API.',
    'aegis/llm/providers/openai.py': 'Hosted model via the OpenAI API.',
    'aegis/pipeline/__init__.py': '',
    'aegis/pipeline/orchestrator.py': 'Full AEGIS workflow: contracts -> plan -> verify -> repair -> execute + monitor.',
    'aegis/pipeline/config.py': 'Loads configuration from configs/ and .env.',
    'aegis/utils/__init__.py': '',
    'aegis/utils/logging.py': 'Logging setup.',
    'aegis/utils/serialization.py': 'JSON helpers for plans, traces and results.',
    'api/__init__.py': '',
    'api/main.py': 'FastAPI app entry point.',
    'api/websocket.py': 'WebSocket: streams simulation states, receives mid-mission events.',
    'api/schemas.py': 'Request/response models.',
    'api/routes/__init__.py': '',
    'api/routes/missions.py': 'Create and list missions; confirm contracts.',
    'api/routes/plans.py': 'Generate plans and list plan versions.',
    'api/routes/verification.py': 'Verify plans and return counterexamples.',
    'api/routes/repair.py': 'Run targeted repair.',
    'api/routes/execution.py': 'Start, pause, resume missions.',
    'api/routes/results.py': 'Evaluation results for the dashboard.',
    'api/db/__init__.py': '',
    'api/db/database.py': 'PostgreSQL connection (SQLAlchemy engine and session).',
    'api/db/models.py': 'Tables: missions, plan_versions, execution_log, events, counterexamples.',
    'api/db/repositories.py': 'Database operations.',
    'evaluation/__init__.py': '',
    'evaluation/experiments/__init__.py': '',
    'evaluation/experiments/run_motivation.py': 'How often do LLM plans violate contracts? (per model, difficulty, violation type)',
    'evaluation/experiments/run_llm_only.py': 'Baseline 1: LLM planner only.',
    'evaluation/experiments/run_verify_reject.py': 'Baseline 2: verify and reject.',
    'evaluation/experiments/run_regenerate.py': 'Baseline 3: verify + full regeneration (As You Wish style).',
    'evaluation/experiments/run_aegis_llm_repair.py': 'Ablation: AEGIS with LLM-only repair.',
    'evaluation/experiments/run_aegis_search_repair.py': 'Ablation: AEGIS with search-only repair.',
    'evaluation/experiments/run_aegis_full.py': 'Full AEGIS: routed, dependency-aware repair.',
    'evaluation/experiments/run_runtime.py': 'Runtime experiments with mid-mission events.',
    'evaluation/metrics/__init__.py': '',
    'evaluation/metrics/invalid_plan_rate.py': 'LLM invalid-plan rate.',
    'evaluation/metrics/verification_accuracy.py': 'Verifier vs hand-labelled ground truth.',
    'evaluation/metrics/repair_success.py': 'Repair success rate and iterations.',
    'evaluation/metrics/preservation.py': 'Preservation rate: share of original steps kept.',
    'evaluation/metrics/runtime_detection.py': 'Violations caught before the robot reached them.',
    'evaluation/metrics/efficiency.py': 'Repair time and LLM calls.',
    'evaluation/analysis/plots.ipynb': None,
    'configs/llm.yaml': None,
    'configs/verifier.yaml': None,
    'configs/simulator.yaml': None,
    'configs/experiments/ablation_v1.yaml': None,
    'tests/__init__.py': '',
    'tests/unit/__init__.py': '',
    'tests/unit/test_contracts.py': 'Unit tests: contract DSL and LTLf compiler.',
    'tests/unit/test_trace_builder.py': 'Unit tests: plan replay and battery model.',
    'tests/unit/test_ltlf.py': 'Unit tests: G, F, U evaluator.',
    'tests/unit/test_verifier.py': 'Unit tests: verifier and counterexamples.',
    'tests/unit/test_dependency.py': 'Unit tests: repair region and locked steps.',
    'tests/unit/test_astar.py': 'Unit tests: A* repair.',
    'tests/unit/test_monitor.py': 'Unit tests: runtime monitor.',
    'tests/integration/__init__.py': '',
    'tests/integration/test_full_pipeline.py': 'End-to-end pipeline test.',
    'tests/fixtures/sample_missions.json': None,
    'scripts/generate_missions.py': 'Generates the mission dataset with planted errors.',
    'scripts/validate_contract_dsl.py': 'Validates contract files.',
    'scripts/smoke_test.py': 'Quick check that the core pipeline runs.',
    'docs/architecture.md': None,
    'docs/contract_dsl.md': None,
    'docs/research_gap.md': None,
    'docs/experiments.md': None,
    'docs/demo.md': None,
}

EMPTY_DIRS = [
    "missions/maps",
    "missions/easy",
    "missions/medium",
    "missions/hard",
    "missions/adversarial",
    "missions/runtime_events",
    "missions/real_incidents",
    "evaluation/results",
    "data",
]

ROOT_FILES = {
    "README.md": "# AEGIS backend\n\n```bash\npython -m venv .venv\nsource .venv/bin/activate        # Windows: .venv\\Scripts\\activate\npip install -r requirements.txt\ncp .env.example .env              # Windows: copy .env.example .env\n# create the database once: CREATE DATABASE aegis;  then set DATABASE_URL in .env\nuvicorn api.main:app --reload     # run from inside backend/\npytest\n```\n",
    "requirements.txt": "fastapi\nuvicorn[standard]\npydantic\nsqlalchemy\npsycopg[binary]\nalembic\npython-dotenv\npyyaml\nhttpx\nollama\nanthropic\nopenai\nnumpy\npandas\nmatplotlib\njupyter\npytest\n# Optional LTLf cross-check (pick one):\n# flloat\n# Spot: conda install -c conda-forge spot\n",
    ".env.example": "# Copy to .env and fill in. Never commit .env.\nOLLAMA_HOST=http://localhost:11434\nOLLAMA_MODEL=llama3.1:8b\nANTHROPIC_API_KEY=\nOPENAI_API_KEY=\nDATABASE_URL=postgresql+psycopg://postgres:your_password@localhost:5432/aegis\nFRONTEND_ORIGIN=http://localhost:5173\n",
    ".gitignore": ".env\n.venv/\n__pycache__/\n*.pyc\n.pytest_cache/\n.ipynb_checkpoints/\nevaluation/results/*\n!evaluation/results/.gitkeep\n",
    "pyproject.toml": "[project]\nname = \"aegis\"\nversion = \"0.1.0\"\ndescription = \"Verification and targeted repair of LLM-generated mission plans\"\nrequires-python = \">=3.10\"\n\n[tool.pytest.ini_options]\ntestpaths = [\"tests\"]\n",
}


def content_for(path, desc):
    if path.endswith(".ipynb"):
        return NOTEBOOK
    if path.endswith(".json"):
        return "[]\n"
    if path.endswith(".py") and desc:
        return f'"""{desc}"""\n'
    return ""


NOTEBOOK = '{"cells": [], "metadata": {}, "nbformat": 4, "nbformat_minor": 5}\n'


def project_root():
    # Works both ways: run inside an existing "backend" folder, or next to it.
    cwd = Path.cwd()
    return cwd if cwd.name == "backend" else cwd / "backend"


def write(path, text, created, skipped):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        skipped.append(path)
        return
    path.write_text(text, encoding="utf-8")
    created.append(path)


def main():
    root = project_root()
    created, skipped = [], []
    for rel, desc in FILES.items():
        write(root / rel, content_for(rel, desc), created, skipped)
    for d in EMPTY_DIRS:
        write(root / d / ".gitkeep", "", created, skipped)
    for rel, text in ROOT_FILES.items():
        write(root / rel, text, created, skipped)
    print(f"backend scaffold ready at: {root.resolve()}")
    print(f"  created: {len(created)} files")
    if skipped:
        print(f"  skipped (already existed): {len(skipped)} files")


if __name__ == "__main__":
    main()