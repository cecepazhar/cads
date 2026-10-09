import os
import subprocess
from pathlib import Path
from PIL import Image

APPS = [
    {
        "id": "caterm",
        "name": "CATerm",
        "color": "#EF4444",
        "glyph": """> <line x1="120" y1="290" x2="200" y2="290" stroke="#EF4444" stroke-width="24" stroke-linecap="round"/>""",
        "svg_content": """
          <path d="M120 200 L180 256 L120 312" fill="none" stroke="#EF4444" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="210" y1="312" x2="280" y2="312" stroke="#EDEDED" stroke-width="26" stroke-linecap="round"/>
        """
    },
    {
        "id": "camark",
        "name": "CAMark",
        "color": "#06B6D4",
        "svg_content": """
          <path d="M120 310 V200 L170 260 L220 200 V310" fill="none" stroke="#06B6D4" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M280 220 V310 M250 280 L280 310 L310 280" fill="none" stroke="#EDEDED" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
        """
    },
    {
        "id": "castudio",
        "name": "CAStudio",
        "color": "#8B5CF6",
        "svg_content": """
          <path d="M200 180 L280 256 L200 332 L120 256 Z" fill="none" stroke="#8B5CF6" stroke-width="24" stroke-linejoin="round"/>
          <circle cx="200" cy="256" r="28" fill="#EDEDED"/>
        """
    },
    {
        "id": "cacash",
        "name": "CACash",
        "color": "#10B981",
        "svg_content": """
          <path d="M260 200 C240 180 160 180 140 220 C120 260 120 280 140 300 C160 330 240 330 260 310" fill="none" stroke="#10B981" stroke-width="24" stroke-linecap="round"/>
          <line x1="110" y1="256" x2="270" y2="256" stroke="#EDEDED" stroke-width="20" stroke-linecap="round"/>
        """
    },
    {
        "id": "catama",
        "name": "CATama",
        "color": "#F59E0B",
        "svg_content": """
          <rect x="130" y="190" width="140" height="130" rx="16" fill="none" stroke="#F59E0B" stroke-width="24"/>
          <rect x="160" y="230" width="20" height="20" rx="4" fill="#EDEDED"/>
          <rect x="220" y="230" width="20" height="20" rx="4" fill="#EDEDED"/>
          <path d="M170 280 Q200 300 230 280" fill="none" stroke="#F59E0B" stroke-width="16" stroke-linecap="round"/>
          <line x1="140" y1="170" x2="160" y2="190" stroke="#F59E0B" stroke-width="18" stroke-linecap="round"/>
          <line x1="260" y1="170" x2="240" y2="190" stroke="#F59E0B" stroke-width="18" stroke-linecap="round"/>
        """
    },
    {
        "id": "fathstore",
        "name": "FathStore",
        "color": "#3B82F6",
        "svg_content": """
          <path d="M120 220 L150 170 H250 L280 220 V320 H120 Z" fill="none" stroke="#3B82F6" stroke-width="24" stroke-linejoin="round"/>
          <line x1="120" y1="220" x2="280" y2="220" stroke="#3B82F6" stroke-width="20"/>
          <path d="M170 250 A30 30 0 0 0 230 250" fill="none" stroke="#EDEDED" stroke-width="18" stroke-linecap="round"/>
        """
    },
    {
        "id": "cabench",
        "name": "CABench",
        "color": "#EC4899",
        "svg_content": """
          <path d="M210 170 L140 270 H200 L190 340 L260 240 H200 Z" fill="none" stroke="#EC4899" stroke-width="24" stroke-linejoin="round" stroke-linecap="round"/>
        """
    },
    {
        "id": "catable",
        "name": "CATable",
        "color": "#6366F1",
        "svg_content": """
          <rect x="120" y="180" width="160" height="150" rx="14" fill="none" stroke="#6366F1" stroke-width="22"/>
          <line x1="120" y1="230" x2="280" y2="230" stroke="#6366F1" stroke-width="18"/>
          <line x1="120" y1="280" x2="280" y2="280" stroke="#6366F1" stroke-width="18"/>
          <line x1="200" y1="180" x2="200" y2="330" stroke="#6366F1" stroke-width="18"/>
        """
    },
    {
        "id": "capost",
        "name": "CAPost",
        "color": "#F97316",
        "svg_content": """
          <circle cx="200" cy="256" r="65" fill="none" stroke="#F97316" stroke-width="22"/>
          <path d="M165 256 L200 220 L235 256 M200 225 V295" fill="none" stroke="#EDEDED" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
        """
    },
    {
        "id": "cabook",
        "name": "CABook",
        "color": "#14B8A6",
        "svg_content": """
          <path d="M200 210 Q150 180 120 190 V310 Q150 300 200 320 Q250 300 280 190 V310 Q250 300 200 320" fill="none" stroke="#14B8A6" stroke-width="22" stroke-linejoin="round"/>
          <line x1="200" y1="210" x2="200" y2="320" stroke="#EDEDED" stroke-width="20"/>
        """
    },
    {
        "id": "caproduct",
        "name": "CAProduct",
        "color": "#84CC16",
        "svg_content": """
          <polyline points="120,310 170,260 210,285 270,195" fill="none" stroke="#84CC16" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="230,195 270,195 270,235" fill="none" stroke="#84CC16" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
        """
    },
    {
        "id": "cavision",
        "name": "CAVision",
        "color": "#0EA5E9",
        "svg_content": """
          <path d="M120 256 Q200 170 280 256 Q200 342 120 256 Z" fill="none" stroke="#0EA5E9" stroke-width="24" stroke-linejoin="round"/>
          <circle cx="200" cy="256" r="30" fill="none" stroke="#EDEDED" stroke-width="20"/>
          <circle cx="200" cy="256" r="10" fill="#0EA5E9"/>
        """
    },
    {
        "id": "caentech",
        "name": "CAEntech",
        "color": "#D97706",
        "svg_content": """
          <circle cx="200" cy="256" r="65" fill="none" stroke="#D97706" stroke-width="22"/>
          <path d="M200 195 V256 L240 275" fill="none" stroke="#EDEDED" stroke-width="20" stroke-linecap="round"/>
        """
    },
    {
        "id": "caigent",
        "name": "CAIgent",
        "color": "#A855F7",
        "svg_content": """
          <circle cx="200" cy="190" r="25" fill="none" stroke="#A855F7" stroke-width="20"/>
          <circle cx="140" cy="300" r="22" fill="none" stroke="#EDEDED" stroke-width="18"/>
          <circle cx="260" cy="300" r="22" fill="none" stroke="#EDEDED" stroke-width="18"/>
          <line x1="185" y1="210" x2="155" y2="280" stroke="#A855F7" stroke-width="18"/>
          <line x1="215" y1="210" x2="245" y2="280" stroke="#A855F7" stroke-width="18"/>
        """
    },
    {
        "id": "gcchub",
        "name": "GCC Hub",
        "color": "#FFFFFF",
        "svg_content": """
          <polygon points="200,165 275,210 275,300 200,345 125,300 125,210" fill="none" stroke="#FFFFFF" stroke-width="24" stroke-linejoin="round"/>
          <circle cx="200" cy="255" r="25" fill="#FFFFFF"/>
        """
    },
    {
        "id": "caframework",
        "name": "CAFramework",
        "color": "#64748B",
        "svg_content": """
          <polygon points="200,170 270,210 200,250 130,210" fill="none" stroke="#64748B" stroke-width="20" stroke-linejoin="round"/>
          <polygon points="200,240 270,280 200,320 130,280" fill="none" stroke="#EDEDED" stroke-width="20" stroke-linejoin="round"/>
        """
    },
    {
        "id": "caui",
        "name": "CAUI",
        "color": "#E2E8F0",
        "svg_content": """
          <!-- Dual Wings Emblem Mini -->
          <path fill-rule="evenodd" clip-rule="evenodd" d="M175 190 L120 220 V255 L175 285 V245 L160 238 L175 230 V190 Z" fill="#E2E8F0" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M225 190 L280 220 V255 L225 285 V245 L240 238 L225 230 V190 Z" fill="#E2E8F0" />
          <rect x="185" y="230" width="30" height="30" rx="6" fill="none" stroke="#E2E8F0" stroke-width="12"/>
        """
    }
]

# Dual wings header watermark path (scaled for 400x400 viewBox)
DUAL_WINGS_BG = """
  <!-- Dual Wing Cecep Azhar Crest Geometry (Top Watermark / Wings) -->
  <g opacity="0.45" transform="translate(140, 50) scale(0.09)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M581 0L0 301V644L581 945V546L421 473L581 399V0ZM529 86L52 332V613L529 859V574L308 473L529 371V86Z" fill="{color}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M753 0L1334 301V644L753 945V546L913 473L753 399V0ZM805 86L1282 332V613L805 859V574L1026 473L805 371V86Z" fill="{color}"/>
  </g>
"""

BASE_DIR = Path("/home/cecepazhar/Product/caui/src/lib/assets")
BASE_DIR.mkdir(parents=True, exist_ok=True)

SIZES = [32, 64, 128, 256, 512]

for app in APPS:
    app_dir = BASE_DIR / app["id"]
    app_dir.mkdir(parents=True, exist_ok=True)
    color = app["color"]
    wings = DUAL_WINGS_BG.format(color=color)

    # 1. icon.svg (Standard Dark Theme HUD Squircle)
    icon_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="glow_{app['id']}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{color}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#121217" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="border_grad_{app['id']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{color}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#272732" stop-opacity="0.8"/>
    </linearGradient>
  </defs>

  <!-- Squircle Container 16px radius relative to 400px is 64px -->
  <rect x="16" y="16" width="368" height="368" rx="68" fill="#121217" stroke="url(#border_grad_{app['id']})" stroke-width="6"/>
  <rect x="20" y="20" width="360" height="360" rx="64" fill="url(#glow_{app['id']})"/>

  {wings}

  <!-- App Specific Glyph -->
  <g>
    {app['svg_content']}
  </g>
</svg>"""

    # 2. icon-transparent.svg (No background/border for taskbars)
    icon_transparent_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  {wings}
  <g>
    {app['svg_content']}
  </g>
</svg>"""

    # 3. icon-light.svg (Light mode background)
    icon_light_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="border_light_{app['id']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{color}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#E2E8F0" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <rect x="16" y="16" width="368" height="368" rx="68" fill="#FFFFFF" stroke="url(#border_light_{app['id']})" stroke-width="6"/>
  {wings}
  <g>
    {app['svg_content']}
  </g>
</svg>"""

    (app_dir / "icon.svg").write_text(icon_svg)
    (app_dir / "icon-transparent.svg").write_text(icon_transparent_svg)
    (app_dir / "icon-light.svg").write_text(icon_light_svg)

    # Convert to PNGs using ImageMagick
    for size in SIZES:
        png_path = app_dir / f"icon-{size}.png"
        subprocess.run([
            "magick",
            "-background", "none",
            "-density", str(size * 2),
            str(app_dir / "icon.svg"),
            "-resize", f"{size}x{size}",
            str(png_path)
        ], check=True)

    # Convert to .ico (multi-resolution 16, 32, 48, 64, 128, 256)
    ico_path = app_dir / "icon.ico"
    subprocess.run([
        "magick",
        "-background", "none",
        str(app_dir / "icon-256.png"),
        "-define", "icon:auto-resize=256,128,64,48,32,16",
        str(ico_path)
    ], check=True)

    print(f"Generated assets for {app['name']} ({app['id']})")

print("All 17 CA Application icon & theme assets generated successfully.")
