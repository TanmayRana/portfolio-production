"""Step 5 - regenerate report with community labels."""
if __name__ == '__main__':
    import json
    from pathlib import Path
    from graphify.build import build_from_json
    from graphify.cluster import score_all
    from graphify.analyze import god_nodes, surprising_connections, suggest_questions
    from graphify.report import generate

    extraction = json.loads(Path('graphify-out/.graphify_extract.json').read_text(encoding='utf-8'))
    detection  = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))
    analysis   = json.loads(Path('graphify-out/.graphify_analysis.json').read_text(encoding='utf-8'))

    G = build_from_json(extraction)
    communities = {int(k): v for k, v in analysis['communities'].items()}
    cohesion = {int(k): v for k, v in analysis['cohesion'].items()}
    tokens = {'input': extraction.get('input_tokens', 0), 'output': extraction.get('output_tokens', 0)}

    labels = {
        0:  "Sidebar & Navigation Shell",
        1:  "Form Controls & Badges",
        2:  "Package Dependencies",
        3:  "Alert Dialog & Calendar",
        4:  "Utility & Combobox Core",
        5:  "Project Config & Aliases",
        6:  "Command & Dialog Palette",
        7:  "TypeScript Compiler Config",
        8:  "Menubar Component",
        9:  "Context Menu Component",
        10: "Dropdown Menu Component",
        11: "Carousel Component",
        12: "Item List Component",
        13: "Chart & Data Viz",
        14: "Select Dropdown",
        15: "Drawer Component",
        16: "Input & Textarea Group",
        17: "Navigation Menu",
        18: "Table Component",
        19: "Card Component",
        20: "Empty State Component",
        21: "Popover Component",
        22: "Root Layout & Fonts",
        23: "Avatar Component",
        24: "Toggle & Toggle Group",
        25: "Admin Layout & Fonts",
        26: "Alert Component",
        27: "Tabs Component",
        28: "Accordion Component",
        29: "Native Select",
        30: "OTP Input",
        31: "Collapsible Component",
        32: "Scroll Area",
        33: "Admin Page",
        34: "Home Page",
        35: "Next.js Config",
        36: "Aspect Ratio",
        37: "Direction Provider",
        38: "Sonner Toast",
        39: "ESLint Config",
        40: "PostCSS Config",
        41: "Next.js Env Types",
        42: "AGENTS.md",
        43: "CLAUDE.md",
        44: "README",
        45: "Graphify Rules",
        46: "Graphify Workflow",
    }

    questions = suggest_questions(G, communities, labels)
    report = generate(G, communities, cohesion, labels, analysis['gods'], analysis['surprises'], detection, tokens, '.', suggested_questions=questions)
    Path('graphify-out/GRAPH_REPORT.md').write_text(report, encoding='utf-8')
    Path('graphify-out/.graphify_labels.json').write_text(
        json.dumps({str(k): v for k, v in labels.items()}, ensure_ascii=False), encoding='utf-8'
    )
    print('Report updated with community labels')
    print('Communities labeled:', len(labels))
