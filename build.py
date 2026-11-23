#!/usr/bin/env python3
"""Bundle Undertow into one self-contained HTML file: dist/undertow.html

The source files stay separate for editing. This inlines styles.css and every
js/*.js script so the game can be hosted anywhere as a single file.
Pass --fragment to drop the <html>/<head>/<body> wrapper (for hosts that add their own).
"""
import re, sys, pathlib

root = pathlib.Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")

css = (root / "styles.css").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="styles.css">', "<style>\n" + css + "\n</style>")

def inline(m):
    src = (root / m.group(1)).read_text(encoding="utf-8")
    assert "</script" not in src.lower(), m.group(1) + " contains a closing script tag"
    return "<script>\n" + src + "\n</script>"

html = re.sub(r'<script src="(js/[^"]+)"></script>', inline, html)

if "--fragment" in sys.argv:
    html = re.sub(r"<!doctype html>\s*", "", html, flags=re.I)
    html = re.sub(r"</?html[^>]*>\s*|</?head>\s*|</body>\s*", "", html)
    html = re.sub(r'<meta charset="utf-8">\s*|<meta name="viewport"[^>]*>\s*', "", html)
    html = html.replace('<body data-zone="sunlight" data-screen="title">',
                        '<script>document.body.setAttribute("data-zone","sunlight");document.body.setAttribute("data-screen","title");</script>')

out = root / "dist"
out.mkdir(exist_ok=True)
name = "undertow-fragment.html" if "--fragment" in sys.argv else "undertow.html"
(out / name).write_text(html, encoding="utf-8")
print("wrote", out / name, f"({len(html)//1024} KB)")
