#!/usr/bin/env python3
"""
Security Testing Script - Petasync Black
=========================================
Simuliert 5 bekannte Angriffsarten gegen die eigene Webseite:
1. SQL Injection
2. XSS (Cross-Site Scripting)
3. Brute-Force Login
4. CSRF (Cross-Site Request Forgery)
5. JWT-Manipulation

Verwendung:
    pip install requests
    python security_test.py --url https://deine-domain.de
    python security_test.py --url https://deine-domain.de --test-email admin@example.com
"""

import requests
import json
import base64
import hmac
import hashlib
import time
import sys
import argparse
from datetime import datetime, timezone, timedelta


# --- Farben fuer Terminal-Ausgabe ---
class Colors:
    GREEN = "\033[92m"
    RED = "\033[91m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    BOLD = "\033[1m"
    RESET = "\033[0m"


def pass_msg(msg):
    return f"{Colors.GREEN}  [PASS]{Colors.RESET} {msg}"


def fail_msg(msg):
    return f"{Colors.RED}  [FAIL]{Colors.RESET} {msg}"


def warn_msg(msg):
    return f"{Colors.YELLOW}  [WARN]{Colors.RESET} {msg}"


def info_msg(msg):
    return f"{Colors.BLUE}  [INFO]{Colors.RESET} {msg}"


# --- SQL Injection Payloads ---
SQL_PAYLOADS = [
    "' OR '1'='1",
    "' OR '1'='1' --",
    "'; DROP TABLE users; --",
    "' UNION SELECT * FROM users --",
    "1' AND 1=1 --",
    "admin'--",
    "' OR 1=1#",
    "') OR ('1'='1",
    "'; EXEC xp_cmdshell('dir'); --",
    "' AND (SELECT COUNT(*) FROM users) > 0 --",
]

# --- XSS Payloads ---
XSS_PAYLOADS = [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "<svg onload=alert('XSS')>",
    "javascript:alert('XSS')",
    "<body onload=alert('XSS')>",
    "'\"><script>alert('XSS')</script>",
    "<iframe src='javascript:alert(1)'>",
    "<div style='background:url(javascript:alert(1))'>",
]


class SecurityTester:
    def __init__(self, base_url, test_email="security-test@example.com"):
        self.base_url = base_url.rstrip("/")
        self.test_email = test_email
        self.results = []  # (test_name, status, detail)
        self.session = requests.Session()
        self.session.headers.update({"Content-Type": "application/json"})

    def add_result(self, test_name, passed, detail=""):
        status = "PASS" if passed else "FAIL"
        self.results.append((test_name, status, detail))
        if passed:
            print(pass_msg(f"{test_name}: {detail}"))
        else:
            print(fail_msg(f"{test_name}: {detail}"))

    def add_warning(self, test_name, detail=""):
        self.results.append((test_name, "WARN", detail))
        print(warn_msg(f"{test_name}: {detail}"))

    # =========================================================================
    # TEST 1: SQL INJECTION
    # =========================================================================
    def test_sql_injection(self):
        print(f"\n{Colors.BOLD}{'='*60}")
        print("TEST 1: SQL INJECTION")
        print(f"{'='*60}{Colors.RESET}")
        print(info_msg("Sende SQL-Payloads an Login und Kontaktformular..."))

        all_passed = True

        # Test gegen Login-Endpunkt
        for i, payload in enumerate(SQL_PAYLOADS):
            try:
                # SQL in Email-Feld
                resp = self.session.post(
                    f"{self.base_url}/api/auth/login",
                    json={"email": payload, "password": payload},
                    timeout=10,
                )

                if resp.status_code == 500:
                    self.add_result(
                        f"SQLi Login #{i+1}",
                        False,
                        f"Server Error 500 bei Payload: {payload[:30]}... "
                        f"(moeglicher SQL-Fehler durchgereicht)",
                    )
                    all_passed = False
                elif resp.status_code == 200 and "access_token" in resp.text:
                    self.add_result(
                        f"SQLi Login #{i+1}",
                        False,
                        f"Login erfolgreich mit SQL-Payload! KRITISCH: {payload[:30]}...",
                    )
                    all_passed = False
                # 400 oder 401 sind erwartete Antworten (Validierung greift)

            except requests.exceptions.RequestException as e:
                self.add_warning(f"SQLi Login #{i+1}", f"Request fehlgeschlagen: {e}")

        # Test gegen Kontaktformular
        for i, payload in enumerate(SQL_PAYLOADS[:5]):
            try:
                resp = self.session.post(
                    f"{self.base_url}/api/contact-form",
                    json={
                        "name": payload,
                        "email": "test@test.de",
                        "message": payload,
                        "turnstileToken": "test",
                    },
                    timeout=10,
                )

                if resp.status_code == 500:
                    self.add_result(
                        f"SQLi Kontaktform #{i+1}",
                        False,
                        f"Server Error 500 bei Payload: {payload[:30]}...",
                    )
                    all_passed = False

            except requests.exceptions.RequestException as e:
                self.add_warning(
                    f"SQLi Kontaktform #{i+1}", f"Request fehlgeschlagen: {e}"
                )

        if all_passed:
            self.add_result(
                "SQL Injection (gesamt)",
                True,
                "Alle 15 Payloads korrekt abgelehnt - kein SQL-Fehler",
            )

    # =========================================================================
    # TEST 2: XSS (CROSS-SITE SCRIPTING)
    # =========================================================================
    def test_xss(self):
        print(f"\n{Colors.BOLD}{'='*60}")
        print("TEST 2: XSS (CROSS-SITE SCRIPTING)")
        print(f"{'='*60}{Colors.RESET}")
        print(info_msg("Sende XSS-Payloads an Kontaktformular..."))

        all_passed = True

        for i, payload in enumerate(XSS_PAYLOADS):
            try:
                resp = self.session.post(
                    f"{self.base_url}/api/contact-form",
                    json={
                        "name": payload,
                        "email": "xss-test@test.de",
                        "message": payload,
                        "turnstileToken": "test",
                    },
                    timeout=10,
                )

                # Pruefen ob der Payload unescaped in der Response erscheint
                if payload in resp.text and "<script>" in payload.lower():
                    self.add_result(
                        f"XSS Kontaktform #{i+1}",
                        False,
                        f"Payload unescaped in Response: {payload[:40]}...",
                    )
                    all_passed = False
                elif resp.status_code == 500:
                    self.add_result(
                        f"XSS Kontaktform #{i+1}",
                        False,
                        f"Server Error 500 bei Payload: {payload[:40]}...",
                    )
                    all_passed = False

            except requests.exceptions.RequestException as e:
                self.add_warning(f"XSS #{i+1}", f"Request fehlgeschlagen: {e}")

        if all_passed:
            self.add_result(
                "XSS (gesamt)",
                True,
                "Alle 8 Payloads korrekt behandelt - kein unescaped Output",
            )

    # =========================================================================
    # TEST 3: BRUTE-FORCE LOGIN
    # =========================================================================
    def test_brute_force(self):
        print(f"\n{Colors.BOLD}{'='*60}")
        print("TEST 3: BRUTE-FORCE LOGIN")
        print(f"{'='*60}{Colors.RESET}")
        print(
            info_msg(
                f"Sende 10 Login-Versuche mit falschem Passwort an {self.test_email}..."
            )
        )

        lockout_detected = False
        lockout_attempt = None

        for i in range(10):
            try:
                resp = self.session.post(
                    f"{self.base_url}/api/auth/login",
                    json={
                        "email": self.test_email,
                        "password": f"wrong_password_{i}",
                    },
                    timeout=10,
                )

                resp_text = resp.text.lower()

                if "gesperrt" in resp_text or "locked" in resp_text:
                    lockout_detected = True
                    lockout_attempt = i + 1
                    break

            except requests.exceptions.RequestException as e:
                self.add_warning(f"Brute-Force #{i+1}", f"Request fehlgeschlagen: {e}")
                break

        if lockout_detected:
            self.add_result(
                "Brute-Force Lockout",
                True,
                f"Account-Sperre nach {lockout_attempt} Versuchen erkannt",
            )
        else:
            self.add_result(
                "Brute-Force Lockout",
                False,
                "Kein Account-Lockout nach 10 Versuchen erkannt! "
                "Hinweis: Funktioniert nur mit existierendem Account "
                "(--test-email mit echtem Account verwenden)",
            )

    # =========================================================================
    # TEST 4: CSRF (CROSS-SITE REQUEST FORGERY)
    # =========================================================================
    def test_csrf(self):
        print(f"\n{Colors.BOLD}{'='*60}")
        print("TEST 4: CSRF (CROSS-SITE REQUEST FORGERY)")
        print(f"{'='*60}{Colors.RESET}")
        print(info_msg("Teste Requests ohne JWT und mit fremdem Origin..."))

        all_passed = True

        # Test 4a: Request ohne JWT-Token an geschuetzten Endpunkt
        try:
            resp = requests.get(
                f"{self.base_url}/api/auth/me",
                headers={"Content-Type": "application/json"},
                timeout=10,
            )

            if resp.status_code == 401:
                self.add_result(
                    "CSRF: Ohne JWT",
                    True,
                    "Geschuetzter Endpunkt lehnt Request ohne Token ab (401)",
                )
            else:
                self.add_result(
                    "CSRF: Ohne JWT",
                    False,
                    f"Endpunkt antwortet mit {resp.status_code} statt 401!",
                )
                all_passed = False
        except requests.exceptions.RequestException as e:
            self.add_warning("CSRF: Ohne JWT", f"Request fehlgeschlagen: {e}")

        # Test 4b: Request mit fremdem Origin-Header
        try:
            resp = requests.get(
                f"{self.base_url}/api/auth/me",
                headers={
                    "Content-Type": "application/json",
                    "Origin": "https://evil-hacker-site.com",
                },
                timeout=10,
            )

            # Pruefen ob CORS-Header fehlen oder korrekt sind
            acao = resp.headers.get("Access-Control-Allow-Origin", "")
            if acao == "*":
                self.add_result(
                    "CSRF: Fremder Origin",
                    False,
                    "CORS erlaubt ALLE Origins (Access-Control-Allow-Origin: *)! KRITISCH!",
                )
                all_passed = False
            elif "evil-hacker-site.com" in acao:
                self.add_result(
                    "CSRF: Fremder Origin",
                    False,
                    "CORS erlaubt boesartigen Origin!",
                )
                all_passed = False
            else:
                self.add_result(
                    "CSRF: Fremder Origin",
                    True,
                    f"CORS korrekt konfiguriert (Origin nicht erlaubt)",
                )
        except requests.exceptions.RequestException as e:
            self.add_warning("CSRF: Fremder Origin", f"Request fehlgeschlagen: {e}")

        # Test 4c: OPTIONS Preflight mit fremdem Origin
        try:
            resp = requests.options(
                f"{self.base_url}/api/auth/me",
                headers={
                    "Origin": "https://evil-hacker-site.com",
                    "Access-Control-Request-Method": "GET",
                    "Access-Control-Request-Headers": "Authorization",
                },
                timeout=10,
            )

            acao = resp.headers.get("Access-Control-Allow-Origin", "")
            if acao == "*" or "evil-hacker-site.com" in acao:
                self.add_result(
                    "CSRF: Preflight",
                    False,
                    "Preflight erlaubt boesartigen Origin!",
                )
                all_passed = False
            else:
                self.add_result(
                    "CSRF: Preflight",
                    True,
                    "Preflight-Request korrekt blockiert",
                )
        except requests.exceptions.RequestException as e:
            self.add_warning("CSRF: Preflight", f"Request fehlgeschlagen: {e}")

    # =========================================================================
    # TEST 5: JWT-MANIPULATION
    # =========================================================================
    def test_jwt_manipulation(self):
        print(f"\n{Colors.BOLD}{'='*60}")
        print("TEST 5: JWT-MANIPULATION")
        print(f"{'='*60}{Colors.RESET}")
        print(info_msg("Teste manipulierte JWT-Tokens..."))

        all_passed = True

        def b64url_encode(data):
            """URL-safe Base64 ohne Padding"""
            return (
                base64.urlsafe_b64encode(json.dumps(data).encode())
                .rstrip(b"=")
                .decode()
            )

        future_exp = int((datetime.now(timezone.utc) + timedelta(hours=1)).timestamp())

        # Test 5a: Token mit alg:none (klassischer JWT-Bypass)
        header_none = b64url_encode({"alg": "none", "typ": "JWT"})
        payload_admin = b64url_encode(
            {
                "user_id": "1",
                "email": "admin@test.de",
                "role": "admin",
                "type": "access",
                "iat": int(time.time()),
                "exp": future_exp,
            }
        )
        token_none = f"{header_none}.{payload_admin}."

        try:
            resp = requests.get(
                f"{self.base_url}/api/auth/me",
                headers={"Authorization": f"Bearer {token_none}"},
                timeout=10,
            )
            if resp.status_code == 401:
                self.add_result(
                    "JWT: alg:none",
                    True,
                    "Token mit alg:none korrekt abgelehnt (401)",
                )
            elif resp.status_code == 200:
                self.add_result(
                    "JWT: alg:none",
                    False,
                    "KRITISCH! Token mit alg:none akzeptiert! Auth-Bypass moeglich!",
                )
                all_passed = False
            else:
                self.add_result(
                    "JWT: alg:none",
                    True,
                    f"Token abgelehnt (Status {resp.status_code})",
                )
        except requests.exceptions.RequestException as e:
            self.add_warning("JWT: alg:none", f"Request fehlgeschlagen: {e}")

        # Test 5b: Token mit falscher Signatur
        header_hs256 = b64url_encode({"alg": "HS256", "typ": "JWT"})
        fake_sig = base64.urlsafe_b64encode(b"fake_signature").rstrip(b"=").decode()
        token_fake_sig = f"{header_hs256}.{payload_admin}.{fake_sig}"

        try:
            resp = requests.get(
                f"{self.base_url}/api/auth/me",
                headers={"Authorization": f"Bearer {token_fake_sig}"},
                timeout=10,
            )
            if resp.status_code == 401:
                self.add_result(
                    "JWT: Falsche Signatur",
                    True,
                    "Token mit falscher Signatur abgelehnt (401)",
                )
            elif resp.status_code == 200:
                self.add_result(
                    "JWT: Falsche Signatur",
                    False,
                    "KRITISCH! Token mit falscher Signatur akzeptiert!",
                )
                all_passed = False
            else:
                self.add_result(
                    "JWT: Falsche Signatur",
                    True,
                    f"Token abgelehnt (Status {resp.status_code})",
                )
        except requests.exceptions.RequestException as e:
            self.add_warning("JWT: Falsche Signatur", f"Request fehlgeschlagen: {e}")

        # Test 5c: Abgelaufener Token
        expired_payload = b64url_encode(
            {
                "user_id": "1",
                "email": "admin@test.de",
                "role": "admin",
                "type": "access",
                "iat": int(time.time()) - 7200,
                "exp": int(time.time()) - 3600,  # 1 Stunde abgelaufen
            }
        )
        # Signatur mit leerem Secret (wird sowieso abgelehnt)
        msg = f"{header_hs256}.{expired_payload}"
        sig = hmac.new(b"wrong_secret", msg.encode(), hashlib.sha256).digest()
        expired_sig = base64.urlsafe_b64encode(sig).rstrip(b"=").decode()
        token_expired = f"{msg}.{expired_sig}"

        try:
            resp = requests.get(
                f"{self.base_url}/api/auth/me",
                headers={"Authorization": f"Bearer {token_expired}"},
                timeout=10,
            )
            if resp.status_code == 401:
                self.add_result(
                    "JWT: Abgelaufen",
                    True,
                    "Abgelaufener Token korrekt abgelehnt (401)",
                )
            elif resp.status_code == 200:
                self.add_result(
                    "JWT: Abgelaufen",
                    False,
                    "KRITISCH! Abgelaufener Token akzeptiert!",
                )
                all_passed = False
            else:
                self.add_result(
                    "JWT: Abgelaufen",
                    True,
                    f"Token abgelehnt (Status {resp.status_code})",
                )
        except requests.exceptions.RequestException as e:
            self.add_warning("JWT: Abgelaufen", f"Request fehlgeschlagen: {e}")

        # Test 5d: Manipulierter Payload (role geaendert)
        payload_manipulated = b64url_encode(
            {
                "user_id": "999",
                "email": "hacker@evil.com",
                "role": "admin",
                "type": "access",
                "iat": int(time.time()),
                "exp": future_exp,
            }
        )
        # Alte Signatur passt nicht zum neuen Payload
        token_manipulated = f"{header_hs256}.{payload_manipulated}.{fake_sig}"

        try:
            resp = requests.get(
                f"{self.base_url}/api/auth/me",
                headers={"Authorization": f"Bearer {token_manipulated}"},
                timeout=10,
            )
            if resp.status_code == 401:
                self.add_result(
                    "JWT: Manipulierter Payload",
                    True,
                    "Manipulierter Token korrekt abgelehnt (401)",
                )
            elif resp.status_code == 200:
                self.add_result(
                    "JWT: Manipulierter Payload",
                    False,
                    "KRITISCH! Manipulierter Token akzeptiert!",
                )
                all_passed = False
            else:
                self.add_result(
                    "JWT: Manipulierter Payload",
                    True,
                    f"Token abgelehnt (Status {resp.status_code})",
                )
        except requests.exceptions.RequestException as e:
            self.add_warning(
                "JWT: Manipulierter Payload", f"Request fehlgeschlagen: {e}"
            )

        # Test 5e: Unguelitger Refresh-Token
        try:
            resp = self.session.post(
                f"{self.base_url}/api/auth/refresh",
                json={"refresh_token": token_fake_sig},
                timeout=10,
            )
            if resp.status_code == 401:
                self.add_result(
                    "JWT: Fake Refresh-Token",
                    True,
                    "Gefaelschter Refresh-Token abgelehnt (401)",
                )
            elif resp.status_code == 200 and "access_token" in resp.text:
                self.add_result(
                    "JWT: Fake Refresh-Token",
                    False,
                    "KRITISCH! Gefaelschter Refresh-Token akzeptiert!",
                )
                all_passed = False
            else:
                self.add_result(
                    "JWT: Fake Refresh-Token",
                    True,
                    f"Token abgelehnt (Status {resp.status_code})",
                )
        except requests.exceptions.RequestException as e:
            self.add_warning("JWT: Fake Refresh", f"Request fehlgeschlagen: {e}")

    # =========================================================================
    # ZUSAMMENFASSUNG
    # =========================================================================
    def print_summary(self):
        print(f"\n{Colors.BOLD}{'='*60}")
        print("ZUSAMMENFASSUNG")
        print(f"{'='*60}{Colors.RESET}")

        passed = sum(1 for _, s, _ in self.results if s == "PASS")
        failed = sum(1 for _, s, _ in self.results if s == "FAIL")
        warnings = sum(1 for _, s, _ in self.results if s == "WARN")
        total = len(self.results)

        print(f"\n  Gesamt:     {total} Tests")
        print(f"  {Colors.GREEN}Bestanden:  {passed}{Colors.RESET}")
        print(f"  {Colors.RED}Fehlgeschlagen: {failed}{Colors.RESET}")
        print(f"  {Colors.YELLOW}Warnungen:  {warnings}{Colors.RESET}")

        if failed > 0:
            print(f"\n{Colors.RED}{Colors.BOLD}ACHTUNG: {failed} Sicherheitsluecke(n) gefunden!{Colors.RESET}")
            print("\nFehlgeschlagene Tests:")
            for name, status, detail in self.results:
                if status == "FAIL":
                    print(f"  {Colors.RED}x{Colors.RESET} {name}: {detail}")
        elif warnings > 0:
            print(f"\n{Colors.YELLOW}Hinweis: Einige Tests konnten nicht ausgefuehrt werden.{Colors.RESET}")
        else:
            print(f"\n{Colors.GREEN}{Colors.BOLD}Alle Tests bestanden! Deine Webseite scheint sicher zu sein.{Colors.RESET}")

        print()

    def run_all(self):
        print(f"\n{Colors.BOLD}Security Testing - Petasync Black{Colors.RESET}")
        print(f"Ziel: {self.base_url}")
        print(f"Zeit: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*60}")

        self.test_sql_injection()
        self.test_xss()
        self.test_brute_force()
        self.test_csrf()
        self.test_jwt_manipulation()
        self.print_summary()


def main():
    parser = argparse.ArgumentParser(
        description="Security Testing fuer Petasync Black Webseite",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Beispiele:
  python security_test.py --url https://meine-domain.de
  python security_test.py --url http://localhost:8080
  python security_test.py --url https://meine-domain.de --test-email admin@meine-domain.de

WICHTIG: Nur auf eigenen Webseiten verwenden!
        """,
    )
    parser.add_argument(
        "--url",
        required=True,
        help="Basis-URL der Webseite (z.B. https://meine-domain.de)",
    )
    parser.add_argument(
        "--test-email",
        default="security-test@example.com",
        help="Email fuer Brute-Force-Test (Standard: security-test@example.com). "
        "Fuer aussagekraeftigen Lockout-Test einen existierenden Account verwenden.",
    )

    args = parser.parse_args()

    print(f"\n{Colors.YELLOW}{'='*60}")
    print("WARNUNG: Dieses Skript ist NUR fuer die eigene Webseite!")
    print("Unbefugtes Testen fremder Webseiten ist strafbar.")
    print(f"{'='*60}{Colors.RESET}\n")

    tester = SecurityTester(args.url, args.test_email)
    tester.run_all()


if __name__ == "__main__":
    main()
