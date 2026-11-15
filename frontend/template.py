"""
AEGIS frontend scaffold (React + TypeScript + react-konva).

Recommended order (run from your project folder):
    1. npm create vite@latest frontend -- --template react-ts
    2. python template_frontend.py
    3. cd frontend && npm install && npm install react-konva konva zustand recharts

Step 2 only adds AEGIS folders and files; it never overwrites what Vite created.
Run it from your project folder or from inside frontend/.
"""

from pathlib import Path

FILES = {
    'src/components/grid/GridCanvas.tsx': None,
    'src/components/grid/RobotLayer.tsx': None,
    'src/components/grid/PathLayer.tsx': None,
    'src/components/mission/MissionInput.tsx': None,
    'src/components/mission/ContractReview.tsx': None,
    'src/components/report/VerificationReport.tsx': None,
    'src/components/report/CounterexampleView.tsx': None,
    'src/components/report/RepairDiff.tsx': None,
    'src/components/dashboard/MetricsCharts.tsx': None,
    'src/pages/MissionPage.tsx': None,
    'src/pages/SimulationPage.tsx': None,
    'src/pages/DashboardPage.tsx': None,
    'src/hooks/useSimulationSocket.ts': None,
    'src/services/api.ts': None,
    'src/store/missionStore.ts': None,
    'src/types/index.ts': None,
    'src/components/common/Layout.tsx': None,
    'src/components/simulation/SimulationControls.tsx': None,
    'src/components/simulation/EventInjector.tsx': None,
    'src/components/report/PlanVersionList.tsx': None,
    'src/pages/HistoryPage.tsx': None,
    'src/services/socket.ts': None,
    'src/utils/gridMath.ts': None,
    'src/styles/theme.css': None,
    '.env.example': 'VITE_API_URL=http://localhost:8000\nVITE_WS_URL=ws://localhost:8000/ws\n',
}

EMPTY_DIRS = [
    "src/assets",
    "public",
]

ROOT_FILES = {
    "AEGIS_README.md": "# AEGIS frontend\n\n```bash\nnpm install\nnpm install react-konva konva zustand recharts\ncp .env.example .env\nnpm run dev        # http://localhost:5173\n```\n\nThe backend must be running on http://localhost:8000.\n",
}


def content_for(path, desc):
    if path.endswith((".ts", ".tsx")):
        return "export {};\n"      # placeholder module, keeps TypeScript happy
    if isinstance(desc, str):
        return desc
    return ""


NOTEBOOK = '{"cells": [], "metadata": {}, "nbformat": 4, "nbformat_minor": 5}\n'


def project_root():
    # Works both ways: run inside an existing "frontend" folder, or next to it.
    cwd = Path.cwd()
    return cwd if cwd.name == "frontend" else cwd / "frontend"


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
    print(f"frontend scaffold ready at: {root.resolve()}")
    print(f"  created: {len(created)} files")
    if skipped:
        print(f"  skipped (already existed): {len(skipped)} files")


if __name__ == "__main__":
    main()