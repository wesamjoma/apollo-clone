import pytest


# ── Register ──────────────────────────────────────────────────────────────────

class TestRegister:
    def test_success_returns_token_and_user(self, client):
        resp = client.post("/api/auth/register", json={
            "email": "new@example.com",
            "full_name": "New User",
            "password": "secret123",
        })
        assert resp.status_code == 201
        body = resp.json()
        assert "access_token" in body
        assert body["token_type"] == "bearer"
        assert body["user"]["email"] == "new@example.com"
        assert body["user"]["full_name"] == "New User"
        assert "hashed_password" not in body["user"]

    def test_duplicate_email_returns_400(self, client):
        payload = {"email": "dup@example.com", "full_name": "A", "password": "pass"}
        client.post("/api/auth/register", json=payload)
        resp = client.post("/api/auth/register", json=payload)
        assert resp.status_code == 400
        assert "already registered" in resp.json()["detail"]

    def test_missing_email_returns_422(self, client):
        resp = client.post("/api/auth/register", json={"full_name": "A", "password": "pass"})
        assert resp.status_code == 422

    def test_missing_password_returns_422(self, client):
        resp = client.post("/api/auth/register", json={"email": "a@b.com", "full_name": "A"})
        assert resp.status_code == 422

    def test_invalid_email_format_returns_422(self, client):
        resp = client.post("/api/auth/register", json={
            "email": "not-an-email",
            "full_name": "A",
            "password": "pass",
        })
        assert resp.status_code == 422


# ── Login ─────────────────────────────────────────────────────────────────────

class TestLogin:
    def test_success_returns_token_and_user(self, client, registered_user):
        resp = client.post("/api/auth/login", json={
            "email": registered_user["payload"]["email"],
            "password": registered_user["payload"]["password"],
        })
        assert resp.status_code == 200
        body = resp.json()
        assert "access_token" in body
        assert body["user"]["email"] == registered_user["payload"]["email"]

    def test_wrong_password_returns_401(self, client, registered_user):
        resp = client.post("/api/auth/login", json={
            "email": registered_user["payload"]["email"],
            "password": "wrongpassword",
        })
        assert resp.status_code == 401

    def test_nonexistent_email_returns_401(self, client):
        resp = client.post("/api/auth/login", json={
            "email": "ghost@example.com",
            "password": "anything",
        })
        assert resp.status_code == 401

    def test_missing_fields_returns_422(self, client):
        resp = client.post("/api/auth/login", json={"email": "a@b.com"})
        assert resp.status_code == 422


# ── /me ───────────────────────────────────────────────────────────────────────

class TestGetMe:
    def test_authenticated_returns_user(self, client, registered_user):
        token = registered_user["data"]["access_token"]
        resp = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert resp.status_code == 200
        assert resp.json()["email"] == registered_user["payload"]["email"]

    def test_no_token_returns_401(self, client):
        resp = client.get("/api/auth/me")
        assert resp.status_code == 401

    def test_invalid_token_returns_401(self, client):
        resp = client.get("/api/auth/me", headers={"Authorization": "Bearer fake.token.here"})
        assert resp.status_code == 401

    def test_malformed_header_returns_401(self, client):
        resp = client.get("/api/auth/me", headers={"Authorization": "NotBearer token"})
        assert resp.status_code == 401

    def test_token_from_register_works_on_me(self, client):
        reg = client.post("/api/auth/register", json={
            "email": "chain@example.com",
            "full_name": "Chain User",
            "password": "pass123",
        })
        token = reg.json()["access_token"]
        resp = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert resp.status_code == 200
        assert resp.json()["email"] == "chain@example.com"
