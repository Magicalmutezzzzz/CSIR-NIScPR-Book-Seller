from app.database.session import SessionLocal
from app.core.security import hash_password
from app.models.role import Role
from app.models.user import User

db = SessionLocal()

try:
    # -------------------------
    # Roles
    # -------------------------
    admin_role = db.query(Role).filter(Role.name == "Admin").first()

    if not admin_role:
        admin_role = Role(name="Admin")
        db.add(admin_role)

    customer_role = db.query(Role).filter(Role.name == "Customer").first()

    if not customer_role:
        customer_role = Role(name="Customer")
        db.add(customer_role)

    db.commit()

    db.refresh(admin_role)
    db.refresh(customer_role)

    # -------------------------
    # Admin User
    # -------------------------
    admin = (
        db.query(User)
        .filter(User.email == "admin@niscpr.in")
        .first()
    )

    if not admin:
        admin = User(
            full_name="NIScPR Administrator",
            email="admin@niscpr.in",
            password_hash=hash_password("CSIR-Admin@110012"),
            role_id=admin_role.id,
        )
        db.add(admin)

    # -------------------------
    # Customer User
    # -------------------------
    customer = (
        db.query(User)
        .filter(User.email == "karamveer340@gmail.com")
        .first()
    )

    if not customer:
        customer = User(
            full_name="Karamveer Singh",
            email="karamveer340@gmail.com",
            password_hash=hash_password("Password@123"),
            role_id=customer_role.id,
        )
        db.add(customer)

    db.commit()

    print("================================")
    print("Database Seeded Successfully")
    print("================================")
    print("Admin:")
    print("  Email    : admin@niscpr.in")
    print("  Password : CSIR-Admin@110012")
    print("")
    print("Customer:")
    print("  Email    : karamveer340@gmail.com")
    print("  Password : Password@123")
    print("================================")

finally:
    db.close()