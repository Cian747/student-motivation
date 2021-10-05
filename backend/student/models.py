from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField


# Create your models here.

ROLE_CHOICES = (
    (1,'Staff'),
    (2,'Student'),
    )
    
class Role(models.Model):
    roles = models.PositiveSmallIntegerField(choices=ROLE_CHOICES,blank=True,null=True)

    def __str__(self) -> str:
       return self.roles

class Category(models.Model):
    category_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
       return self.category_name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_photo = CloudinaryField('image',blank=True,null=True)
    role = models.ForeignKey(Role, on_delete=models.DO_NOTHING,null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    profile_email = models.EmailField(blank=True,null=True)
    phone_number = models.CharField(max_length=20,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
       return self.user.username

class Motivation(models.Model):
    image = CloudinaryField('images')
    video = models.FileField(blank=True,null=True)
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    description = models.TextField()
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name='motivation_posts')

    def __str__(self) -> str:
       return self.user.username

class Review(models.Model):
    review = models.TextField()
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    motivation = models.ForeignKey(Motivation,on_delete=models.CASCADE)

    def __str__(self) -> str:
       return self.user_id.username

class Subscription(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self) -> str:
       return self.name

class WishList(models.Model):
   motivatation = models.ForeignKey(Motivation,on_delete=models.CASCADE)
   profile = models.ForeignKey(Profile,on_delete=models.CASCADE)

# Classes
# Role class
# Profile - Admin to create category class
# Review
# Category class
# Motivation class
# Subscription class then incorporates sendgrid
