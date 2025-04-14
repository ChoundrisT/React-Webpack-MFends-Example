#!/usr/bin/env python3

from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Initialize the SQLAlchemy engine and sessionmaker
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Models for Van and User
class Van(Base):
    __tablename__ = "vans"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    description = Column(String)
    imageUrl = Column(String)
    type = Column(String)
    hostId = Column(String)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)

# Pydantic models for data validation
class ItemResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str
    imageUrl: str
    type: str
    hostId: str

    class Config:
        from_attributes = True

# Add this Pydantic schema
class UserResponse(BaseModel):
    id: int
    email: str
    name: str

    class Config:
        from_attributes = True


# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# FastAPI app setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend domain (if it's different)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)



@app.post("/api/login", response_model=list[UserResponse])
def get_user(db: Session = Depends(get_db)):
    users = db.query(User).all()
    print("User creds: ", users)
    return users

# CRUD operation: Get all vans
@app.get("/api/vans", response_model=list[ItemResponse])
def get_vans(db: Session = Depends(get_db)):
    vans = db.query(Van).all()
    print("=======--------=========--------=========---------=========-------",vans)
    return vans

# CRUD operation: Get a single van by ID
@app.get("/api/vans/{van_id}", response_model=ItemResponse)
def get_van(van_id: int, db: Session = Depends(get_db)):
    van = db.query(Van).filter(Van.id == van_id).first()
    if van is None:
        raise HTTPException(status_code=404, detail="Van not found")
    return van

# CRUD operation: Get vans by hostId
@app.get("/api/host/vans", response_model=list[ItemResponse])
def get_host_vans(db: Session = Depends(get_db)):
    vans = db.query(Van).filter(Van.hostId == "123").all()
    return vans


@app.get("/api/host/vans/{van_id}", response_model=list[ItemResponse])
def get_host_vans_van(van_id: int, db: Session = Depends(get_db)):
    vans = db.query(Van).filter(Van.hostId == 123, Van.id == van_id).all()
    return vans


# # CRUD operation: Create a new van
# @app.post("/api/vans", response_model=ItemResponse)
# def create_van(van: ItemResponse, db: Session = Depends(get_db)):
#     db_van = Van(**van.dict())
#     db.add(db_van)
#     db.commit()
#     db.refresh(db_van)
#     return db_van

# # CRUD operation: Update a van
# @app.put("/api/vans/{van_id}", response_model=ItemResponse)
# def update_van(van_id: int, van: ItemResponse, db: Session = Depends(get_db)):
#     db_van = db.query(Van).filter(Van.id == van_id).first()
#     if db_van is None:
#         raise HTTPException(status_code=404, detail="Van not found")
    
#     for key, value in van.dict().items():
#         setattr(db_van, key, value)
    
#     db.commit()
#     db.refresh(db_van)
#     return db_van

# # CRUD operation: Delete a van
# @app.delete("/api/vans/{van_id}", response_model=ItemResponse)
# def delete_van(van_id: int, db: Session = Depends(get_db)):
#     db_van = db.query(Van).filter(Van.id == van_id).first()
#     if db_van is None:
#         raise HTTPException(status_code=404, detail="Van not found")
    
#     db.delete(db_van)
#     db.commit()
    return db_van
