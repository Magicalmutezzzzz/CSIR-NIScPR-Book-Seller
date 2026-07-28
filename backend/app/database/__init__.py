from sqlalchemy import text

from app.database.session import engine


def check_database():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("✅ PostgreSQL Connected Successfully")
    except Exception as e:
        print(f"❌ Database Connection Failed: {e}")