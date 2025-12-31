# 🔍 API-Key Fehler Troubleshooting

## Problem
```
{"message":"No API key found in request","hint":"No `apikey` request header or url param was found."}
```

Dieser Fehler tritt auf, wenn die Supabase-Umgebungsvariablen beim Build nicht korrekt gesetzt wurden.

---

## 🎯 Fehler eingrenzen - Schritt für Schritt

### Schritt 1: Online-Version prüfen

Öffnen Sie in Ihrem Browser:
```
https://petasync.de/check-env.html
```

Diese Seite zeigt Ihnen **genau**, welche Umgebungsvariablen fehlen oder falsche Werte haben.

**Was Sie sehen sollten:**
- ✅ `VITE_SUPABASE_URL`: Sollte eine echte Supabase-URL sein (nicht "your-project-id")
- ✅ `VITE_SUPABASE_PUBLISHABLE_KEY`: Sollte gesetzt sein
- ✅ `VITE_SUPABASE_PROJECT_ID`: Sollte gesetzt sein

**Wenn Sie ❌ sehen:** Die entsprechende Variable wurde beim Build nicht korrekt gesetzt!

---

### Schritt 2: GitHub Secrets überprüfen

1. Gehen Sie zu: https://github.com/Petasync/Petasync_Black/settings/secrets/actions

2. **Überprüfen Sie diese Secrets:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

3. **WICHTIG:** Klicken Sie auf "Update" und schauen Sie, ob die Werte:
   - ❌ LEER sind
   - ❌ Noch Platzhalter enthalten wie `"your-project-id"` oder `"your-publishable-key"`
   - ✅ Echte Supabase-Werte enthalten

---

### Schritt 3: Richtige Werte aus Supabase holen

1. Gehen Sie zu: https://supabase.com/dashboard

2. Wählen Sie Ihr Projekt

3. Navigieren Sie zu: **Settings** → **API**

4. Kopieren Sie:
   ```
   Project URL          → VITE_SUPABASE_URL
   Project API keys
     └─ anon/public     → VITE_SUPABASE_PUBLISHABLE_KEY
   Project Reference ID → VITE_SUPABASE_PROJECT_ID
   ```

   **Beispiel:**
   ```bash
   # RICHTIG:
   VITE_SUPABASE_URL="https://abcdefghijk.supabase.co"
   VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   VITE_SUPABASE_PROJECT_ID="abcdefghijk"

   # FALSCH (Platzhalter):
   VITE_SUPABASE_URL="your-project.supabase.co"
   VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
   ```

---

### Schritt 4: GitHub Secrets aktualisieren

1. Gehen Sie zu: Repository → **Settings** → **Secrets and variables** → **Actions**

2. Für jedes Secret:
   - Klicken Sie auf das **Stift-Symbol** (Edit)
   - Fügen Sie den **echten Wert** ein (nicht den Platzhalter!)
   - Klicken Sie auf **Update secret**

3. Wiederholen Sie für:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

---

### Schritt 5: Neuen Deployment triggern

Nach dem Aktualisieren der Secrets:

**Option A - Automatisch (bei Push zu main):**
```bash
git push origin main
```

**Option B - Manuell:**
1. Gehen Sie zu: **Actions** → **Deploy to Hetzner**
2. Klicken Sie auf **Run workflow**
3. Wählen Sie Branch: `main`
4. Klicken Sie auf **Run workflow**

---

### Schritt 6: Deployment-Logs prüfen

1. Gehen Sie zu: **Actions** → Neuester Workflow-Run

2. Schauen Sie sich den Step **"Verify Environment Variables"** an:
   - ✅ Sollte zeigen: "VITE_SUPABASE_URL ist gesetzt"
   - ✅ Sollte zeigen: "VITE_SUPABASE_PUBLISHABLE_KEY ist gesetzt"
   - ❌ Wenn "FEHLER" angezeigt wird: Secrets sind leer!

---

## ✅ Problem gelöst?

Nach dem Deployment öffnen Sie erneut:
```
https://petasync.de/check-env.html
```

Wenn alle Werte ✅ anzeigen, ist das Problem behoben!

**WICHTIG:** Löschen Sie danach die `check-env.html` Datei:
```bash
rm public/check-env.html
git add .
git commit -m "Remove debug file"
git push
```

---

## 🆘 Immer noch Probleme?

1. Überprüfen Sie die Browser-Konsole (F12) auf weitere Fehlermeldungen
2. Prüfen Sie, ob Supabase-Projekt online ist: https://supabase.com/dashboard
3. Stellen Sie sicher, dass der API-Key nicht abgelaufen oder deaktiviert ist

---

## 📞 Kontakt

Bei weiteren Fragen: GitHub Issues öffnen oder Admin kontaktieren.
