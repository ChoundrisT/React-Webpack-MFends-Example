#!/usr/bin/env python3



from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Van(Base):
    __tablename__ = 'vans'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Integer)
    description = Column(String)
    imageUrl = Column(String)
    type = Column(String)
    hostId = Column(String)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    name = Column(String)


engine = create_engine('sqlite:///test.db')
Base.metadata.create_all(engine)


Session = sessionmaker(bind=engine)
session = Session()


def seed_data(db_session):
    vans_data = [
        {"id": 1, "name": "Modest Explorer", "price": 60, "description": "The Modest Explorer is a van designed to get you out of the house and into nature...", "imageUrl": "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", "type": "simple", "hostId": "123"},
        {"id": 2, "name": "Beach Bum", "price": 80, "description": "Beach Bum is a van inspired by surfers and travelers...", "imageUrl": "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", "type": "rugged", "hostId": "123"},
        {"id": 3, "name": "Reliable Red", "price": 100, "description": "Reliable Red is a van that was made for travelling...", "imageUrl": "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", "type": "luxury", "hostId": "456"},
        {"id": 4, "name": "Dreamfinder", "price": 65, "description": "Dreamfinder is the perfect van to travel in and experience...", "imageUrl": "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", "type": "simple", "hostId": "789"},
        {"id": 5, "name": "The Cruiser", "price": 120, "description": "The Cruiser is a van for those who love to travel in comfort and luxury...", "imageUrl": "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", "type": "luxury", "hostId": "789"},
        {"id": 6, "name": "Green Wonder", "price": 70, "description": "With this van, you can take your travel life to the next level...", "imageUrl": "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", "type": "rugged", "hostId": "123"}
    ]

    users_data = [
        {"id": 123, "email": "b@b.com", "password": "p123", "name": "Bob"}
    ]


    for van in vans_data:
        db_session.add(Van(**van))


    for user in users_data:
        db_session.add(User(**user))

    db_session.commit()


seed_data(session)


session.close()

