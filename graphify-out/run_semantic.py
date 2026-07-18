"""
Semantic extraction for non-code files (docs, images).
This runs single-threaded to avoid multiprocessing issues on Windows.
"""
import json
from pathlib import Path

detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))
uncached_txt = Path('graphify-out/.graphify_uncached.txt').read_text(encoding='utf-8').strip()
uncached = [f for f in uncached_txt.splitlines() if f.strip()]

# Only handle docs and images for semantic extraction
# (code is handled by AST)
doc_files = detect.get('files', {}).get('document', [])
image_files = detect.get('files', {}).get('image', [])

non_code_files = [f for f in uncached if f in doc_files or f in image_files]

print(f"Non-code files for semantic extraction: {len(non_code_files)}")

if not non_code_files:
    print("No non-code files to extract - writing empty semantic result")
    result = {'nodes': [], 'edges': [], 'hyperedges': [], 'input_tokens': 0, 'output_tokens': 0}
    Path('graphify-out/.graphify_semantic.json').write_text(
        json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8'
    )
else:
    # Basic extraction: read doc files and create minimal nodes
    from graphify.extract import extract as ast_extract, collect_files
    
    nodes = []
    edges = []
    
    for fpath in non_code_files:
        p = Path(fpath)
        if not p.exists():
            continue
        try:
            if p.suffix in ('.md', '.txt', '.mdx'):
                content = p.read_text(encoding='utf-8', errors='ignore')
                node_id = str(p).replace('\\', '/').replace(' ', '_')
                nodes.append({
                    'id': node_id,
                    'label': p.name,
                    'type': 'document',
                    'source_location': str(p),
                    'confidence': 'EXTRACTED',
                    'summary': content[:300]
                })
                print(f"  + doc node: {p.name}")
        except Exception as e:
            print(f"  ! error on {p.name}: {e}")
    
    result = {
        'nodes': nodes,
        'edges': edges,
        'hyperedges': [],
        'input_tokens': 0,
        'output_tokens': 0
    }
    Path('graphify-out/.graphify_semantic.json').write_text(
        json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8'
    )
    print(f"Semantic: {len(nodes)} nodes, {len(edges)} edges")
