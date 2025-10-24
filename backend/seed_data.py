"""
Seed script to populate the database with sample data
"""
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from datetime import datetime, timedelta

def seed_database():
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(models.User).count() > 0:
            print("Database already seeded!")
            return
        
        # Create users with enhanced profiles
        users = [
            models.User(
                username="john_doe",
                email="john@example.com",
                full_name="John Doe",
                avatar_url=None,
                role=models.UserRole.ADMIN,
                job_title="Engineering Manager",
                department="Engineering",
                phone="+1-555-0101",
                location="San Francisco, CA",
                bio="Experienced engineering manager with 10+ years in software development.",
                manager_id=None,
                date_joined=datetime.now() - timedelta(days=365),
                is_active=1
            ),
            models.User(
                username="jane_smith",
                email="jane@example.com",
                full_name="Jane Smith",
                avatar_url=None,
                role=models.UserRole.DEVELOPER,
                job_title="Senior Full Stack Developer",
                department="Engineering",
                phone="+1-555-0102",
                location="New York, NY",
                bio="Full stack developer specializing in Python and React.",
                manager_id=1,  # Reports to John
                date_joined=datetime.now() - timedelta(days=180),
                is_active=1
            ),
            models.User(
                username="bob_wilson",
                email="bob@example.com",
                full_name="Bob Wilson",
                avatar_url=None,
                role=models.UserRole.DESIGNER,
                job_title="Senior UX Designer",
                department="Design",
                phone="+1-555-0103",
                location="Austin, TX",
                bio="UX designer passionate about creating intuitive user experiences.",
                manager_id=1,  # Reports to John
                date_joined=datetime.now() - timedelta(days=90),
                is_active=1
            ),
            models.User(
                username="alice_johnson",
                email="alice@example.com",
                full_name="Alice Johnson",
                avatar_url=None,
                role=models.UserRole.QA,
                job_title="QA Lead",
                department="Quality Assurance",
                phone="+1-555-0104",
                location="Seattle, WA",
                bio="Quality assurance specialist ensuring product excellence.",
                manager_id=1,  # Reports to John
                date_joined=datetime.now() - timedelta(days=120),
                is_active=1
            ),
            models.User(
                username="mike_brown",
                email="mike@example.com",
                full_name="Mike Brown",
                avatar_url=None,
                role=models.UserRole.PRODUCT_OWNER,
                job_title="Product Owner",
                department="Product",
                phone="+1-555-0105",
                location="Boston, MA",
                bio="Product owner focused on delivering value to customers.",
                manager_id=None,
                date_joined=datetime.now() - timedelta(days=200),
                is_active=1
            ),
        ]
        
        for user in users:
            db.add(user)
        
        db.commit()
        
        # Create projects
        projects = [
            models.Project(
                name="Website Redesign",
                key="WEB",
                description="Redesign the company website with modern UI/UX"
            ),
            models.Project(
                name="Mobile App",
                key="MOB",
                description="Develop iOS and Android mobile applications"
            ),
            models.Project(
                name="API Development",
                key="API",
                description="Build RESTful API for third-party integrations"
            ),
        ]
        
        for project in projects:
            db.add(project)
        
        db.commit()
        
        print("✅ Database seeded successfully!")
        print(f"   Created {len(users)} users")
        print(f"   Created {len(projects)} projects")
        print("\nSample users:")
        for user in users:
            print(f"   - {user.full_name} ({user.email}) - {user.role.value} - {user.job_title}")
        print("\nSample projects:")
        for project in projects:
            print(f"   - {project.name} ({project.key})")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

