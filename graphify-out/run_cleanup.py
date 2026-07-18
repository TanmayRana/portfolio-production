"""Save manifest and clean up temp files."""
import json
from pathlib import Path
from datetime import datetime, timezone

try:
    from graphify.detect import save_manifest
    detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))
    save_manifest(detect.get('all_files') or detect['files'])
    print("Manifest saved")
except Exception as e:
    print(f"Manifest save skipped: {e}")

extract = json.loads(Path('graphify-out/.graphify_extract.json').read_text(encoding='utf-8'))
input_tok = extract.get('input_tokens', 0)
output_tok = extract.get('output_tokens', 0)

cost_path = Path('graphify-out/cost.json')
if cost_path.exists():
    cost = json.loads(cost_path.read_text(encoding='utf-8'))
else:
    cost = {'runs': [], 'total_input_tokens': 0, 'total_output_tokens': 0}

detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))
cost['runs'].append({
    'date': datetime.now(timezone.utc).isoformat(),
    'input_tokens': input_tok,
    'output_tokens': output_tok,
    'files': detect.get('total_files', 0),
})
cost['total_input_tokens'] += input_tok
cost['total_output_tokens'] += output_tok
cost_path.write_text(json.dumps(cost, indent=2, ensure_ascii=False), encoding='utf-8')

print(f"This run: {input_tok:,} input tokens, {output_tok:,} output tokens")
print(f"All time: {cost['total_input_tokens']:,} input, {cost['total_output_tokens']:,} output ({len(cost['runs'])} runs)")

# Cleanup temp files
for tmp in ['.graphify_detect.json', '.graphify_extract.json', '.graphify_ast.json',
            '.graphify_semantic.json', '.graphify_analysis.json', '.graphify_uncached.txt']:
    p = Path(f'graphify-out/{tmp}')
    if p.exists():
        p.unlink()
        print(f"Removed {tmp}")
