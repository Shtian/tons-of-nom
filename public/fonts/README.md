# Fonts

The wordmark "Tons of Nom" uses the death-metal font **Faceless** (ADR 0012).

It is **not** bundled — drop the file here:

```
public/fonts/Faceless.woff2
```

(`.ttf` works too if you change the `format()` in `app/globals.css`, but convert to
`.woff2` for size.)

Until the file exists, the title falls back to Impact / system display — no build break.

**License:** Faceless (dafont) is typically free for *personal* use. A public festival
site may be commercial — confirm the license before going live.
