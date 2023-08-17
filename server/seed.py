#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app,db
from models import db, Review, Sneaker, User

fake = Faker()

def clear_database():
    with app.app_context():
        Sneaker.query.delete()
        User.query.delete()
        Review.query.delete()
        db.session.commit()


def create_users():
    users = []
    for _ in range(20):
        user = User(
            username= fake.user_name(),
            location= fake.city()
        )
        user.password_hash = fake.password()
        users.append(user)
    return users

def sneakers():
    with app.app_context():
        s1= Sneaker(name_of_sneaker='Giannis Immortality 3', category='Basketball', name_of_brand='Nike')
        s2= Sneaker(name_of_sneaker= 'Zoom GT Jump 2', category='Basketball', name_of_brand='Nike')
        s3= Sneaker(name_of_sneaker='Luka 2', category='Basketball', name_of_brand='Jordan')
        s4= Sneaker(name_of_sneaker='Stewie 2', category='Basketball', name_of_brand='Puma')
        s5= Sneaker(name_of_sneaker='Trae Young 3', category='Basketball', name_of_brand='Adidas')
        s6= Sneaker(name_of_sneaker='Crazy Infinity', category='Basketball', name_of_brand='Adidas')
        s7= Sneaker(name_of_sneaker='Step Back 3', category='Basketball', name_of_brand='Adidas')
        s8= Sneaker(name_of_sneaker='Curry 10', category='Baketball', name_of_brand='Under Armour')
        s9= Sneaker(name_of_sneaker='ZoomX Vaporfly Next% 2', category='Running', name_of_brand='Nike')
        s10= Sneaker(name_of_sneaker='Adistar 2.0', category='Running', name_of_brand='Adidas')
        s11= Sneaker(name_of_sneaker='Gel-Kayano 30', category='Running', name_of_brand='Asics')
        s12= Sneaker(name_of_sneaker='Stan Smith', category='Casual', name_of_brand='Adidas')
        s13= Sneaker(name_of_sneaker='Chuck Taylor All Star Classic', category='Casual', name_of_brand='Converse')
        s14= Sneaker(name_of_sneaker='Question', category='Basketball', name_of_brand='Reebok')
        s15= Sneaker(name_of_sneaker='Sk8-Hi', category='Skateboarding', name_of_brand='Vans')
        s16= Sneaker(name_of_sneaker='550', category='Casual', name_of_brand='New Balance')
        s17= Sneaker(name_of_sneaker='Arizona Birkibuc', category='Sandals', name_of_brand='Other')
        s18= Sneaker(name_of_sneaker='Mercurial Superfly 3', category='Training', name_of_brand='Nike')

        sneaker = [s1, s2, s3, s4, s5, s6 , s7, s8, s9, s10,s11, s12, s13, s14, s15, s16, s17, s18 ]
        return sneaker

def create_reviews(sneakers, users):
    with app.app_context():
        i1= Review(rating=5.0, review='Good quality Nike is number 1 !', user_id=1, sneaker_id = 1)
        i2= Review(rating=4.5, review='Great sneaker for my son. I like that they look nice if we go out somewhere nice and still be comfortable for him', user_id=2, sneaker_id = 2)
        i3= Review(rating=3.0, review='SHOE LOOKS GREAT! BUT ITS AH BIT SNUG', user_id=3, sneaker_id = 3)
        i4= Review(rating=4.0, review='Great shoe and great fit. These are very comfortable and I really recommend', user_id=3, sneaker_id = 4)
        i5= Review(rating=4.0, review='These are always the best n most comfy go to sneakers ever', user_id=4, sneaker_id = 5)
        i6= Review(rating=2.5, review='a bit of a narrow toebox not wide by any stretch, half size up if you are wide the quality of the made in india marked boxes have been sub par and less than ideal with glue spots and defects throughout the shoes in the examples i had purchased', user_id=5, sneaker_id = 6)
        i7= Review(rating=5.0, review='Liked the shoes goes well with everything', user_id=6, sneaker_id = 7)
        i8= Review(rating=2.0, review='I brought this item and the joints of the material is poorly done as the glue is visible. Not good quality', user_id=7, sneaker_id = 7)
        i9= Review(rating=3.5, review='Sizing is too big. Ordered 2 different pairs and couldn’t get them to fit. Very bulky. Definitely for looks and not practical.', user_id=7, sneaker_id = 8)
        i10= Review(rating=5.0, review='Crease easily should be a bit more flexible and breathable', user_id=8, sneaker_id = 9)
        i11= Review(rating=2.0, review='Love the look and feel. Hate the outsole durability. A hole has developed in the heel after only 3 months of use.', user_id=9, sneaker_id = 10)
        i12= Review(rating=4.0, review='It is an average shoes and it could be better made if a bit more effort was given', user_id=10 , sneaker_id = 11)
        i13= Review(rating=5.0, review='Great shoe and great fit. These are very comfortable and I really recommend', user_id=13, sneaker_id = 12)
        i14= Review(rating=4.0, review='Love these sneakers. Comfortable, can wear allday', user_id=11, sneaker_id = 13)
        i15= Review(rating=4.0, review='Absulity love it. I like the packing nice and simple. I Like the colour of the shoe. Comfortable. Definitely, it\'s worth it', user_id=14, sneaker_id = 14)
        i16= Review(rating=4.5, review='Very comfortable breathable material', user_id=15, sneaker_id = 2)
        i17= Review(rating=5.0, review='Extremely comfortable and well fitting. The shoe looks awesome and I love the sole. Very cushiony. I highly recommend!', user_id=16, sneaker_id = 15)
        i18= Review(rating=2.0, review='The soles on these wore out in 3 months of light walking and mostly inside.', user_id=17, sneaker_id = 16)
        i19= Review(rating=5.0, review='Good quality Nike is number 1 !', user_id=12, sneaker_id = 18)
        i20= Review(rating=4.5, review='Great sneaker for my son. I like that they look nice if we go out somewhere nice and still be comfortable for him', user_id=2, sneaker_id = 18)
        i21= Review(rating=2.0, review='Shoes look great and seem durable, however, I was unable to test them properly as they run HUGE. I normally wear an 11 but I could not walk without them falling out. When trying them on they seem comfortable, but I can\'t justify if they will be comfortable over time as I was unable to use them for a long period of time due to the horrible fit.', user_id=16, sneaker_id = 1)
        i22= Review(rating=4.5, review='These shoes are very comfortable and looks nice with any attire', user_id=12, sneaker_id = 1)
        i23= Review(rating=3.0, review='SHOE LOOKS GREAT! BUT ITS AH BIT SNUG', user_id=16, sneaker_id = 2)
        i24= Review(rating=4.0, review='Great shoe and great fit. These are very comfortable and I really recommend', user_id=17, sneaker_id = 13)
        i25= Review(rating=4.0, review='These are always the best n most comfy go to sneakers ever', user_id=18, sneaker_id = 3)
        i26= Review(rating=2.5, review='a bit of a narrow toebox not wide by any stretch, half size up if you are wide the quality of the made in india marked boxes have been sub par and less than ideal with glue spots and defects throughout the shoes in the examples i had purchased', user_id=5, sneaker_id = 15)
        i27= Review(rating=5.0, review='Liked the shoes goes well with everything', user_id=16, sneaker_id = 7)
        i28= Review(rating=2.0, review='I brought this item and the joints of the material is poorly done as the glue is visible. Not good quality', user_id=19, sneaker_id = 12)
        i29= Review(rating=3.5, review='Sizing is too big. Ordered 2 different pairs and couldn’t get them to fit. Very bulky. Definitely for looks and not practical.', user_id=20, sneaker_id = 9)
        i30= Review(rating=5.0, review='Crease easily should be a bit more flexible and breathable', user_id=18, sneaker_id = 8)
        i31= Review(rating=2.0, review='Love the look and feel. Hate the outsole durability. A hole has developed in the heel after only 3 months of use.', user_id=19, sneaker_id = 2)
        i32= Review(rating=4.0, review='It is an average shoes and it could be better made if a bit more effort was given', user_id=10, sneaker_id = 17)
        i33= Review(rating=2.0, review='Shoes look great and seem durable, however, I was unable to test them properly as they run HUGE. I normally wear an 11 but I could not walk without them falling out. When trying them on they seem comfortable, but I can\'t justify if they will be comfortable over time as I was unable to use them for a long period of time due to the horrible fit.', user_id=1, sneaker_id = 13)
        i34= Review(rating=4.5, review='These shoes are very comfortable and looks nice with any attire', user_id=12, sneaker_id = 18)
        i35= Review(rating=2.0, review='Shoes look great and seem durable, however, I was unable to test them properly as they run HUGE. I normally wear an 11 but I could not walk without them falling out. When trying them on they seem comfortable, but I can\'t justify if they will be comfortable over time as I was unable to use them for a long period of time due to the horrible fit.', user_id=16, sneaker_id=5)
        i36= Review(rating=4.5, review='These shoes are very comfortable and looks nice with any attire', user_id=2, sneaker_id = 17)
        i37= Review(rating=5.0, review='Great shoe and great fit. These are very comfortable and I really recommend', user_id=13, sneaker_id = 16)
        i38= Review(rating=4.0, review='Love these sneakers. Comfortable, can wear allday', user_id=3, sneaker_id = 5)
        i39= Review(rating=4.0, review='Absulity love it. I like the packing nice and simple. I Like the colour of the shoe. Comfortable. Definitely, it\'s worth it', user_id=4, sneaker_id = 4)
        i40= Review(rating=4.5, review='Very comfortable breathable material', user_id=5,sneaker_id = 8)
        i41= Review(rating=5.0, review='Extremely comfortable and well fitting. The shoe looks awesome and I love the sole. Very cushiony. I highly recommend!', user_id=6, sneaker_id = 1)
        i42= Review(rating=2.0, review='The soles on these wore out in 3 months of light walking and mostly inside.', user_id=7, sneaker_id = 1)
        i43= Review(rating=2.0, review='Shoes look great and seem durable, however, I was unable to test them properly as they run HUGE. I normally wear an 11 but I could not walk without them falling out. When trying them on they seem comfortable, but I can\'t justify if they will be comfortable over time as I was unable to use them for a long period of time due to the horrible fit.', user_id=1, sneaker_id = 17)
        i44= Review(rating=4.5, review='These shoes are very comfortable and looks nice with any attire', user_id=2, sneaker_id = 16)

        review = [i1, i2, i3, i4, i5, i6 , i7, i8, i9, i10, i11, i12, i13, i14, i15, i16, i17, i18,i19,i20, i21, i22, i23, i24, i25, i26 , i27, i28, i29, i30, i31, i32, i33, i34, i35, i36 , i37, i38, i39, i40, i41, i42, i43,i44 ]
        return review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print('Clearing database...')
        User.query.delete()
        Sneaker.query.delete()
        Review.query.delete()

        print("Seeding User...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding Sneaker...")
        sneakers = sneakers()
        db.session.add_all(sneakers)
        db.session.commit()

        print("Seeding Review...")
        reviews = create_reviews(sneakers, users)
        db.session.add_all(reviews)
        db.session.commit()


        print("Done Seeding!")



